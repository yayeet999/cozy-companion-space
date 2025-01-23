import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";

export const useCompanion = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["companion", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companion_creators")
        .select("*")
        .eq("user_id", user?.id)
        .eq("is_completed", true)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};