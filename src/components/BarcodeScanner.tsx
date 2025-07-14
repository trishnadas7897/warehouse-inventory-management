import { useState } from "react"
import { Camera } from "@capacitor/camera"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScanLine, Camera as CameraIcon } from "lucide-react"

interface BarcodeScannerProps {
  onScan: (barcode: string) => void
  isScanning: boolean
}

export function BarcodeScanner({ onScan, isScanning }: BarcodeScannerProps) {
  const [lastScanned, setLastScanned] = useState<string>("")

  const startScan = async () => {
    try {
      // In a real app, you'd use a barcode scanning plugin
      // For demo purposes, we'll simulate scanning
      const mockBarcodes = ["123456789012", "987654321098", "456789123456", "789012345678"]
      const randomBarcode = mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)]
      
      setTimeout(() => {
        setLastScanned(randomBarcode)
        onScan(randomBarcode)
      }, 1000)
    } catch (error) {
      console.error("Error scanning:", error)
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] bg-muted flex items-center justify-center">
          {isScanning ? (
            <div className="relative w-full h-full bg-black/20 flex items-center justify-center">
              <div className="relative">
                <div className="w-48 h-48 border-2 border-primary rounded-lg relative">
                  <div className="absolute inset-x-0 top-1/2 h-0.5 bg-primary animate-pulse">
                    <ScanLine className="absolute -left-2 -top-3 h-6 w-6 text-primary animate-bounce" />
                  </div>
                </div>
                <p className="text-center mt-4 text-primary-foreground font-medium">
                  Align barcode within the frame
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <CameraIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Tap to start scanning</p>
              <Button onClick={startScan} className="bg-primary hover:bg-primary/90">
                Start Scanner
              </Button>
            </div>
          )}
        </div>
        
        {lastScanned && (
          <div className="p-4 bg-card border-t">
            <p className="text-sm text-muted-foreground">Last scanned:</p>
            <p className="font-mono text-lg font-semibold text-foreground">{lastScanned}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}