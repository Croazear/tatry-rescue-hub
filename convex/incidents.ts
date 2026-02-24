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
