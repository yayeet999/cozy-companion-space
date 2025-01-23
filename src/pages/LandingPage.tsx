import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to Your AI Companion
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Your personal AI assistant ready to help you with anything you need.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              onClick={() => navigate("/auth")}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/auth?signup=true")}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}