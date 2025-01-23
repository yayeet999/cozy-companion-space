import { useEffect, useState } from "react";
import { ChevronLeft, Home, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Menu items with their respective icons and routes
const menuItems = [
  { title: "Home", icon: Home, route: "/" },
  { title: "Settings", icon: Settings, route: "/settings" },
];

type SubscriptionTier = 'free' | 'paid';

interface Subscription {
  tier: SubscriptionTier;
}

export function AppSidebar() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('free');

  useEffect(() => {
    // Fetch user session and subscription data
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserEmail(session.user.email);
        
        // Fetch subscription data
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('tier')
          .eq('user_id', session.user.id)
          .single();
        
        if (subscription) {
          setSubscriptionTier(subscription.tier);
        }
      }
    };

    fetchUserData();

    // Listen for subscription changes
    const channel = supabase
      .channel('subscription-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscriptions'
        },
        (payload) => {
          if (payload.new) {
            setSubscriptionTier((payload.new as Subscription).tier);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        {userEmail && (
          <div className="text-sm font-medium text-sidebar-foreground">
            {userEmail}
          </div>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.route)}
                    tooltip={item.title}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleSignOut}
                  tooltip="Sign Out"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <Badge variant={subscriptionTier === 'paid' ? "default" : "secondary"} className="w-full justify-center">
          {subscriptionTier === 'paid' ? 'Premium' : 'Free Tier'}
        </Badge>
      </SidebarFooter>
    </Sidebar>
  );
}

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger className="mb-4" />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}