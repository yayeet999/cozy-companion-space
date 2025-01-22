import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-xl font-semibold text-[#9b87f5]">
            AI Companion
          </a>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <Button
              variant="outline"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/");
              }}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/auth?signup=true")}
                className="bg-[#9b87f5] hover:bg-[#7E69AB]"
              >
                Get Started
                <LogIn className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}