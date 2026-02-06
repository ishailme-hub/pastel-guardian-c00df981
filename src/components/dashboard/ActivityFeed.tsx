import { Shield, AlertTriangle, CheckCircle, XCircle, Zap } from "lucide-react";

interface Activity {
  id: string;
  type: "blocked" | "allowed" | "captcha" | "honeypot" | "pow";
  message: string;
  timestamp: string;
  details?: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const activityConfig = {
  blocked: {
    icon: XCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  allowed: {
    icon: CheckCircle,
    color: "text-success",
    bg: "bg-success/10",
  },
  captcha: {
    icon: Shield,
    color: "text-warning",
    bg: "bg-warning/10",
  },
  honeypot: {
    icon: AlertTriangle,
    color: "text-cyber-purple",
    bg: "bg-cyber-purple/10",
  },
  pow: {
    icon: Zap,
    color: "text-cyber-blue",
    bg: "bg-cyber-blue/10",
  },
};

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <div className="glass-card rounded-2xl p-6 border-border/50">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-lg text-foreground">Live Activity</h3>
        <span className="flex items-center gap-2 text-xs text-success font-medium">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Live
        </span>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {activities.map((activity, index) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;
          
          return (
            <div 
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`p-2 rounded-lg ${config.bg}`}>
                <Icon className={`w-4 h-4 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.message}</p>
                {activity.details && (
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{activity.details}</p>
                )}
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.timestamp}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;
