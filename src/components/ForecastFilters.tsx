import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, MapPin, Package } from "lucide-react"

export const ForecastFilters = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Filter className="h-4 w-4" />
            Filters:
          </div>
          
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <Select defaultValue="all-categories">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Product Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                <SelectItem value="fresh-produce">Fresh Produce</SelectItem>
                <SelectItem value="dairy">Dairy & Eggs</SelectItem>
                <SelectItem value="meat-seafood">Meat & Seafood</SelectItem>
                <SelectItem value="bakery">Bakery</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
                <SelectItem value="snacks">Snacks & Candy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <Select defaultValue="all-regions">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-regions">All Regions</SelectItem>
                <SelectItem value="northeast">Northeast</SelectItem>
                <SelectItem value="southeast">Southeast</SelectItem>
                <SelectItem value="midwest">Midwest</SelectItem>
                <SelectItem value="southwest">Southwest</SelectItem>
                <SelectItem value="west">West</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2 ml-auto">
            <Badge variant="secondary">Fresh Produce</Badge>
            <Badge variant="secondary">All Regions</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}