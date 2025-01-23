import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthProvider";

interface Profile {
  username: string | null;
  age: number | null;
  is_profile_completed: boolean;
  is_companion_created: boolean;
}

interface Companion {
  name: string;
  nickname: string | null;
  relation_type: "friend" | "romantic";
  traits: Record<string, number>;
  interests: string[];
}

interface UserContextType {
  profile: Profile | null;
  companion: Companion | null;
  isLoading: boolean;
  refetchProfile: () => Promise<void>;
  refetchCompanion: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [companion, setCompanion] = useState<Companion | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    setProfile(data);
  };

  const fetchCompanion = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("companion_creators")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_completed", true)
      .single();
    setCompanion(data);
  };

  useEffect(() => {
    if (user) {
      Promise.all([fetchProfile(), fetchCompanion()])
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  return (
    <UserContext.Provider 
      value={{
        profile,
        companion,
        isLoading,
        refetchProfile: fetchProfile,
        refetchCompanion: fetchCompanion,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};