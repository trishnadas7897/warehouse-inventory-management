# Walmart Video Processing Pipeline

A Python pipeline that processes MP4 videos with YOLOv8 object detection, OCR for product recognition, and annotated video output.

## Features

- **YOLOv8 Object Detection**: Locates objects in each video frame
- **Smart Classification**: 
  - Large objects → Warehouse crates with realistic dimensions
  - Small objects → Shelf products with OCR text recognition
- **OCR Integration**: Uses Tesseract to read product names from detected objects
- **Real-time Counting**: Tracks product quantities with "+1, net: X" labels
- **Annotated Output**: Saves videos with colored bounding boxes and labels
- **Progress Tracking**: Shows processing progress for each video

## Installation

### 1. Prerequisites

**Install Tesseract-OCR:**
- Download from: https://github.com/UB-Mannheim/tesseract/wiki
- Install to default location: `C:\Program Files\Tesseract-OCR\`

### 2. Setup Python Environment

```bash
# Install Python requirements
pip install -r requirements.txt

# Or run the setup script
python setup.py
```

### 3. Download YOLO Model

The script will automatically download the YOLOv8n model on first run, or you can run:

```python
from ultralytics import YOLO
model = YOLO("yolov8n.pt")
```

## Usage

### Basic Usage

1. Place your MP4 files in the folder specified by `VIDEO_DIR` in `video_processor.py`:
   ```python
   VIDEO_DIR = r"C:\Users\samue\Downloads\Telegram Desktop"
   ```
   (You can change this path to any folder containing your videos.)

2. Run the processor:
   ```bash
   python video_processor.py
   ```
   This will process **all MP4 files** in the `VIDEO_DIR` folder.

3. Annotated videos will be saved in the same folder with the `_annotated.mp4` suffix (e.g., `video1_annotated.mp4`).

### Configuration

Every knob is environment-driven so the pipeline runs on any machine without code edits. Defaults reflect the original Windows development setup.

| Variable | Default | Purpose |
| --- | --- | --- |
| `CCTV_VIDEO_DIR` | `C:\Users\samue\Downloads\Telegram Desktop` | Folder to scan for `*.mp4` |
| `YOLO_WEIGHTS` | `yolov8n.pt` | Path to YOLO weights (use a fine-tuned model for better accuracy) |
| `PIXEL_TO_CM` | `0.1` | Pixel -> centimetre scaling (calibrate per camera) |
| `WAREHOUSE_AREA_THRESHOLD` | `50000` | Boxes above this pixel area are classified as warehouse crates |
| `DASHBOARD_EXPORT_PATH` | `../src/data/cv_counts.json` | Where the React dashboard reads counts from |

### Dashboard handoff

After every video, `video_processor.py` writes a JSON export at `DASHBOARD_EXPORT_PATH` (default: `../src/data/cv_counts.json`). That file is the contract between the pipeline and the React dashboard - its TypeScript counterpart is [`src/data/cv_counts.ts`](../src/data/cv_counts.ts), and the schema version is currently `1`. Shape:

```json
{
  "schema_version": 1,
  "generated_at": "2026-06-06T12:00:00Z",
  "source_video": "store_cam_01_2026-06-06.mp4",
  "total_frames_processed": 5400,
  "fps": 30,
  "shelf_items":      [ { "label": "Whole Milk 1L", "count": 47, "last_seen_frame": 5392 } ],
  "warehouse_boxes":  [ { "label": "Box", "dimensions_cm": "60.0x40.0x30.0 cm", "detected_count": 4 } ]
}
```

Vite imports this file at build time so a recruiter cloning the repo sees the integration without running the pipeline. To refresh: run `python video_processor.py`, rebuild the frontend, and `TopProductsCard` will show the new "Live from CCTV" data.

## Output Format

### Warehouse Boxes (Blue bounding box)
- **Label**: First OCR line, or `"Box"` if no readable text
- **Dimensions**: Estimated real-world size (W×H×D cm)
- **Quantity**: Always `1`

### Shelf Products (Green bounding box)
- **Label**: OCR-detected product name + first weight match (e.g. `500g`, `1.5l`)
- **Dimensions**: not shown for shelf items
- **Quantity**: `+1, net: X` (running per-label count)

### Bottom Prompt
Every frame includes: `"+obj,qty, obj.item name"`

## Troubleshooting

### Common Issues

1. **Tesseract not found**
   - Install Tesseract-OCR from the provided link
   - Update the path in `video_processor.py` if installed elsewhere:
     ```python
     pytesseract.pytesseract.tesseract_cmd = r"C:\Path\To\tesseract.exe"
     ```

2. **Incorrect video folder**
   - Make sure `VIDEO_DIR` points to the folder containing your MP4 files.
   - If you move your videos, update `VIDEO_DIR` accordingly.

3. **Poor OCR results**
   - Adjust lighting in your videos
   - Ensure text is clearly visible
   - Consider using a custom YOLO model trained on your specific objects

4. **Incorrect object classification**
   - Adjust `WAREHOUSE_AREA_THRESHOLD` based on your video resolution
   - Modify `PIXEL_TO_CM` for accurate dimension estimation

5. **Slow processing**
   - Use GPU acceleration if available
   - Consider using a smaller YOLO model (yolov8n vs yolov8s/l/m/x)

### Performance Tips

- **GPU Acceleration**: Install CUDA for faster YOLO inference
- **Batch Processing**: Process multiple videos in parallel
- **Model Optimization**: Use TensorRT for production deployment

## File Structure

```
wallmart project/
├── video_processor.py    # Main processing script
├── requirements.txt      # Python dependencies
├── setup.py             # Installation helper
├── README.md            # This file
├── yolov8n.pt           # YOLO model (downloaded automatically)
├── .gitignore           # Git ignore rules
└── *_annotated.mp4      # Annotated video outputs
```

## .gitignore

This project includes a `.gitignore` file that excludes:
- Python bytecode and cache files
- Virtual environments (e.g., `env/`)
- Model weights (e.g., `yolov8n.pt`)
- Annotated video outputs (e.g., `*_annotated.mp4`)
- IDE/editor settings (e.g., `.vscode/`, `.idea/`)

**Note:** Annotated videos and model weights are not tracked by git to keep the repository clean and lightweight.

## Customization

### Using Custom YOLO Models

1. Train a custom YOLOv8 model on your specific objects
2. Replace `MODEL_WEIGHTS` with your model path
3. Adjust class names and thresholds accordingly

### Adding New Object Types

1. Modify the classification logic in `annotate_video()`
2. Add new color schemes and labeling rules
3. Update the dimension estimation for new object types

## Dependencies

- **ultralytics**: YOLOv8 object detection
- **opencv-python**: Video processing and image manipulation
- **pytesseract**: OCR text recognition
- **numpy**: Numerical operations
- **Pillow**: Image processing utilities

## License

This project is for educational and research purposes. Please ensure compliance with any applicable licenses for YOLOv8 and Tesseract-OCR. 