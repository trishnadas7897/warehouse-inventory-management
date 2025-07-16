# Installing Tesseract-OCR on Windows

## Step 1: Download Tesseract

1. Go to: https://github.com/UB-Mannheim/tesseract/wiki
2. Download the latest Windows installer (e.g., `tesseract-ocr-w64-setup-5.3.1.20230401.exe`)

## Step 2: Install Tesseract

1. **Run the installer as Administrator**
2. **Choose installation path**: `C:\Program Files\Tesseract-OCR\`
3. **Select components**:
   - ✅ Tesseract OCR Engine
   - ✅ Additional language data (download)
   - ✅ Additional script data (download)
4. **Click Install**

## Step 3: Add to PATH (Optional)

1. Open System Properties → Advanced → Environment Variables
2. Add `C:\Program Files\Tesseract-OCR\` to your PATH
3. Restart your terminal/command prompt

## Step 4: Verify Installation

Open Command Prompt and run:
```cmd
tesseract --version
```

You should see something like:
```
tesseract 5.3.1
```

## Step 5: Test with Python

```python
import pytesseract
print(pytesseract.get_tesseract_version())
```

## Troubleshooting

### If you get "tesseract is not recognized"
1. Make sure you installed to the correct path
2. Add Tesseract to your system PATH
3. Restart your terminal

### If you get "tesseract is not installed"
1. Verify the installation path in `video_processor.py`
2. Make sure you ran the installer as Administrator
3. Try reinstalling Tesseract

### Alternative Installation Methods

**Using Chocolatey:**
```cmd
choco install tesseract
```

**Using winget:**
```cmd
winget install UB-Mannheim.TesseractOCR
```

## Next Steps

After installing Tesseract:
1. Restart your terminal/command prompt
2. Run: `python video_processor.py`
3. The script should now work without Tesseract errors 