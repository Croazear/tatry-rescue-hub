import { Rescuer, Vehicle, Incident, Zone, ScheduleEntry } from "@/types/rescue";

export const rescuers: Rescuer[] = [
  { id: "1", name: "Jan Kowalski", role: "Kierownik zmiany", status: "active", color: "#22c55e", phone: "+48 601 234 567", lat: 49.2320, lng: 19.9813, zone: "Kasprowy Wierch" },
  { id: "2", name: "Anna Nowak", role: "Ratownik", status: "active", color: "#3b82f6", phone: "+48 602 345 678", lat: 49.2295, lng: 19.9950, zone: "Morskie Oko" },
  { id: "3", name: "Piotr Wiśniewski", role: "Ratownik", status: "active", color: "#f59e0b", phone: "+48 603 456 789", lat: 49.2350, lng: 20.0100, zone: "Dolina Pięciu Stawów" },
  { id: "4", name: "Katarzyna Zielińska", role: "Pilot helikoptera", status: "active", color: "#ef4444", phone: "+48 604 567 890", lat: 49.2700, lng: 20.0880, zone: "Rysy" },
  { id: "5", name: "Tomasz Lewandowski", role: "Ratownik", status: "standby", color: "#8b5cf6", phone: "+48 605 678 901", lat: 49.2500, lng: 19.9700, zone: "Giewont" },
  { id: "6", name: "Magdalena Dąbrowska", role: "Ratownik medyczny", status: "active", color: "#06b6d4", phone: "+48 606 789 012", lat: 49.2450, lng: 20.0300, zone: "Hala Gąsienicowa" },
  { id: "7", name: "Michał Szymański", role: "Ratownik", status: "off-duty", color: "#ec4899", phone: "+48 607 890 123", lat: 0, lng: 0, zone: "-" },
  { id: "8", name: "Agnieszka Woźniak", role: "Ratownik", status: "off-duty", color: "#14b8a6", phone: "+48 608 901 234", lat: 0, lng: 0, zone: "-" },
];

export const vehicles: Vehicle[] = [
  { id: "v1", name: "Helikopter Sokół", type: "helicopter", status: "available", location: "Baza TOPR" },
  { id: "v2", name: "Quad Polaris #1", type: "quad", status: "in-use", location: "Dolina Chochołowska", assignedTo: "Piotr Wiśniewski" },
  { id: "v3", name: "Quad Polaris #2", type: "quad", status: "available", location: "Baza TOPR" },
  { id: "v4", name: "Skuter śnieżny #1", type: "snowmobile", status: "available", location: "Baza TOPR" },
  { id: "v5", name: "Skuter śnieżny #2", type: "snowmobile", status: "maintenance", location: "Warsztat" },
  { id: "v6", name: "Land Rover Defender", type: "car", status: "available", location: "Baza TOPR" },
  { id: "v7", name: "Sanie ratunkowe", type: "sled", status: "available", location: "Hala Gąsienicowa" },
];

