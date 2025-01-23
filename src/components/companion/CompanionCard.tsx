import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users } from "lucide-react";

interface CompanionCardProps {
  name: string;
  nickname?: string | null;
  relationType: "friend" | "romantic";
  traits: Record<string, number>;
  interests: string[];
}

const CompanionCard = ({
  name,
  nickname,
  relationType,
  traits,
  interests,
}: CompanionCardProps) => {
  return (
    <Card className="w-full transition-all duration-300 animate-in fade-in-50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            {name}
            {nickname && (
              <span className="ml-2 text-sm text-muted-foreground">
                ({nickname})
              </span>
            )}
          </h3>
          <div className="flex items-center space-x-2">
            {relationType === "romantic" ? (
              <Heart className="h-4 w-4 text-rose-500" />
            ) : (
              <Users className="h-4 w-4 text-blue-500" />
            )}
            <span className="text-sm capitalize text-muted-foreground">
              {relationType} Companion
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Personality Traits</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(traits).map(([trait, value]) => (
                <div
                  key={trait}
                  className="flex items-center justify-between bg-secondary/50 p-2 rounded-md"
                >
                  <span className="text-sm capitalize">
                    {trait.replace(/_/g, " ")}
                  </span>
                  <span className="text-sm font-medium">{value}/10</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Interests</h4>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanionCard;