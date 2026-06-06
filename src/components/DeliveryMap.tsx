import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "lucide-react"

// Zero-token map: Leaflet + OpenStreetMap tiles. No API key required, so a
// fresh clone "just works" with no environment setup (replaces the previous
// Mapbox GL integration that needed a public token pasted at runtime).

interface DeliveryPoint {
  id: number;
  lat: number;
  lng: number;
  status: 'pending' | 'in-transit' | 'delivered';
  address: string;
}

const deliveryPoints: DeliveryPoint[] = [
  { id: 1, lat: 40.7128, lng: -74.006, status: 'pending', address: '123 Main St' },
  { id: 2, lat: 40.7130, lng: -74.0059, status: 'in-transit', address: '456 Oak Ave' },
  { id: 3, lat: 40.7126, lng: -74.0061, status: 'delivered', address: '789 Pine Rd' },
  { id: 4, lat: 40.7132, lng: -74.0063, status: 'pending', address: '321 Elm St' },
]

// Concrete colors mirroring the theme tokens (--success / --primary /
// --destructive). Leaflet draws into SVG presentation attributes, which do not
// resolve CSS var(), so the literal HSL values are used here.
const statusColor: Record<DeliveryPoint['status'], string> = {
  delivered: 'hsl(142, 71%, 45%)',   // success - green
  'in-transit': 'hsl(207, 100%, 40%)', // primary - Walmart blue
  pending: 'hsl(0, 85%, 60%)',       // destructive - red
}

const NYC: [number, number] = [40.7128, -74.006];

export const DeliveryMap: React.FC = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5 text-primary" />
          Delivery Routes Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] rounded-lg overflow-hidden">
          <MapContainer center={NYC} zoom={14} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline
              positions={deliveryPoints.map((p) => [p.lat, p.lng] as [number, number])}
              pathOptions={{ color: 'hsl(207, 100%, 40%)', weight: 2, opacity: 0.6, dashArray: '5 6' }}
            />
            {deliveryPoints.map((point) => (
              <CircleMarker
                key={point.id}
                center={[point.lat, point.lng]}
                radius={9}
                pathOptions={{
                  color: 'white',
                  weight: 3,
                  fillColor: statusColor[point.status],
                  fillOpacity: 1,
                }}
              >
                <Popup>
                  <div className="p-1">
                    <h4 className="font-semibold">Order #{point.id}</h4>
                    <p className="text-sm text-gray-600">{point.address}</p>
                    <p className="text-sm capitalize font-medium">{point.status}</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span>In Transit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span>Delivered</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
