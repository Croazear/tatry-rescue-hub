import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Incident, Rescuer, Vehicle } from "@/types/rescue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MapPin,
  Clock,
  Users,
  AlertTriangle,
  Plane,
  Bike,
  Snowflake,
  Car,
  Boxes,
} from "lucide-react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

const priorityLabel: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

const priorityStyle: Record<string, string> = {
  low: "bg-info/20 text-info border-info/30",
  medium: "bg-warning/20 text-warning border-warning/30",
  high: "bg-primary/20 text-primary border-primary/30",
  critical: "bg-destructive/20 text-destructive border-destructive/30",
};

// Zone difficulty determines required vehicles
const zoneVehicleRequirements: Record<
  string,
  { required: string[]; recommended: string[] }
> = {
  "Kasprowy Wierch": { required: ["helicopter"], recommended: ["sled"] },
  Rysy: { required: ["helicopter"], recommended: ["sled"] },
  Giewont: { required: ["helicopter"], recommended: ["sled"] },
  "Dolina Pięciu Stawów": {
    required: ["quad", "snowmobile"],
    recommended: ["sled"],
  },
  "Hala Gąsienicowa": {
    required: ["quad", "snowmobile"],
    recommended: ["sled"],
  },
  "Morskie Oko": { required: ["car", "quad"], recommended: ["snowmobile"] },
};

const vehicleIcons: Record<string, React.ElementType> = {
  helicopter: Plane,
  quad: Bike,
  snowmobile: Snowflake,
  car: Car,
  sled: Boxes,
};

const vehicleTypeLabel: Record<string, string> = {
  helicopter: "Helicopter",
  quad: "Quad",
  snowmobile: "Snowmobile",
  car: "Car",
  sled: "Sled",
};

interface Props {
  incident: Incident | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rescuers: Rescuer[];
  vehicles: Vehicle[];
  allIncidents?: Incident[];
  onAssign?: (
    incidentId: string,
    rescuerIds: string[],
    vehicleIds: string[],
  ) => void;
  onResolve?: (incidentId: string) => void;
}

