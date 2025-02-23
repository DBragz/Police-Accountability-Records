import { useOnboarding } from "@/context/onboarding-context";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function OnboardingProgress() {
  const { steps, currentStep, progress, setCurrentStep } = useOnboarding();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Onboarding Progress
          <span className="text-sm font-normal text-muted-foreground">
            {progress}% Complete
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="mb-4" />
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "flex items-start gap-4 p-4 rounded-lg transition-colors",
                currentStep === step.id && "bg-muted",
                step.completed && "opacity-70"
              )}
              onClick={() => setCurrentStep(step.id)}
              role="button"
              tabIndex={0}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border",
                  step.completed ? "bg-primary border-primary" : "border-muted-foreground"
                )}
              >
                {step.completed ? (
                  <Check className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
