import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if already seeded
    const existing = await ctx.db.query("rescuers").first();
    if (existing) return "Already seeded";

    // Rescuers
    const rescuerIds: string[] = [];
    const rescuersData = [
      { name: "Jan Kowalski", role: "Kierownik zmiany", status: "active" as const, color: "#22c55e", phone: "+48 601 234 567", lat: 49.2320, lng: 19.9813, zone: "Kasprowy Wierch" },
      { name: "Anna Nowak", role: "Ratownik", status: "active" as const, color: "#3b82f6", phone: "+48 602 345 678", lat: 49.2295, lng: 19.9950, zone: "Morskie Oko" },
      { name: "Piotr Wiśniewski", role: "Ratownik", status: "active" as const, color: "#f59e0b", phone: "+48 603 456 789", lat: 49.2350, lng: 20.0100, zone: "Dolina Pięciu Stawów" },
      { name: "Katarzyna Zielińska", role: "Pilot helikoptera", status: "active" as const, color: "#ef4444", phone: "+48 604 567 890", lat: 49.2700, lng: 20.0880, zone: "Rysy" },
      { name: "Tomasz Lewandowski", role: "Ratownik", status: "standby" as const, color: "#8b5cf6", phone: "+48 605 678 901", lat: 49.2500, lng: 19.9700, zone: "Giewont" },
      { name: "Magdalena Dąbrowska", role: "Ratownik medyczny", status: "active" as const, color: "#06b6d4", phone: "+48 606 789 012", lat: 49.2450, lng: 20.0300, zone: "Hala Gąsienicowa" },
      { name: "Michał Szymański", role: "Ratownik", status: "off-duty" as const, color: "#ec4899", phone: "+48 607 890 123", lat: 0, lng: 0, zone: "-" },
      { name: "Agnieszka Woźniak", role: "Ratownik", status: "off-duty" as const, color: "#14b8a6", phone: "+48 608 901 234", lat: 0, lng: 0, zone: "-" },
    ];

    for (const r of rescuersData) {
      const id = await ctx.db.insert("rescuers", r);
      rescuerIds.push(id);
    }

    // Vehicles
    await ctx.db.insert("vehicles", { name: "Helikopter Sokół", type: "helicopter", status: "available", location: "Baza TOPR" });
    await ctx.db.insert("vehicles", { name: "Quad Polaris #1", type: "quad", status: "in-use", location: "Dolina Chochołowska", assignedTo: "Piotr Wiśniewski" });
    await ctx.db.insert("vehicles", { name: "Quad Polaris #2", type: "quad", status: "available", location: "Baza TOPR" });
    await ctx.db.insert("vehicles", { name: "Skuter śnieżny #1", type: "snowmobile", status: "available", location: "Baza TOPR" });
    await ctx.db.insert("vehicles", { name: "Skuter śnieżny #2", type: "snowmobile", status: "maintenance", location: "Warsztat" });
    await ctx.db.insert("vehicles", { name: "Land Rover Defender", type: "car", status: "available", location: "Baza TOPR" });
    await ctx.db.insert("vehicles", { name: "Sanie ratunkowe", type: "sled", status: "available", location: "Hala Gąsienicowa" });

    // Incidents (use rescuer Convex IDs)
    await ctx.db.insert("incidents", {
      title: "Turysta z urazem nogi – Kasprowy Wierch",
      description: "Mężczyzna 45 lat, złamanie podudzia na szlaku poniżej Kasprowego Wierchu. Wymaga transportu helikopterem.",
      status: "active", priority: "high", location: "Kasprowy Wierch",
      lat: 49.2320, lng: 19.9813, reportedAt: "2026-02-24T14:32:00",
      assignedRescuers: [rescuerIds[0], rescuerIds[3]],
    });
    await ctx.db.insert("incidents", {
      title: "Zagubiona grupa turystów – Dolina Pięciu Stawów",
      description: "Grupa 4 osób zgłasza, że zgubiła szlak w okolicach Doliny Pięciu Stawów. Mgła, widoczność poniżej 50m.",
      status: "active", priority: "medium", location: "Dolina Pięciu Stawów",
      lat: 49.2150, lng: 20.0100, reportedAt: "2026-02-24T13:15:00",
      assignedRescuers: [rescuerIds[2], rescuerIds[5]],
    });
    await ctx.db.insert("incidents", {
      title: "Hipotermia – Morskie Oko",
      description: "Kobieta 32 lata, objawy hipotermii po wpadnięciu do wody. Ratownik na miejscu udziela pierwszej pomocy.",
      status: "resolved", priority: "high", location: "Morskie Oko",
      lat: 49.2012, lng: 20.0715, reportedAt: "2026-02-24T10:45:00",
      assignedRescuers: [rescuerIds[1]], resolvedAt: "2026-02-24T12:30:00",
    });
    await ctx.db.insert("incidents", {
      title: "Opad kamieni – szlak na Rysy",
      description: "Zgłoszenie o opadzie kamieni na szlaku od Morskiego Oka do Rysów. Potencjalne zagrożenie dla turystów.",
      status: "resolved", priority: "low", location: "Rysy",
      lat: 49.1795, lng: 20.0880, reportedAt: "2026-02-23T16:20:00",
      assignedRescuers: [rescuerIds[4]], resolvedAt: "2026-02-23T18:00:00",
    });
    await ctx.db.insert("incidents", {
      title: "Zawał serca – Giewont",
      description: "Mężczyzna 62 lata, objawy zawału na szczycie Giewontu. Pilna ewakuacja helikopterem.",
      status: "resolved", priority: "critical", location: "Giewont",
      lat: 49.2504, lng: 19.9337, reportedAt: "2026-02-22T09:10:00",
      assignedRescuers: [rescuerIds[0], rescuerIds[3], rescuerIds[5]], resolvedAt: "2026-02-22T11:45:00",
    });
    await ctx.db.insert("incidents", {
      title: "Złamanie ręki – Hala Gąsienicowa",
      description: "Kobieta 28 lat, upadek na oblodzonym szlaku.",
      status: "resolved", priority: "medium", location: "Hala Gąsienicowa",
      lat: 49.2350, lng: 20.0100, reportedAt: "2026-02-21T14:00:00",
      assignedRescuers: [rescuerIds[5]], resolvedAt: "2026-02-21T16:00:00",
    });

    // Zones
    await ctx.db.insert("zones", { name: "Doliny (do 1200 m n.p.m.)", difficulty: "easy", color: "hsl(142 71% 45%)" });
    await ctx.db.insert("zones", { name: "Hale i polany (1200–1500 m)", difficulty: "medium", color: "hsl(38 92% 50%)" });
    await ctx.db.insert("zones", { name: "Szczyty niższe (1500–2000 m)", difficulty: "hard", color: "hsl(0 72% 51%)" });
    await ctx.db.insert("zones", { name: "Szczyty wysokie (>2000 m)", difficulty: "extreme", color: "hsl(280 80% 55%)" });

    // Schedule entries (use Convex IDs)
    const scheduleData = [
      { rescuerId: rescuerIds[0], date: "2026-02-24", shift: "day" as const },
      { rescuerId: rescuerIds[1], date: "2026-02-24", shift: "day" as const },
      { rescuerId: rescuerIds[2], date: "2026-02-24", shift: "day" as const },
      { rescuerId: rescuerIds[3], date: "2026-02-24", shift: "day" as const },
      { rescuerId: rescuerIds[4], date: "2026-02-24", shift: "night" as const },
      { rescuerId: rescuerIds[5], date: "2026-02-24", shift: "day" as const },
      { rescuerId: rescuerIds[0], date: "2026-02-25", shift: "night" as const },
      { rescuerId: rescuerIds[1], date: "2026-02-25", shift: "day" as const },
      { rescuerId: rescuerIds[2], date: "2026-02-25", shift: "night" as const },
      { rescuerId: rescuerIds[3], date: "2026-02-25", shift: "day" as const },
      { rescuerId: rescuerIds[6], date: "2026-02-25", shift: "day" as const },
      { rescuerId: rescuerIds[7], date: "2026-02-25", shift: "day" as const },
      { rescuerId: rescuerIds[0], date: "2026-02-26", shift: "day" as const },
      { rescuerId: rescuerIds[4], date: "2026-02-26", shift: "day" as const },
      { rescuerId: rescuerIds[5], date: "2026-02-26", shift: "night" as const },
      { rescuerId: rescuerIds[6], date: "2026-02-26", shift: "day" as const },
      { rescuerId: rescuerIds[7], date: "2026-02-26", shift: "night" as const },
      { rescuerId: rescuerIds[1], date: "2026-02-27", shift: "night" as const },
      { rescuerId: rescuerIds[2], date: "2026-02-27", shift: "day" as const },
      { rescuerId: rescuerIds[3], date: "2026-02-27", shift: "night" as const },
      { rescuerId: rescuerIds[4], date: "2026-02-27", shift: "day" as const },
      { rescuerId: rescuerIds[5], date: "2026-02-27", shift: "day" as const },
      { rescuerId: rescuerIds[0], date: "2026-02-28", shift: "day" as const },
      { rescuerId: rescuerIds[6], date: "2026-02-28", shift: "day" as const },
      { rescuerId: rescuerIds[7], date: "2026-02-28", shift: "day" as const },
      { rescuerId: rescuerIds[1], date: "2026-02-28", shift: "night" as const },
    ];

    for (const entry of scheduleData) {
      await ctx.db.insert("scheduleEntries", entry);
    }

    return "Seeded successfully";
  },
});
