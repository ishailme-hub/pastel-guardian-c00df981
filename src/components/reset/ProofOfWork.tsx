import { useState, useEffect } from "react";
import { Cpu, Zap, Shield, CheckCircle } from "lucide-react";

interface ProofOfWorkProps {
  onComplete: () => void;
  difficulty?: number;
}

const ProofOfWork = ({ onComplete, difficulty = 3 }: ProofOfWorkProps) => {
  const [progress, setProgress] = useState(0);
  const [hashRate, setHashRate] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const duration = difficulty * 2000; // 2 seconds per difficulty level
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      setProgress(Math.min(current, 100));
      setHashRate(Math.floor(Math.random() * 500 + 500));
      
      // Generate fake hash
      const chars = "0123456789abcdef";
      let hash = "0x";
      for (let i = 0; i < 16; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
      }
      setCurrentHash(hash);

      if (current >= 100) {
        clearInterval(timer);
        setIsComplete(true);
        setTimeout(onComplete, 1000);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [difficulty, onComplete]);

  return (
    <div className="glass-card rounded-3xl p-8 border-cyber-blue/30 bg-cyber-blue/5 animate-scale-in">
      <div className="text-center mb-8">
        <div className="inline-flex p-4 rounded-2xl bg-cyber-blue/10 mb-4">
          {isComplete ? (
            <CheckCircle className="w-8 h-8 text-success" />
          ) : (
            <Cpu className="w-8 h-8 text-cyber-blue animate-pulse" />
          )}
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          {isComplete ? "Verification Complete!" : "Processing Request"}
        </h1>
        <p className="text-muted-foreground">
          {isComplete 
            ? "Your request has been verified" 
            : "Completing background verification..."}
        </p>
      </div>

      {/* Progress visualization */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-mono text-foreground">{Math.round(progress)}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyber-blue to-cyber-teal transition-all duration-100 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Technical details */}
      <div className="space-y-4 p-4 bg-muted/30 rounded-xl font-mono text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Hash Rate
          </span>
          <span className="text-foreground">{isComplete ? "—" : `${hashRate} H/s`}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Difficulty</span>
          <span className="text-foreground">{difficulty}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Current Hash</span>
          <span className="text-foreground text-xs truncate max-w-32">
            {isComplete ? "✓ Valid" : currentHash}
          </span>
        </div>
      </div>

      {/* Animated dots for processing */}
      {!isComplete && (
        <div className="mt-6 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4 text-cyber-blue" />
          <span>SHA-256 Proof-of-Work challenge</span>
        </div>
      </div>
    </div>
  );
};

export default ProofOfWork;
