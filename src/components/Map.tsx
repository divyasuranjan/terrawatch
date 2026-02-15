"use client";

import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function CenterView({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
  useMemo(() => {
    map.setView([lat, lon], 10);
  }, [map, lat, lon]);
  return null;
}

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function Map({ lat, lon, name }: { lat: number; lon: number; name: string }) {
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={10}
      className="w-full h-full"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CenterView lat={lat} lon={lon} />
      <Marker position={[lat, lon]} icon={icon}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
}
