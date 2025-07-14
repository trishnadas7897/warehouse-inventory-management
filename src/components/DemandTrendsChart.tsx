import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

const demandData = [
  { week: "W1", actual: 450, predicted: 435, confidence: 92 },
  { week: "W2", actual: 380, predicted: 390, confidence: 89 },
  { week: "W3", actual: 520, predicted: 510, confidence: 94 },
  { week: "W4", actual: 410, predicted: 425, confidence: 88 },
  { week: "W5", actual: 600, predicted: 590, confidence: 91 },
  { week: "W6", actual: null, predicted: 580, confidence: 87 },
  { week: "W7", actual: null, predicted: 620, confidence: 85 },
  { week: "W8", actual: null, predicted: 640, confidence: 83 },
]

const chartConfig = {
  actual: {
    label: "Actual Demand",
    color: "hsl(var(--primary))",
  },
  predicted: {
    label: "Predicted Demand",
    color: "hsl(var(--success))",
  },
}

export const DemandTrendsChart = () => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Weekly Demand Trends
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            AI-powered demand prediction with confidence intervals
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-success">+12%</p>
          <p className="text-sm text-muted-foreground">vs last month</p>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={demandData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
              <XAxis 
                dataKey="week" 
                axisLine={false}
                tickLine={false}
                className="text-sm"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-sm"
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                labelFormatter={(value) => `Week ${value}`}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}