import { useEffect, useState } from "react";

interface RiskGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export const RiskGauge = ({ score, size = "md", animated = true }: RiskGaugeProps) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (animated) {
      const duration = 1500;
      const steps = 60;
      const increment = score / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.round(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    } else {
      setDisplayScore(score);
    }
  }, [score, animated]);

  const sizeClasses = {
    sm: { container: "w-24 h-24", text: "text-xl", label: "text-xs" },
    md: { container: "w-36 h-36", text: "text-3xl", label: "text-sm" },
    lg: { container: "w-48 h-48", text: "text-5xl", label: "text-base" },
  };

  const getRiskColor = (value: number) => {
    if (value <= 40) return "text-success";
    if (value <= 80) return "text-warning";
    return "text-destructive";
  };

  const getGradient = (value: number) => {
    if (value <= 40) return "from-success/20 to-success/5";
    if (value <= 80) return "from-warning/20 to-warning/5";
    return "from-destructive/20 to-destructive/5";
  };

  const getStrokeColor = (value: number) => {
    if (value <= 40) return "stroke-success";
    if (value <= 80) return "stroke-warning";
    return "stroke-destructive";
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className={`relative ${sizeClasses[size].container}`}>
      {/* Background glow */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-b ${getGradient(displayScore)} blur-xl animate-pulse-glow`} />
      
      {/* SVG Gauge */}
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="8"
          className="stroke-muted"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          className={`${getStrokeColor(displayScore)} transition-all duration-500`}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-display font-bold ${sizeClasses[size].text} ${getRiskColor(displayScore)}`}>
          {displayScore}
        </span>
        <span className={`${sizeClasses[size].label} text-muted-foreground font-medium`}>
          Risk Score
        </span>
      </div>
    </div>
  );
};

export default RiskGauge;
