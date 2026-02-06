"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "What is Coffee Agent?",
    answer:
      "Coffee Agent is an AI-powered networking CRM that helps you build and maintain meaningful professional relationships. It tracks your contacts, schedules coffee chats, sends follow-up reminders, and uses AI to recommend who you should connect with next.",
  },
  {
    question: "How does the AI recommendation engine work?",
    answer:
      "Our AI analyzes your interaction history, relationship strength, professional goals, and network patterns to suggest the most valuable connections. It considers factors like how long since you last connected, shared interests, and potential mutual benefits.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Absolutely. We take data privacy very seriously. All data is encrypted at rest and in transit. We never sell your data or share it with third parties. You can export or delete your data at any time.",
  },
  {
    question: "Can I import my existing contacts?",
    answer:
      "Yes! Coffee Agent supports importing contacts from CSV files, LinkedIn exports, Google Contacts, and more. We make it easy to get started with your existing network.",
  },
  {
    question: "What happens when I reach the free plan limit?",
    answer:
      "On the free plan, you can manage up to 100 contacts. Once you reach the limit, you can upgrade to Pro for unlimited contacts and AI-powered features. Your existing data is never deleted.",
  },
  {
    question: "Do I need a credit card to sign up?",
    answer:
      "No! You can start using Coffee Agent completely free with no credit card required. Only upgrade to a paid plan when you're ready for more features and capacity.",
  },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-foreground"
      >
        <span className="text-sm font-medium text-foreground">{question}</span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          strokeWidth={2}
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-xs leading-relaxed text-muted-foreground">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl">
          {/* Section header */}
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              FAQ
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Everything you need to know about Coffee Agent.
            </p>
          </div>

          {/* FAQ items */}
          <div className="mt-12 rounded-xl border border-border bg-card px-6">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
