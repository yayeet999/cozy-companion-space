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
import CompanionForm from "./CompanionForm";

const CompanionCreator = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
            <DialogContent className="sm:max-w-[90vw] transition-all duration-500">
              <DialogHeader>
                <DialogTitle>Create Your Companion</DialogTitle>
              </DialogHeader>
              <CompanionForm />
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