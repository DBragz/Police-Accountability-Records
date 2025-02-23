import { createContext, useContext, useState, ReactNode } from "react";

type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

const defaultSteps: OnboardingStep[] = [
  {
    id: "profile",
    title: "Setup Profile",
    description: "Complete your user profile",
    completed: false,
  },
  {
    id: "tutorial",
    title: "Platform Tutorial",
    description: "Learn how to use the platform",
    completed: false,
  },
  {
    id: "first-record",
    title: "First Record",
    description: "Submit your first accountability record",
    completed: false,
  },
];

type OnboardingContextType = {
  steps: OnboardingStep[];
  currentStep: string;
  completeStep: (stepId: string) => void;
  setCurrentStep: (stepId: string) => void;
  progress: number;
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [steps, setSteps] = useState<OnboardingStep[]>(defaultSteps);
  const [currentStep, setCurrentStep] = useState(steps[0].id);

  const completeStep = (stepId: string) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, completed: true } : step
      )
    );
  };

  const progress = Math.round(
    (steps.filter((step) => step.completed).length / steps.length) * 100
  );

  return (
    <OnboardingContext.Provider
      value={{
        steps,
        currentStep,
        completeStep,
        setCurrentStep,
        progress,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
