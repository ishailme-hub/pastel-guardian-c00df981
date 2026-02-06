import { useState } from "react";
import { Mail, Shield, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/layout/Navigation";
import CaptchaChallenge from "@/components/reset/CaptchaChallenge";
import MfaVerification from "@/components/reset/MfaVerification";
import ProofOfWork from "@/components/reset/ProofOfWork";

type ResetStep = "email" | "captcha" | "mfa" | "pow" | "success" | "honeypot";

const PasswordReset = () => {
  const [step, setStep] = useState<ResetStep>("email");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [riskScore] = useState(55); // Simulated risk score

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Decision based on simulated risk score
    if (riskScore <= 40) {
      setStep("success");
    } else if (riskScore <= 80) {
      setStep("captcha"); // or "mfa" based on configuration
    } else {
      setStep("honeypot");
    }
    
    setIsLoading(false);
  };

  const handleCaptchaSuccess = () => {
    setStep("pow");
  };

  const handlePowComplete = () => {
    setStep("success");
  };

  const handleMfaSuccess = () => {
    setStep("success");
  };

  return (
    <div className="min-h-screen bg-mesh">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto">
          {step === "email" && (
            <div className="glass-card rounded-3xl p-8 border-border/50 animate-scale-in">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-cyber-purple/20 mb-4">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                  Reset Your Password
                </h1>
                <p className="text-muted-foreground">
                  Enter your email address and we'll send you a secure reset link
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="pl-12 h-12 rounded-xl border-border bg-background/50 focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-cyber-blue text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing request...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {/* Security indicator */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-success" />
                  <span>Protected by Stealth Guard AI</span>
                </div>
              </div>
            </div>
          )}

          {step === "captcha" && (
            <CaptchaChallenge onSuccess={handleCaptchaSuccess} />
          )}

          {step === "mfa" && (
            <MfaVerification onSuccess={handleMfaSuccess} />
          )}

          {step === "pow" && (
            <ProofOfWork onComplete={handlePowComplete} difficulty={3} />
          )}

          {step === "success" && (
            <RealSuccessScreen email={email} />
          )}

          {step === "honeypot" && (
            <HoneypotScreen email={email} />
          )}
        </div>
      </main>
    </div>
  );
};

// Real success screen for legitimate users
const RealSuccessScreen = ({ email }: { email: string }) => (
  <div className="glass-card rounded-3xl p-8 border-success/30 bg-success/5 animate-scale-in">
    <div className="text-center">
      <div className="inline-flex p-4 rounded-2xl bg-success/10 mb-4">
        <Mail className="w-8 h-8 text-success" />
      </div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">
        Check Your Email
      </h1>
      <p className="text-muted-foreground mb-6">
        We've sent a password reset link to
      </p>
      <p className="font-mono text-foreground bg-muted/50 px-4 py-2 rounded-lg inline-block mb-6">
        {email}
      </p>
      <p className="text-sm text-muted-foreground">
        Click the link in the email to reset your password. The link will expire in 15 minutes.
      </p>
      
      <div className="mt-8 p-4 rounded-xl bg-success/10 border border-success/20">
        <div className="flex items-center justify-center gap-2 text-success text-sm font-medium">
          <Shield className="w-4 h-4" />
          <span>Verified legitimate request • Email sent successfully</span>
        </div>
      </div>
    </div>
  </div>
);

// Honeypot fake success screen for attackers
const HoneypotScreen = ({ email }: { email: string }) => (
  <div className="glass-card rounded-3xl p-8 border-success/30 bg-success/5 animate-scale-in">
    <div className="text-center">
      <div className="inline-flex p-4 rounded-2xl bg-success/10 mb-4">
        <Mail className="w-8 h-8 text-success" />
      </div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">
        Email Sent!
      </h1>
      <p className="text-muted-foreground mb-6">
        If an account exists for this email, you'll receive a reset link shortly.
      </p>
      <p className="font-mono text-foreground bg-muted/50 px-4 py-2 rounded-lg inline-block mb-6">
        {email}
      </p>
      <p className="text-sm text-muted-foreground">
        Please check your inbox and spam folder. The link will expire in 15 minutes.
      </p>
      
      {/* This looks identical to the real success screen to attackers */}
      <div className="mt-8 p-4 rounded-xl bg-success/10 border border-success/20">
        <div className="flex items-center justify-center gap-2 text-success text-sm font-medium">
          <Shield className="w-4 h-4" />
          <span>Request processed successfully</span>
        </div>
      </div>
    </div>
  </div>
);

export default PasswordReset;
