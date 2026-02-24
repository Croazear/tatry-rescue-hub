import { Rescuer, ScheduleEntry } from "@/types/rescue";
import { Sun, Moon } from "lucide-react";

interface Props {
  entries: ScheduleEntry[];
  rescuers: Rescuer[];
}

export function ScheduleCalendar({ entries, rescuers }: Props) {
  const year = 2026;
  const month = 1; // February (0-indexed)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-based

  const dayNames = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getEntriesForDay = (day: number) => {
    const dateStr = `2026-02-${String(day).padStart(2, "0")}`;
    return entries.filter((e) => e.date === dateStr);
  };

  const getRescuer = (id: string) => rescuers.find((r) => r.id === id);

  return (
    <div className="glass-card p-4 overflow-x-auto">
      <div className="grid grid-cols-7 gap-1 min-w-[600px]">
        {/* Day headers */}
        {dayNames.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">
            {d}
          </div>
        ))}

        {/* Empty cells for offset */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[80px]" />
        ))}

        {/* Days */}
        {days.map((day) => {
          const dayEntries = getEntriesForDay(day);
          const isToday = day === 24;

          return (
            <div
              key={day}
              className={`min-h-[80px] rounded-md p-1.5 text-xs border ${
                isToday ? "border-primary/50 bg-primary/5" : "border-border/30 bg-secondary/20"
              }`}
            >
              <span className={`font-mono font-semibold ${isToday ? "text-primary" : "text-muted-foreground"}`}>
                {day}
              </span>
              <div className="mt-1 space-y-0.5">
                {dayEntries.map((entry) => {
                  const rescuer = getRescuer(entry.rescuerId);
                  if (!rescuer) return null;
                  return (
                    <div
                      key={`${entry.rescuerId}-${entry.shift}`}
                      className="flex items-center gap-1 rounded px-1 py-0.5"
                      style={{ backgroundColor: `${rescuer.color}20` }}
                    >
                      {entry.shift === "day" ? (
                        <Sun className="w-2.5 h-2.5" style={{ color: rescuer.color }} />
                      ) : (
                        <Moon className="w-2.5 h-2.5" style={{ color: rescuer.color }} />
                      )}
                      <span className="truncate" style={{ color: rescuer.color, fontSize: "9px" }}>
                        {rescuer.name.split(" ")[1]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
