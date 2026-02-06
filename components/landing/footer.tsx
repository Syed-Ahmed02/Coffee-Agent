import { HugeiconsIcon } from "@hugeicons/react"
import { Coffee01Icon, NewTwitterIcon, GithubIcon, Linkedin01Icon } from "@hugeicons/core-free-icons"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
}

const socials = [
  { icon: NewTwitterIcon, label: "Twitter", href: "#" },
  { icon: GithubIcon, label: "GitHub", href: "#" },
  { icon: Linkedin01Icon, label: "LinkedIn", href: "#" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <HugeiconsIcon icon={Coffee01Icon} strokeWidth={2} className="size-4" />
              </div>
              <span className="text-sm font-bold tracking-tight text-foreground">
                Coffee Agent
              </span>
            </a>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">
              The AI-powered networking CRM that helps you build meaningful 
              professional connections, one coffee at a time.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <HugeiconsIcon icon={social.icon} strokeWidth={1.5} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold text-foreground">{group.title}</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Coffee Agent. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with care for networkers everywhere.
          </p>
        </div>
      </div>
    </footer>
  )
}
