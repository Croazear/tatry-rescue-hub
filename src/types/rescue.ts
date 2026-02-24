export interface Rescuer {
  id: string;
  name: string;
  role: string;
  status: "active" | "standby" | "off-duty";
  color: string;
  phone: string;
  lat: number;
  lng: number;
  zone: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: "helicopter" | "quad" | "snowmobile" | "car" | "sled";
  status: "available" | "in-use" | "maintenance";
  location: string;
  assignedTo?: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  status: "active" | "resolved";
  priority: "low" | "medium" | "high" | "critical";
  location: string;
  lat: number;
  lng: number;
  reportedAt: string;
  assignedRescuers: string[];
  resolvedAt?: string;
}

export interface Zone {
  id: string;
  name: string;
  difficulty: "easy" | "medium" | "hard" | "extreme";
  color: string;
}

export interface ScheduleEntry {
  rescuerId: string;
  date: string;
  shift: "day" | "night";
}
