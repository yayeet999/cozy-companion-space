import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-6">
          Sign in to continue your journey with your AI companion
        </p>
        {/* Auth form will be added here */}
      </Card>
    </div>
  );
};

export default Auth;