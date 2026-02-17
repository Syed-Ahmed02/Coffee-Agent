import { query, mutation } from "./_generated/server";

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