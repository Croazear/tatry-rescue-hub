import { useEffect, useRef } from "react";
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
  html: `<div style="width:16px;height:16px;border-radius:50%;background:hsl(0 72% 51%);border:2px solid #fff;box-shadow:0 0 10px hsl(0 72% 51% / 0.6);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const zoneCircles = [
  { center: [49.232, 19.981] as [number, number], radius: 2500, color: "hsl(280 80% 55%)" },
  { center: [49.225, 19.99] as [number, number], radius: 4500, color: "hsl(0 72% 51%)" },
  { center: [49.235, 19.99] as [number, number], radius: 7000, color: "hsl(38 92% 50%)" },
  { center: [49.24, 19.98] as [number, number], radius: 10000, color: "hsl(142 71% 45%)" },
];

interface Props {
  rescuers: Rescuer[];
  incidents: Incident[];
}

const CENTER: [number, number] = [49.235, 19.98];

export function DashboardMap({ rescuers, incidents }: Props) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const overlaysRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) return;

    const map = L.map(mapElementRef.current, {
      center: CENTER,
      zoom: 12,
      scrollWheelZoom: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    overlaysRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    setTimeout(() => map.invalidateSize(), 0);

    return () => {
      map.remove();
      mapRef.current = null;
      overlaysRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !overlaysRef.current) return;

    const overlays = overlaysRef.current;
    overlays.clearLayers();

    zoneCircles.forEach((z) => {
      L.circle(z.center, {
        radius: z.radius,
        color: z.color,
        fillColor: z.color,
        fillOpacity: 0.06,
        weight: 1,
      }).addTo(overlays);
    });

    incidents.forEach((inc) => {
      const marker = L.marker([inc.lat, inc.lng], { icon: incidentIcon }).addTo(overlays);
      marker.bindPopup(`<strong>${inc.title}</strong><br/>${inc.location}`);
    });

    rescuers.forEach((r) => {
      if (r.lat === 0) return;
      const marker = L.marker([r.lat, r.lng], { icon: createColorIcon(r.color) }).addTo(overlays);
      marker.bindPopup(`<strong>${r.name}</strong><br/>${r.role} — ${r.zone}`);
    });
  }, [rescuers, incidents]);

  return (
    <div className="glass-card p-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Mapa operacyjna
      </h3>
      <div ref={mapElementRef} className="rounded-lg overflow-hidden" style={{ height: 400 }} />
    </div>
  );
}
