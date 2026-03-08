import {
  LayoutDashboard,
  Cpu,
  BarChart3,
  Bell,
  Settings,
  Home,
  Droplets,
  Zap,
  Server,
  BookOpen,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Devices", url: "/devices", icon: Cpu },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Automation", url: "/automation", icon: Zap },
  { title: "Architecture", url: "/architecture", icon: Server },
  { title: "Documentation", url: "/documentation", icon: BookOpen },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent>
        {/* Logo */}
        <div className={`flex items-center gap-2.5 px-4 py-4 ${collapsed ? "justify-center" : ""}`}>
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary">
            <Droplets className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && <span className="text-lg font-extrabold text-sidebar-foreground">AquaGo</span>}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/" className="hover:bg-sidebar-accent/50">
                <Home className="h-4 w-4" />
                {!collapsed && <span>Back to Home</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
