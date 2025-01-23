import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { 
  Heart, 
  Users, 
  ArrowRight,
  Book,
  Gamepad,
  Music,
  Football,
  Utensils,
  Plane,
  Palette,
  Film,
  Camera,
  Music2,
  Pen,
  Mountain,
  Flower2,
  Laptop,
  Shirt,
  Dumbbell
} from "lucide-react";

type RelationType = "friend" | "romantic" | null;

const CompanionForm = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [relationType, setRelationType] = useState<RelationType>(null);
  const [traits, setTraits] = useState<Record<string, number>>({});
  const [showInterests, setShowInterests] = useState(false);

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

  const sharedInterests = [
    { name: "Reading", icon: Book },
    { name: "Gaming", icon: Gamepad },
    { name: "Music", icon: Music },
    { name: "Sports", icon: Football },
    { name: "Cooking", icon: Utensils },
    { name: "Travel", icon: Plane },
    { name: "Art", icon: Palette },
    { name: "Movies", icon: Film }
  ];

  const companionInterests = [
    { name: "Photography", icon: Camera },
    { name: "Dancing", icon: Music2 },
    { name: "Writing", icon: Pen },
    { name: "Hiking", icon: Mountain },
    { name: "Gardening", icon: Flower2 },
    { name: "Technology", icon: Laptop },
    { name: "Fashion", icon: Shirt },
    { name: "Fitness", icon: Dumbbell }
  ];

  const handleTraitChange = (trait: string, value: number[]) => {
    setTraits((prev) => ({ ...prev, [trait]: value[0] }));
  };

  const hasTraitsSelected = Object.keys(traits).length >= 3;

  return (
    <div className={cn(
      "mx-auto transition-all duration-500",
      showInterests ? "max-w-7xl" : "max-w-2xl"
    )}>
      <div className={cn(
        "grid gap-6 transition-all duration-500",
        showInterests ? "md:grid-cols-2" : "grid-cols-1"
      )}>
        {/* Left Column - Basic Info & Traits */}
        <div className="space-y-4">
          {/* Basic Info Section */}
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

          {/* Relationship Type Selection */}
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

          {/* Traits Section */}
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

              {/* Continue Button */}
              {hasTraitsSelected && !showInterests && (
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={() => setShowInterests(true)}
                    className="group"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column - Interests Section */}
        {showInterests && (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            {/* Shared Interests */}
            <div className="space-y-3">
              <Label className="text-sm block">Shared Interests/Hobbies</Label>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {sharedInterests.map((interest, index) => (
                  <Card
                    key={interest.name}
                    className={cn(
                      "p-3 cursor-pointer hover:border-primary transition-all hover:scale-105",
                      "animate-in fade-in-50 zoom-in-95",
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <interest.icon className="h-5 w-5" />
                      <div className="text-sm text-center">{interest.name}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Companion Interests */}
            <div className="space-y-3">
              <Label className="text-sm block">Companion Interests/Hobbies</Label>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {companionInterests.map((interest, index) => (
                  <Card
                    key={interest.name}
                    className={cn(
                      "p-3 cursor-pointer hover:border-primary transition-all hover:scale-105",
                      "animate-in fade-in-50 zoom-in-95",
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <interest.icon className="h-5 w-5" />
                      <div className="text-sm text-center">{interest.name}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanionForm;
