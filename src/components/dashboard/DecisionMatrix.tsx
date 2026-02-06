import { Mail, Shield, Ghost, ArrowRight } from "lucide-react";

interface DecisionMatrixProps {
  currentScore?: number;
}

export const DecisionMatrix = ({ currentScore = 0 }: DecisionMatrixProps) => {
  const tiers = [
    {
      range: "0-40",
      label: "Low Risk",
      action: "Instant Email",
      icon: Mail,
      color: "bg-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/30",
      textColor: "text-success",
      description: "Legitimate user detected. Password reset email sent immediately.",
    },
    {
      range: "41-80",
      label: "Medium Risk",
      action: "MFA / CAPTCHA",
      icon: Shield,
      color: "bg-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/30",
      textColor: "text-warning",
      description: "Suspicious activity. Additional verification required before proceeding.",
    },
    {
      range: "81-100",
      label: "High Risk",
      action: "Silent Fake-Out",
      icon: Ghost,
      color: "bg-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/30",
      textColor: "text-destructive",
      description: "Bot detected. Honey-token trap activated. No email sent.",
    },
  ];

  const getActiveTier = (score: number) => {
    if (score <= 40) return 0;
    if (score <= 80) return 1;
    return 2;
  };

  const activeTier = getActiveTier(currentScore);

  return (
    <div className="glass-card rounded-2xl p-6 border-border/50">
      <div className="mb-6">
        <h3 className="font-display font-semibold text-lg text-foreground">Smart Decision Matrix</h3>
        <p className="text-sm text-muted-foreground">Risk-based response system</p>
      </div>

      <div className="space-y-4">
        {tiers.map((tier, index) => {
          const Icon = tier.icon;
          const isActive = index === activeTier;
          
          return (
            <div
              key={tier.range}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                isActive 
                  ? `${tier.bgColor} ${tier.borderColor} shadow-lg scale-[1.02]` 
                  : "bg-muted/20 border-transparent opacity-60"
              }`}
            >
              {isActive && (
                <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full ${tier.color}`} />
              )}
              
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${tier.bgColor}`}>
                  <Icon className={`w-5 h-5 ${tier.textColor}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${tier.bgColor} ${tier.textColor}`}>
                      {tier.range}
                    </span>
                    <span className="font-semibold text-foreground">{tier.label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <ArrowRight className={`w-4 h-4 ${isActive ? tier.textColor : "text-muted-foreground"}`} />
                  <span className={`font-medium text-sm ${isActive ? tier.textColor : "text-muted-foreground"}`}>
                    {tier.action}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Current Score: {currentScore}</span>
          <span>100</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              currentScore <= 40 ? "bg-success" : currentScore <= 80 ? "bg-warning" : "bg-destructive"
            }`}
            style={{ width: `${currentScore}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default DecisionMatrix;
