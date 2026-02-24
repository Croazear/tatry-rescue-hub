import { Rescuer, Zone } from "@/types/rescue";

interface Props {
  rescuers: Rescuer[];
  zones: Zone[];
}

export function TatraMap({ rescuers, zones }: Props) {
  const width = 800;
  const height = 500;
  const mapBounds = { minLat: 49.17, maxLat: 49.28, minLng: 19.85, maxLng: 20.15 };

  const toXY = (lat: number, lng: number) => ({
    x: ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * width,
    y: height - ((lat - mapBounds.minLat) / (mapBounds.maxLat - mapBounds.minLat)) * height,
  });

  return (
    <div className="glass-card p-4">
      <div className="relative w-full rounded-lg overflow-hidden bg-secondary/30" style={{ aspectRatio: "8/5" }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          {/* Grid */}
          {Array.from({ length: 16 }).map((_, i) => (
            <g key={i}>
              <line x1={i * (width / 16)} y1={0} x2={i * (width / 16)} y2={height} stroke="hsl(220 14% 16%)" strokeWidth="0.5" />
              <line x1={0} y1={i * (height / 10)} x2={width} y2={i * (height / 10)} stroke="hsl(220 14% 16%)" strokeWidth="0.5" />
            </g>
          ))}

          {/* Zone rings - valleys (easy) */}
          <ellipse cx={400} cy={260} rx={340} ry={200} fill="hsl(142 71% 45% / 0.06)" stroke="hsl(142 71% 45% / 0.3)" strokeWidth="1" />
          {/* Mid altitude (medium) */}
          <ellipse cx={400} cy={270} rx={240} ry={140} fill="hsl(38 92% 50% / 0.06)" stroke="hsl(38 92% 50% / 0.3)" strokeWidth="1" />
          {/* Higher (hard) */}
          <ellipse cx={410} cy={280} rx={140} ry={80} fill="hsl(0 72% 51% / 0.06)" stroke="hsl(0 72% 51% / 0.3)" strokeWidth="1" />
          {/* Peaks (extreme) */}
          <ellipse cx={415} cy={285} rx={60} ry={35} fill="hsl(280 80% 55% / 0.08)" stroke="hsl(280 80% 55% / 0.3)" strokeWidth="1" />

          {/* Key locations */}
          {[
            { name: "Giewont", lat: 49.2504, lng: 19.9337 },
            { name: "Kasprowy Wierch", lat: 49.2320, lng: 19.9813 },
            { name: "Morskie Oko", lat: 49.2012, lng: 20.0715 },
            { name: "Rysy", lat: 49.1795, lng: 20.0880 },
            { name: "Hala Gąsienicowa", lat: 49.2350, lng: 20.0100 },
            { name: "Dolina Pięciu Stawów", lat: 49.2150, lng: 20.0100 },
            { name: "Zakopane", lat: 49.2992, lng: 19.9496 },
          ].map((loc) => {
            const pos = toXY(loc.lat, loc.lng);
            return (
              <g key={loc.name}>
                <circle cx={pos.x} cy={pos.y} r={3} fill="hsl(210 20% 40%)" />
                <text x={pos.x + 6} y={pos.y + 3} fill="hsl(210 20% 60%)" fontSize="9" fontWeight="500">
                  {loc.name}
                </text>
              </g>
            );
          })}

          {/* Rescuer positions */}
          {rescuers.map((r) => {
            if (r.lat === 0) return null;
            const pos = toXY(r.lat, r.lng);
            return (
              <g key={r.id}>
                <circle cx={pos.x} cy={pos.y} r={10} fill={`${r.color}30`} />
                <circle cx={pos.x} cy={pos.y} r={5} fill={r.color} stroke="hsl(220 20% 10%)" strokeWidth="2" />
                <text x={pos.x + 12} y={pos.y + 4} fill={r.color} fontSize="8" fontWeight="600">
                  {r.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
