import { useState, useEffect } from "react";
import { Shield, Activity, Users, Zap, AlertTriangle, Server, Cpu, Database } from "lucide-react";
import RiskGauge from "@/components/dashboard/RiskGauge";
import MetricCard from "@/components/dashboard/MetricCard";
import BehaviorChart from "@/components/dashboard/BehaviorChart";
import DeviceCard from "@/components/dashboard/DeviceCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import DecisionMatrix from "@/components/dashboard/DecisionMatrix";
import Navigation from "@/components/layout/Navigation";

// Mock data for demonstration
const mockChartData = [
  { time: "00:00", score: 25, requests: 120 },
  { time: "04:00", score: 32, requests: 180 },
  { time: "08:00", score: 45, requests: 350 },
  { time: "12:00", score: 78, requests: 520 },
  { time: "16:00", score: 55, requests: 420 },
  { time: "20:00", score: 38, requests: 280 },
  { time: "Now", score: 42, requests: 190 },
];

const mockDevices = [
  {
    type: "desktop" as const,
    browser: "Chrome 120",
    os: "Windows 11",
    ip: "192.168.1.45",
    location: "New York, USA",
    fingerprint: "fp_8x7k2m9p3n",
    lastSeen: "2 min ago",
    trustScore: 92,
  },
  {
    type: "mobile" as const,
    browser: "Safari 17",
    os: "iOS 17.2",
    ip: "10.0.0.128",
    location: "London, UK",
    fingerprint: "fp_3j5h8k2l9",
    lastSeen: "5 min ago",
    trustScore: 45,
  },
];

const mockActivities = [
  { id: "1", type: "allowed" as const, message: "Password reset approved", timestamp: "Just now", details: "user@email.com • Score: 28" },
  { id: "2", type: "captcha" as const, message: "CAPTCHA challenge triggered", timestamp: "1 min ago", details: "suspicious@domain.net • Score: 65" },
  { id: "3", type: "honeypot" as const, message: "Honey-token trap activated", timestamp: "3 min ago", details: "bot@attacker.com • Score: 94" },
  { id: "4", type: "pow" as const, message: "PoW challenge issued", timestamp: "5 min ago", details: "unknown@temp.io • Score: 72" },
  { id: "5", type: "blocked" as const, message: "Request blocked (rate limit)", timestamp: "8 min ago", details: "192.168.1.200 • 50+ attempts" },
  { id: "6", type: "allowed" as const, message: "Email sent successfully", timestamp: "12 min ago", details: "trusted@company.org • Score: 15" },
];

const Dashboard = () => {
  const [riskScore, setRiskScore] = useState(42);

  // Simulate real-time score updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRiskScore(prev => {
        const change = Math.floor(Math.random() * 10) - 5;
        const newScore = prev + change;
        return Math.max(0, Math.min(100, newScore));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-mesh">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Stealth Guard Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time password reset abuse monitoring and AI risk assessment
          </p>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Requests Analyzed"
            value="12,847"
            subtitle="Last 24 hours"
            icon={Activity}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title="Threats Blocked"
            value="847"
            subtitle="Bots trapped today"
            icon={Shield}
            variant="danger"
            trend={{ value: 23, isPositive: false }}
          />
          <MetricCard
            title="Active Sessions"
            value="1,294"
            subtitle="Legitimate users"
            icon={Users}
            variant="success"
            trend={{ value: 8, isPositive: true }}
          />
          <MetricCard
            title="PoW Challenges"
            value="3,421"
            subtitle="CPU tax applied"
            icon={Zap}
            variant="warning"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Risk Gauge Section */}
          <div className="glass-card rounded-2xl p-6 border-border/50 flex flex-col items-center justify-center">
            <h3 className="font-display font-semibold text-lg text-foreground mb-6">Current Risk Level</h3>
            <RiskGauge score={riskScore} size="lg" />
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {riskScore <= 40 && "Low risk detected. Standard flow active."}
                {riskScore > 40 && riskScore <= 80 && "Elevated risk. Additional verification required."}
                {riskScore > 80 && "High risk! Honey-token defense engaged."}
              </p>
            </div>
          </div>

          {/* Behavior Chart */}
          <div className="lg:col-span-2">
            <BehaviorChart data={mockChartData} />
          </div>
        </div>

        {/* Decision Matrix & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DecisionMatrix currentScore={riskScore} />
          <ActivityFeed activities={mockActivities} />
        </div>

        {/* Device Fingerprint Analysis */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-xl text-foreground">Device Fingerprint Analysis</h3>
            <span className="text-sm text-muted-foreground">Recent devices</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockDevices.map((device, index) => (
              <DeviceCard key={index} device={device} />
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="API Latency"
            value="24ms"
            subtitle="Avg response time"
            icon={Server}
            variant="success"
          />
          <MetricCard
            title="Redis Cache"
            value="98.5%"
            subtitle="Hit rate"
            icon={Database}
            variant="success"
          />
          <MetricCard
            title="ML Model"
            value="v2.4.1"
            subtitle="Last trained: 2h ago"
            icon={Cpu}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
