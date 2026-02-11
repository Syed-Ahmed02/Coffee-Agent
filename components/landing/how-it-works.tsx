import { HugeiconsIcon } from "@hugeicons/react"
import { UserIcon, AiBrain01Icon, Coffee01Icon } from "@hugeicons/core-free-icons"

const steps = [
  {
    number: "01",
    icon: UserIcon,
    title: "Add Your Network",
    description:
      "Import contacts or add them manually. Capture details, notes, and context from every interaction to build your relationship database.",
    placeholder: "Import & organize contacts",
  },
  {
    number: "02",
    icon: AiBrain01Icon,
    title: "Let AI Do the Work",
    description:
      "Our AI analyzes your network, identifies connection opportunities, and suggests the best people to reach out to based on your goals.",
    placeholder: "AI-powered analysis",
  },
  {
    number: "03",
    icon: Coffee01Icon,
    title: "Build Relationships",
    description:
      "Schedule coffee chats, get timely follow-up reminders, and watch your professional network grow stronger over time.",
    placeholder: "Schedule & connect",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            How It Works
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Three simple steps to better networking
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Get started in minutes. No complicated setup — just add your contacts 
            and let Coffee Agent handle the rest.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="absolute top-10 left-[calc(50%+48px)] hidden h-px w-[calc(100%-96px)] bg-border lg:block" />
              )}

              {/* Step number & icon */}
              <div className="relative">
                <div className="flex size-20 items-center justify-center rounded-2xl border border-border bg-background shadow-sm">
                  <HugeiconsIcon icon={step.icon} strokeWidth={1.5} className="size-8 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-primary text-[0.6rem] font-bold text-primary-foreground">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <h3 className="mt-6 text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
                {step.description}
              </p>

              {/* Placeholder image */}
            
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
