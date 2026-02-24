import { Rescuer, Vehicle, Incident, Zone, ScheduleEntry } from "@/types/rescue";

export const rescuers: Rescuer[] = [
  { id: "1", name: "Jan Kowalski", role: "Naczelnik TOPR", status: "active", color: "#dc2626", phone: "+48 601 100 001", lat: 49.2710, lng: 19.9840, zone: "Baza Kuźnice" },
  { id: "2", name: "Marek Gąsienica", role: "Kierownik zmiany", status: "active", color: "#22c55e", phone: "+48 601 100 002", lat: 49.2320, lng: 19.9813, zone: "Kasprowy Wierch" },
  { id: "3", name: "Anna Stoch-Byrska", role: "Ratownik medyczny", status: "active", color: "#3b82f6", phone: "+48 601 100 003", lat: 49.2295, lng: 19.9950, zone: "Morskie Oko" },
  { id: "4", name: "Piotr Chyc", role: "Pilot śmigłowca", status: "active", color: "#f59e0b", phone: "+48 601 100 004", lat: 49.2700, lng: 19.9830, zone: "Baza Kuźnice" },
  { id: "5", name: "Wojciech Mądry", role: "Ratownik wysokogórski", status: "active", color: "#8b5cf6", phone: "+48 601 100 005", lat: 49.2504, lng: 19.9337, zone: "Giewont" },
  { id: "6", name: "Tomasz Bukowski", role: "Ratownik", status: "active", color: "#06b6d4", phone: "+48 601 100 006", lat: 49.2350, lng: 20.0100, zone: "Dolina Pięciu Stawów" },
  { id: "7", name: "Katarzyna Hajduk", role: "Ratownik medyczny", status: "active", color: "#ec4899", phone: "+48 601 100 007", lat: 49.2450, lng: 20.0300, zone: "Hala Gąsienicowa" },
  { id: "8", name: "Łukasz Chowaniec", role: "Ratownik", status: "standby", color: "#14b8a6", phone: "+48 601 100 008", lat: 49.2710, lng: 19.9840, zone: "Baza Kuźnice" },
  { id: "9", name: "Bartłomiej Krzeptowski", role: "Ratownik", status: "standby", color: "#f97316", phone: "+48 601 100 009", lat: 49.2710, lng: 19.9840, zone: "Baza Kuźnice" },
  { id: "10", name: "Marcin Tybor", role: "Ratownik wysokogórski", status: "off-duty", color: "#a855f7", phone: "+48 601 100 010", lat: 0, lng: 0, zone: "-" },
  { id: "11", name: "Krzysztof Gąsienica-Byrcyn", role: "Ratownik", status: "off-duty", color: "#64748b", phone: "+48 601 100 011", lat: 0, lng: 0, zone: "-" },
  { id: "12", name: "Jakub Bachleda-Curuś", role: "Ratownik", status: "off-duty", color: "#0ea5e9", phone: "+48 601 100 012", lat: 0, lng: 0, zone: "-" },
];

export const vehicles: Vehicle[] = [
  { id: "v1", name: "Sokół W-3 Anakonda", type: "helicopter", status: "available", location: "Lądowisko Kuźnice" },
  { id: "v2", name: "Quad Polaris Sportsman 570 #1", type: "quad", status: "in-use", location: "Dolina Chochołowska", assignedTo: "Tomasz Bukowski" },
  { id: "v3", name: "Quad Polaris Sportsman 570 #2", type: "quad", status: "available", location: "Baza Kuźnice" },
  { id: "v4", name: "Skuter Bombardier Lynx #1", type: "snowmobile", status: "in-use", location: "Hala Gąsienicowa", assignedTo: "Wojciech Mądry" },
  { id: "v5", name: "Skuter Bombardier Lynx #2", type: "snowmobile", status: "available", location: "Baza Kuźnice" },
  { id: "v6", name: "Skuter Bombardier Lynx #3", type: "snowmobile", status: "maintenance", location: "Warsztat Kuźnice" },
  { id: "v7", name: "Land Rover Defender 110", type: "car", status: "available", location: "Baza Kuźnice" },
  { id: "v8", name: "Toyota Hilux 4x4", type: "car", status: "available", location: "Baza Kuźnice" },
  { id: "v9", name: "Sanie ratunkowe Akia #1", type: "sled", status: "available", location: "Kasprowy Wierch" },
  { id: "v10", name: "Sanie ratunkowe Akia #2", type: "sled", status: "in-use", location: "Morskie Oko", assignedTo: "Anna Stoch-Byrska" },
  { id: "v11", name: "Sanie ratunkowe Akia #3", type: "sled", status: "available", location: "Hala Gąsienicowa" },
];

