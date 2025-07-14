import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Zap, Route, Timer, TrendingDown } from "lucide-react"

export const RouteOptimizer = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Zap className="h-5 w-5 text-primary" />
          Route Optimizer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Route Efficiency</span>
            <span className="font-medium">78%</span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full w-[78%]" />
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="font-medium text-sm">Optimization Suggestions</h4>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Route className="h-4 w-4 text-success" />
              <span>Reorder 3 stops in Brooklyn</span>
              <Badge variant="secondary" className="ml-auto text-xs">-15 min</Badge>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Timer className="h-4 w-4 text-success" />
              <span>Avoid Manhattan rush hour</span>
              <Badge variant="secondary" className="ml-auto text-xs">-25 min</Badge>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <TrendingDown className="h-4 w-4 text-success" />
              <span>Combine 2 nearby deliveries</span>
              <Badge variant="secondary" className="ml-auto text-xs">-8 min</Badge>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated Savings</span>
            <span className="font-medium text-success">48 minutes</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fuel Reduction</span>
            <span className="font-medium text-success">12%</span>
          </div>
        </div>

        <Button className="w-full" size="sm">
          <Zap className="h-4 w-4 mr-2" />
          Apply Optimization
        </Button>
      </CardContent>
    </Card>
  )
}