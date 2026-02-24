import { Rescuer } from "@/types/rescue";
import { User, Radio } from "lucide-react";

interface Props {
  rescuers: Rescuer[];
  title: string;
}

export function RescuersList({ rescuers, title }: Props) {
  return (
    <div className="glass-card p-4 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Radio className="w-4 h-4 text-success" />
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</h3>
        <span className="ml-auto text-xs font-mono text-success">{rescuers.length}</span>
      </div>
      <div className="space-y-2">
        {rescuers.map((r) => (
          <div key={r.id} className="flex items-center gap-3 p-2.5 rounded-md bg-secondary/50 hover:bg-secondary transition-colors">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.role}</p>
            </div>
            <span className="text-xs text-muted-foreground">{r.zone}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
