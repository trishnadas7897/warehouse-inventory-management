import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Brain, Calendar, TrendingUp, CloudRain, Snowflake, Sun } from "lucide-react"

const aiFactors = {
  holidays: [
    { name: "Christmas", impact: "High", daysAway: 12, trend: "+45%" },
    { name: "New Year", impact: "Medium", daysAway: 19, trend: "+20%" },
  ],
  trends: [
    { name: "Health Foods", impact: "High", change: "+28%" },
    { name: "Organic Products", impact: "Medium", change: "+15%" },
    { name: "Plant-based", impact: "Medium", change: "+22%" },
  ],
  weather: [
    { condition: "Cold Front", impact: "High", effect: "Hot beverages ↑" },
    { condition: "Rain Expected", impact: "Medium", effect: "Comfort foods ↑" },
  ]
}

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "High":
      return "destructive"
    case "Medium":
      return "outline"
    default:
      return "secondary"
  }
}

export const AIFactorsSidebar = () => {
  return (
    <div className="w-80 space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5 text-primary" />
            AI Factors
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Key factors influencing demand predictions
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Holidays */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">Upcoming Holidays</span>
            </div>
            <div className="space-y-2">
              {aiFactors.holidays.map((holiday, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{holiday.name}</p>
                    <p className="text-muted-foreground text-xs">{holiday.daysAway} days away</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={getImpactColor(holiday.impact)} className="text-xs">
                      {holiday.impact}
                    </Badge>
                    <p className="text-success text-xs mt-1">{holiday.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Trends */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">Market Trends</span>
            </div>
            <div className="space-y-2">
              {aiFactors.trends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{trend.name}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={getImpactColor(trend.impact)} className="text-xs">
                      {trend.impact}
                    </Badge>
                    <p className="text-success text-xs mt-1">{trend.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Weather */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CloudRain className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">Weather Impact</span>
            </div>
            <div className="space-y-2">
              {aiFactors.weather.map((weather, index) => (
                <div key={index} className="text-sm">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium flex items-center gap-1">
                      {weather.condition === "Cold Front" && <Snowflake className="h-3 w-3" />}
                      {weather.condition === "Rain Expected" && <CloudRain className="h-3 w-3" />}
                      {weather.condition}
                    </p>
                    <Badge variant={getImpactColor(weather.impact)} className="text-xs">
                      {weather.impact}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-xs">{weather.effect}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-primary">94.2%</div>
            <div className="text-sm text-muted-foreground">Overall AI Accuracy</div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-[94%]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}