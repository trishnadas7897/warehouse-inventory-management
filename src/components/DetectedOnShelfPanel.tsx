import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, ScanLine } from "lucide-react"
import { getTopShelfItems, getCvCounts } from "@/data/cv_counts"

// Second live surface for the CV handoff: the full detected-on-shelf list with
// per-label detection counts and the last frame each label was seen in. Reads
// the same cv_counts.json contract as TopProductsCard and StockOverviewCards.
// Renders nothing when the export is empty (no pipeline run yet).
export function DetectedOnShelfPanel() {
  const items = getTopShelfItems(8)
  if (items.length === 0) return null

  const cv = getCvCounts()
  const maxCount = items[0]?.count ?? 1

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">
            Detected on Shelf
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Per-label detections from {cv.source_video} ({cv.total_frames_processed.toLocaleString()} frames)
          </p>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Camera className="h-3 w-3" />
          Live from CCTV
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-foreground">
                  <ScanLine className="h-4 w-4 text-primary" />
                  {item.label}
                </span>
                <span className="text-muted-foreground">
                  {item.count} detections
                  <span className="ml-2 text-xs">last frame {item.last_seen_frame}</span>
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${Math.round((item.count / maxCount) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
