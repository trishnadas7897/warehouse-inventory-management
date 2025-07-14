import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Truck, Clock, MapPin } from "lucide-react"

const deliveryOrders = [
  {
    id: "ORD-001",
    destination: "123 Main St, Manhattan",
    eta: "2:30 PM",
    status: "in-transit",
    driver: "John Smith",
    items: 5,
    distance: "2.3 mi"
  },
  {
    id: "ORD-002", 
    destination: "456 Oak Ave, Brooklyn",
    eta: "3:15 PM",
    status: "pending",
    driver: "Unassigned",
    items: 3,
    distance: "4.1 mi"
  },
  {
    id: "ORD-003",
    destination: "789 Pine Rd, Queens",
    eta: "1:45 PM",
    status: "delivered",
    driver: "Sarah Johnson",
    items: 8,
    distance: "3.7 mi"
  },
  {
    id: "ORD-004",
    destination: "321 Elm St, Bronx",
    eta: "4:00 PM", 
    status: "pending",
    driver: "Unassigned",
    items: 2,
    distance: "5.2 mi"
  },
  {
    id: "ORD-005",
    destination: "654 Cedar Dr, Staten Island",
    eta: "3:45 PM",
    status: "in-transit",
    driver: "Mike Wilson",
    items: 6,
    distance: "7.8 mi"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "secondary"
    case "in-transit":
      return "default"
    default:
      return "destructive"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return "✓"
    case "in-transit":
      return "🚛"
    default:
      return "⏳"
  }
}

export const DeliveryTable = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            Active Deliveries
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MapPin className="h-4 w-4 mr-2" />
              Optimize Route
            </Button>
            <Button size="sm">
              Assign to Driver
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveryOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate max-w-[200px]" title={order.destination}>
                      {order.destination}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{order.driver}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {order.eta}
                  </div>
                </TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.distance}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(order.status)} className="capitalize">
                    {getStatusIcon(order.status)} {order.status.replace('-', ' ')}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}