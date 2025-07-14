import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { TrendingUp, Clock, Truck, MapPin } from "lucide-react"

const deliveryTrends = [
  { time: "9 AM", deliveries: 12, onTime: 95 },
  { time: "10 AM", deliveries: 18, onTime: 92 },
  { time: "11 AM", deliveries: 25, onTime: 88 },
  { time: "12 PM", deliveries: 32, onTime: 85 },
  { time: "1 PM", deliveries: 28, onTime: 90 },
  { time: "2 PM", deliveries: 35, onTime: 87 },
  { time: "3 PM", deliveries: 42, onTime: 83 },
  { time: "4 PM", deliveries: 38, onTime: 86 },
  { time: "5 PM", deliveries: 30, onTime: 89 },
]

const areaPerformance = [
  { area: "Manhattan", deliveries: 145, avgTime: 25, satisfaction: 4.2 },
  { area: "Brooklyn", deliveries: 132, avgTime: 22, satisfaction: 4.5 },
  { area: "Queens", deliveries: 98, avgTime: 28, satisfaction: 4.3 },
  { area: "Bronx", deliveries: 87, avgTime: 24, satisfaction: 4.4 },
  { area: "Staten Island", deliveries: 56, avgTime: 32, satisfaction: 4.6 },
]

const chartConfig = {
  deliveries: {
    label: "Deliveries",
    color: "hsl(var(--primary))",
  },
  onTime: {
    label: "On-Time %",
    color: "hsl(var(--success))",
  },
}

export const DeliveryAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Total Deliveries</span>
            </div>
            <div className="text-2xl font-bold mt-2">1,247</div>
            <div className="text-sm text-success">+12% vs yesterday</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Avg Delivery Time</span>
            </div>
            <div className="text-2xl font-bold mt-2">26 min</div>
            <div className="text-sm text-success">-3% vs yesterday</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">On-Time Rate</span>
            </div>
            <div className="text-2xl font-bold mt-2">87.3%</div>
            <div className="text-sm text-success">+2.1% vs yesterday</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Satisfaction</span>
            </div>
            <div className="text-2xl font-bold mt-2">4.4⭐</div>
            <div className="text-sm text-success">+0.2 vs yesterday</div>
          </CardContent>
        </Card>
      </div>

      {/* Delivery Trends Chart */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Hourly Delivery Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={deliveryTrends}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar yAxisId="left" dataKey="deliveries" fill="hsl(var(--primary))" />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="onTime" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Area Performance */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Performance by Area
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={areaPerformance}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                <XAxis dataKey="area" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="deliveries" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}