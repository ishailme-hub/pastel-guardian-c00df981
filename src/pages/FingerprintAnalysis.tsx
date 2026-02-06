import { useState } from "react";
import { Monitor, Smartphone, Globe, Fingerprint, MapPin, Clock, Cpu, Wifi, ChevronDown, AlertTriangle, CheckCircle } from "lucide-react";
import Navigation from "@/components/layout/Navigation";

interface FingerprintData {
  id: string;
  visitorId: string;
  confidence: number;
  lastSeen: string;
  components: {
    name: string;
    value: string;
    weight: number;
    status: "trusted" | "suspicious" | "unknown";
  }[];
  riskFactors: {
    factor: string;
    impact: number;
    description: string;
  }[];
}

const mockFingerprintData: FingerprintData = {
  id: "fp_8x7k2m9p3n4q1w2e",
  visitorId: "vst_f7g8h9i0j1k2l3m4",
  confidence: 99.5,
  lastSeen: "2 minutes ago",
  components: [
    { name: "User Agent", value: "Mozilla/5.0 (Windows NT 10.0; Win64)", weight: 15, status: "trusted" },
    { name: "Screen Resolution", value: "1920x1080", weight: 10, status: "trusted" },
    { name: "Timezone", value: "America/New_York (UTC-5)", weight: 8, status: "trusted" },
    { name: "Language", value: "en-US, en;q=0.9", weight: 5, status: "trusted" },
    { name: "Platform", value: "Win32", weight: 12, status: "trusted" },
    { name: "WebGL Vendor", value: "NVIDIA Corporation", weight: 18, status: "trusted" },
    { name: "Canvas Hash", value: "0x4f7a2c9e8b1d3f5a", weight: 20, status: "trusted" },
    { name: "Audio Context", value: "124.04347527516074", weight: 15, status: "suspicious" },
    { name: "Installed Fonts", value: "42 fonts detected", weight: 12, status: "trusted" },
    { name: "Hardware Concurrency", value: "16 cores", weight: 8, status: "unknown" },
  ],
  riskFactors: [
    { factor: "New Device", impact: 30, description: "First time seeing this device fingerprint" },
    { factor: "VPN Detected", impact: 20, description: "Connection appears to be through a VPN" },
    { factor: "Incognito Mode", impact: 15, description: "Browser privacy mode detected" },
  ],
};

const FingerprintAnalysis = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>("components");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "trusted":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "suspicious":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-muted" />;
    }
  };

  const totalWeight = mockFingerprintData.components.reduce((sum, c) => sum + c.weight, 0);

  return (
    <div className="min-h-screen bg-mesh">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Device Fingerprint Analysis
          </h1>
          <p className="text-muted-foreground">
            Deep analysis of browser and device characteristics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main fingerprint info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview card */}
            <div className="glass-card rounded-2xl p-6 border-border/50">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-cyber-purple/20">
                    <Fingerprint className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground">Fingerprint ID</h3>
                    <p className="font-mono text-sm text-muted-foreground">{mockFingerprintData.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">{mockFingerprintData.confidence}%</div>
                  <div className="text-sm text-muted-foreground">Confidence</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-muted/30">
                  <Monitor className="w-5 h-5 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Device</p>
                  <p className="font-medium text-foreground">Desktop</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/30">
                  <Globe className="w-5 h-5 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Browser</p>
                  <p className="font-medium text-foreground">Chrome 120</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/30">
                  <MapPin className="w-5 h-5 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">New York, US</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/30">
                  <Clock className="w-5 h-5 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Last Seen</p>
                  <p className="font-medium text-foreground">{mockFingerprintData.lastSeen}</p>
                </div>
              </div>
            </div>

            {/* Components breakdown */}
            <div className="glass-card rounded-2xl border-border/50 overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === "components" ? null : "components")}
                className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-primary" />
                  <span className="font-display font-semibold text-lg text-foreground">Fingerprint Components</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${expandedSection === "components" ? "rotate-180" : ""}`} />
              </button>
              
              {expandedSection === "components" && (
                <div className="px-6 pb-6 space-y-3">
                  {mockFingerprintData.components.map((component, index) => (
                    <div 
                      key={component.name}
                      className="flex items-center gap-4 p-3 rounded-xl bg-muted/20 animate-slide-up"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      {getStatusIcon(component.status)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{component.name}</span>
                          <span className="text-xs text-muted-foreground">Weight: {component.weight}%</span>
                        </div>
                        <p className="text-xs font-mono text-muted-foreground truncate">{component.value}</p>
                        {/* Weight bar */}
                        <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              component.status === "trusted" ? "bg-success" : 
                              component.status === "suspicious" ? "bg-warning" : "bg-muted-foreground"
                            }`}
                            style={{ width: `${(component.weight / 20) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Side panel */}
          <div className="space-y-6">
            {/* Risk factors */}
            <div className="glass-card rounded-2xl p-6 border-warning/30 bg-warning/5">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Risk Factors
              </h3>
              
              <div className="space-y-4">
                {mockFingerprintData.riskFactors.map((risk, index) => (
                  <div key={risk.factor} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{risk.factor}</span>
                      <span className="text-sm font-bold text-warning">+{risk.impact}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{risk.description}</p>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-warning rounded-full"
                        style={{ width: `${risk.impact}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-warning/20">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Risk Impact</span>
                  <span className="text-xl font-bold text-warning">
                    +{mockFingerprintData.riskFactors.reduce((sum, r) => sum + r.impact, 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Connection info */}
            <div className="glass-card rounded-2xl p-6 border-border/50">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <Wifi className="w-5 h-5 text-cyber-blue" />
                Connection Details
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IP Address</span>
                  <span className="font-mono text-foreground">192.168.1.45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ISP</span>
                  <span className="text-foreground">Verizon FiOS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Connection</span>
                  <span className="text-foreground">Fiber</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Proxy/VPN</span>
                  <span className="text-warning font-medium">Detected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tor Exit Node</span>
                  <span className="text-success">No</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FingerprintAnalysis;