export const incidents: Incident[] = [
  {
    id: "i1", title: "Złamanie podudzia – szlak Kasprowy Wierch",
    description: "Mężczyzna 45 lat poślizgnął się na oblodzonym szlaku poniżej stacji Kasprowy Wierch. Złamanie otwarte podudzia prawej nogi. Pacjent przytomny, stabilny. Konieczna ewakuacja helikopterem z powodu trudnych warunków terenowych.",
    status: "active", priority: "high", location: "Kasprowy Wierch",
    lat: 49.2320, lng: 19.9813, reportedAt: "2026-02-24T14:32:00",
    assignedRescuers: ["2", "4"]
  },
  {
    id: "i2", title: "Zagubiona grupa – Dolina Pięciu Stawów",
    description: "Grupa 4 turystów (2 dorosłych, 2 dzieci) zeszła ze szlaku w okolicach Wielkiego Stawu. Gęsta mgła, widoczność poniżej 30 m. Kontakt telefoniczny utrzymany, GPS wskazuje pozycję ok. 200 m na wschód od szlaku.",
    status: "active", priority: "medium", location: "Dolina Pięciu Stawów",
    lat: 49.2150, lng: 20.0100, reportedAt: "2026-02-24T13:15:00",
    assignedRescuers: ["6", "7"]
  },
  {
    id: "i3", title: "Hipotermia – schronisko Morskie Oko",
    description: "Kobieta 32 lata, wpadła do potoku na szlaku do Czarnego Stawu. Temperatura ciała 34°C, dreszcze, splątanie. Ratownik na miejscu prowadzi ogrzewanie pasywne. Pacjentka w schronisku.",
    status: "resolved", priority: "high", location: "Morskie Oko",
    lat: 49.2012, lng: 20.0715, reportedAt: "2026-02-24T10:45:00",
    assignedRescuers: ["3"], resolvedAt: "2026-02-24T12:30:00"
  },
  {
    id: "i4", title: "Opad skalny – szlak Rysy od Morskiego Oka",
    description: "Zgłoszenie oberwania fragmentu ściany skalnej na odcinku powyżej Czarnego Stawu. Spadające kamienie o średnicy do 30 cm. Szlak zamknięty prewencyjnie. Brak poszkodowanych.",
    status: "resolved", priority: "low", location: "Rysy",
    lat: 49.1795, lng: 20.0880, reportedAt: "2026-02-23T16:20:00",
    assignedRescuers: ["5"], resolvedAt: "2026-02-23T18:00:00"
  },
  {
    id: "i5", title: "Podejrzenie zawału – szczyt Giewontu",
    description: "Mężczyzna 62 lata, ból w klatce piersiowej, duszność, pocenie się. Objawy rozpoczęły się podczas wchodzenia po łańcuchach. Turyści podali mu aspirynę. Pilna ewakuacja helikopterem, transport do Szpitala im. Rydygiera w Krakowie.",
    status: "resolved", priority: "critical", location: "Giewont",
    lat: 49.2504, lng: 19.9337, reportedAt: "2026-02-22T09:10:00",
    assignedRescuers: ["1", "4", "7"], resolvedAt: "2026-02-22T11:45:00"
  },
  {
    id: "i6", title: "Skręcenie stawu skokowego – Hala Gąsienicowa",
    description: "Kobieta 28 lat, upadek na oblodzonym szlaku przy Murowancu. Obrzęk lewego stawu skokowego, nie może obciążyć nogi. Transport na saniach do Kuźnic.",
    status: "resolved", priority: "medium", location: "Hala Gąsienicowa",
    lat: 49.2350, lng: 20.0100, reportedAt: "2026-02-21T14:00:00",
    assignedRescuers: ["7"], resolvedAt: "2026-02-21T16:00:00"
  },
  {
    id: "i7", title: "Uraz głowy – Dolina Kościeliska",
    description: "Mężczyzna 55 lat, uderzony odłamkiem lodu spadającym ze skały. Rana tłuczona głowy, krótkotrwała utrata przytomności. Pacjent przytomny, wymiotuje.",
    status: "resolved", priority: "high", location: "Dolina Kościeliska",
    lat: 49.2550, lng: 19.8800, reportedAt: "2026-02-20T11:30:00",
    assignedRescuers: ["3", "8"], resolvedAt: "2026-02-20T14:15:00"
  },
  {
    id: "i8", title: "Lawina – Kocioł Mięguszowiecki",
    description: "Zejście lawiny mokrej na szlaku do Szpiglasowej Przełęczy. Dwóch turystów częściowo zasypanych, wydobyci przez innych turystów. Jeden z poszkodowanych z podejrzeniem złamania żeber.",
    status: "resolved", priority: "critical", location: "Szpiglasowa Przełęcz",
    lat: 49.1950, lng: 20.0550, reportedAt: "2026-02-19T08:45:00",
    assignedRescuers: ["1", "2", "4", "5", "6"], resolvedAt: "2026-02-19T13:00:00"
  },
];

