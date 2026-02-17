"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Coffee01Icon, Menu01Icon, Cancel01Icon, UserCircleIcon, Logout01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useAuth } from "@workos-inc/authkit-nextjs/components"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const { user, loading, signOut } = useAuth()

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <HugeiconsIcon icon={Coffee01Icon} strokeWidth={2} className="size-4" />
          </div>
          <span className="text-sm font-bold tracking-tight text-foreground">
            Coffee Agent
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 md:flex">
          {loading ? (
            <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="lg" className="gap-2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                    {user.profilePictureUrl ? (
                      <img
                        src={user.profilePictureUrl}
                        alt=""
                        className="size-8 rounded-full object-cover"
                      />
                    ) : (
                      (user.firstName?.[0] ?? user.email?.[0] ?? "?").toUpperCase()
                    )}
                  </span>
                  <span className="max-w-24 truncate text-left text-sm">
                    {user.firstName ?? user.email?.split("@")[0] ?? "Account"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <HugeiconsIcon icon={UserCircleIcon} strokeWidth={2} />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={async (e) => {
                    e.preventDefault()
                    await signOut()
                  }}
                >
                  <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="lg">
                  Sign in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <HugeiconsIcon
            icon={mobileMenuOpen ? Cancel01Icon : Menu01Icon}
            strokeWidth={2}
          />
        </Button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
              {user ? (
                <>
                  <Button variant="outline" size="lg" render={<Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} />}>
                    Dashboard
                  </Button>
                  <Button
                    size="lg"
                    variant="destructive"
                    onClick={async () => {
                      setMobileMenuOpen(false)
                      await signOut()
                    }}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="lg" render={<Link href="/login" onClick={() => setMobileMenuOpen(false)} />}>
                    Sign in
                  </Button>
                  <Button size="lg" render={<Link href="/signup" onClick={() => setMobileMenuOpen(false)} />}>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
