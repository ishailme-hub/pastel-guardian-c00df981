import { Server, Database, Shield, Cpu, Mail, Globe, GitBranch, Fingerprint, Brain, Zap } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import MermaidDiagram from "@/components/diagrams/MermaidDiagram";

const mainFlowChart = `flowchart TD
    subgraph Client["Frontend Layer"]
        A[User Submits Email] --> B[Collect Device Fingerprint]
        B --> C[FingerprintJS SDK]
    end
    
    subgraph Gateway["API Gateway"]
        D[Request Received] --> E[Rate Limiter Check]
        E --> F[Extract Headers & IP]
    end
    
    subgraph RiskEngine["AI Risk Engine"]
        G[Device Analysis] --> K[Risk Score Calculator]
        H[IP Reputation Check] --> K
        I[Behavior Analysis] --> K
        J[ML Model Inference] --> K
        K --> L{Score Decision}
    end
    
    subgraph Actions["Response Actions"]
        L -->|0-40| M[Send Real Email]
        L -->|41-80| N[Require MFA/CAPTCHA]
        L -->|81+| O[Honey-Token Trap]
        N --> P[PoW Challenge]
        P --> M
    end
    
    C --> D
    F --> G
    M --> S[SendGrid SMTP]
    O --> T[Fake Success UI]`;

const dualTrackChart = `flowchart LR
    subgraph LoginTrack["Login Track"]
        A[Login Request] --> B[Auth Service]
        B --> C[Session Created]
    end
    
    subgraph ResetTrack["Reset Track"]
        D[Reset Request] --> E[Risk Analysis]
        E --> F[Email or Trap]
    end
    
    G[User] --> A
    G --> D`;

const riskScoringChart = `flowchart TD
    A[Request Data] --> B[Feature Extraction]
    B --> C["Device: +30 max"]
    B --> D["IP: +40 max"]
    B --> E["Browser: +60 max"]
    B --> F["Behavior: +20 max"]
    
    C --> G[Score Aggregator]
    D --> G
    E --> G
    F --> G
    
    G --> H{Final Score}`;

const behaviorChart = `flowchart TD
    subgraph Input["Input Signals"]
        A[Mouse Movement]
        B[Keystroke Dynamics]
        C[Scroll Patterns]
        D[Click Timing]
        E[Page Focus Time]
    end
    
    subgraph Analysis["Analysis Layer"]
        F[Pattern Recognition]
        G[Anomaly Detection]
        H[Bot Signature Match]
    end
    
    subgraph Output["Output"]
        I[Human Score]
        J[Bot Probability]
        K[Risk Contribution]
    end
    
    A --> F
    B --> F
    C --> G
    D --> G
    E --> H
    
    F --> I
    G --> J
    H --> K
    
    I --> L[Final Behavior Score]
    J --> L
    K --> L`;

const SystemArchitecture = () => {
  return (
    <div className="min-h-screen bg-mesh">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            System Architecture
          </h1>
          <p className="text-muted-foreground">
            Complete end-to-end password reset flow and system components
          </p>
        </div>

        {/* Main Flow Diagram */}
        <div className="glass-card rounded-2xl p-8 border-border/50 mb-8">
          <h3 className="font-display font-semibold text-xl text-foreground mb-6">
            Password Reset Flow
          </h3>
          <MermaidDiagram chart={mainFlowChart} className="flex justify-center" />
        </div>

        {/* Dual Track Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6 border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-success/10">
                <GitBranch className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">Dual-Track Architecture</h3>
            </div>
            
            <MermaidDiagram chart={dualTrackChart} className="flex justify-center mb-4" />
            
            <div className="p-4 rounded-xl bg-muted/30">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Zero Lockout Guarantee:</span> Login and reset flows are completely isolated. Reset spam attacks cannot block legitimate login attempts.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-cyber-purple/10">
                <Brain className="w-6 h-6 text-cyber-purple" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">Risk Scoring Flow</h3>
            </div>
            
            <MermaidDiagram chart={riskScoringChart} className="flex justify-center" />
          </div>
        </div>

        {/* Tech Stack */}
        <div className="glass-card rounded-2xl p-8 border-border/50 mb-8">
          <h3 className="font-display font-semibold text-xl text-foreground mb-6">
            Technology Stack
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Globe, label: "Frontend", tech: "React + TypeScript", color: "bg-cyber-blue/10 text-cyber-blue" },
              { icon: Server, label: "Backend", tech: "Node.js / Python", color: "bg-success/10 text-success" },
              { icon: Database, label: "Database", tech: "PostgreSQL + Redis", color: "bg-cyber-purple/10 text-cyber-purple" },
              { icon: Fingerprint, label: "Fingerprinting", tech: "FingerprintJS Pro", color: "bg-warning/10 text-warning" },
              { icon: Brain, label: "ML Model", tech: "XGBoost / TensorFlow", color: "bg-cyber-pink/10 text-cyber-pink" },
              { icon: Mail, label: "Email", tech: "SendGrid SMTP", color: "bg-primary/10 text-primary" },
              { icon: Zap, label: "PoW", tech: "SHA-256 Challenges", color: "bg-destructive/10 text-destructive" },
              { icon: Shield, label: "Security", tech: "JWT + Rate Limiting", color: "bg-success/10 text-success" },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className={`p-3 rounded-lg ${item.color} inline-flex mb-3`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <p className="font-semibold text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.tech}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Behavioral Analysis */}
        <div className="glass-card rounded-2xl p-8 border-border/50">
          <h3 className="font-display font-semibold text-xl text-foreground mb-6">
            Behavioral Analysis Logic
          </h3>
          
          <MermaidDiagram chart={behaviorChart} className="flex justify-center mb-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-success/10 border border-success/20">
              <p className="font-semibold text-success mb-1">Human Patterns</p>
              <p className="text-sm text-muted-foreground">Natural variance, hesitation, scroll depth</p>
            </div>
            <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
              <p className="font-semibold text-warning mb-1">Suspicious Patterns</p>
              <p className="text-sm text-muted-foreground">Linear mouse, instant form fill, no scroll</p>
            </div>
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
              <p className="font-semibold text-destructive mb-1">Bot Signatures</p>
              <p className="text-sm text-muted-foreground">Headless browser, automation flags</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SystemArchitecture;
