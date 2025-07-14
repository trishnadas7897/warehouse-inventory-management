
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, CheckCircle, Package, Bell } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface StockAlert {
  id: string
  productName: string
  currentStock: number
  threshold: number
  timestamp: Date
  status: 'critical' | 'resolved' | 'snoozed'
  type: 'low-stock' | 'out-of-stock'
}

const mockAlerts: StockAlert[] = [
  {
    id: "1",
    productName: "Organic Bananas",
    currentStock: 12,
    threshold: 20,
    timestamp: new Date(Date.now() - 5 * 60000),
    status: 'critical',
    type: 'low-stock'
  },
  {
    id: "2", 
    productName: "Whole Milk 1L",
    currentStock: 0,
    threshold: 15,
    timestamp: new Date(Date.now() - 15 * 60000),
    status: 'critical',
    type: 'out-of-stock'
  },
  {
    id: "3",
    productName: "White Bread",
    currentStock: 8,
    threshold: 25,
    timestamp: new Date(Date.now() - 30 * 60000),
    status: 'snoozed',
    type: 'low-stock'
  },
  {
    id: "4",
    productName: "Ground Beef",
    currentStock: 25,
    threshold: 20,
    timestamp: new Date(Date.now() - 45 * 60000),
    status: 'resolved',
    type: 'low-stock'
  }
]

export function StockAlertPanel() {
  const [alerts, setAlerts] = useState<StockAlert[]>(mockAlerts)
  const { toast } = useToast()

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAlert: StockAlert = {
        id: Date.now().toString(),
        productName: `Product ${Math.floor(Math.random() * 100)}`,
        currentStock: Math.floor(Math.random() * 15),
        threshold: 20,
        timestamp: new Date(),
        status: 'critical',
        type: Math.random() > 0.7 ? 'out-of-stock' : 'low-stock'
      }
      
      if (Math.random() > 0.7) {
        setAlerts(prev => [randomAlert, ...prev.slice(0, 9)])
        toast({
          title: "New Stock Alert",
          description: `${randomAlert.productName} is ${randomAlert.type === 'out-of-stock' ? 'out of stock' : 'low in stock'}`,
          variant: "destructive"
        })
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [toast])

  const handleRestock = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' as const }
        : alert
    ))
    toast({
      title: "Restock Initiated",
      description: "Restock order has been placed successfully"
    })
  }

  const handleSnooze = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'snoozed' as const }
        : alert
    ))
    toast({
      title: "Alert Snoozed",
      description: "Alert will reappear in 30 minutes"
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4" />
      case 'snoozed':
        return <Clock className="h-4 w-4" />
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'destructive'
      case 'resolved':
        return 'default'
      case 'snoozed':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const criticalAlerts = alerts.filter(alert => alert.status === 'critical')
  const allAlerts = alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  return (
    <div className="space-y-6">
      {/* Active Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Bell className="h-5 w-5 text-destructive" />
            Active Stock Alerts
            {criticalAlerts.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {criticalAlerts.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {criticalAlerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-success" />
              <p className="text-lg font-medium">All Good!</p>
              <p className="text-sm">No active stock alerts at the moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {criticalAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-background hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-destructive/10">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        {alert.productName} {alert.type === 'out-of-stock' ? 'out of stock' : 'low in stock'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {alert.type === 'out-of-stock' 
                          ? 'No units remaining' 
                          : `${alert.currentStock} units left (threshold: ${alert.threshold})`
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {alert.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleRestock(alert.id)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Restock Now
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSnooze(alert.id)}
                    >
                      Snooze
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Log Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Notification Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {allAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-3 border rounded-lg bg-background"
              >
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={getStatusColor(alert.status)}
                    className="flex items-center gap-1"
                  >
                    {getStatusIcon(alert.status)}
                    {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                  </Badge>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {alert.productName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {alert.type === 'out-of-stock' 
                        ? 'Out of stock alert' 
                        : `Low stock: ${alert.currentStock} units`
                      }
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    {alert.timestamp.toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {alert.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
