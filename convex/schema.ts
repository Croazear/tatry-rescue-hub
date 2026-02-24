import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rescuers: defineTable({
    name: v.string(),
    role: v.string(),
    status: v.union(v.literal("active"), v.literal("standby"), v.literal("off-duty")),
    color: v.string(),
    phone: v.string(),
    lat: v.number(),
    lng: v.number(),
    zone: v.string(),
  }),

  vehicles: defineTable({
    name: v.string(),
    type: v.union(
      v.literal("helicopter"),
      v.literal("quad"),
      v.literal("snowmobile"),
      v.literal("car"),
      v.literal("sled")
    ),
    status: v.union(v.literal("available"), v.literal("in-use"), v.literal("maintenance")),
    location: v.string(),
    assignedTo: v.optional(v.string()),
  }),

  incidents: defineTable({
    title: v.string(),
    description: v.string(),
    status: v.union(v.literal("active"), v.literal("resolved")),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("critical")),
    location: v.string(),
    lat: v.number(),
    lng: v.number(),
    reportedAt: v.string(),
    assignedRescuers: v.array(v.string()),
    resolvedAt: v.optional(v.string()),
  }),

  zones: defineTable({
    name: v.string(),
    difficulty: v.union(v.literal("easy"), v.literal("medium"), v.literal("hard"), v.literal("extreme")),
    color: v.string(),
  }),

  scheduleEntries: defineTable({
    rescuerId: v.string(),
    date: v.string(),
    shift: v.union(v.literal("day"), v.literal("night")),
  }),
});
