import { Rescuer, Incident } from "@/types/rescue";
import { MapPin } from "lucide-react";

interface Props {
  rescuers: Rescuer[];
  incidents: Incident[];
}

export function DashboardMap({ rescuers, incidents }: Props) {
  // Simplified SVG map representation of Tatras area
  const mapBounds = { minLat: 49.17, maxLat: 49.28, minLng: 19.85, maxLng: 20.15 };
  const width = 600;
  const height = 400;

  const toXY = (lat: number, lng: number) => ({
    x: ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * width,
    y: height - ((lat - mapBounds.minLat) / (mapBounds.maxLat - mapBounds.minLat)) * height,
  });

  return (
    <div className="glass-card p-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Mapa operacyjna</h3>
      <div className="relative w-full rounded-lg overflow-hidden bg-secondary/30" style={{ aspectRatio: "3/2" }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          {/* Background grid */}
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i}>
              <line x1={i * (width / 10)} y1={0} x2={i * (width / 10)} y2={height} stroke="hsl(220 14% 18%)" strokeWidth="0.5" />
              <line x1={0} y1={i * (height / 10)} x2={width} y2={i * (height / 10)} stroke="hsl(220 14% 18%)" strokeWidth="0.5" />
            </g>
          ))}

          {/* Mountain contour lines (decorative) */}
          <ellipse cx={300} cy={200} rx={200} ry={120} fill="none" stroke="hsl(220 14% 22%)" strokeWidth="1" strokeDasharray="4 4" />
          <ellipse cx={300} cy={210} rx={140} ry={80} fill="none" stroke="hsl(220 14% 24%)" strokeWidth="1" strokeDasharray="4 4" />
          <ellipse cx={310} cy={220} rx={80} ry={45} fill="none" stroke="hsl(220 14% 26%)" strokeWidth="1" strokeDasharray="4 4" />

          {/* Incident markers */}
          {incidents.map((inc) => {
            const pos = toXY(inc.lat, inc.lng);
            return (
              <g key={inc.id}>
                <circle cx={pos.x} cy={pos.y} r={12} fill="hsl(0 72% 51% / 0.2)" className="status-pulse" />
                <circle cx={pos.x} cy={pos.y} r={5} fill="hsl(0 72% 51%)" />
                <text x={pos.x + 14} y={pos.y + 4} fill="hsl(0 72% 51%)" fontSize="8" fontWeight="600">
                  {inc.location}
                </text>
              </g>
            );
          })}

          {/* Rescuer markers */}
          {rescuers.map((r) => {
            if (r.lat === 0) return null;
            const pos = toXY(r.lat, r.lng);
            return (
              <g key={r.id}>
                <circle cx={pos.x} cy={pos.y} r={6} fill={r.color} stroke="hsl(220 20% 10%)" strokeWidth="2" />
                <text x={pos.x + 10} y={pos.y + 3} fill={r.color} fontSize="7" fontWeight="500">
                  {r.name.split(" ")[1]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
