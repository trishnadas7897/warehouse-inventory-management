import cv2
import os
import re
import pytesseract
from pathlib import Path
from ultralytics import YOLO

# ----------------------
# CONFIGURATION
# ----------------------
VIDEO_DIR = r"C:\Users\samue\Downloads\Telegram Desktop"
MODEL_WEIGHTS = "yolov8n.pt"  # replace with your fine-tuned model if available
PIXEL_TO_CM = 0.1  # approximate scaling: adjust per camera
WAREHOUSE_AREA_THRESHOLD = 50000  # boxes above this pixel area are warehouse crates

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
    return f"{w_cm:.1f}×{h_cm:.1f}×{d_cm:.1f} cm"

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

    # track shelf counts
    shelf_counts = {}
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
                qty = "1"
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

                # update count
                count = shelf_counts.get(label, 0) + 1
                shelf_counts[label] = count
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

# run on all MP4s
if __name__ == "__main__":
    for f in os.listdir(VIDEO_DIR):
        if f.lower().endswith('.mp4'):
            annotate_video(Path(VIDEO_DIR) / f) 