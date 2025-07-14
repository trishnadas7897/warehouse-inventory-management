import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle, TrendingUp, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Products",
    value: "1,248",
    change: "+12%",
    changeType: "positive" as const,
    icon: Package,
  },
  {
    title: "Low Stock Alerts",
    value: "23",
    change: "+5",
    changeType: "negative" as const,
    icon: AlertTriangle,
  },
  {
    title: "Restock Orders",
    value: "156",
    change: "+8%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Inventory Value",
    value: "$2.4M",
    change: "+15%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
]

export function StockOverviewCards() {
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
              stat.changeType === 'positive' 
                ? 'text-success' 
                : 'text-destructive'
            }`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}