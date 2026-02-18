import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

/**
 * HTTP action called by the WorkOS auth callback (onSuccess) to create the user
 * immediately, before redirect — avoids waiting for the webhook.
 *
 * Secured with CALLBACK_CREATE_USER_SECRET (must match Next.js env).
 */
export const createUserFromCallback = httpAction(async (ctx, request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const secret = process.env.CALLBACK_CREATE_USER_SECRET;
  if (!secret) {
    console.error("CALLBACK_CREATE_USER_SECRET is not set");
    return new Response("Server misconfiguration", { status: 500 });
  }

  let body: {
    authId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    secret: string;
  };

  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (body.secret !== secret) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { authId, email, firstName, lastName } = body;
  if (!authId || !email) {
    return new Response("Missing authId or email", { status: 400 });
  }

  const name = [firstName, lastName].filter(Boolean).join(" ").trim() || "User";

  try {
    await ctx.runMutation(internal.users.createUserFromCallback, {
      authId,
      email,
      name,
    });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("createUserFromCallback failed:", error);
    return new Response("Internal server error", { status: 500 });
  }
});
