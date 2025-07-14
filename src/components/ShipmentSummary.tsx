import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, AlertTriangle, CheckCircle } from "lucide-react"

interface ShipmentSummaryProps {
  totalItems: number
  scannedItems: number
  missingItems: number
  deliveryId: string
}

export function ShipmentSummary({ 
  totalItems, 
  scannedItems, 
  missingItems, 
  deliveryId 
}: ShipmentSummaryProps) {
  const completionPercentage = totalItems > 0 ? Math.round((scannedItems / totalItems) * 100) : 0
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
          <Package className="h-4 w-4" />
          Shipment Summary
        </CardTitle>
        <p className="text-sm text-muted-foreground">Delivery ID: {deliveryId}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total</p>
            <p className="text-xl font-bold text-foreground">{totalItems}</p>
          </div>
          
          <div className="text-center p-3 bg-success/5 border border-success/20 rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Scanned</p>
            <p className="text-xl font-bold text-success">{scannedItems}</p>
          </div>
          
          <div className="text-center p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Missing</p>
            <p className="text-xl font-bold text-destructive">{missingItems}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium text-foreground">{completionPercentage}%</span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
        
        <div className="flex justify-center pt-2">
          {missingItems === 0 && scannedItems === totalItems ? (
            <Badge className="bg-success text-success-foreground">
              <CheckCircle className="h-3 w-3 mr-1" />
              Delivery Complete
            </Badge>
          ) : missingItems > 0 ? (
            <Badge variant="destructive">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {missingItems} Items Missing
            </Badge>
          ) : (
            <Badge variant="secondary">
              <Package className="h-3 w-3 mr-1" />
              In Progress
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}