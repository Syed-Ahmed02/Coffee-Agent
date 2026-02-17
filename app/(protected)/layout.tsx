import "./globals.css";
import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import { OnboardingGuard } from "@/components/OnboardingGuard";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await withAuth({ ensureSignedIn: true });
  if (!user) redirect("/login");

  return (
    <AuthKitProvider>
      <OnboardingGuard>{children}</OnboardingGuard>
    </AuthKitProvider>
  );
}
