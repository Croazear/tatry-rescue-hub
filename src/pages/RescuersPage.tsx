import { rescuers, scheduleEntries, incidents, vehicles } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { User, Plane, Bike, Snowflake, Car, Boxes } from "lucide-react";
import { ScheduleCalendar } from "@/components/ScheduleCalendar";

const vehicleIcons: Record<string, React.ElementType> = {
  helicopter: Plane,
  quad: Bike,
  snowmobile: Snowflake,
  car: Car,
  sled: Boxes,
};

const RescuersPage = () => {
  // Find rescuers currently on active incidents
  const activeIncidents = incidents.filter((i) => i.status === "active");
  const rescuersOnAction = new Set(activeIncidents.flatMap((i) => i.assignedRescuers));

  // Find assigned vehicles per rescuer
  const rescuerVehicle = new Map<string, typeof vehicles[0]>();
  vehicles.forEach((v) => {
    if (v.assignedTo) {
      const rescuer = rescuers.find((r) => r.name === v.assignedTo);
      if (rescuer) rescuerVehicle.set(rescuer.id, v);
    }
  });

  const getStatus = (r: typeof rescuers[0]) => {
    if (rescuersOnAction.has(r.id)) return "action";
    return r.status;
  };

  const statusLabel: Record<string, string> = {
    action: "Na akcji",
    active: "Na zmianie",
    standby: "Dyżur",
    "off-duty": "Wolne",
  };

  const statusStyle: Record<string, string> = {
    action: "bg-destructive/20 text-destructive border-destructive/30",
    active: "bg-success/20 text-success border-success/30",
    standby: "bg-warning/20 text-warning border-warning/30",
    "off-duty": "bg-muted text-muted-foreground border-border",
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Ratownicy</h2>
        <p className="text-muted-foreground text-sm mt-1">Lista pracowników i grafik zmian</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Rescuers list */}
        <div className="xl:col-span-1 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Wszyscy ratownicy ({rescuers.length})</h3>
          <div className="space-y-2">
            {rescuers.map((r) => {
              const status = getStatus(r);
              const vehicle = rescuerVehicle.get(r.id);
              const VehicleIcon = vehicle ? vehicleIcons[vehicle.type] : null;

              return (
                <div key={r.id} className="glass-card p-4 flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2" style={{ borderColor: r.color, backgroundColor: `${r.color}20` }}>
                    <User className="w-5 h-5" style={{ color: r.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.role}</p>
                    {vehicle && VehicleIcon && (
                      <div className="flex items-center gap-1 mt-1">
                        <VehicleIcon className="w-3 h-3 text-warning" />
                        <span className="text-xs text-warning">{vehicle.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={statusStyle[status]}>
                      {statusLabel[status]}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calendar */}
        <div className="xl:col-span-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Grafik – Luty 2026</h3>
          <ScheduleCalendar entries={scheduleEntries} rescuers={rescuers} />
        </div>
      </div>
    </div>
  );
};

export default RescuersPage;
