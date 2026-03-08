import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { Droplets } from "lucide-react";

const DashboardLayout = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 flex items-center gap-3 border-b bg-card/80 backdrop-blur-xl px-4">
          <SidebarTrigger className="text-muted-foreground" />
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-foreground">AquaGo Monitor</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-safe animate-pulse-glow glow-dot" />
            <span className="text-xs text-muted-foreground">System Online</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-gradient-section">
          <Outlet />
        </main>
      </div>
    </div>
  </SidebarProvider>
);

export default DashboardLayout;
