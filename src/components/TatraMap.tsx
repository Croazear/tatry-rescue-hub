import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Rescuer, Zone } from "@/types/rescue";

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

interface Props {
  rescuers: Rescuer[];
  zones: Zone[];
}

// Zone visualization circles
const zoneCircles = [
  { center: [49.232, 19.981] as [number, number], radius: 2500, color: "hsl(280 80% 55%)", label: "Szczyty (>2000m)" },
  { center: [49.225, 19.99] as [number, number], radius: 4500, color: "hsl(0 72% 51%)", label: "Turnie (1500-2000m)" },
  { center: [49.235, 19.99] as [number, number], radius: 7000, color: "hsl(38 92% 50%)", label: "Hale (1000-1500m)" },
  { center: [49.24, 19.98] as [number, number], radius: 10000, color: "hsl(142 71% 45%)", label: "Doliny (<1000m)" },
];

const CENTER: [number, number] = [49.23, 19.98];

export function TatraMap({ rescuers, zones }: Props) {
  return (
    <div className="glass-card p-4">
      <div className="rounded-lg overflow-hidden" style={{ height: 500 }}>
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

          {zoneCircles.map((z, i) => (
            <Circle
              key={i}
              center={z.center}
              radius={z.radius}
              pathOptions={{
                color: z.color,
                fillColor: z.color,
                fillOpacity: 0.06,
                weight: 1,
              }}
            />
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
