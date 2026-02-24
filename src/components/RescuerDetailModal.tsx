import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Phone, MapPin, Shield, Pencil, Save, X } from "lucide-react";

interface Rescuer {
  id: string;
  _id?: string;
  name: string;
  role: string;
  status: "active" | "standby" | "off-duty";
  color: string;
  phone: string;
  lat: number;
  lng: number;
  zone: string;
}

interface Props {
  rescuer: Rescuer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (updated: Rescuer) => void;
}

const statusLabel: Record<string, string> = {
  active: "On duty",
  standby: "Standby",
  "off-duty": "Off duty",
};

const statusStyle: Record<string, string> = {
  active: "bg-success/20 text-success border-success/30",
  standby: "bg-warning/20 text-warning border-warning/30",
  "off-duty": "bg-muted text-muted-foreground border-border",
};

export function RescuerDetailModal({ rescuer, open, onOpenChange, onSave }: Props) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Rescuer | null>(null);

  const current = editing && form ? form : rescuer;

  const startEditing = () => {
    if (rescuer) {
      setForm({ ...rescuer });
      setEditing(true);
    }
  };

  const cancelEditing = () => {
    setEditing(false);
    setForm(null);
  };

  const handleSave = () => {
    if (form && onSave) {
      onSave(form);
    }
    setEditing(false);
    setForm(null);
  };

  const updateField = (field: keyof Rescuer, value: string | number) => {
    if (form) setForm({ ...form, [field]: value });
  };

  if (!current) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) cancelEditing(); onOpenChange(v); }}>
      <DialogContent className="sm:max-w-md glass-card border-border/50">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full border-2"
              style={{ borderColor: current.color, backgroundColor: `${current.color}20` }}
            >
              <User className="w-6 h-6" style={{ color: current.color }} />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-lg">
                {editing ? (
                  <Input
                    value={form!.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="h-8 text-lg font-semibold"
                  />
                ) : (
                  current.name
                )}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Rescuer details
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Role */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Role
            </Label>
            {editing ? (
              <Input value={form!.role} onChange={(e) => updateField("role", e.target.value)} className="h-9" />
            ) : (
              <p className="text-sm font-medium">{current.role}</p>
            )}
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Status</Label>
            {editing ? (
              <Select value={form!.status} onValueChange={(v) => updateField("status", v)}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">On duty</SelectItem>
                  <SelectItem value="standby">Standby</SelectItem>
                  <SelectItem value="off-duty">Off duty</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge variant="outline" className={statusStyle[current.status]}>
                {statusLabel[current.status]}
              </Badge>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> Phone
            </Label>
            {editing ? (
              <Input value={form!.phone} onChange={(e) => updateField("phone", e.target.value)} className="h-9" />
            ) : (
              <p className="text-sm font-medium font-mono">{current.phone}</p>
            )}
          </div>

          {/* Zone */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Zone
            </Label>
            {editing ? (
              <Input value={form!.zone} onChange={(e) => updateField("zone", e.target.value)} className="h-9" />
            ) : (
              <p className="text-sm font-medium">{current.zone}</p>
            )}
          </div>

          {/* Coordinates */}
          {current.lat !== 0 && (
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Coordinates</Label>
              {editing ? (
                <div className="flex gap-2">
                  <Input
                    type="number"
                    step="0.0001"
                    value={form!.lat}
                    onChange={(e) => updateField("lat", parseFloat(e.target.value) || 0)}
                    className="h-9"
                    placeholder="Lat"
                  />
                  <Input
                    type="number"
                    step="0.0001"
                    value={form!.lng}
                    onChange={(e) => updateField("lng", parseFloat(e.target.value) || 0)}
                    className="h-9"
                    placeholder="Lng"
                  />
                </div>
              ) : (
                <p className="text-sm font-mono text-muted-foreground">
                  {current.lat.toFixed(4)}, {current.lng.toFixed(4)}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-4">
          {editing ? (
            <>
              <Button variant="ghost" size="sm" onClick={cancelEditing}>
                <X className="w-4 h-4 mr-1" /> Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-1" /> Save
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={startEditing}>
              <Pencil className="w-4 h-4 mr-1" /> Edit
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
