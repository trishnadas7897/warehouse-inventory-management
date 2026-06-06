import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera } from "lucide-react"
import { StockStatusBadge } from "./StockStatusBadge"
import { getTopShelfItems } from "@/data/cv_counts"

interface DemoProduct {
  id: string
  name: string
  stock: number
  category: string
  price: number
}

// Fallback when no recent CV export is available. Kept around so a fresh
// clone with no pipeline run still renders something useful.
const demoProducts: DemoProduct[] = [
  { id: "1", name: "iPhone 15 Pro", stock: 45, category: "Electronics", price: 999 },
  { id: "2", name: "Samsung 75\" QLED TV", stock: 8, category: "Electronics", price: 1299 },
  { id: "3", name: "Nike Air Max 270", stock: 67, category: "Footwear", price: 150 },
  { id: "4", name: "KitchenAid Stand Mixer", stock: 15, category: "Home & Garden", price: 379 },
  { id: "5", name: "Apple MacBook Air M2", stock: 23, category: "Electronics", price: 1199 },
]

interface Row {
  key: string
  rank: number
  name: string
  subtitle: string
  primaryValue: string
  secondaryValue: string
  stockForBadge: number
}

function buildRowsFromCv(): Row[] | null {
  const items = getTopShelfItems(5)
  if (items.length === 0) return null
  return items.map((item, index) => ({
    key: item.label,
    rank: index + 1,
    name: item.label,
    subtitle: "Detected on shelf",
    primaryValue: `${item.count} detections`,
    secondaryValue: `last frame ${item.last_seen_frame}`,
    stockForBadge: item.count,
  }))
}

function buildRowsFromDemo(): Row[] {
  return demoProducts.map((p, index) => ({
    key: p.id,
    rank: index + 1,
    name: p.name,
    subtitle: p.category,
    primaryValue: `${p.stock} units`,
    secondaryValue: `$${p.price}`,
    stockForBadge: p.stock,
  }))
}

export function TopProductsCard() {
  const cvRows = buildRowsFromCv()
  const rows = cvRows ?? buildRowsFromDemo()
  const isLive = cvRows !== null

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold text-foreground">
          Top 5 Products
        </CardTitle>
        {isLive ? (
          <Badge variant="secondary" className="gap-1">
            <Camera className="h-3 w-3" />
            Live from CCTV
          </Badge>
        ) : (
          <Badge variant="outline">Demo data</Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rows.map((row) => (
            <div
              key={row.key}
              className="flex items-center justify-between p-3 rounded-lg border bg-background"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    {row.rank}
                  </span>
                  <div>
                    <h4 className="font-medium text-foreground">{row.name}</h4>
                    <p className="text-sm text-muted-foreground">{row.subtitle}</p>
                  </div>
                </div>
              </div>
              <div className="text-right flex items-center gap-3">
                <div>
                  <p className="font-semibold text-foreground">{row.primaryValue}</p>
                  <p className="text-sm text-muted-foreground">{row.secondaryValue}</p>
                </div>
                <StockStatusBadge stock={row.stockForBadge} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
