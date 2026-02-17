"use client";

import { useQuery } from "convex/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { api } from "@/convex/_generated/api";

const ONBOARDING_PATH = "/onboarding";

export function OnboardingGuard({ children }: { children: ReactNode }) {
  const user = useQuery(api.users.getCurrentUser);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return; // still loading
    if (user === null) return; // not in DB yet (e.g. just signed up, webhook pending)
    if (!user.onboarded && pathname !== ONBOARDING_PATH) {
      router.replace(ONBOARDING_PATH);
    }
  }, [user, pathname, router]);

  // Avoid flashing protected content: show nothing while we're loading or about to redirect
  if (user === undefined) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="animate-pulse text-muted-foreground">Loading…</div>
      </div>
    );
  }
  if (user !== null && !user.onboarded && pathname !== ONBOARDING_PATH) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="animate-pulse text-muted-foreground">
          Redirecting to onboarding…
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
