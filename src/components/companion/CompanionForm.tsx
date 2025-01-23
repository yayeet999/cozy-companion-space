import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Heart, Users } from "lucide-react";

type RelationType = "friend" | "romantic" | null;

const CompanionForm = () => {
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

  const handleRelationTypeSelect = (type: RelationType) => {
    setRelationType(type);
    setTraits({}); // Reset traits when changing type
  };

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
              relationType === "friend" && "border-primary bg-primary/5"
            )}
            onClick={() => handleRelationTypeSelect("friend")}
          >
            <div className="flex flex-col items-center space-y-2">
              <Users className="h-8 w-8" />
              <span>Friend</span>
            </div>
          </Card>
          <Card
            className={cn(
              "p-4 cursor-pointer hover:border-primary transition-colors",
              relationType === "romantic" && "border-primary bg-primary/5"
            )}
            onClick={() => handleRelationTypeSelect("romantic")}
          >
            <div className="flex flex-col items-center space-y-2">
              <Heart className="h-8 w-8" />
              <span>Romantic Partner</span>
            </div>
          </Card>
        </div>
      </div>

      {relationType && (
        <div className="space-y-8">
          <div className="text-sm text-muted-foreground">
            Adjust the sliders below to define your {relationType === "friend" ? "friend" : "partner"}'s personality traits
          </div>
          {(relationType === "friend" ? friendTraits : romanticTraits).map((trait) => (
            <div key={trait.key} className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>{trait.name}</Label>
                <span className="text-sm font-medium">
                  {traits[trait.key] || 0}/10
                </span>
              </div>
              <Slider
                value={[traits[trait.key] || 0]}
                max={10}
                step={1}
                onValueChange={(value) => handleTraitChange(trait.key, value)}
                className="cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanionForm;