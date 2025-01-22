import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Shield, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Your Perfect AI Companion
          <span className="text-pink-600"> Awaits</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Experience meaningful conversations and genuine connections with our advanced AI companion.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="bg-pink-600 hover:bg-pink-700"
            onClick={() => navigate("/auth")}
          >
            Get Started Free
            <Sparkles className="ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-pink-600 text-pink-600 hover:bg-pink-50"
            onClick={() => {
              const featuresSection = document.getElementById("features");
              featuresSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our AI Companion?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={<MessageCircle className="w-8 h-8 text-pink-600" />}
              title="Natural Conversations"
              description="Engage in meaningful, context-aware conversations that feel genuine and personal."
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8 text-pink-600" />}
              title="Emotional Support"
              description="Find comfort and understanding with an AI companion who's always there for you."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-pink-600" />}
              title="Safe & Private"
              description="Your conversations are completely private and secure, ensuring your peace of mind."
            />
          </div>
        </div>
      </div>

      {/* Premium Features Section */}
      <div className="bg-pink-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Unlock Premium Features
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Enhance your experience with advanced features and deeper connections.
          </p>
          <Button
            size="lg"
            className="bg-pink-600 hover:bg-pink-700"
            onClick={() => navigate("/auth")}
          >
            Try Premium Free
            <Sparkles className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default Index;