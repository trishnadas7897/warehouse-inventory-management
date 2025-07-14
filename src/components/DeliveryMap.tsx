import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"

interface DeliveryMapProps {
  mapboxToken: string;
}

const deliveryPoints = [
  { id: 1, lng: -74.006, lat: 40.7128, status: 'pending', address: '123 Main St' },
  { id: 2, lng: -74.0059, lat: 40.7130, status: 'in-transit', address: '456 Oak Ave' },
  { id: 3, lng: -74.0061, lat: 40.7126, status: 'delivered', address: '789 Pine Rd' },
  { id: 4, lng: -74.0063, lat: 40.7132, status: 'pending', address: '321 Elm St' },
]

export const DeliveryMap: React.FC<DeliveryMapProps> = ({ mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      zoom: 14,
      center: [-74.006, 40.7128], // NYC coordinates
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add delivery points
    map.current.on('load', () => {
      deliveryPoints.forEach((point) => {
        const el = document.createElement('div');
        el.className = 'delivery-marker';
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = '50%';
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
        
        switch (point.status) {
          case 'delivered':
            el.style.backgroundColor = 'hsl(var(--success))';
            break;
          case 'in-transit':
            el.style.backgroundColor = 'hsl(var(--primary))';
            break;
          default:
            el.style.backgroundColor = 'hsl(var(--destructive))';
        }

        new mapboxgl.Marker(el)
          .setLngLat([point.lng, point.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="p-2">
                  <h4 class="font-semibold">Order #${point.id}</h4>
                  <p class="text-sm text-gray-600">${point.address}</p>
                  <p class="text-sm capitalize font-medium">${point.status}</p>
                </div>
              `)
          )
          .addTo(map.current!);
      });
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  if (!mapboxToken) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Delivery Routes Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Enter Mapbox token to view live map</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5 text-primary" />
          Delivery Routes Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapContainer} className="h-[400px] rounded-lg overflow-hidden" />
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