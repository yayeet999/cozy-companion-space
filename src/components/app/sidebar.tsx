import { useEffect, useState } from "react";
import { Home, MessageSquare, Settings, LogOut, Lock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SubscriptionTier = 'free' | 'paid';

const menuItems = [
  { title: "Home", icon: Home, route: "/dashboard" },
  { 
    title: "Let's Talk", 
    icon: MessageSquare, 
    route: "/dashboard/chat",
    requiresAccess: true,
    lockedMessage: "Complete your profile and create a companion to unlock chat features"
  },
  { title: "Settings", icon: Settings, route: "/dashboard/settings" },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('free');
  const [canAccessChat, setCanAccessChat] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchSubscription = async () => {
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('tier')
        .eq('user_id', user.id)
        .single();
      
      if (subscription) {
        setSubscriptionTier(subscription.tier);
      }
    };

    const checkChatAccess = async () => {
      const { data, error } = await supabase
        .rpc('can_access_chat', { user_id: user.id });
      
      if (!error && data) {
        setCanAccessChat(data);
      }
    };

    fetchSubscription();
    checkChatAccess();

    const subscriptionChannel = supabase
      .channel('subscription-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscriptions',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.new) {
            setSubscriptionTier((payload.new as any).tier);
          }
        }
      )
      .subscribe();

    const profileChannel = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`
        },
        () => {
          checkChatAccess();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscriptionChannel);
      supabase.removeChannel(profileChannel);
    };
  }, [user]);

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        {user?.email && (
          <div className="text-sm font-medium text-sidebar-foreground">
            {user.email}
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <SidebarMenuButton
                            onClick={() => {
                              if (!item.requiresAccess || canAccessChat) {
                                navigate(item.route);
                              }
                            }}
                            tooltip={item.title}
                            data-active={location.pathname === item.route}
                            className={item.requiresAccess && !canAccessChat ? 'opacity-50 cursor-not-allowed' : ''}
                          >
                            {item.requiresAccess && !canAccessChat ? (
                              <Lock className="h-4 w-4 mr-2" />
                            ) : (
                              <item.icon className="h-4 w-4" />
                            )}
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </div>
                      </TooltipTrigger>
                      {item.requiresAccess && !canAccessChat && (
                        <TooltipContent>
                          <p>{item.lockedMessage}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={signOut}
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