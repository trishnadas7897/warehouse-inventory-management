import { useState } from "react"
import { DeliveryMap } from "@/components/DeliveryMap"
import { DeliveryTable } from "@/components/DeliveryTable"
import { TrafficWeatherWidget } from "@/components/TrafficWeatherWidget"
import { RouteOptimizer } from "@/components/RouteOptimizer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DriversPanel } from "@/components/DriversPanel"
import { DeliveryAnalytics } from "@/components/DeliveryAnalytics"

const Logistics = () => {
  const [mapboxToken, setMapboxToken] = useState("")

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Delivery Logistics</h1>
        <p className="text-muted-foreground">
          Optimize last-mile delivery routes and track real-time performance
        </p>
      </div>

      {!mapboxToken && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800 mb-2">
            Please enter your Mapbox public token to enable the interactive map.
            Get your token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a>
          </p>
          <input
            type="text"
            placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJ5b3VyLXRva2VuIn0..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      )}
      
      <Tabs defaultValue="routes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="routes" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <DeliveryMap mapboxToken={mapboxToken} />
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