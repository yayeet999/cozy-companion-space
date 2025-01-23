import { Navigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { SidebarWrapper } from "@/components/app/sidebar";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return <SidebarWrapper>{children}</SidebarWrapper>;
}