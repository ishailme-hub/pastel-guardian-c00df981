import { useState } from "react";
import { Brain, TrendingUp, Gauge, Info, ChevronRight, Lightbulb, BarChart3 } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface FeatureContribution {
  name: string;
  contribution: number;
  value: string;
  explanation: string;
}

const featureContributions: FeatureContribution[] = [
  { name: "Device Age", contribution: 30, value: "New Device", explanation: "First time this device fingerprint has been observed" },
  { name: "IP Reputation", contribution: 20, value: "Medium Risk", explanation: "IP associated with datacenter/VPN provider" },
  { name: "Request Velocity", contribution: 15, value: "3 req/min", explanation: "Multiple password reset attempts detected" },
  { name: "Browser Fingerprint", contribution: 12, value: "Suspicious", explanation: "Canvas fingerprint inconsistencies detected" },
  { name: "Geo Consistency", contribution: 10, value: "Mismatch", explanation: "IP location doesn't match timezone" },
  { name: "Session Behavior", contribution: 8, value: "Anomalous", explanation: "Unusual navigation patterns" },
  { name: "Time of Day", contribution: 5, value: "Off-hours", explanation: "Request at unusual time for this account" },
];

const modelMetrics = [
  { label: "Accuracy", value: 98.7 },
  { label: "Precision", value: 97.2 },
  { label: "Recall", value: 96.8 },
  { label: "F1 Score", value: 97.0 },
];

const MLRiskModel = () => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureContribution | null>(null);
  const totalScore = featureContributions.reduce((sum, f) => sum + f.contribution, 0);

  const chartData = featureContributions.map(f => ({
    name: f.name,
    contribution: f.contribution,
  }));

  const getBarColor = (contribution: number) => {
    if (contribution >= 20) return "hsl(0, 70%, 55%)";
    if (contribution >= 10) return "hsl(38, 90%, 55%)";
    return "hsl(180, 65%, 45%)";
  };

  return (
    <div className="min-h-screen bg-mesh">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            ML Risk Explanation Model
          </h1>
          <p className="text-muted-foreground">
            Transparent visualization of AI decision-making and feature contributions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall score */}
            <div className="glass-card rounded-2xl p-6 border-border/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-cyber-purple/20 to-cyber-pink/20">
                    <Brain className="w-8 h-8 text-cyber-purple" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground">ML Risk Assessment</h3>
                    <p className="text-sm text-muted-foreground">Hybrid heuristic + machine learning model</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold ${
                    totalScore <= 40 ? "text-success" : totalScore <= 80 ? "text-warning" : "text-destructive"
                  }`}>
                    {totalScore}
                  </div>
                  <div className="text-sm text-muted-foreground">Risk Score</div>
                </div>
              </div>

              {/* Score breakdown bar */}
              <div className="mb-6">
                <div className="flex gap-0.5 h-4 rounded-full overflow-hidden">
                  {featureContributions.map((f, i) => (
                    <div
                      key={f.name}
                      className="h-full transition-all duration-300 hover:opacity-80 cursor-pointer"
                      style={{
                        width: `${(f.contribution / totalScore) * 100}%`,
                        backgroundColor: getBarColor(f.contribution),
                      }}
                      onClick={() => setSelectedFeature(f)}
                      title={`${f.name}: +${f.contribution}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>0</span>
                  <span>Combined feature contributions</span>
                  <span>100</span>
                </div>
              </div>

              {/* Feature chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: 80, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 88%)" horizontal={false} />
                    <XAxis type="number" domain={[0, 35]} tick={{ fontSize: 11, fill: "hsl(220, 10%, 45%)" }} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      tick={{ fontSize: 11, fill: "hsl(220, 10%, 45%)" }}
                      width={80}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(220, 15%, 88%)",
                        borderRadius: "12px",
                      }}
                      formatter={(value: number) => [`+${value} points`, "Contribution"]}
                    />
                    <Bar dataKey="contribution" radius={[0, 4, 4, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(entry.contribution)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Feature list */}
            <div className="glass-card rounded-2xl p-6 border-border/50">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Feature Contributions
              </h3>
              
              <div className="space-y-3">
                {featureContributions.map((feature, index) => (
                  <div
                    key={feature.name}
                    className={`p-4 rounded-xl transition-all duration-200 cursor-pointer animate-slide-up ${
                      selectedFeature?.name === feature.name 
                        ? "bg-primary/10 border border-primary/30" 
                        : "bg-muted/30 hover:bg-muted/50"
                    }`}
                    style={{ animationDelay: `${index * 30}ms` }}
                    onClick={() => setSelectedFeature(feature)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: getBarColor(feature.contribution) }} />
                        <span className="font-medium text-foreground">{feature.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-muted-foreground">{feature.value}</span>
                        <span className={`font-bold ${
                          feature.contribution >= 20 ? "text-destructive" : 
                          feature.contribution >= 10 ? "text-warning" : "text-primary"
                        }`}>
                          +{feature.contribution}
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                    {selectedFeature?.name === feature.name && (
                      <p className="text-sm text-muted-foreground mt-2 pl-6 animate-fade-in">
                        {feature.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side panel */}
          <div className="space-y-6">
            {/* Model info */}
            <div className="glass-card rounded-2xl p-6 border-cyber-purple/30 bg-cyber-purple/5">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyber-purple" />
                Model Performance
              </h3>
              
              <div className="space-y-4">
                {modelMetrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{metric.label}</span>
                      <span className="font-bold text-foreground">{metric.value}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-full"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-cyber-purple/20 text-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Model Version</span>
                  <span className="text-foreground">v2.4.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Trained</span>
                  <span className="text-foreground">2 hours ago</span>
                </div>
              </div>
            </div>

            {/* Explanation card */}
            <div className="glass-card rounded-2xl p-6 border-border/50">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-warning" />
                How It Works
              </h3>
              
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Our hybrid ML model combines <span className="text-foreground font-medium">rule-based heuristics</span> with 
                  a <span className="text-foreground font-medium">gradient-boosted classifier</span> for accurate risk assessment.
                </p>
                <p>
                  Each feature contributes weighted points to the final score. Higher contributions indicate stronger risk signals.
                </p>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/30">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs">
                    Click on any feature to see a detailed explanation of why it contributed to the risk score.
                  </p>
                </div>
              </div>
            </div>

            {/* Decision threshold */}
            <div className="glass-card rounded-2xl p-6 border-border/50">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-primary" />
                Decision Thresholds
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <div>
                    <p className="text-sm font-medium text-success">0-40: Allow</p>
                    <p className="text-xs text-muted-foreground">Instant email sent</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <div>
                    <p className="text-sm font-medium text-warning">41-80: Challenge</p>
                    <p className="text-xs text-muted-foreground">CAPTCHA or MFA required</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div>
                    <p className="text-sm font-medium text-destructive">81+: Trap</p>
                    <p className="text-xs text-muted-foreground">Honey-token fake-out</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MLRiskModel;
