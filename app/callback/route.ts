import { handleAuth } from '@workos-inc/authkit-nextjs';

function getConvexSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) return '';
  return url.replace('.convex.cloud', '.convex.site');
}

async function createUserInConvex(user: {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}) {
  const siteUrl = getConvexSiteUrl();
  const secret = process.env.CALLBACK_CREATE_USER_SECRET;
  if (!siteUrl || !secret) return;

  const endpoint = `${siteUrl}/create-user-from-callback`;
  await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      authId: user.id,
      email: user.email,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
      secret,
    }),
  });
}

export const GET = handleAuth({
  returnPathname: '/dashboard',
  async onSuccess({ user }) {
    await createUserInConvex(user);
  },
});
