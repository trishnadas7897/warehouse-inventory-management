import { Badge } from "@/components/ui/badge"

interface StockStatusBadgeProps {
  stock: number
  threshold?: number
}

export function StockStatusBadge({ stock, threshold = 20 }: StockStatusBadgeProps) {
  if (stock === 0) {
    return (
      <Badge variant="destructive" className="font-medium">
        Out of Stock
      </Badge>
    )
  }
  
  if (stock <= threshold) {
    return (
      <Badge variant="destructive" className="font-medium">
        Low Stock
      </Badge>
    )
  }
  
  if (stock <= threshold * 2) {
    return (
      <Badge className="bg-warning text-warning-foreground font-medium">
        Medium Stock
      </Badge>
    )
  }
  
  return (
    <Badge className="bg-success text-success-foreground font-medium">
      Good Stock
    </Badge>
  )
}