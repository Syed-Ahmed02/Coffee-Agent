"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { api } from "@/convex/_generated/api";

const STEPS = [
  {
    title: "What's your name?",
    description: "We'll use this to personalize your experience.",
  },
  {
    title: "What are your goals?",
    description: "e.g. more coffee chats, a stronger network, building relationships",
  },
  {
    title: "What would make this app valuable for you?",
    description: "Optional.",
  },
  {
    title: "Who do you want to connect with?",
    description: "Select all that apply.",
  },
  {
    title: "Any industries or companies you're focusing on?",
    description: "Optional — we'll tailor your experience.",
  },
] as const;

const PEOPLE_TYPE_OPTIONS = [
  "Recruiters",
  "Professionals",
  "Founders",
  "Investors",
  "Hiring managers",
  "Mentors",
  "Peers in my field",
] as const;

const TOTAL_STEPS = STEPS.length;

export default function Onboarding() {
  const router = useRouter();
  const user = useQuery(api.users.getCurrentUser);
  const completeOnboarding = useMutation(api.users.completeOnboarding);

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [goals, setGoals] = useState("");
  const [whatYouWant, setWhatYouWant] = useState("");
  const [peopleTypes, setPeopleTypes] = useState<string[]>([]);
  const [industriesOrCompanies, setIndustriesOrCompanies] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  const handleNext = () => {
    setError(null);
    if (step === 0) {
      const trimmed = name.trim();
      if (!trimmed) {
        setError("Please enter your name.");
        return;
      }
    }
    if (step === 1) {
      const trimmed = goals.trim();
      if (!trimmed) {
        setError("Please tell us about your goals.");
        return;
      }
    }
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await completeOnboarding({
        name: name.trim(),
        goals: goals.trim(),
        whatYouWant: whatYouWant.trim() || undefined,
        peopleTypes: peopleTypes.length > 0 ? peopleTypes : undefined,
        industriesOrCompanies: industriesOrCompanies.trim() || undefined,
      });
      router.push("/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setError(null);
    if (step > 0) setStep((s) => s - 1);
  };

  const currentStep = STEPS[step];
  const isLastStep = step === TOTAL_STEPS - 1;

  return (
    <div className="grid min-h-screen place-items-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <p className="text-muted-foreground text-sm">
            Step {step + 1} of {TOTAL_STEPS}
          </p>
          <CardTitle className="text-lg">{currentStep.title}</CardTitle>
          {currentStep.description && (
            <p className="text-muted-foreground text-sm">{currentStep.description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && (
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex"
                autoFocus
              />
              {error && <FieldError>{error}</FieldError>}
            </Field>
          )}
          {step === 1 && (
            <Field>
              <FieldLabel htmlFor="goals">Goals</FieldLabel>
              <Textarea
                id="goals"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="e.g. Schedule 2 coffee chats per week, strengthen my network..."
                rows={3}
                autoFocus
              />
              {error && <FieldError>{error}</FieldError>}
            </Field>
          )}
          {step === 2 && (
            <Field>
              <FieldLabel htmlFor="whatYouWant">What would help you most?</FieldLabel>
              <Textarea
                id="whatYouWant"
                value={whatYouWant}
                onChange={(e) => setWhatYouWant(e.target.value)}
                placeholder="e.g. Reminders to follow up, tracking who I've met..."
                rows={3}
                autoFocus
              />
              {error && <FieldError>{error}</FieldError>}
            </Field>
          )}
          {step === 3 && (
            <Field>
              <FieldLabel>Select the types of people you want to connect with</FieldLabel>
              <div className="flex flex-wrap gap-2 pt-1">
                {PEOPLE_TYPE_OPTIONS.map((option) => {
                  const isSelected = peopleTypes.includes(option);
                  return (
                    <Button
                      key={option}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className="h-auto py-2 px-3 text-xs"
                      onClick={() => {
                        setPeopleTypes((prev) =>
                          isSelected ? prev.filter((p) => p !== option) : [...prev, option]
                        );
                      }}
                    >
                      {option}
                    </Button>
                  );
                })}
              </div>
              {error && <FieldError>{error}</FieldError>}
            </Field>
          )}
          {step === 4 && (
            <Field>
              <FieldLabel htmlFor="industriesOrCompanies">Industries or companies</FieldLabel>
              <Textarea
                id="industriesOrCompanies"
                value={industriesOrCompanies}
                onChange={(e) => setIndustriesOrCompanies(e.target.value)}
                placeholder="e.g. Fintech, healthcare, early-stage startups..."
                rows={3}
                autoFocus
              />
              {error && <FieldError>{error}</FieldError>}
            </Field>
          )}
        </CardContent>
        <CardFooter className="flex justify-between gap-4 border-t pt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 0 || isSubmitting}
          >
            Back
          </Button>
          <Button onClick={handleNext} disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : isLastStep ? "Get started" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
