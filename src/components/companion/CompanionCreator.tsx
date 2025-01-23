import { Plus } from "lucide-react";
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

const CompanionCreator = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Create Your AI Companion</span>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Your Companion</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="personality" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="personality">Personality</TabsTrigger>
                  <TabsTrigger value="interests">Interests</TabsTrigger>
                  <TabsTrigger value="background">Background</TabsTrigger>
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                  <TabsTrigger value="review">Review</TabsTrigger>
                </TabsList>
                <TabsContent value="personality" className="mt-4">
                  <h3 className="text-lg font-semibold">Define Personality</h3>
                  <p className="text-muted-foreground">
                    Choose your companion's core personality traits
                  </p>
                </TabsContent>
                <TabsContent value="interests" className="mt-4">
                  <h3 className="text-lg font-semibold">Set Interests</h3>
                  <p className="text-muted-foreground">
                    What topics interest your companion?
                  </p>
                </TabsContent>
                <TabsContent value="background" className="mt-4">
                  <h3 className="text-lg font-semibold">Create Background</h3>
                  <p className="text-muted-foreground">
                    Define your companion's history and experiences
                  </p>
                </TabsContent>
                <TabsContent value="appearance" className="mt-4">
                  <h3 className="text-lg font-semibold">Design Appearance</h3>
                  <p className="text-muted-foreground">
                    Customize how your companion looks
                  </p>
                </TabsContent>
                <TabsContent value="review" className="mt-4">
                  <h3 className="text-lg font-semibold">Final Review</h3>
                  <p className="text-muted-foreground">
                    Review and confirm your companion's details
                  </p>
                </TabsContent>
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