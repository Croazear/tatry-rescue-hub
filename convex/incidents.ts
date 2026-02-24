import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("incidents").collect();
  },
});

export const assignRescuers = mutation({
  args: {
    incidentId: v.id("incidents"),
    rescuerIds: v.array(v.string()),
    vehicleIds: v.array(v.string()),
  },
  handler: async (ctx, { incidentId, rescuerIds, vehicleIds }) => {
    const incident = await ctx.db.get(incidentId);
    if (!incident) throw new Error("Incident not found");

    const merged = [...new Set([...incident.assignedRescuers, ...rescuerIds])];
    await ctx.db.patch(incidentId, { assignedRescuers: merged });
  },
});

export const resolve = mutation({
  args: { incidentId: v.id("incidents") },
  handler: async (ctx, { incidentId }) => {
    const incident = await ctx.db.get(incidentId);
    if (!incident) throw new Error("Incident not found");
    await ctx.db.patch(incidentId, {
      status: "resolved",
      resolvedAt: new Date().toISOString(),
    });
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("critical")),
    location: v.string(),
    lat: v.number(),
    lng: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("incidents", {
      ...args,
      status: "active",
      reportedAt: new Date().toISOString(),
      assignedRescuers: [],
    });
  },
});
