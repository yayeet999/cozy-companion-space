import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { UserCheck } from "lucide-react";

interface ProfileCardProps {
  username: string;
  age: number;
}

const ProfileCard = ({ username, age }: ProfileCardProps) => {
  return (
    <Card className="w-full transition-all duration-300 animate-in fade-in-50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
            {username}
            <UserCheck className="h-5 w-5 text-green-500" />
          </h3>
          <p className="text-sm text-muted-foreground">Profile Complete</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-secondary/50 p-2 rounded-md">
            <span className="text-sm">Age</span>
            <span className="text-sm font-medium">{age}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;