import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import type { Incident } from "@/types/rescue";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (data: { title: string; description: string; priority: Incident["priority"]; location: string; lat: number; lng: number }) => void | Promise<void>;
}

const locations = [
  "Kasprowy Wierch",
  "Rysy",
  "Giewont",
  "Dolina Pięciu Stawów",
  "Hala Gąsienicowa",
  "Morskie Oko",
  "Dolina Kościeliska",
  "Dolina Chochołowska",
  "Szpiglasowa Przełęcz",
  "Baza Kuźnice",
];

const locationCoords: Record<string, { lat: number; lng: number }> = {
  "Kasprowy Wierch": { lat: 49.232, lng: 19.9813 },
  "Rysy": { lat: 49.1795, lng: 20.088 },
  "Giewont": { lat: 49.2504, lng: 19.9337 },
  "Dolina Pięciu Stawów": { lat: 49.215, lng: 20.01 },
  "Hala Gąsienicowa": { lat: 49.235, lng: 20.01 },
  "Morskie Oko": { lat: 49.2012, lng: 20.0715 },
  "Dolina Kościeliska": { lat: 49.255, lng: 19.88 },
  "Dolina Chochołowska": { lat: 49.26, lng: 19.8 },
  "Szpiglasowa Przełęcz": { lat: 49.195, lng: 20.055 },
  "Baza Kuźnice": { lat: 49.271, lng: 19.984 },
};

export function AddIncidentModal({ open, onOpenChange, onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Incident["priority"]>("medium");
  const [location, setLocation] = useState("");

  const reset = () => {
    setTitle("");
    setDescription("");
    setPriority("medium");
    setLocation("");
  };

  const handleSubmit = async () => {
    if (!title.trim() || !location) return;

    const coords = locationCoords[location] || { lat: 49.27, lng: 19.98 };

    await onAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
      location,
      lat: coords.lat,
      lng: coords.lng,
    });

    reset();
    onOpenChange(false);
  };

  const isValid = title.trim().length > 0 && location.length > 0;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <DialogContent className="sm:max-w-lg glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" />
            New incident
          </DialogTitle>
          <DialogDescription>Fill in the details of the event requiring intervention</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Title */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Incident title *</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Broken leg – Giewont trail"
              className="h-9"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Event description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details: victim condition, terrain, weather..."
              rows={3}
            />
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Location *</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Priority</Label>
            <Select value={priority} onValueChange={(v) => setPriority(v as Incident["priority"])}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSubmit} disabled={!isValid}>
            <Plus className="w-4 h-4 mr-1" /> Add incident
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
