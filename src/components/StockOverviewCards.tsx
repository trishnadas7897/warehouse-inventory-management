import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle, TrendingUp, DollarSign, Boxes, Warehouse, Video } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  getCvCounts,
  getTotalShelfItems,
  getTotalWarehouseBoxes,
} from "@/data/cv_counts"

interface Stat {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative"
  icon: LucideIcon
}

// Demo tiles - shown only when the CV pipeline has produced no detections yet
// (empty cv_counts.json). Kept so a fresh clone still renders a populated
// dashboard.
const demoStats: Stat[] = [
  { title: "Total Products", value: "1,248", change: "+12%", changeType: "positive", icon: Package },
  { title: "Low Stock Alerts", value: "23", change: "+5", changeType: "negative", icon: AlertTriangle },
  { title: "Restock Orders", value: "156", change: "+8%", changeType: "positive", icon: TrendingUp },
  { title: "Inventory Value", value: "$2.4M", change: "+15%", changeType: "positive", icon: DollarSign },
]

// Live tiles derived from the YOLOv8 + Tesseract pipeline's cv_counts.json.
// NOTE on honesty: shelf `count` is a per-frame detection tally, not a unique
// carton count, so the headline number is labelled "Shelf Detections" - not
// "Total Products" - to avoid overstating what the CV pipeline measures.
function buildLiveStats(): Stat[] {
  const cv = getCvCounts()
  return [
    {
      title: "Shelf Detections",
      value: getTotalShelfItems().toLocaleString(),
      change: "source: CCTV",
      changeType: "positive",
      icon: Package,
    },
    {
      title: "Distinct Products",
      value: cv.shelf_items.length.toLocaleString(),
      change: "source: CCTV",
      changeType: "positive",
      icon: Boxes,
    },
    {
      title: "Warehouse Boxes",
      value: getTotalWarehouseBoxes().toLocaleString(),
      change: "source: CCTV",
      changeType: "positive",
      icon: Warehouse,
    },
    {
      title: "Frames Processed",
      value: cv.total_frames_processed.toLocaleString(),
      change: "source: CCTV",
      changeType: "positive",
      icon: Video,
    },
  ]
}

export function StockOverviewCards() {
  const cv = getCvCounts()
  const hasCv = cv.shelf_items.length > 0 || cv.warehouse_boxes.length > 0
  const stats = hasCv ? buildLiveStats() : demoStats

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className={`text-xs ${
              hasCv
                ? 'text-muted-foreground'
                : stat.changeType === 'positive'
                  ? 'text-success'
                  : 'text-destructive'
            }`}>
              {hasCv ? stat.change : `${stat.change} from last month`}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
