import { Incident } from "@/types/rescue";
import { AlertTriangle, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

interface Props {
  incident: Incident;
}

export function IncidentBanner({ incident }: Props) {
  const isActive = incident.status === "active";

  return (
    <div className={`glass-card p-4 ${isActive ? "gradient-emergency border-primary/40" : ""}`}>
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20">
          <AlertTriangle className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            {isActive && <span className="w-2 h-2 rounded-full bg-primary status-pulse" />}
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Latest incident
            </span>
          </div>
          <h3 className="font-semibold text-sm truncate">{incident.title}</h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {incident.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {format(new Date(incident.reportedAt), "HH:mm", { locale: enUS })}
          </span>
        </div>
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Resolved"}
        </Badge>
      </div>
    </div>
  );
}
