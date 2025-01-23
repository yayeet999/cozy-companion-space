import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CompanionCreator from "@/components/companion/CompanionCreator";
import CompanionCard from "@/components/companion/CompanionCard";
import ProfileCard from "@/components/profile/ProfileCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import { useUser } from "@/providers/UserProvider";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Home = () => {
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  const { profile, companion, isLoading, refetchProfile } = useUser();
  const { toast } = useToast();

  const isValidAge = Number(age) >= 18;
  const canSave = nickname.trim() && age && isValidAge && !isSaving;

  const handleSaveProfile = async () => {
    if (!user) return;
    
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          username: nickname,
          age: parseInt(age),
          is_profile_completed: true
        })
        .eq('id', user.id);

      if (error) throw error;

      await refetchProfile();

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">Welcome to Your AI Companion</h1>
        <p className="text-sm text-gray-600 mt-2">Let's get to know each other better</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile?.is_profile_completed ? (
          <ProfileCard 
            username={profile.username || ""} 
            age={profile.age || 0} 
          />
        ) : (
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Tell me about yourself</CardTitle>
              <CardDescription>
                Help me understand you better so I can provide more personalized conversations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nickname">What should I call you?</Label>
                <Input
                  id="nickname"
                  placeholder="Enter a nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="max-w-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">How old are you?</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="max-w-md"
                />
                {age && !isValidAge && (
                  <p className="text-sm text-destructive mt-1">
                    You must be 18 or older to use this service.
                  </p>
                )}
              </div>
              {canSave && (
                <Button 
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="mt-4"
                >
                  {isSaving ? "Saving..." : "Save Profile"}
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {companion ? (
          <CompanionCard
            name={companion.name}
            nickname={companion.nickname}
            relationType={companion.relation_type}
            traits={companion.traits}
            interests={companion.interests}
          />
        ) : (
          <CompanionCreator />
        )}
      </div>
    </div>
  );
};

export default Home;