export const zones: Zone[] = [
  { id: "z1", name: "Doliny i drogi (do 1000 m n.p.m.)", difficulty: "easy", color: "hsl(var(--zone-easy))" },
  { id: "z2", name: "Hale i polany (1000–1500 m)", difficulty: "medium", color: "hsl(var(--zone-medium))" },
  { id: "z3", name: "Turnie i granie (1500–2000 m)", difficulty: "hard", color: "hsl(var(--zone-hard))" },
  { id: "z4", name: "Szczyty i ściany (>2000 m)", difficulty: "extreme", color: "hsl(var(--zone-extreme))" },
];

export const scheduleEntries: ScheduleEntry[] = [
  // 24.02
  { rescuerId: "1", date: "2026-02-24", shift: "day" },
  { rescuerId: "2", date: "2026-02-24", shift: "day" },
  { rescuerId: "3", date: "2026-02-24", shift: "day" },
  { rescuerId: "4", date: "2026-02-24", shift: "day" },
  { rescuerId: "5", date: "2026-02-24", shift: "day" },
  { rescuerId: "6", date: "2026-02-24", shift: "day" },
  { rescuerId: "7", date: "2026-02-24", shift: "day" },
  { rescuerId: "8", date: "2026-02-24", shift: "night" },
  { rescuerId: "9", date: "2026-02-24", shift: "night" },
  // 25.02
  { rescuerId: "1", date: "2026-02-25", shift: "night" },
  { rescuerId: "2", date: "2026-02-25", shift: "day" },
  { rescuerId: "3", date: "2026-02-25", shift: "night" },
  { rescuerId: "4", date: "2026-02-25", shift: "day" },
  { rescuerId: "8", date: "2026-02-25", shift: "day" },
  { rescuerId: "9", date: "2026-02-25", shift: "day" },
  { rescuerId: "10", date: "2026-02-25", shift: "day" },
  { rescuerId: "11", date: "2026-02-25", shift: "day" },
  // 26.02
  { rescuerId: "1", date: "2026-02-26", shift: "day" },
  { rescuerId: "5", date: "2026-02-26", shift: "day" },
  { rescuerId: "6", date: "2026-02-26", shift: "day" },
  { rescuerId: "7", date: "2026-02-26", shift: "night" },
  { rescuerId: "10", date: "2026-02-26", shift: "day" },
  { rescuerId: "11", date: "2026-02-26", shift: "night" },
  { rescuerId: "12", date: "2026-02-26", shift: "day" },
  // 27.02
  { rescuerId: "2", date: "2026-02-27", shift: "night" },
  { rescuerId: "3", date: "2026-02-27", shift: "day" },
  { rescuerId: "4", date: "2026-02-27", shift: "night" },
  { rescuerId: "5", date: "2026-02-27", shift: "day" },
  { rescuerId: "7", date: "2026-02-27", shift: "day" },
  { rescuerId: "9", date: "2026-02-27", shift: "day" },
  { rescuerId: "12", date: "2026-02-27", shift: "night" },
  // 28.02
  { rescuerId: "1", date: "2026-02-28", shift: "day" },
  { rescuerId: "6", date: "2026-02-28", shift: "day" },
  { rescuerId: "8", date: "2026-02-28", shift: "day" },
  { rescuerId: "10", date: "2026-02-28", shift: "day" },
  { rescuerId: "11", date: "2026-02-28", shift: "night" },
  { rescuerId: "12", date: "2026-02-28", shift: "day" },
];
