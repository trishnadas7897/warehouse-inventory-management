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

Edit `video_processor.py` to adjust these parameters:

```python
# Video directory path
VIDEO_DIR = r"C:\Users\samue\Downloads\Telegram Desktop"

# YOLO model weights (use custom model for better accuracy)
MODEL_WEIGHTS = "yolov8n.pt"

# Pixel to centimeter conversion (adjust for your camera setup)
PIXEL_TO_CM = 0.1

# Area threshold for warehouse vs shelf classification
WAREHOUSE_AREA_THRESHOLD = 50000
```

## Output Format

### Warehouse Boxes (Green)
- **Label**: "Box"
- **Dimensions**: Estimated real-world size (W×H×D cm)
- **Quantity**: Always "1"

### Shelf Products (Red)
- **Label**: OCR-detected product name
- **Dimensions**: "N/A"
- **Quantity**: "+1, net: X" (running count)

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