export function IncidentDetailModal({
  incident,
  open,
  onOpenChange,
  rescuers,
  vehicles,
  allIncidents = [],
  onAssign,
  onResolve,
}: Props) {
  const [selectedRescuers, setSelectedRescuers] = useState<string[]>([]);
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);

  if (!incident) return null;

  // Rescuers busy in OTHER active incidents
  const busyRescuerIds = new Set(
    allIncidents
      .filter((i) => i.status === "active" && i.id !== incident.id)
      .flatMap((i) => i.assignedRescuers ?? [])
  );

  const requirements = zoneVehicleRequirements[incident.location] || {
    required: ["car"],
    recommended: [],
  };

  const toggleRescuer = (id: string) => {
    setSelectedRescuers((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  };

  const toggleVehicle = (id: string) => {
    setSelectedVehicles((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const requiredVehicles = vehicles.filter((v) =>
    requirements.required.includes(v.type),
  );
  const recommendedVehicles = vehicles.filter((v) =>
    requirements.recommended.includes(v.type),
  );
  const otherVehicles = vehicles.filter(
    (v) =>
      !requirements.required.includes(v.type) &&
      !requirements.recommended.includes(v.type),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {incident.status === "active" && (
              <span className="w-2 h-2 rounded-full bg-primary status-pulse" />
            )}
            <DialogTitle className="text-base">{incident.title}</DialogTitle>
          </div>
          <DialogDescription className="text-sm">
            {incident.description}
          </DialogDescription>
        </DialogHeader>

        {/* Info */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <Badge variant="outline" className={priorityStyle[incident.priority]}>
            {priorityLabel[incident.priority]}
          </Badge>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {incident.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {format(new Date(incident.reportedAt), "dd MMM yyyy, HH:mm", {
              locale: enUS,
            })}
          </span>
        </div>

        {/* Zone vehicle requirements info */}
        <div className="rounded-lg bg-secondary/50 p-3 space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Required equipment for zone: {incident.location}
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {requirements.required.map((type) => {
              const Icon = vehicleIcons[type] || Car;
              return (
                <Badge
                  key={type}
                  variant="outline"
                  className="bg-primary/20 text-primary border-primary/30 gap-1"
                >
                  <Icon className="w-3 h-3" />
                  {vehicleTypeLabel[type]} (required)
                </Badge>
              );
            })}
            {requirements.recommended.map((type) => {
              const Icon = vehicleIcons[type] || Car;
              return (
                <Badge
                  key={type}
                  variant="outline"
                  className="bg-info/20 text-info border-info/30 gap-1"
                >
                  <Icon className="w-3 h-3" />
                  {vehicleTypeLabel[type]} (recommended)
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Assign rescuers */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <Users className="w-3 h-3" /> Assign rescuers
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {rescuers
              .filter((r) => r.status !== "off-duty")
              .map((r) => {
                const isAssigned = incident.assignedRescuers.includes(r.id);
                const isSelected = selectedRescuers.includes(r.id);
                const isBusy = !isAssigned && busyRescuerIds.has(r.id);
                const isDisabled = isAssigned || isBusy;
                return (
                  <div
                    key={r.id}
                    onClick={() => !isDisabled && toggleRescuer(r.id)}
                    className={`flex items-center gap-3 p-2.5 rounded-md transition-colors ${
                      isDisabled && !isAssigned
                        ? "bg-muted/30 border border-transparent opacity-50 cursor-not-allowed"
                        : isAssigned
                          ? "bg-success/10 border border-success/30 cursor-default"
                          : isSelected
                            ? "bg-primary/10 border border-primary/30 cursor-pointer"
                            : "bg-secondary/50 hover:bg-secondary border border-transparent cursor-pointer"
                    }`}
                  >
                    <Checkbox
                      checked={isAssigned || isSelected}
                      disabled={isDisabled}
                      onClick={(e) => e.stopPropagation()}
                      onCheckedChange={() => !isDisabled && toggleRescuer(r.id)}
                    />
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: r.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.role}</p>
                    </div>
                    {isAssigned && (
                      <Badge
                        variant="outline"
                        className="bg-success/20 text-success border-success/30 text-[10px]"
                      >
                        Assigned
                      </Badge>
                    )}
                    {isBusy && (
                      <Badge
                        variant="outline"
                        className="bg-warning/20 text-warning border-warning/30 text-[10px]"
                      >
                        Busy
                      </Badge>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Assign vehicles */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Assign vehicles
          </p>

          {requiredVehicles.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-primary font-medium">Required</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {requiredVehicles.map((v) => {
                  const Icon = vehicleIcons[v.type] || Car;
                  const isSelected = selectedVehicles.includes(v.id);
                  const isAvailable = v.status === "available";
                  return (
                    <div
                      key={v.id}
                      onClick={() => isAvailable && toggleVehicle(v.id)}
                      className={`flex items-center gap-3 p-2.5 rounded-md cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-secondary/50 hover:bg-secondary border border-transparent"
                      } ${!isAvailable ? "opacity-50" : ""}`}
                    >
                      <Checkbox
                        checked={isSelected}
                        disabled={!isAvailable}
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() =>
                          isAvailable && toggleVehicle(v.id)
                        }
                      />
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{v.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {v.location}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          isAvailable
                            ? "bg-success/20 text-success border-success/30"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isAvailable
                          ? "Available"
                          : v.status === "in-use"
                            ? "In use"
                            : "Maintenance"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {recommendedVehicles.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-info font-medium">Recommended</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recommendedVehicles.map((v) => {
                  const Icon = vehicleIcons[v.type] || Car;
                  const isSelected = selectedVehicles.includes(v.id);
                  const isAvailable = v.status === "available";
                  return (
                    <div
                      key={v.id}
                      onClick={() => isAvailable && toggleVehicle(v.id)}
                      className={`flex items-center gap-3 p-2.5 rounded-md cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-info/10 border border-info/30"
                          : "bg-secondary/50 hover:bg-secondary border border-transparent"
                      } ${!isAvailable ? "opacity-50" : ""}`}
                    >
                      <Checkbox
                        checked={isSelected}
                        disabled={!isAvailable}
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() =>
                          isAvailable && toggleVehicle(v.id)
                        }
                      />
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{v.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {v.location}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          isAvailable
                            ? "bg-success/20 text-success border-success/30"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isAvailable
                          ? "Available"
                          : v.status === "in-use"
                            ? "In use"
                            : "Maintenance"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {otherVehicles.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">
                Other
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {otherVehicles.map((v) => {
                  const Icon = vehicleIcons[v.type] || Car;
                  const isSelected = selectedVehicles.includes(v.id);
                  const isAvailable = v.status === "available";
                  return (
                    <div
                      key={v.id}
                      onClick={() => isAvailable && toggleVehicle(v.id)}
                      className={`flex items-center gap-3 p-2.5 rounded-md cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-secondary border border-border"
                          : "bg-secondary/50 hover:bg-secondary border border-transparent"
                      } ${!isAvailable ? "opacity-50" : ""}`}
                    >
                      <Checkbox
                        checked={isSelected}
                        disabled={!isAvailable}
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() =>
                          isAvailable && toggleVehicle(v.id)
                        }
                      />
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{v.name}</p>
                      </div>
                      {isAvailable && (
                        <Badge
                          variant="outline"
                          className="bg-success/20 text-success border-success/30 text-[10px]"
                        >
                           Available
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {incident.status === "active" && (
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="destructive"
              onClick={() => {
                onResolve?.(incident.id);
                onOpenChange(false);
              }}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Resolve incident
            </Button>
            <Button
              onClick={() => {
                onAssign?.(incident.id, selectedRescuers, selectedVehicles);
                onOpenChange(false);
              }}
              disabled={
                selectedRescuers.length === 0 && selectedVehicles.length === 0
              }
            >
              Assign selected
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
