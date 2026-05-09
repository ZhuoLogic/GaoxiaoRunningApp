import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';

export type LatLngPoint = {
  lat: number;
  lng: number;
};

const FitRouteBounds: React.FC<{ route: LatLngPoint[] }> = ({ route }) => {
  const map = useMap();

  useEffect(() => {
    if (route.length < 2) return;

    const bounds = L.latLngBounds(route.map(p => [p.lat, p.lng]));
    map.fitBounds(bounds, {
      padding: [36, 36],
      maxZoom: 18,
    });
  }, [route, map]);

  return null;
};

type ExerciseRouteMapProps = {
  route: LatLngPoint[];
  currentIndex?: number;
  isFinished?: boolean;
};

const ExerciseRouteMap: React.FC<ExerciseRouteMapProps> = ({
  route,
  currentIndex,
  isFinished = false,
}) => {
  const safeRoute = route.length > 0
    ? route
    : [{ lat: 31.22967, lng: 121.40385 }];

  const safeCurrentIndex =
    typeof currentIndex === 'number'
      ? Math.min(Math.max(currentIndex, 0), safeRoute.length - 1)
      : safeRoute.length - 1;

  const visibleRoute = isFinished
    ? safeRoute
    : safeRoute.slice(0, safeCurrentIndex + 1);

  const start = safeRoute[0];
  const current = safeRoute[safeCurrentIndex];
  const end = safeRoute[safeRoute.length - 1];

  return (
    <MapContainer
      center={[current.lat, current.lng]}
      zoom={17}
      zoomControl={false}
      attributionControl={false}
      className="w-full h-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {visibleRoute.length >= 2 && (
        <>
          <Polyline
            positions={visibleRoute.map(p => [p.lat, p.lng])}
            pathOptions={{
              color: '#10b981',
              weight: 6,
              opacity: 0.95,
            }}
          />
          <FitRouteBounds route={isFinished ? safeRoute : visibleRoute} />
        </>
      )}

      {/* 起点 */}
      <CircleMarker
        center={[start.lat, start.lng]}
        radius={8}
        pathOptions={{
          color: '#ffffff',
          fillColor: '#10b981',
          fillOpacity: 1,
          weight: 3,
        }}
      />

      {/* 终点，仅结算页显示 */}
      {isFinished && (
        <CircleMarker
          center={[end.lat, end.lng]}
          radius={8}
          pathOptions={{
            color: '#ffffff',
            fillColor: '#f59e0b',
            fillOpacity: 1,
            weight: 3,
          }}
        />
      )}

      {/* 当前点 */}
      {!isFinished && (
        <CircleMarker
          center={[current.lat, current.lng]}
          radius={11}
          pathOptions={{
            color: '#ffffff',
            fillColor: '#ef4444',
            fillOpacity: 1,
            weight: 3,
          }}
        />
      )}
    </MapContainer>
  );
};

export default ExerciseRouteMap;