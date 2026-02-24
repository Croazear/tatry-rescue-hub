import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Rescuer, Incident } from "@/types/rescue";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const createColorIcon = (color: string) =>
  L.divIcon({
    className: "",
    html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid hsl(220 20% 10%);box-shadow:0 0 6px ${color}80;"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

const incidentIcon = L.divIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:50%;background:hsl(0 72% 51%);border:2px solid #fff;box-shadow:0 0 10px hsl(0 72% 51% / 0.6);animation:pulse 2s infinite;"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

interface Props {
  rescuers: Rescuer[];
  incidents: Incident[];
}

const CENTER: [number, number] = [49.235, 19.98];

export function DashboardMap({ rescuers, incidents }: Props) {
  return (
    <div className="glass-card p-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Mapa operacyjna
      </h3>
      <div className="rounded-lg overflow-hidden" style={{ height: 400 }}>
        <MapContainer
          center={CENTER}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {incidents.map((inc) => (
            <Marker key={inc.id} position={[inc.lat, inc.lng]} icon={incidentIcon}>
              <Popup>
                <strong>{inc.title}</strong>
                <br />
                {inc.location}
              </Popup>
            </Marker>
          ))}

          {rescuers.map((r) => {
            if (r.lat === 0) return null;
            return (
              <Marker key={r.id} position={[r.lat, r.lng]} icon={createColorIcon(r.color)}>
                <Popup>
                  <strong>{r.name}</strong>
                  <br />
                  {r.role} — {r.zone}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
