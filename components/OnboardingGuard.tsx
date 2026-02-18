"use client";

import { useQuery, useMutation } from "convex/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { api } from "@/convex/_generated/api";

const ONBOARDING_PATH = "/onboarding";

export function OnboardingGuard({ children }: { children: ReactNode }) {
  const user = useQuery(api.users.getCurrentUser);
  const ensureUser = useMutation(api.users.ensureUser);
  const pathname = usePathname();
  const router = useRouter();
  const ensureUserCalled = useRef(false);

  // Fallback: create user from JWT if callback didn't run (e.g. network error)
  useEffect(() => {
    if (user !== null) return;
    if (ensureUserCalled.current) return;
    ensureUserCalled.current = true;
    void ensureUser();
  }, [user, ensureUser]);

  useEffect(() => {
    if (user === undefined) return; // still loading
    if (user === null) return; // not in DB yet
    if (!user.onboarded && pathname !== ONBOARDING_PATH) {
      router.replace(ONBOARDING_PATH);
    }
  }, [user, pathname, router]);

  // Avoid flashing protected content: show nothing while we're loading or about to redirect
  if (user === undefined) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  // User not in DB yet — ensureUser in progress (fallback if callback failed).
  if (user === null) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="flex flex-col items-center gap-6 px-6 text-center">
          <div className="size-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Setting up your account</p>
            <p className="text-xs text-muted-foreground">
              This usually takes just a moment. If it&apos;s taking longer, try refreshing the page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (user !== null && !user.onboarded && pathname !== ONBOARDING_PATH) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">
            Redirecting to onboarding…
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
