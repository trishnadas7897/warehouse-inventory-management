import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const forecastData = [
  { month: "Jan", predicted: 120, actual: 115 },
  { month: "Feb", predicted: 135, actual: 142 },
  { month: "Mar", predicted: 155, actual: 148 },
  { month: "Apr", predicted: 180, actual: 175 },
  { month: "May", predicted: 200, actual: 195 },
  { month: "Jun", predicted: 220, actual: null },
  { month: "Jul", predicted: 240, actual: null },
  { month: "Aug", predicted: 255, actual: null },
]

export function RestockForecastChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Restock Forecast
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Predicted inventory needs for the upcoming months
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="month" 
                className="text-muted-foreground"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                className="text-muted-foreground"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                name="Actual Orders"
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 3 }}
                name="Predicted Orders"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}