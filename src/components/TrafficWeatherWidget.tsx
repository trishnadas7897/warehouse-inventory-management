import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Thermometer, Wind, Navigation, AlertTriangle } from "lucide-react"

export const TrafficWeatherWidget = () => {
  return (
    <div className="space-y-4">
      {/* Weather Card */}
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Cloud className="h-5 w-5 text-primary" />
            Weather Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Temperature</span>
            </div>
            <span className="font-medium">72°F</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Wind Speed</span>
            </div>
            <span className="font-medium">8 mph</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Conditions</span>
            </div>
            <Badge variant="secondary">Partly Cloudy</Badge>
          </div>
          
          <div className="pt-2 border-t">
            <div className="text-xs text-muted-foreground">
              Impact on delivery: Favorable conditions
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Traffic Card */}
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Navigation className="h-5 w-5 text-primary" />
            Traffic Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Manhattan</span>
              <Badge variant="destructive">Heavy</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Brooklyn</span>
              <Badge variant="outline">Moderate</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Queens</span>
              <Badge variant="secondary">Light</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Bronx</span>
              <Badge variant="secondary">Light</Badge>
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-xs text-muted-foreground">
                2 active incidents affecting routes
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}