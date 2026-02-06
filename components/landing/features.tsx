import { HugeiconsIcon } from "@hugeicons/react"
import {
  AddressBookIcon,
  Coffee01Icon,
  AiBrain01Icon,
  ChartRelationshipIcon,
  Notification01Icon,
  AiNetworkIcon,
} from "@hugeicons/core-free-icons"

const features = [
  {
    icon: AddressBookIcon,
    title: "Contact Management",
    description:
      "Keep track of everyone you meet. Store notes, details, and context so you never forget a conversation.",
  },
  {
    icon: Coffee01Icon,
    title: "Coffee Chat Scheduling",
    description:
      "Effortlessly schedule and manage 1-on-1 coffee chats. Stay on top of your networking calendar.",
  },
  {
    icon: AiBrain01Icon,
    title: "AI-Powered Insights",
    description:
      "Get smart suggestions about who to reconnect with, conversation starters, and relationship health scores.",
  },
  {
    icon: ChartRelationshipIcon,
    title: "Relationship Tracking",
    description:
      "Visualize your interaction history and relationship strength. See who you're losing touch with.",
  },
  {
    icon: Notification01Icon,
    title: "Follow-up Reminders",
    description:
      "Never let a connection go cold. Automated reminders ensure you stay in touch with the people who matter.",
  },
  {
    icon: AiNetworkIcon,
    title: "AI Agent Recommendations",
    description:
      "Our AI agents analyze your network and recommend the right people to connect with at the right time.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Features
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Everything you need to grow your network
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Coffee Agent combines smart contact management with AI-powered insights
            to help you build and maintain meaningful professional relationships.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <HugeiconsIcon icon={feature.icon} strokeWidth={1.5} className="size-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
