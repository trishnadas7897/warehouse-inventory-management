import { DeliveryMap } from "@/components/DeliveryMap"
import { DeliveryTable } from "@/components/DeliveryTable"
import { TrafficWeatherWidget } from "@/components/TrafficWeatherWidget"
import { RouteOptimizer } from "@/components/RouteOptimizer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DriversPanel } from "@/components/DriversPanel"
import { DeliveryAnalytics } from "@/components/DeliveryAnalytics"

const Logistics = () => {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Delivery Logistics</h1>
        <p className="text-muted-foreground">
          Optimize last-mile delivery routes and track real-time performance
        </p>
      </div>

      <Tabs defaultValue="routes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="routes" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <DeliveryMap />
              <DeliveryTable />
            </div>
            <div className="space-y-6">
              <TrafficWeatherWidget />
              <RouteOptimizer />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="drivers">
          <DriversPanel />
        </TabsContent>
        
        <TabsContent value="analytics">
          <DeliveryAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Logistics;