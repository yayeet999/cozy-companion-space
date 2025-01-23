import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CompanionCreator from "@/components/companion/CompanionCreator";
import { useState } from "react";

const Home = () => {
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">Welcome to Your AI Companion</h1>
        <p className="text-sm text-gray-600 mt-2">Let's get to know each other better</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
          </CardContent>
        </Card>

        <CompanionCreator />
      </div>
    </div>
  );
};

export default Home;