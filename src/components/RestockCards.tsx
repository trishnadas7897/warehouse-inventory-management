import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Clock, AlertTriangle } from "lucide-react"

const restockData = [
  {
    id: 1,
    name: "Organic Bananas",
    currentStock: 45,
    restockInDays: 3,
    confidence: 94,
    urgency: "medium",
    demandTrend: "+15%"
  },
  {
    id: 2,
    name: "Whole Milk 1L",
    currentStock: 12,
    restockInDays: 1,
    confidence: 97,
    urgency: "high",
    demandTrend: "+8%"
  },
  {
    id: 3,
    name: "White Bread",
    currentStock: 28,
    restockInDays: 5,
    confidence: 89,
    urgency: "low",
    demandTrend: "+3%"
  },
  {
    id: 4,
    name: "Ground Beef",
    currentStock: 8,
    restockInDays: 2,
    confidence: 92,
    urgency: "high",
    demandTrend: "+22%"
  },
  {
    id: 5,
    name: "Orange Juice",
    currentStock: 35,
    restockInDays: 7,
    confidence: 85,
    urgency: "low",
    demandTrend: "-2%"
  },
  {
    id: 6,
    name: "Potato Chips",
    currentStock: 67,
    restockInDays: 6,
    confidence: 91,
    urgency: "low",
    demandTrend: "+12%"
  }
]

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "high":
      return "destructive"
    case "medium":
      return "outline"
    default:
      return "secondary"
  }
}

const getUrgencyIcon = (urgency: string) => {
  switch (urgency) {
    case "high":
      return <AlertTriangle className="h-4 w-4" />
    case "medium":
      return <Clock className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

export const RestockCards = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Restock Recommendations</h2>
        <Badge variant="outline" className="text-muted-foreground">
          AI Confidence: 92% avg
        </Badge>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {restockData.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <span className="truncate">{item.name}</span>
                <Badge variant={getUrgencyColor(item.urgency)} className="ml-2">
                  {getUrgencyIcon(item.urgency)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current Stock</span>
                <span className="font-medium">{item.currentStock} units</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Restock in</span>
                <span className="font-bold text-primary">{item.restockInDays} days</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Demand Trend</span>
                <span className={`font-medium ${item.demandTrend.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                  {item.demandTrend}
                </span>
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">AI Confidence</span>
                  <span className="text-xs font-medium">{item.confidence}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all" 
                    style={{ width: `${item.confidence}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}