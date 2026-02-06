import { Monitor, Smartphone, Globe, Fingerprint, MapPin, Clock } from "lucide-react";

interface DeviceInfo {
  type: "desktop" | "mobile" | "tablet";
  browser: string;
  os: string;
  ip: string;
  location: string;
  fingerprint: string;
  lastSeen: string;
  trustScore: number;
}

interface DeviceCardProps {
  device: DeviceInfo;
}

export const DeviceCard = ({ device }: DeviceCardProps) => {
  const DeviceIcon = device.type === "mobile" ? Smartphone : Monitor;
  
  const getTrustColor = (score: number) => {
    if (score >= 80) return "text-success bg-success/10 border-success/30";
    if (score >= 50) return "text-warning bg-warning/10 border-warning/30";
    return "text-destructive bg-destructive/10 border-destructive/30";
  };

  return (
    <div className="glass-card rounded-2xl p-5 border-border/50 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-secondary text-secondary-foreground">
            <DeviceIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{device.browser}</p>
            <p className="text-sm text-muted-foreground">{device.os}</p>
          </div>
        </div>
        <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getTrustColor(device.trustScore)}`}>
          {device.trustScore}% Trust
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">IP:</span>
          <span className="font-mono text-foreground">{device.ip}</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Location:</span>
          <span className="text-foreground">{device.location}</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <Fingerprint className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Fingerprint:</span>
          <span className="font-mono text-xs text-foreground truncate max-w-32">{device.fingerprint}</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Last seen:</span>
          <span className="text-foreground">{device.lastSeen}</span>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
