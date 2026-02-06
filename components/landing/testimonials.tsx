import { HugeiconsIcon } from "@hugeicons/react"
import { QuoteUpIcon } from "@hugeicons/core-free-icons"

const testimonials = [
  {
    quote:
      "Coffee Agent completely changed how I manage my professional network. The AI recommendations are spot on — I've reconnected with people I would have lost touch with.",
    name: "Sarah Chen",
    role: "Product Manager at Stripe",
    initials: "SC",
  },
  {
    quote:
      "As a founder, networking is everything. Coffee Agent helps me stay on top of hundreds of relationships without it feeling like a chore. The follow-up reminders are a game changer.",
    name: "Marcus Rodriguez",
    role: "CEO at LaunchPad",
    initials: "MR",
  },
  {
    quote:
      "I used to lose track of people I met at conferences. Now, Coffee Agent's AI tells me exactly who to follow up with and when. It's like having a networking assistant.",
    name: "Emily Park",
    role: "Senior Engineer at Vercel",
    initials: "EP",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Testimonials
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Loved by networkers everywhere
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            See what professionals are saying about Coffee Agent.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <HugeiconsIcon
                icon={QuoteUpIcon}
                strokeWidth={1.5}
                className="size-8 text-primary/20"
              />
              <blockquote className="mt-4 flex-1 text-xs leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-[0.65rem] text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
