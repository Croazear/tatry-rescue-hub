import { useState } from "react";
import {
  useRescuers,
  useVehicles,
  useIncidents,
  useCreateIncident,
  useAssignRescuers,
  useResolveIncident,
} from "@/hooks/useConvexData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, AlertTriangle, Plus } from "lucide-react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { IncidentDetailModal } from "@/components/IncidentDetailModal";
import { AddIncidentModal } from "@/components/AddIncidentModal";
import type { Incident, Rescuer, Vehicle } from "@/types/rescue";

// Zone-based vehicle requirements (shared with IncidentDetailModal)
const zoneVehicleRequirements: Record<string, { required: string[]; recommended: string[] }> = {
  "Kasprowy Wierch": { required: ["helicopter"], recommended: ["sled"] },
  "Rysy": { required: ["helicopter"], recommended: ["sled"] },
  "Giewont": { required: ["helicopter"], recommended: ["sled"] },
  "Dolina Pięciu Stawów": { required: ["quad", "snowmobile"], recommended: ["sled"] },
  "Hala Gąsienicowa": { required: ["quad", "snowmobile"], recommended: ["sled"] },
  "Morskie Oko": { required: ["car", "quad"], recommended: ["snowmobile"] },
};

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

const ReportsPage = () => {
  const { data: incidents = [] } = useIncidents();
  const { data: rescuersRaw = [] } = useRescuers();
  const { data: vehiclesRaw = [] } = useVehicles();
  const createIncident = useCreateIncident();
  const assignRescuers = useAssignRescuers();
  const resolveIncident = useResolveIncident();

  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null,
  );
  const [addOpen, setAddOpen] = useState(false);
  const [localIncidents, setLocalIncidents] = useState<Incident[]>([]);

  // Normalizacja ID – Convex często zwraca _id zamiast id
  const rescuers = rescuersRaw.map((r: any) => ({
    ...r,
    id: r._id || r.id,
  })) as Rescuer[];

  const vehicles = vehiclesRaw.map((v: any) => ({
    ...v,
    id: v._id || v.id,
  })) as Vehicle[];

  const allIncidents = [...incidents, ...localIncidents].map((i: any) => ({
    ...i,
    id: i._id || i.id,
  })) as Incident[];

  const sorted = [...allIncidents].sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (a.status !== "active" && b.status === "active") return 1;
    return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
  });

  const handleAssign = async (
    incidentId: string,
    rescuerIds: string[],
    vehicleIds: string[],
  ) => {
    if (assignRescuers) {
      await assignRescuers({ incidentId: incidentId as any, rescuerIds, vehicleIds });
    }
    setSelectedIncident(null);
  };

  const handleResolve = async (incidentId: string) => {
    if (resolveIncident) {
      await resolveIncident({ incidentId: incidentId as any });
    } else {
      setLocalIncidents((prev) =>
        prev.map((i) =>
          i.id === incidentId
            ? { ...i, status: "resolved" as const, resolvedAt: new Date().toISOString() }
            : i
        )
      );
    }
    setSelectedIncident(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Incidents</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Click an incident to assign rescuers and equipment
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertTriangle className="w-4 h-4 text-primary" />
            <span>
              {allIncidents.filter((i) => i.status === "active").length}{" "}
              active
            </span>
          </div>
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="w-4 h-4 mr-1" /> New incident
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {sorted.map((incident) => {
          const assigned = rescuers.filter((r) =>
            incident.assignedRescuers?.includes(r.id),
          );

          return (
            <div
              key={incident.id}
              onClick={() => setSelectedIncident(incident)}
              className={`glass-card p-5 cursor-pointer hover:ring-1 hover:ring-primary/30 transition-all ${incident.status === "active" ? "gradient-emergency border-primary/30" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {incident.status === "active" && (
                      <span className="w-2 h-2 rounded-full bg-primary status-pulse" />
                    )}
                    <h3 className="font-semibold text-sm">{incident.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {incident.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {incident.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {format(
                        new Date(incident.reportedAt),
                        "dd MMM yyyy, HH:mm",
                        { locale: enUS },
                      )}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {assigned.map((a) => a.name).join(", ") || "—"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Badge
                    variant="outline"
                    className={priorityStyle[incident.priority]}
                  >
                    {priorityLabel[incident.priority]}
                  </Badge>
                  <Badge
                    variant={
                      incident.status === "active" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {incident.status === "active" ? "Active" : "Resolved"}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <IncidentDetailModal
        incident={selectedIncident}
        open={!!selectedIncident}
        onOpenChange={(open) => !open && setSelectedIncident(null)}
        rescuers={rescuers}
        vehicles={vehicles}
        allIncidents={allIncidents}
        onAssign={handleAssign}
        onResolve={handleResolve}
      />

      <AddIncidentModal
        open={addOpen}
        onOpenChange={setAddOpen}
        onAdd={async (data) => {
          if (createIncident) {
            const newId = await createIncident(data);

            // Auto-assign rescuers from the incident zone (active only) and required vehicles (available only)
            if (assignRescuers && newId) {
              const zoneReqs = zoneVehicleRequirements[data.location];
              const requiredTypes = zoneReqs?.required ?? [];

              // Rescuers from incident zone, active only
              const autoRescuerIds = rescuers
                .filter((r) => r.zone === data.location && r.status === "active")
                .map((r) => r.id);

              // Required vehicles – one available per type
              const autoVehicleIds: string[] = [];
              for (const type of requiredTypes) {
                const v = vehicles.find(
                  (v) => v.type === type && v.status === "available" && !autoVehicleIds.includes(v.id)
                );
                if (v) autoVehicleIds.push(v.id);
              }

              if (autoRescuerIds.length > 0 || autoVehicleIds.length > 0) {
                await assignRescuers({
                  incidentId: newId as any,
                  rescuerIds: autoRescuerIds,
                  vehicleIds: autoVehicleIds,
                });
              }
            }
          } else {
            setLocalIncidents((prev) => [
              ...prev,
              {
                ...data,
                id: `local-${Date.now()}`,
                status: "active" as const,
                reportedAt: new Date().toISOString(),
                assignedRescuers: [],
              },
            ]);
          }
        }}
      />
    </div>
  );
};

export default ReportsPage;
