import { useState, useEffect } from "react"
import { BarcodeScanner } from "@/components/BarcodeScanner"
import { ProductPanel } from "@/components/ProductPanel"
import { ShipmentSummary } from "@/components/ShipmentSummary"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ScanLine, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  barcode: string
  expectedQuantity: number
  receivedQuantity: number
  category: string
}

// Mock shipment data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    barcode: "123456789012",
    expectedQuantity: 25,
    receivedQuantity: 25,
    category: "Electronics"
  },
  {
    id: "2", 
    name: "Samsung Galaxy S24",
    barcode: "987654321098",
    expectedQuantity: 30,
    receivedQuantity: 28,
    category: "Electronics"
  },
  {
    id: "3",
    name: "Apple AirPods Pro",
    barcode: "456789123456",
    expectedQuantity: 50,
    receivedQuantity: 52,
    category: "Electronics"
  },
  {
    id: "4",
    name: "Wireless Charger",
    barcode: "789012345678",
    expectedQuantity: 40,
    receivedQuantity: 0,
    category: "Accessories"
  }
]

const Scanner = () => {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scannedBarcodes, setScannedBarcodes] = useState<Set<string>>(new Set())
  const navigate = useNavigate()
  const { toast } = useToast()

  const totalItems = mockProducts.length
  const scannedItems = scannedBarcodes.size
  const missingItems = mockProducts.filter(p => p.receivedQuantity === 0).length

  const handleScan = (barcode: string) => {
    const product = mockProducts.find(p => p.barcode === barcode)
    
    if (product) {
      setCurrentProduct(product)
      setScannedBarcodes(prev => new Set([...prev, barcode]))
      setIsScanning(false)
      
      toast({
        title: "Product Found",
        description: `Scanned: ${product.name}`,
      })
    } else {
      toast({
        title: "Product Not Found",
        description: "This item is not in the current shipment",
        variant: "destructive",
      })
      setIsScanning(false)
    }
  }

  const startNextScan = () => {
    setIsScanning(true)
    setCurrentProduct(null)
  }

  const confirmDelivery = () => {
    toast({
      title: "Delivery Confirmed",
      description: "Shipment has been processed successfully",
    })
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Incoming Stock Scanner</h1>
            <p className="text-sm opacity-90">Scan barcodes to verify delivery</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-20">
        {/* Scanner */}
        <BarcodeScanner onScan={handleScan} isScanning={isScanning} />

        {/* Product Details */}
        <ProductPanel product={currentProduct} />

        {/* Shipment Summary */}
        <ShipmentSummary
          totalItems={totalItems}
          scannedItems={scannedItems}
          missingItems={missingItems}
          deliveryId="DEL-2024-001"
        />
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={startNextScan}
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-12"
            disabled={isScanning}
          >
            <ScanLine className="h-4 w-4 mr-2" />
            {isScanning ? "Scanning..." : "Scan Next"}
          </Button>
          
          <Button
            onClick={confirmDelivery}
            variant="outline"
            className="border-success text-success hover:bg-success hover:text-success-foreground h-12"
            disabled={scannedItems === 0}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Confirm Delivery
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Scanner