import { rescuers, scheduleEntries } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Phone, User } from "lucide-react";
import { ScheduleCalendar } from "@/components/ScheduleCalendar";

const statusLabel: Record<string, string> = {
  active: "Na zmianie",
  standby: "Dyżur",
  "off-duty": "Wolne",
};

const statusStyle: Record<string, string> = {
  active: "bg-success/20 text-success border-success/30",
  standby: "bg-warning/20 text-warning border-warning/30",
  "off-duty": "bg-muted text-muted-foreground border-border",
};

const RescuersPage = () => {
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
            {rescuers.map((r) => (
              <div key={r.id} className="glass-card p-4 flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2" style={{ borderColor: r.color, backgroundColor: `${r.color}20` }}>
                  <User className="w-5 h-5" style={{ color: r.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={statusStyle[r.status]}>
                    {statusLabel[r.status]}
                  </Badge>
                </div>
              </div>
            ))}
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
