import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/nexo/Logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Network, 
  Database, 
  Bell, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: MessageSquare, label: "Chat IA", path: "/chat" },
  { icon: Network, label: "Grafo", path: "/graph" },
  { icon: Database, label: "Entidades", path: "/entities-view" },
  { icon: Bell, label: "Alertas", path: "/alerts" },
  { icon: Settings, label: "Configuración", path: "/settings" },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className={cn(
        "hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}>
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && <Logo variant="white" size="md" />}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive && "bg-sidebar-accent text-sidebar-primary",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className={cn(
              "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent",
              isCollapsed && "justify-center px-2"
            )}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span>Salir</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border">
        <div className="flex items-center justify-between p-4">
          <Logo variant="white" size="sm" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-sidebar-foreground"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-sidebar border-b border-sidebar-border animate-slide-up">
            <nav className="p-2 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent",
                      isActive && "bg-sidebar-accent text-sidebar-primary"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:overflow-auto">
        <div className="lg:hidden h-16" /> {/* Spacer for mobile header */}
        {children}
      </main>
    </div>
  );
}
