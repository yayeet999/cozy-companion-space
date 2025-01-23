import { SidebarWrapper } from "@/components/app/sidebar";
import { Dashboard } from "@/pages/Dashboard";

export default function Index() {
  return (
    <SidebarWrapper>
      <Dashboard />
    </SidebarWrapper>
  );
}