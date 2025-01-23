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

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* Basic Info Section - More compact with grid layout */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="name" className="text-sm">AI Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="nickname" className="text-sm">Nickname</Label>
          <Input
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter nickname"
            className="mt-1"
          />
        </div>
      </div>

      {/* Relationship Type Selection - More compact cards */}
      <div>
        <Label className="text-sm block mb-2">Relationship Type</Label>
        <div className="grid grid-cols-2 gap-3">
          <Card
            className={cn(
              "p-3 cursor-pointer hover:border-primary transition-colors",
              relationType === "friend" && "border-primary bg-primary/5"
            )}
            onClick={() => setRelationType("friend")}
          >
            <div className="flex items-center gap-2 justify-center">
              <Users className="h-5 w-5" />
              <span className="text-sm">Friend</span>
            </div>
          </Card>
          <Card
            className={cn(
              "p-3 cursor-pointer hover:border-primary transition-colors",
              relationType === "romantic" && "border-primary bg-primary/5"
            )}
            onClick={() => setRelationType("romantic")}
          >
            <div className="flex items-center gap-2 justify-center">
              <Heart className="h-5 w-5" />
              <span className="text-sm">Romantic Partner</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Traits Section - Compact grid layout for sliders */}
      {relationType && (
        <div className="space-y-3">
          <Label className="text-sm">Personality Traits</Label>
          <div className="grid gap-4">
            {(relationType === "friend" ? friendTraits : romanticTraits).map((trait) => (
              <div key={trait.key} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{trait.name}</span>
                  <span className="font-medium min-w-[2rem] text-right">
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
        </div>
      )}
    </div>
  );
};

export default CompanionForm;