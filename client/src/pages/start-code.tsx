import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, Home } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { type StartCodeResponse } from "@shared/schema";

interface StartCodePageProps {
  onStartTest: (sessionId: string) => void;
}

export default function StartCodePage({ onStartTest }: StartCodePageProps) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { toast } = useToast();

  const submitCodeMutation = useMutation({
    mutationFn: async (code: string): Promise<StartCodeResponse> => {
      const response = await apiRequest("POST", "/api/start-code", { code });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Code Verified",
          description: "Starting your test...",
        });
        onStartTest(data.sessionId || "session-1");
      } else {
        toast({
          title: "Invalid Code",
          description: data.message || "Please check your code and try again.",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to verify code. Please try again.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newDigits = [...digits];
    for (let i = 0; i < pastedData.length; i++) {
      newDigits[i] = pastedData[i];
    }
    setDigits(newDigits);
    const nextEmptyIndex = pastedData.length < 6 ? pastedData.length : 5;
    inputRefs.current[nextEmptyIndex]?.focus();
  };

  const isCodeComplete = digits.every((d) => d !== "");

  const handleStartTest = () => {
    if (isCodeComplete) {
      const code = digits.join("");
      submitCodeMutation.mutate(code);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col" data-testid="page-start-code">
      <header className="flex items-center justify-between p-4 border-b border-border bg-background">
        <Button 
          variant="ghost" 
          className="gap-2 text-muted-foreground"
          data-testid="button-help"
        >
          <HelpCircle className="w-5 h-5" />
          Help
        </Button>
        <Button 
          variant="ghost" 
          className="gap-2 text-muted-foreground"
          data-testid="button-return-home"
        >
          Return to Home
          <Home className="w-5 h-5" />
        </Button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-xl text-center space-y-8">
          <h1 className="text-3xl font-semibold text-foreground" data-testid="text-title">
            Start Code
          </h1>

          <div className="space-y-4">
            <p className="text-muted-foreground text-lg" data-testid="text-instructions">
              Once the proctor shares the start code, enter it here to begin testing.
            </p>
            <p className="text-foreground font-medium" data-testid="text-hint">
              The start code contains <span className="font-bold">numbers only</span>.
            </p>
          </div>

          <div 
            className="flex justify-center gap-3"
            onPaste={handlePaste}
            data-testid="input-code-container"
          >
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-16 text-center text-2xl font-semibold border-2 border-input rounded-lg bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                data-testid={`input-digit-${index}`}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={handleStartTest}
            disabled={!isCodeComplete || submitCodeMutation.isPending}
            className="px-10 py-6 text-lg font-medium"
            data-testid="button-start-test"
          >
            {submitCodeMutation.isPending ? "Verifying..." : "Start Test"}
          </Button>

          <p className="text-muted-foreground text-sm" data-testid="text-review-instructions">
            You can{" "}
            <a href="#" className="text-primary underline hover:no-underline">
              review the instructions
            </a>{" "}
            that the proctor reads aloud.
          </p>
        </div>
      </main>
    </div>
  );
}
