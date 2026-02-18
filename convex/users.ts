import { query, mutation, internalMutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Internal mutation: creates user from callback data (WorkOS onSuccess).
 * Used by the HTTP action when the auth callback fires — no webhook delay.
 */
export const createUserFromCallback = internalMutation({
  args: {
    authId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("authId", (q) => q.eq("authId", args.authId))
      .unique();

    if (existing) return existing._id;

    return ctx.db.insert("users", {
      authId: args.authId,
      email: args.email,
      name: args.name,
      onboarded: false,
    });
  },
});

/**
 * Fallback: creates user from JWT claims if they don't exist yet.
 * Used when the auth callback didn't create the user (e.g. network error).
 * Safe to call multiple times — no-op if user already exists.
 */
export const ensureUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const existing = await ctx.db
      .query("users")
      .withIndex("authId", (q) => q.eq("authId", identity.subject))
      .unique();

    if (existing) return existing._id;

    const email =
      (identity as { email?: string }).email ?? "unknown@example.com";
    const name =
      (identity as { name?: string }).name ??
      ([identity.givenName, identity.familyName].filter(Boolean).join(" ") || "User");

    await ctx.db.insert("users", {
      authId: identity.subject,
      email,
      name,
      onboarded: false,
    });

    const user = await ctx.db
      .query("users")
      .withIndex("authId", (q) => q.eq("authId", identity.subject))
      .unique();

    return user?._id ?? null;
  },
});

/**
 * Returns the Convex user for the currently authenticated identity (WorkOS).
 * Used by the onboarding guard to check onboarded status.
 */
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return ctx.db
      .query("users")
      .withIndex("authId", (q) => q.eq("authId", identity.subject))
      .unique();
  },
});

/**
 * Call this when the user completes the last step of onboarding.
 * You determine when to call it from your onboarding flow.
 */
export const setOnboarded = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const user = await ctx.db
      .query("users")
      .withIndex("authId", (q) => q.eq("authId", identity.subject))
      .unique();
    if (!user) throw new Error("User record not found");
    await ctx.db.patch(user._id, { onboarded: true });
    return user._id;
  },
});

/**
 * Completes onboarding by updating user profile and setting onboarded.
 * Call this on final step of the onboarding flow.
 */
export const completeOnboarding = mutation({
  args: {
    name: v.string(),
    goals: v.string(),
    whatYouWant: v.optional(v.string()),
    peopleTypes: v.optional(v.array(v.string())),
    industriesOrCompanies: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const user = await ctx.db
      .query("users")
      .withIndex("authId", (q) => q.eq("authId", identity.subject))
      .unique();
    if (!user) throw new Error("User record not found");
    await ctx.db.patch(user._id, {
      name: args.name,
      goals: args.goals,
      whatYouWant: args.whatYouWant,
      peopleTypes: args.peopleTypes,
      industriesOrCompanies: args.industriesOrCompanies,
      onboarded: true,
    });
    return user._id;
  },
});