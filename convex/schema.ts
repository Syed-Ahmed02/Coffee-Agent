import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    authId: v.string(),
    email: v.string(),
    name: v.string(),
    onboarded: v.boolean(),
    goals: v.optional(v.string()),
    whatYouWant: v.optional(v.string()),
    peopleTypes: v.optional(v.array(v.string())),
    industriesOrCompanies: v.optional(v.string()),
  }).index("authId", ["authId"]),
});
