import { useState } from "react";
import { useRescuers, useVehicles, useIncidents } from "@/hooks/useConvexData";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { IncidentDetailModal } from "@/components/IncidentDetailModal";

const priorityLabel: Record<string, string> = {
  low: "Niski",
  medium: "Średni",
  high: "Wysoki",
  critical: "Krytyczny",
};

const priorityStyle: Record<string, string> = {
  low: "bg-info/20 text-info border-info/30",
  medium: "bg-warning/20 text-warning border-warning/30",
  high: "bg-primary/20 text-primary border-primary/30",
  critical: "bg-destructive/20 text-destructive border-destructive/30",
};

const ReportsPage = () => {
  const { data: incidents } = useIncidents();
  const { data: rescuers } = useRescuers();
  const { data: vehicles } = useVehicles();
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  const sorted = [...incidents].sort(
    (a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Zgłoszenia</h2>
          <p className="text-muted-foreground text-sm mt-1">Kliknij zgłoszenie, aby przypisać ratowników i sprzęt</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <AlertTriangle className="w-4 h-4 text-primary" />
          <span>{incidents.filter(i => i.status === "active").length} aktywnych</span>
        </div>
      </div>

      <div className="space-y-3">
        {sorted.map((incident) => {
          const iid = (incident as any)._id || incident.id;
          const assigned = rescuers.filter((r) => {
            const rid = (r as any)._id || r.id;
            return incident.assignedRescuers.includes(rid);
          });
          return (
            <div
              key={iid}
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
                  <p className="text-sm text-muted-foreground mb-3">{incident.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {incident.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {format(new Date(incident.reportedAt), "dd MMM yyyy, HH:mm", { locale: pl })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {assigned.map((a) => a.name).join(", ")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Badge variant="outline" className={priorityStyle[incident.priority]}>
                    {priorityLabel[incident.priority]}
                  </Badge>
                  <Badge variant={incident.status === "active" ? "default" : "secondary"} className="text-xs">
                    {incident.status === "active" ? "Aktywne" : "Zakończone"}
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
      />
    </div>
  );
};

export default ReportsPage;
