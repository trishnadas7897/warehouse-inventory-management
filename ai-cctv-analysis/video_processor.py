import cv2
import json
import os
import re
import pytesseract
from datetime import datetime, timezone
from pathlib import Path
from ultralytics import YOLO

# ----------------------
# CONFIGURATION
# ----------------------
# Override any of these from the environment so the pipeline runs on any
# machine without code edits. The Windows defaults reflect the original
# development setup.
VIDEO_DIR = os.environ.get("CCTV_VIDEO_DIR", r"C:\Users\samue\Downloads\Telegram Desktop")
MODEL_WEIGHTS = os.environ.get("YOLO_WEIGHTS", "yolov8n.pt")
PIXEL_TO_CM = float(os.environ.get("PIXEL_TO_CM", "0.1"))
WAREHOUSE_AREA_THRESHOLD = int(os.environ.get("WAREHOUSE_AREA_THRESHOLD", "50000"))

# Dashboard handoff: where to write the JSON the React dashboard reads.
# Default lands at <repo_root>/src/data/cv_counts.json so Vite picks it up
# at build time without any extra infrastructure. The TS counterpart lives
# at src/data/cv_counts.ts - they share schema_version: 1.
DASHBOARD_EXPORT_PATH = Path(
    os.environ.get(
        "DASHBOARD_EXPORT_PATH",
        str(Path(__file__).resolve().parent.parent / "src" / "data" / "cv_counts.json"),
    )
)

# Initialize YOLO model
model = YOLO(MODEL_WEIGHTS)

# Configure Tesseract OCR
pytesseract.pytesseract.tesseract_cmd = r"C:\Users\samue\AppData\Local\Programs\Tesseract-OCR\tesseract.exe"
OCR_CONFIG = "--psm 6"

# Utility: estimate box dimensions (W×H×D)
def estimate_dimensions(w_px, h_px):
    w_cm = w_px * PIXEL_TO_CM
    h_cm = h_px * PIXEL_TO_CM
    d_cm = 30.0  # assumed depth
    return f"{w_cm:.1f}x{h_cm:.1f}x{d_cm:.1f} cm"


def write_dashboard_export(
    source_video: str,
    total_frames: int,
    fps: float,
    shelf_counts: dict,
    shelf_last_seen: dict,
    warehouse_boxes: dict,
) -> None:
    """
    Emit the dashboard-handoff JSON the React frontend imports.

    Contract (schema_version 1) is mirrored 1:1 in src/data/cv_counts.ts.
    The TypeScript types in that file ARE the contract - update both sides
    together if you change a key.
    """
    payload = {
        "schema_version": 1,
        "generated_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "source_video": source_video,
        "total_frames_processed": total_frames,
        "fps": fps,
        "shelf_items": [
            {
                "label": label,
                "count": count,
                "last_seen_frame": shelf_last_seen.get(label, 0),
            }
            for label, count in sorted(
                shelf_counts.items(), key=lambda kv: kv[1], reverse=True
            )
        ],
        "warehouse_boxes": [
            {
                "label": label,
                "dimensions_cm": meta["dimensions_cm"],
                "detected_count": meta["count"],
            }
            for label, meta in sorted(
                warehouse_boxes.items(), key=lambda kv: kv[1]["count"], reverse=True
            )
        ],
    }

    try:
        DASHBOARD_EXPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
        DASHBOARD_EXPORT_PATH.write_text(json.dumps(payload, indent=2))
        print(f"📤 Dashboard export: {DASHBOARD_EXPORT_PATH}")
    except OSError as e:
        # Never crash the pipeline on a write failure - the annotated video
        # is the primary artifact; the dashboard handoff is secondary.
        print(f"⚠️  Could not write dashboard export to {DASHBOARD_EXPORT_PATH}: {e}")


# Process one video
def annotate_video(path: Path):
    print(f"🔄 Processing: {path.name}")

    cap = cv2.VideoCapture(str(path))
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    out_path = path.with_name(path.stem + "_annotated.mp4")
    writer = cv2.VideoWriter(str(out_path), cv2.VideoWriter_fourcc(*"mp4v"), fps, (w, h))

    # Dashboard handoff state - mirrored into JSON at end of run.
    shelf_counts = {}             # label -> running count
    shelf_last_seen = {}          # label -> last frame index it appeared in
    warehouse_boxes = {}          # label -> {count, dimensions_cm}
    frame_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1
        if frame_count % 30 == 0:  # Progress update every 30 frames
            progress = (frame_count / total_frames) * 100
            print(f"   Progress: {progress:.1f}% ({frame_count}/{total_frames})")

        results = model(frame)[0]
        for box in results.boxes:
            cls = int(box.cls[0])
            # skip people
            if cls == 0:
                continue
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            area = (x2 - x1) * (y2 - y1)

            # crop region
            roi = frame[y1:y2, x1:x2]

            if area >= WAREHOUSE_AREA_THRESHOLD:
                # warehouse crate
                raw_text = pytesseract.image_to_string(roi, config=OCR_CONFIG).strip()
                # extract label if present, else 'Box'
                label = raw_text.splitlines()[0] if raw_text else "Box"
                dims = estimate_dimensions(x2 - x1, y2 - y1)
                # track per-label warehouse-box stats for the dashboard export
                bucket = warehouse_boxes.setdefault(label, {"count": 0, "dimensions_cm": dims})
                bucket["count"] += 1
                bucket["dimensions_cm"] = dims  # keep the latest measurement
                qty = str(bucket["count"])
                text = f"{label} | {dims} | Qty: {qty}"
                color = (255, 0, 0)  # blue-ish for warehouse

            else:
                # shelf product
                ocr_text = pytesseract.image_to_string(roi, config=OCR_CONFIG).strip()
                # parse name and weight
                lines = [ln for ln in ocr_text.splitlines() if ln.strip()]
                name = lines[0] if lines else "Item"
                # find first weight pattern
                weight = ""
                for m in re.finditer(r"\d+(?:\.\d+)?\s?(?:kg|g|ml|l)", ocr_text, re.IGNORECASE):
                    weight = m.group()
                    break
                label = f"{name} {weight}".strip()

                # update count + last-seen for dashboard export
                count = shelf_counts.get(label, 0) + 1
                shelf_counts[label] = count
                shelf_last_seen[label] = frame_count
                text = f"{label} | +1, net: {count}"
                color = (0, 255, 0)  # green for shelf items

            # draw annotations
            cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
            cv2.putText(frame, text, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

        # bottom-left prompt
        cv2.putText(frame, "+obj,qty, obj.item name", (10, h - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

        writer.write(frame)

    cap.release()
    writer.release()
    print(f"✅ Saved: {out_path}")
    print(f"📊 Final shelf counts: {shelf_counts}")

    # Hand off to the React dashboard via the JSON contract.
    write_dashboard_export(
        source_video=path.name,
        total_frames=frame_count,
        fps=fps,
        shelf_counts=shelf_counts,
        shelf_last_seen=shelf_last_seen,
        warehouse_boxes=warehouse_boxes,
    )

# run on all MP4s
if __name__ == "__main__":
    for f in os.listdir(VIDEO_DIR):
        if f.lower().endswith('.mp4'):
            annotate_video(Path(VIDEO_DIR) / f) 