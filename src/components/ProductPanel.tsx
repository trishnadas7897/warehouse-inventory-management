import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, CheckCircle, AlertCircle } from "lucide-react"

interface Product {
  id: string
  name: string
  barcode: string
  expectedQuantity: number
  receivedQuantity: number
  category: string
}

interface ProductPanelProps {
  product: Product | null
}

export function ProductPanel({ product }: ProductPanelProps) {
  if (!product) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-48">
          <div className="text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Scan a barcode to view product details</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const isComplete = product.receivedQuantity === product.expectedQuantity
  const isOver = product.receivedQuantity > product.expectedQuantity
  const isUnder = product.receivedQuantity < product.expectedQuantity

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground mb-1">
              {product.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          {isComplete && (
            <CheckCircle className="h-6 w-6 text-success" />
          )}
          {(isOver || isUnder) && (
            <AlertCircle className="h-6 w-6 text-warning" />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-muted/50 p-3 rounded-lg">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Barcode</p>
          <p className="font-mono text-sm font-medium">{product.barcode}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-card border rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Expected</p>
            <p className="text-2xl font-bold text-foreground">{product.expectedQuantity}</p>
          </div>
          
          <div className="text-center p-3 bg-card border rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Received</p>
            <p className={`text-2xl font-bold ${
              isComplete ? 'text-success' : 
              isOver ? 'text-warning' : 
              'text-destructive'
            }`}>
              {product.receivedQuantity}
            </p>
          </div>
        </div>
        
        <div className="flex justify-center">
          {isComplete && (
            <Badge className="bg-success text-success-foreground">
              ✓ Complete
            </Badge>
          )}
          {isOver && (
            <Badge className="bg-warning text-warning-foreground">
              ⚠ Over Delivery
            </Badge>
          )}
          {isUnder && (
            <Badge variant="destructive">
              ⚠ Under Delivery
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}