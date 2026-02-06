import { useState, useRef, useEffect } from "react";
import { Smartphone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MfaVerificationProps {
  onSuccess: () => void;
}

const MfaVerification = ({ onSuccess }: MfaVerificationProps) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate verification (any 6 digits works for demo)
    if (code.every(c => c !== "")) {
      onSuccess();
    }
    setIsVerifying(false);
  };

  const handleResend = () => {
    // Simulate resend
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="glass-card rounded-3xl p-8 border-cyber-purple/30 bg-cyber-purple/5 animate-scale-in">
      <div className="text-center mb-8">
        <div className="inline-flex p-4 rounded-2xl bg-cyber-purple/10 mb-4">
          <Smartphone className="w-8 h-8 text-cyber-purple" />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          Two-Factor Authentication
        </h1>
        <p className="text-muted-foreground">
          Enter the 6-digit code from your authenticator app
        </p>
      </div>

      {/* OTP Input */}
      <div className="flex justify-center gap-3 mb-8">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        ))}
      </div>

      <Button
        onClick={handleVerify}
        disabled={code.some(c => c === "") || isVerifying}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-cyber-purple to-cyber-pink text-white font-semibold"
      >
        {isVerifying ? "Verifying..." : "Verify Code"}
      </Button>

      <div className="mt-6 text-center">
        <button 
          onClick={handleResend}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Didn't receive a code? <span className="text-primary font-medium">Resend</span>
        </button>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4 text-cyber-purple" />
          <span>Additional verification required for this request</span>
        </div>
      </div>
    </div>
  );
};

export default MfaVerification;
