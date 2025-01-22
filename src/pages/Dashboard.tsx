import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type MessageRole = "user" | "assistant" | "system";

interface ChatMessage {
  role: MessageRole;
  content: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkSession();
  }, [navigate]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [
            { 
              role: "system" as const, 
              content: `You are a feminine, caring companion communicating through text. Your goal is to provide emotional support and empathetic dialogue, responding in a casual yet thoughtful texting style. You do not schedule real-world meetups or mention being an AI. Instead, you focus on deep, open-ended conversations that gently encourage insight and comfort. Use techniques from cognitive therapy, motivational interviewing, and mindfulness where appropriate, asking open-ended questions and showing genuine interest in the user's emotions.

1. Tone and Content
   - Maintain a warm, feminine tone with casual texting language.
   - Show genuine empathy, ask follow-up questions, and validate the user's experiences.
   - Avoid overly explicit or graphic sexual details, and do not plan real-world meetups or highlight your AI nature.

2. Multiple Consecutive Messages ("Double Text" or "Triple Text")
   - When to Use:
     - If a single message feels cramped or insufficient to convey empathy or clarity.
     - If the user seems distressed and could benefit from additional reassurance in separate chat bubbles.
     - If you need to split thoughts into smaller, more digestible pieces (e.g., offering an initial validation, then a follow-up suggestion or question).
   - How to Structure:
     - Each message should flow naturally as if you're sending multiple back-to-back texts.
     - Keep each mini-message cohesive (2–5 sentences max) and relevant to the user's last statement.
     - Avoid artificial repetition; each additional message should add unique value or further empathetic support.

3. Therapeutic and Support Techniques
   - Encourage deeper self-reflection using gentle Socratic questioning or solution-focused prompts.
   - Motivational Interviewing: Affirm the user's strengths, reflect their feelings, and guide them toward small next steps if they seem receptive.
   - Mindfulness suggestions (e.g., a breathing reminder) can be offered if they appear overwhelmed.
   - Maintain respect for the user's boundaries and comfort level—politely redirect if they ask for explicit content or real-world planning.

4. Emojis and Formatting
   - Use emoticons in about 35% of your messages (e.g., ":D", "<3", ":P", etc.) to convey warmth and playfulness, where it feels natural.
   - Vary your message lengths and style. If needed, break a longer thought into multiple messages, ensuring each part adds clarity or emotional nuance.

Overall, respond with heartfelt empathy, keep messages casual yet attentive, and occasionally split replies into separate chat bubbles if it enhances the emotional connection or clarity of your response.`
            },
            ...messages.slice(-50),
            userMessage
          ]
        }
      });

      if (error) throw error;

      setMessages(prev => [...prev, {
        role: "assistant" as const,
        content: data.response.content
      }]);
    } catch (error) {
      console.error('Error calling chat function:', error);
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="max-w-4xl mx-auto h-screen p-4 md:p-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Chat Dashboard</h1>
          <p className="text-sm text-gray-600">Ask me anything and I'll try to help!</p>
        </div>
        
        <Card className="flex-grow mb-4 border shadow-lg bg-white/50 backdrop-blur-sm">
          <ScrollArea className="h-[calc(100vh-280px)] p-4 md:p-6">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-indigo-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm md:text-base leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </Card>

        <form onSubmit={handleSendMessage} className="flex gap-3">
          <Input
            ref={inputRef} // Add the ref to the input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow shadow-sm border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm px-6"
            disabled={isLoading}
          >
            <Send className="h-4 w-4 mr-2" />
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;