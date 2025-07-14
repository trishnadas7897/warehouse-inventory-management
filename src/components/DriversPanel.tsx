import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User, Truck, Clock, MapPin, Phone } from "lucide-react"

const drivers = [
  {
    id: 1,
    name: "John Smith",
    status: "active",
    vehicle: "Van-001",
    location: "Manhattan",
    deliveries: 3,
    completion: 8,
    rating: 4.8,
    eta: "2:30 PM"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    status: "active", 
    vehicle: "Truck-002",
    location: "Brooklyn",
    deliveries: 5,
    completion: 12,
    rating: 4.9,
    eta: "3:15 PM"
  },
  {
    id: 3,
    name: "Mike Wilson",
    status: "active",
    vehicle: "Van-003", 
    location: "Queens",
    deliveries: 2,
    completion: 6,
    rating: 4.7,
    eta: "4:00 PM"
  },
  {
    id: 4,
    name: "Lisa Chen",
    status: "break",
    vehicle: "Truck-004",
    location: "Bronx",
    deliveries: 0,
    completion: 9,
    rating: 4.9,
    eta: "1:00 PM"
  },
  {
    id: 5,
    name: "David Brown",
    status: "offline",
    vehicle: "Van-005",
    location: "Staten Island",
    deliveries: 0,
    completion: 7,
    rating: 4.6,
    eta: "Off Duty"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "secondary"
    case "break":
      return "outline"
    default:
      return "destructive"
  }
}

export const DriversPanel = () => {
  return (
    <div className="space-y-6">
      {/* Driver Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">8</div>
            <div className="text-sm text-muted-foreground">Total Drivers</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">5</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">2</div>
            <div className="text-sm text-muted-foreground">On Break</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">1</div>
            <div className="text-sm text-muted-foreground">Offline</div>
          </CardContent>
        </Card>
      </div>

      {/* Drivers Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Driver Management
            </div>
            <Button size="sm">
              Add Driver
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Active Deliveries</TableHead>
                <TableHead>Completed Today</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{driver.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(driver.status)} className="capitalize">
                      {driver.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      {driver.vehicle}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {driver.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <span className="font-medium">{driver.deliveries}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <span className="font-medium">{driver.completion}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">⭐</span>
                      <span className="font-medium">{driver.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {driver.eta}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}