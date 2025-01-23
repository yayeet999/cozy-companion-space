import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Heart, Users } from "lucide-react";

type RelationType = "friend" | "romantic" | null;

interface CompanionFormProps {
  currentStep: number;
  onStepComplete: (step: number) => void;
}

const CompanionForm = ({ currentStep, onStepComplete }: CompanionFormProps) => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [relationType, setRelationType] = useState<RelationType>(null);
  const [traits, setTraits] = useState<Record<string, number>>({});

  const friendTraits = [
    { name: "Empathy/supportiveness", key: "empathy" },
    { name: "Platonic Affection", key: "platonic_affection" },
    { name: "Humor/Playfulness", key: "humor" },
    { name: "Honesty", key: "honesty" },
  ];

  const romanticTraits = [
    { name: "Empathy", key: "empathy" },
    { name: "Flirtatiousness", key: "flirtatiousness" },
    { name: "Affection", key: "affection" },
    { name: "Jealousy/Clinginess", key: "jealousy" },
    { name: "Humor/Playfulness", key: "humor" },
  ];

  const handleTraitChange = (trait: string, value: number[]) => {
    setTraits((prev) => ({ ...prev, [trait]: value[0] }));
  };

  const currentTraits = relationType === "friend" ? friendTraits : romanticTraits;
  const requiredTraitCount = relationType === "friend" ? 4 : 5;
  const hasAllTraits = Object.keys(traits).length >= requiredTraitCount;

  const handleNextStep = () => {
    if (currentStep === 0 && name && nickname && relationType) {
      onStepComplete(0);
    } else if (currentStep === 1 && hasAllTraits) {
      onStepComplete(1);
    }
  };

  if (currentStep === 0) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">AI Companion Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a name"
            />
          </div>
          <div>
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter a nickname"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Relationship Type</Label>
          <div className="grid grid-cols-2 gap-4">
            <Card
              className={cn(
                "p-4 cursor-pointer hover:border-primary transition-colors",
                relationType === "friend" && "border-primary"
              )}
              onClick={() => setRelationType("friend")}
            >
              <div className="flex flex-col items-center space-y-2">
                <Users className="h-8 w-8" />
                <span>Friend</span>
              </div>
            </Card>
            <Card
              className={cn(
                "p-4 cursor-pointer hover:border-primary transition-colors",
                relationType === "romantic" && "border-primary"
              )}
              onClick={() => setRelationType("romantic")}
            >
              <div className="flex flex-col items-center space-y-2">
                <Heart className="h-8 w-8" />
                <span>Romantic Partner</span>
              </div>
            </Card>
          </div>
        </div>
        <Button
          className="w-full"
          onClick={handleNextStep}
          disabled={!name || !nickname || !relationType}
        >
          Continue
        </Button>
      </div>
    );
  }

  if (currentStep === 1) {
    return (
      <div className="space-y-8">
        <div className="text-sm text-muted-foreground">
          Adjust the sliders below to define your companion's personality traits
        </div>
        {currentTraits.map((trait) => (
          <div key={trait.key} className="space-y-4">
            <Label>
              {trait.name}: {traits[trait.key] || 0}
            </Label>
            <Slider
              defaultValue={[traits[trait.key] || 0]}
              max={10}
              step={1}
              onValueChange={(value) => handleTraitChange(trait.key, value)}
            />
          </div>
        ))}
        <Button
          className="w-full"
          onClick={handleNextStep}
          disabled={!hasAllTraits}
        >
          Continue
        </Button>
      </div>
    );
  }

  return null;
};

export default CompanionForm;