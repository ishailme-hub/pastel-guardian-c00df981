import { useState } from "react";
import { Shield, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CaptchaChallengeProps {
  onSuccess: () => void;
}

const images = [
  { id: 1, isTarget: true },
  { id: 2, isTarget: false },
  { id: 3, isTarget: true },
  { id: 4, isTarget: false },
  { id: 5, isTarget: true },
  { id: 6, isTarget: false },
  { id: 7, isTarget: false },
  { id: 8, isTarget: true },
  { id: 9, isTarget: false },
];

const CaptchaChallenge = ({ onSuccess }: CaptchaChallengeProps) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);

  const toggleSelection = (id: number) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user selected all correct images
    const correctSelections = images.filter(img => img.isTarget).map(img => img.id);
    const isCorrect = correctSelections.every(id => selected.includes(id)) &&
                      selected.every(id => correctSelections.includes(id));
    
    if (isCorrect) {
      onSuccess();
    } else {
      setSelected([]);
      setIsVerifying(false);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-8 border-warning/30 bg-warning/5 animate-scale-in">
      <div className="text-center mb-6">
        <div className="inline-flex p-4 rounded-2xl bg-warning/10 mb-4">
          <Shield className="w-8 h-8 text-warning" />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          Security Verification
        </h1>
        <p className="text-muted-foreground">
          Select all squares containing <span className="font-semibold text-foreground">traffic lights</span>
        </p>
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-3 gap-2 mb-6 p-2 bg-muted/30 rounded-xl">
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => toggleSelection(img.id)}
            className={`aspect-square rounded-lg overflow-hidden relative transition-all duration-200 ${
              selected.includes(img.id)
                ? "ring-4 ring-primary ring-offset-2"
                : "hover:opacity-80"
            }`}
          >
            <div 
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, hsl(${img.id * 40}, 50%, ${img.isTarget ? "60%" : "75%"}), hsl(${img.id * 40 + 30}, 50%, ${img.isTarget ? "50%" : "65%"}))`,
              }}
            />
            {selected.includes(img.id) && (
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <RefreshCw className="w-4 h-4" />
          <span>New challenge</span>
        </button>
        
        <Button
          onClick={handleVerify}
          disabled={selected.length === 0 || isVerifying}
          className="px-6 h-11 rounded-xl bg-gradient-to-r from-primary to-cyber-blue text-white font-semibold"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </Button>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-center text-muted-foreground">
          This verification helps protect against automated attacks
        </p>
      </div>
    </div>
  );
};

export default CaptchaChallenge;
