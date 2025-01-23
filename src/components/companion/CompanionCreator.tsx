import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanionForm from "./CompanionForm";

const CompanionCreator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const steps = [
    "personality",
    "interests",
    "background",
    "appearance",
    "review",
  ];

  const handleStepComplete = (step: number) => {
    setCurrentStep(step + 1);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Create Your AI Companion</span>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Your Companion</DialogTitle>
              </DialogHeader>
              <Tabs value={steps[currentStep]} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  {steps.map((step, index) => (
                    <TabsTrigger
                      key={step}
                      value={step}
                      disabled={index !== currentStep}
                    >
                      {step.charAt(0).toUpperCase() + step.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="personality" className="mt-4 space-y-4">
                  <CompanionForm
                    currentStep={currentStep}
                    onStepComplete={handleStepComplete}
                  />
                </TabsContent>
                {/* Other steps will be implemented later */}
                {steps.slice(1).map((step) => (
                  <TabsContent key={step} value={step} className="mt-4">
                    <h3 className="text-lg font-semibold">
                      {step.charAt(0).toUpperCase() + step.slice(1)}
                    </h3>
                    <p className="text-muted-foreground">
                      This step will be implemented soon...
                    </p>
                  </TabsContent>
                ))}
              </Tabs>
            </DialogContent>
          </Dialog>
        </CardTitle>
        <p className="text-muted-foreground">
          Before we start chatting, let's create your perfect AI companion together
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Click the plus icon above to start creating your companion. We'll guide
            you through the process step by step.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanionCreator;
