import { Vehicle } from "@/types/rescue";
import { Badge } from "@/components/ui/badge";
import { Plane, Bike, Snowflake, Car, Boxes } from "lucide-react";

const vehicleIcons: Record<string, React.ElementType> = {
  helicopter: Plane,
  quad: Bike,
  snowmobile: Snowflake,
  car: Car,
  sled: Boxes,
};

const statusLabel: Record<string, string> = {
  available: "Available",
  "in-use": "In use",
  maintenance: "Maintenance",
};

const statusStyle: Record<string, string> = {
  available: "bg-success/20 text-success border-success/30",
  "in-use": "bg-warning/20 text-warning border-warning/30",
  maintenance: "bg-muted text-muted-foreground border-border",
};

interface Props {
  vehicles: Vehicle[];
}

export function VehicleGrid({ vehicles }: Props) {
  return (
    <div className="glass-card p-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Available vehicles</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {vehicles.map((v) => {
          const Icon = vehicleIcons[v.type] || Car;
          return (
            <div key={v.id} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <Icon className="w-6 h-6 text-muted-foreground" />
              <p className="text-xs font-medium text-center truncate w-full">{v.name}</p>
              <Badge variant="outline" className={`text-[10px] ${statusStyle[v.status]}`}>
                {statusLabel[v.status]}
              </Badge>
              <p className="text-[10px] text-muted-foreground text-center">{v.location}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
