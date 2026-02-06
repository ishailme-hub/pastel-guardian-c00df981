import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  KeyRound, 
  Fingerprint, 
  Brain, 
  Network,
  Shield
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/password-reset", label: "Password Reset", icon: KeyRound },
  { path: "/fingerprint", label: "Fingerprint", icon: Fingerprint },
  { path: "/ml-model", label: "ML Model", icon: Brain },
  { path: "/architecture", label: "Architecture", icon: Network },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <RouterNavLink to="/" className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-cyber-purple">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              Stealth Guard
            </span>
          </RouterNavLink>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <RouterNavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </RouterNavLink>
              );
            })}
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/30">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-success">System Active</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
