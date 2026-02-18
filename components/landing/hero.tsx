import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, SparklesIcon } from "@hugeicons/core-free-icons"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <div className="flex flex-col items-start gap-6">
            <Badge variant="secondary" className="gap-1.5">
              <HugeiconsIcon icon={SparklesIcon} strokeWidth={2} className="size-3" />
              AI-Powered Networking CRM
            </Badge>

            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              Build Meaningful Connections,{" "}
              <span className="text-primary">One Coffee at a Time</span>
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              The smart CRM that helps you nurture your professional network. 
              Track relationships, schedule coffee chats, and let AI guide you 
              to the right connections.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/signup"
                className="inline-flex h-10 items-center justify-center gap-1 rounded-md border border-transparent bg-primary px-5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4"
              >
                Get Started Free
                <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} data-icon="inline-end" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex h-10 items-center justify-center gap-1 rounded-md border border-border bg-transparent px-5 text-sm font-medium transition-colors hover:bg-input/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-input/30 [&_svg]:size-4"
              >
                See How It Works
              </Link>
            </div>

            <p className="text-xs text-muted-foreground">
              Free forever for up to 100 contacts. No credit card required.
            </p>
          </div>

          {/* Right placeholder image */}
          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-muted/50 shadow-2xl shadow-primary/5">
              <div className="flex h-full flex-col items-center justify-center gap-3 p-8">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                  <HugeiconsIcon icon={SparklesIcon} strokeWidth={1.5} className="size-8 text-primary" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Product Screenshot
                </p>
                <p className="text-xs text-muted-foreground/60">
                  Replace with your app screenshot
                </p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 size-24 rounded-2xl border border-border bg-background shadow-lg hidden lg:flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">150+</div>
                <div className="text-[0.6rem] text-muted-foreground">Connections</div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 size-20 rounded-2xl border border-border bg-background shadow-lg hidden lg:flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">AI</div>
                <div className="text-[0.6rem] text-muted-foreground">Powered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
