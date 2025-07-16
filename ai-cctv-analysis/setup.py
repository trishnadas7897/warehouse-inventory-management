#!/usr/bin/env python3
"""
Setup script for the Walmart Video Processing Pipeline
"""

import subprocess
import sys
import os
from pathlib import Path

def install_requirements():
    """Install Python requirements"""
    print("📦 Installing Python requirements...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Python requirements installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install requirements: {e}")
        return False
    return True

def check_tesseract():
    """Check if Tesseract is installed"""
    print("🔍 Checking Tesseract installation...")
    
    # Common Tesseract paths on Windows
    tesseract_paths = [
        r"C:\Program Files\Tesseract-OCR\tesseract.exe",
        r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
    ]
    
    for path in tesseract_paths:
        if os.path.exists(path):
            print(f"✅ Tesseract found at: {path}")
            return path
    
    print("❌ Tesseract not found in common locations.")
    print("📥 Please install Tesseract-OCR from: https://github.com/UB-Mannheim/tesseract/wiki")
    print("   After installation, update the path in video_processor.py")
    return None

def download_yolo_model():
    """Download YOLOv8 model if not present"""
    print("🤖 Checking YOLOv8 model...")
    model_path = Path("yolov8n.pt")
    
    if model_path.exists():
        print("✅ YOLOv8 model already exists")
        return True
    
    print("📥 Downloading YOLOv8n model...")
    try:
        from ultralytics import YOLO
        model = YOLO("yolov8n.pt")
        print("✅ YOLOv8 model downloaded successfully!")
        return True
    except Exception as e:
        print(f"❌ Failed to download model: {e}")
        return False

def main():
    print("🚀 Setting up Walmart Video Processing Pipeline")
    print("=" * 50)
    
    # Install Python requirements
    if not install_requirements():
        return
    
    # Check Tesseract
    tesseract_path = check_tesseract()
    
    # Download YOLO model
    if not download_yolo_model():
        return
    
    print("\n" + "=" * 50)
    print("✅ Setup complete!")
    print("\n📝 Next steps:")
    print("1. Ensure your MP4 files are in the Telegram Desktop folder")
    print("2. Run: python video_processor.py")
    print("3. Adjust PIXEL_TO_CM and WAREHOUSE_AREA_THRESHOLD in video_processor.py if needed")
    
    if not tesseract_path:
        print("\n⚠️  Note: You'll need to install Tesseract-OCR and update the path in video_processor.py")

if __name__ == "__main__":
    main() 