export const incidents: Incident[] = [
  { id: "i1", title: "Turysta z urazem nogi – Kasprowy Wierch", description: "Mężczyzna 45 lat, złamanie podudzia na szlaku poniżej Kasprowego Wierchu. Wymaga transportu helikopterem.", status: "active", priority: "high", location: "Kasprowy Wierch", lat: 49.2320, lng: 19.9813, reportedAt: "2026-02-24T14:32:00", assignedRescuers: ["1", "4"] },
  { id: "i2", title: "Zagubiona grupa turystów – Dolina Pięciu Stawów", description: "Grupa 4 osób zgłasza, że zgubiła szlak w okolicach Doliny Pięciu Stawów. Mgła, widoczność poniżej 50m.", status: "active", priority: "medium", location: "Dolina Pięciu Stawów", lat: 49.2150, lng: 20.0100, reportedAt: "2026-02-24T13:15:00", assignedRescuers: ["3", "6"] },
  { id: "i3", title: "Hipotermia – Morskie Oko", description: "Kobieta 32 lata, objawy hipotermii po wpadnięciu do wody. Ratownik na miejscu udziela pierwszej pomocy.", status: "resolved", priority: "high", location: "Morskie Oko", lat: 49.2012, lng: 20.0715, reportedAt: "2026-02-24T10:45:00", assignedRescuers: ["2"], resolvedAt: "2026-02-24T12:30:00" },
  { id: "i4", title: "Opad kamieni – szlak na Rysy", description: "Zgłoszenie o opadzie kamieni na szlaku od Morskiego Oka do Rysów. Potencjalne zagrożenie dla turystów.", status: "resolved", priority: "low", location: "Rysy", lat: 49.1795, lng: 20.0880, reportedAt: "2026-02-23T16:20:00", assignedRescuers: ["5"], resolvedAt: "2026-02-23T18:00:00" },
  { id: "i5", title: "Zawał serca – Giewont", description: "Mężczyzna 62 lata, objawy zawału na szczycie Giewontu. Pilna ewakuacja helikopterem.", status: "resolved", priority: "critical", location: "Giewont", lat: 49.2504, lng: 19.9337, reportedAt: "2026-02-22T09:10:00", assignedRescuers: ["1", "4", "6"], resolvedAt: "2026-02-22T11:45:00" },
  { id: "i6", title: "Złamanie ręki – Hala Gąsienicowa", description: "Kobieta 28 lat, upadek na oblodzonym szlaku.", status: "resolved", priority: "medium", location: "Hala Gąsienicowa", lat: 49.2350, lng: 20.0100, reportedAt: "2026-02-21T14:00:00", assignedRescuers: ["6"], resolvedAt: "2026-02-21T16:00:00" },
];

export const zones: Zone[] = [
  { id: "z1", name: "Doliny (do 1200 m n.p.m.)", difficulty: "easy", color: "hsl(var(--zone-easy))" },
  { id: "z2", name: "Hale i polany (1200–1500 m)", difficulty: "medium", color: "hsl(var(--zone-medium))" },
  { id: "z3", name: "Szczyty niższe (1500–2000 m)", difficulty: "hard", color: "hsl(var(--zone-hard))" },
  { id: "z4", name: "Szczyty wysokie (>2000 m)", difficulty: "extreme", color: "hsl(var(--zone-extreme))" },
];

export const scheduleEntries: ScheduleEntry[] = [
  { rescuerId: "1", date: "2026-02-24", shift: "day" },
  { rescuerId: "2", date: "2026-02-24", shift: "day" },
  { rescuerId: "3", date: "2026-02-24", shift: "day" },
  { rescuerId: "4", date: "2026-02-24", shift: "day" },
  { rescuerId: "5", date: "2026-02-24", shift: "night" },
  { rescuerId: "6", date: "2026-02-24", shift: "day" },
  { rescuerId: "1", date: "2026-02-25", shift: "night" },
  { rescuerId: "2", date: "2026-02-25", shift: "day" },
  { rescuerId: "3", date: "2026-02-25", shift: "night" },
  { rescuerId: "4", date: "2026-02-25", shift: "day" },
  { rescuerId: "7", date: "2026-02-25", shift: "day" },
  { rescuerId: "8", date: "2026-02-25", shift: "day" },
  { rescuerId: "1", date: "2026-02-26", shift: "day" },
  { rescuerId: "5", date: "2026-02-26", shift: "day" },
  { rescuerId: "6", date: "2026-02-26", shift: "night" },
  { rescuerId: "7", date: "2026-02-26", shift: "day" },
  { rescuerId: "8", date: "2026-02-26", shift: "night" },
  { rescuerId: "2", date: "2026-02-27", shift: "night" },
  { rescuerId: "3", date: "2026-02-27", shift: "day" },
  { rescuerId: "4", date: "2026-02-27", shift: "night" },
  { rescuerId: "5", date: "2026-02-27", shift: "day" },
  { rescuerId: "6", date: "2026-02-27", shift: "day" },
  { rescuerId: "1", date: "2026-02-28", shift: "day" },
  { rescuerId: "7", date: "2026-02-28", shift: "day" },
  { rescuerId: "8", date: "2026-02-28", shift: "day" },
  { rescuerId: "2", date: "2026-02-28", shift: "night" },
];
