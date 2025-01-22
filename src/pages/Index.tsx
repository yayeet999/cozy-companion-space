import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Shield, Sparkles, Star } from "lucide-react";
import { Header } from "@/components/Header";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header />
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Your Perfect
          <span className="text-[#9b87f5]"> AI Companion</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
          Experience meaningful conversations and genuine connections with our advanced AI companion.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-lg"
            onClick={() => navigate("/auth")}
          >
            Get Started Free
            <Sparkles className="ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#9b87f5] text-[#9b87f5] hover:bg-purple-50 text-lg"
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
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 leading-tight">
            Why Choose Our AI Companion?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={<MessageCircle className="w-8 h-8 text-[#9b87f5]" />}
              title="Natural Conversations"
              description="Engage in meaningful, context-aware conversations that feel genuine and personal."
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8 text-[#9b87f5]" />}
              title="Emotional Support"
              description="Find comfort and understanding with an AI companion who's always there for you."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-[#9b87f5]" />}
              title="Safe & Private"
              description="Your conversations are completely private and secure, ensuring your peace of mind."
            />
          </div>
        </div>
      </div>

      {/* Premium Features Section */}
      <div className="bg-gradient-to-b from-white to-purple-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Unlock Premium Features
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Enhance your experience with advanced features and deeper connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-2 text-gray-700">
                <Star className="w-5 h-5 text-[#9b87f5]" />
                <span>Advanced Personality</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Star className="w-5 h-5 text-[#9b87f5]" />
                <span>Voice Conversations</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Star className="w-5 h-5 text-[#9b87f5]" />
                <span>Priority Support</span>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-[#9b87f5] hover:bg-[#7E69AB] mt-10 text-lg"
              onClick={() => navigate("/auth")}
            >
              Try Premium Free
              <Sparkles className="ml-2" />
            </Button>
          </div>
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
  <div className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default Index;
