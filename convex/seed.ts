import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("rescuers").first();
    if (existing) return "Already seeded";

    // Ratownicy TOPR
    const rescuerIds: string[] = [];
    const rescuersData = [
      { name: "Jan Kowalski", role: "Naczelnik TOPR", status: "active" as const, color: "#dc2626", phone: "+48 601 100 001", lat: 49.2710, lng: 19.9840, zone: "Baza Kuźnice" },
      { name: "Marek Gąsienica", role: "Kierownik zmiany", status: "active" as const, color: "#22c55e", phone: "+48 601 100 002", lat: 49.2320, lng: 19.9813, zone: "Kasprowy Wierch" },
      { name: "Anna Stoch-Byrska", role: "Ratownik medyczny", status: "active" as const, color: "#3b82f6", phone: "+48 601 100 003", lat: 49.2295, lng: 19.9950, zone: "Morskie Oko" },
      { name: "Piotr Chyc", role: "Pilot śmigłowca", status: "active" as const, color: "#f59e0b", phone: "+48 601 100 004", lat: 49.2700, lng: 19.9830, zone: "Baza Kuźnice" },
      { name: "Wojciech Mądry", role: "Ratownik wysokogórski", status: "active" as const, color: "#8b5cf6", phone: "+48 601 100 005", lat: 49.2504, lng: 19.9337, zone: "Giewont" },
      { name: "Tomasz Bukowski", role: "Ratownik", status: "active" as const, color: "#06b6d4", phone: "+48 601 100 006", lat: 49.2350, lng: 20.0100, zone: "Dolina Pięciu Stawów" },
      { name: "Katarzyna Hajduk", role: "Ratownik medyczny", status: "active" as const, color: "#ec4899", phone: "+48 601 100 007", lat: 49.2450, lng: 20.0300, zone: "Hala Gąsienicowa" },
      { name: "Łukasz Chowaniec", role: "Ratownik", status: "standby" as const, color: "#14b8a6", phone: "+48 601 100 008", lat: 49.2710, lng: 19.9840, zone: "Baza Kuźnice" },
      { name: "Bartłomiej Krzeptowski", role: "Ratownik", status: "standby" as const, color: "#f97316", phone: "+48 601 100 009", lat: 49.2710, lng: 19.9840, zone: "Baza Kuźnice" },
      { name: "Marcin Tybor", role: "Ratownik wysokogórski", status: "off-duty" as const, color: "#a855f7", phone: "+48 601 100 010", lat: 0, lng: 0, zone: "-" },
      { name: "Krzysztof Gąsienica-Byrcyn", role: "Ratownik", status: "off-duty" as const, color: "#64748b", phone: "+48 601 100 011", lat: 0, lng: 0, zone: "-" },
      { name: "Jakub Bachleda-Curuś", role: "Ratownik", status: "off-duty" as const, color: "#0ea5e9", phone: "+48 601 100 012", lat: 0, lng: 0, zone: "-" },
    ];

    for (const r of rescuersData) {
      const id = await ctx.db.insert("rescuers", r);
      rescuerIds.push(id);
    }

    // Pojazdy
    await ctx.db.insert("vehicles", { name: "Sokół W-3 Anakonda", type: "helicopter", status: "available", location: "Lądowisko Kuźnice" });
    await ctx.db.insert("vehicles", { name: "Quad Polaris Sportsman 570 #1", type: "quad", status: "in-use", location: "Dolina Chochołowska", assignedTo: "Tomasz Bukowski" });
    await ctx.db.insert("vehicles", { name: "Quad Polaris Sportsman 570 #2", type: "quad", status: "available", location: "Baza Kuźnice" });
    await ctx.db.insert("vehicles", { name: "Skuter Bombardier Lynx #1", type: "snowmobile", status: "in-use", location: "Hala Gąsienicowa", assignedTo: "Wojciech Mądry" });
    await ctx.db.insert("vehicles", { name: "Skuter Bombardier Lynx #2", type: "snowmobile", status: "available", location: "Baza Kuźnice" });
    await ctx.db.insert("vehicles", { name: "Skuter Bombardier Lynx #3", type: "snowmobile", status: "maintenance", location: "Warsztat Kuźnice" });
    await ctx.db.insert("vehicles", { name: "Land Rover Defender 110", type: "car", status: "available", location: "Baza Kuźnice" });
    await ctx.db.insert("vehicles", { name: "Toyota Hilux 4x4", type: "car", status: "available", location: "Baza Kuźnice" });
    await ctx.db.insert("vehicles", { name: "Sanie ratunkowe Akia #1", type: "sled", status: "available", location: "Kasprowy Wierch" });
    await ctx.db.insert("vehicles", { name: "Sanie ratunkowe Akia #2", type: "sled", status: "in-use", location: "Morskie Oko", assignedTo: "Anna Stoch-Byrska" });
    await ctx.db.insert("vehicles", { name: "Sanie ratunkowe Akia #3", type: "sled", status: "available", location: "Hala Gąsienicowa" });

    // Zdarzenia
    await ctx.db.insert("incidents", {
      title: "Złamanie podudzia – szlak Kasprowy Wierch",
      description: "Mężczyzna 45 lat poślizgnął się na oblodzonym szlaku poniżej stacji Kasprowy Wierch. Złamanie otwarte podudzia prawej nogi.",
      status: "active", priority: "high", location: "Kasprowy Wierch",
      lat: 49.2320, lng: 19.9813, reportedAt: "2026-02-24T14:32:00",
      assignedRescuers: [rescuerIds[1], rescuerIds[3]],
    });
    await ctx.db.insert("incidents", {
      title: "Zagubiona grupa – Dolina Pięciu Stawów",
      description: "Grupa 4 turystów zeszła ze szlaku. Gęsta mgła, widoczność poniżej 30 m.",
      status: "active", priority: "medium", location: "Dolina Pięciu Stawów",
      lat: 49.2150, lng: 20.0100, reportedAt: "2026-02-24T13:15:00",
      assignedRescuers: [rescuerIds[5], rescuerIds[6]],
    });
    await ctx.db.insert("incidents", {
      title: "Hipotermia – schronisko Morskie Oko",
      description: "Kobieta 32 lata, wpadła do potoku. Temperatura ciała 34°C.",
      status: "resolved", priority: "high", location: "Morskie Oko",
      lat: 49.2012, lng: 20.0715, reportedAt: "2026-02-24T10:45:00",
      assignedRescuers: [rescuerIds[2]], resolvedAt: "2026-02-24T12:30:00",
    });
    await ctx.db.insert("incidents", {
      title: "Opad skalny – szlak Rysy od Morskiego Oka",
      description: "Oberwanie fragmentu ściany skalnej powyżej Czarnego Stawu. Brak poszkodowanych.",
      status: "resolved", priority: "low", location: "Rysy",
      lat: 49.1795, lng: 20.0880, reportedAt: "2026-02-23T16:20:00",
      assignedRescuers: [rescuerIds[4]], resolvedAt: "2026-02-23T18:00:00",
    });
    await ctx.db.insert("incidents", {
      title: "Podejrzenie zawału – szczyt Giewontu",
      description: "Mężczyzna 62 lata, ból w klatce piersiowej podczas wchodzenia po łańcuchach. Pilna ewakuacja helikopterem.",
      status: "resolved", priority: "critical", location: "Giewont",
      lat: 49.2504, lng: 19.9337, reportedAt: "2026-02-22T09:10:00",
      assignedRescuers: [rescuerIds[0], rescuerIds[3], rescuerIds[6]], resolvedAt: "2026-02-22T11:45:00",
    });
    await ctx.db.insert("incidents", {
      title: "Skręcenie stawu skokowego – Hala Gąsienicowa",
      description: "Kobieta 28 lat, upadek na oblodzonym szlaku przy Murowancu.",
      status: "resolved", priority: "medium", location: "Hala Gąsienicowa",
      lat: 49.2350, lng: 20.0100, reportedAt: "2026-02-21T14:00:00",
      assignedRescuers: [rescuerIds[6]], resolvedAt: "2026-02-21T16:00:00",
    });
    await ctx.db.insert("incidents", {
      title: "Uraz głowy – Dolina Kościeliska",
      description: "Mężczyzna 55 lat, uderzony odłamkiem lodu. Rana tłuczona głowy, krótkotrwała utrata przytomności.",
      status: "resolved", priority: "high", location: "Dolina Kościeliska",
      lat: 49.2550, lng: 19.8800, reportedAt: "2026-02-20T11:30:00",
      assignedRescuers: [rescuerIds[2], rescuerIds[7]], resolvedAt: "2026-02-20T14:15:00",
    });
    await ctx.db.insert("incidents", {
      title: "Lawina – Kocioł Mięguszowiecki",
      description: "Zejście lawiny mokrej na szlaku do Szpiglasowej Przełęczy. Dwóch turystów częściowo zasypanych.",
      status: "resolved", priority: "critical", location: "Szpiglasowa Przełęcz",
      lat: 49.1950, lng: 20.0550, reportedAt: "2026-02-19T08:45:00",
      assignedRescuers: [rescuerIds[0], rescuerIds[1], rescuerIds[3], rescuerIds[4], rescuerIds[5]], resolvedAt: "2026-02-19T13:00:00",
    });

    // Strefy
    await ctx.db.insert("zones", { name: "Doliny i drogi (do 1000 m n.p.m.)", difficulty: "easy", color: "hsl(142 71% 45%)" });
    await ctx.db.insert("zones", { name: "Hale i polany (1000–1500 m)", difficulty: "medium", color: "hsl(38 92% 50%)" });
    await ctx.db.insert("zones", { name: "Turnie i granie (1500–2000 m)", difficulty: "hard", color: "hsl(0 72% 51%)" });
    await ctx.db.insert("zones", { name: "Szczyty i ściany (>2000 m)", difficulty: "extreme", color: "hsl(280 80% 55%)" });

    // Grafik (Convex IDs)
    const scheduleData = [
      { rescuerId: rescuerIds[0], date: "2026-02-24", shift: "day" as const },
      { rescuerId: rescuerIds[1], date: "2026-02-24", shift: "day" as const },
      { rescuerId: rescuerIds[2], date: "2026-02-24", shift: "day" as const },
      { rescuerId: rescuerIds[3], date: "2026-02-24", shift: "day" as const },
      { rescuerId: rescuerIds[4], date: "2026-02-24", shift: "day" as const },
      { rescuerId: rescuerIds[5], date: "2026-02-24", shift: "day" as const },
      { rescuerId: rescuerIds[6], date: "2026-02-24", shift: "day" as const },
      { rescuerId: rescuerIds[7], date: "2026-02-24", shift: "night" as const },
      { rescuerId: rescuerIds[8], date: "2026-02-24", shift: "night" as const },
      { rescuerId: rescuerIds[0], date: "2026-02-25", shift: "night" as const },
      { rescuerId: rescuerIds[1], date: "2026-02-25", shift: "day" as const },
      { rescuerId: rescuerIds[2], date: "2026-02-25", shift: "night" as const },
      { rescuerId: rescuerIds[3], date: "2026-02-25", shift: "day" as const },
      { rescuerId: rescuerIds[7], date: "2026-02-25", shift: "day" as const },
      { rescuerId: rescuerIds[8], date: "2026-02-25", shift: "day" as const },
      { rescuerId: rescuerIds[9], date: "2026-02-25", shift: "day" as const },
      { rescuerId: rescuerIds[10], date: "2026-02-25", shift: "day" as const },
      { rescuerId: rescuerIds[0], date: "2026-02-26", shift: "day" as const },
      { rescuerId: rescuerIds[4], date: "2026-02-26", shift: "day" as const },
      { rescuerId: rescuerIds[5], date: "2026-02-26", shift: "day" as const },
      { rescuerId: rescuerIds[6], date: "2026-02-26", shift: "night" as const },
      { rescuerId: rescuerIds[9], date: "2026-02-26", shift: "day" as const },
      { rescuerId: rescuerIds[10], date: "2026-02-26", shift: "night" as const },
      { rescuerId: rescuerIds[11], date: "2026-02-26", shift: "day" as const },
      { rescuerId: rescuerIds[1], date: "2026-02-27", shift: "night" as const },
      { rescuerId: rescuerIds[2], date: "2026-02-27", shift: "day" as const },
      { rescuerId: rescuerIds[3], date: "2026-02-27", shift: "night" as const },
      { rescuerId: rescuerIds[4], date: "2026-02-27", shift: "day" as const },
      { rescuerId: rescuerIds[6], date: "2026-02-27", shift: "day" as const },
      { rescuerId: rescuerIds[8], date: "2026-02-27", shift: "day" as const },
      { rescuerId: rescuerIds[11], date: "2026-02-27", shift: "night" as const },
      { rescuerId: rescuerIds[0], date: "2026-02-28", shift: "day" as const },
      { rescuerId: rescuerIds[5], date: "2026-02-28", shift: "day" as const },
      { rescuerId: rescuerIds[7], date: "2026-02-28", shift: "day" as const },
      { rescuerId: rescuerIds[9], date: "2026-02-28", shift: "day" as const },
      { rescuerId: rescuerIds[10], date: "2026-02-28", shift: "night" as const },
      { rescuerId: rescuerIds[11], date: "2026-02-28", shift: "day" as const },
    ];

    for (const entry of scheduleData) {
      await ctx.db.insert("scheduleEntries", entry);
    }

    return "Seeded successfully";
  },
});
