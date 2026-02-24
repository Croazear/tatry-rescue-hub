import { useRescuers, useZones } from "@/hooks/useConvexData";
import { TatraMap } from "@/components/TatraMap";

const MapPage = () => {
  const { data: rescuers } = useRescuers();
  const { data: zones } = useZones();

  const activeRescuers = rescuers.filter((r) => r.status !== "off-duty");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Mapa Tatr</h2>
        <p className="text-muted-foreground text-sm mt-1">Strefy trudności i lokalizacje ratowników</p>
      </div>

      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Strefy trudności</h3>
        <div className="flex flex-wrap gap-4">
          {zones.map((zone) => (
            <div key={zone.id || zone.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zone.color }} />
              <span className="text-sm">{zone.name}</span>
            </div>
          ))}
        </div>
      </div>

      <TatraMap rescuers={activeRescuers} zones={zones} />

      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Pozycje ratowników</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeRescuers.map((r) => (
            <div key={r.id || r.name} className="flex items-center gap-3 p-2 rounded-md bg-secondary/50">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
              <div>
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.zone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
