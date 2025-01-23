import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Heart, Users, ArrowRight } from "lucide-react";

type RelationType = "friend" | "romantic" | null;

const CompanionForm = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [relationType, setRelationType] = useState<RelationType>(null);
  const [traits, setTraits] = useState<Record<string, number>>({});
  const [showInterests, setShowInterests] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set());

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

  const interestsList = [
    { title: "Fitness pal", description: "Exercise and motivation partner" },
    { title: "Gaming Buddy", description: "Video game companion" },
    { title: "Music/Movie buff", description: "Film and music enthusiast" },
    { title: "Book club", description: "Reading and discussion group" },
    { title: "Travel", description: "Exploring new destinations" },
    { title: "Cooking squad", description: "Culinary and recipes" },
    { title: "Wanderlust buddy", description: "Adventure and Experiences" },
    { title: "Tech geek", description: "Tech and gadgets fan" },
    { title: "Trivia Master", description: "Fun trivia and quizzes" },
    { title: "Sports Fan", description: "Discuss games and teams" },
    { title: "Science Nerd", description: "Science topics and discoveries" },
    { title: "History Buff", description: "Historical events and stories" }
  ];

  const handleTraitChange = (trait: string, value: number[]) => {
    setTraits((prev) => ({ ...prev, [trait]: value[0] }));
  };

  const handleInterestSelect = (interest: string) => {
    setSelectedInterests(prev => {
      const newSet = new Set(prev);
      if (newSet.has(interest)) {
        newSet.delete(interest);
      } else if (newSet.size < 4) {
        newSet.add(interest);
      }
      return newSet;
    });
  };

  const hasTraitsSelected = Object.keys(traits).length >= 3;
  const hasValidInterests = selectedInterests.size >= 1;
  const remainingSelections = selectedInterests.size === 0 
    ? "Select at least 1 interest (maximum 4)"
    : selectedInterests.size === 4 
    ? "Maximum selections reached"
    : `Selected ${selectedInterests.size} interest${selectedInterests.size !== 1 ? 's' : ''} (${4 - selectedInterests.size} more available)`;

  const handleSave = () => {
    // Handle save logic here
    console.log("Selected interests:", Array.from(selectedInterests));
  };

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
            {/* Selection Notice */}
            <div className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
              {remainingSelections}
            </div>

            {/* AI Companion Interests */}
            <div className="space-y-3">
              <Label className="text-sm block">AI Companion Interests/Hobbies</Label>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {interestsList.map((interest, index) => (
                  <Card
                    key={interest.title}
                    onClick={() => handleInterestSelect(interest.title)}
                    className={cn(
                      "p-3 cursor-pointer hover:border-primary transition-all hover:scale-105",
                      "animate-in fade-in-50 zoom-in-95",
                      selectedInterests.has(interest.title) && "border-primary bg-primary/5"
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div className="space-y-1">
                      <div className="text-sm text-center font-medium">{interest.title}</div>
                      <div className="text-xs text-center text-muted-foreground">{interest.description}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Create Companion Button */}
            {hasValidInterests && (
              <div className="flex justify-end mt-6">
                <Button onClick={handleSave}>
                  Create Companion!
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanionForm;