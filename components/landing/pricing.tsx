import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started with networking.",
    price: "$0",
    period: "forever",
    popular: false,
    features: [
      "Up to 100 contacts",
      "Basic contact management",
      "5 coffee chat schedules/month",
      "Manual follow-up reminders",
      "Basic search & filters",
    ],
    cta: "Get Started Free",
    ctaVariant: "outline" as const,
  },
  {
    name: "Pro",
    description: "For serious networkers who want AI-powered insights.",
    price: "$12",
    period: "/month",
    popular: true,
    features: [
      "Unlimited contacts",
      "AI-powered insights & suggestions",
      "Unlimited coffee chat scheduling",
      "Smart follow-up reminders",
      "Relationship strength scoring",
      "AI agent recommendations",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    ctaVariant: "default" as const,
  },
  {
    name: "Team",
    description: "For teams that network and sell together.",
    price: "$29",
    period: "/user/month",
    popular: false,
    features: [
      "Everything in Pro",
      "Team shared contacts",
      "Collaboration tools",
      "Admin controls & permissions",
      "Team analytics dashboard",
      "SSO & advanced security",
      "Dedicated account manager",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Pricing
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Start free and upgrade as your network grows. No hidden fees.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-xl border bg-card p-6",
                plan.popular
                  ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                  : "border-border"
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-2.5 left-6">
                  Most Popular
                </Badge>
              )}

              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold tracking-tight text-foreground">
                  {plan.price}
                </span>
                <span className="text-xs text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="mt-6 flex flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <HugeiconsIcon
                      icon={CheckmarkCircle02Icon}
                      strokeWidth={2}
                      className="mt-0.5 size-3.5 shrink-0 text-primary"
                    />
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-2">
                <Button
                  variant={plan.ctaVariant}
                  size="lg"
                  className="h-9 w-full text-xs"
                  render={<a href="#" />}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
