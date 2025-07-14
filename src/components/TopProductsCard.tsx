import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StockStatusBadge } from "./StockStatusBadge"

interface Product {
  id: string
  name: string
  stock: number
  category: string
  price: number
}

const topProducts: Product[] = [
  { id: "1", name: "iPhone 15 Pro", stock: 45, category: "Electronics", price: 999 },
  { id: "2", name: "Samsung 75\" QLED TV", stock: 8, category: "Electronics", price: 1299 },
  { id: "3", name: "Nike Air Max 270", stock: 67, category: "Footwear", price: 150 },
  { id: "4", name: "KitchenAid Stand Mixer", stock: 15, category: "Home & Garden", price: 379 },
  { id: "5", name: "Apple MacBook Air M2", stock: 23, category: "Electronics", price: 1199 },
]

export function TopProductsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Top 5 Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={product.id} className="flex items-center justify-between p-3 rounded-lg border bg-background">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-medium text-foreground">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                </div>
              </div>
              <div className="text-right flex items-center gap-3">
                <div>
                  <p className="font-semibold text-foreground">{product.stock} units</p>
                  <p className="text-sm text-muted-foreground">${product.price}</p>
                </div>
                <StockStatusBadge stock={product.stock} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}