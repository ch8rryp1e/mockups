import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface BreakPageProps {
  breakDuration: number;
  onResume: () => void;
  progressPercent: number;
}

export default function BreakPage({ breakDuration, onResume, progressPercent }: BreakPageProps) {
  const [remainingTime, setRemainingTime] = useState(breakDuration);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-card flex flex-col" data-testid="page-break">
      <header className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Progress value={progressPercent} className="flex-1 max-w-2xl h-2" />
          <Badge variant="secondary" className="ml-4" data-testid="badge-progress">
            {progressPercent}%
          </Badge>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="flex gap-16 items-start max-w-5xl">
          <Card className="flex-shrink-0 bg-foreground text-background p-8 rounded-lg">
            <div className="text-center">
              <p className="text-sm mb-2 opacity-80" data-testid="text-break-label">
                Remaining Break Time:
              </p>
              <div className="text-6xl font-bold tracking-tight" data-testid="text-timer">
                {formatTime(remainingTime)}
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-4" data-testid="text-title">
                Practice Test Break
              </h1>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-description">
                You can resume this practice test as soon as you're ready to move on. On test day, you'll wait until the clock counts down. Read below to see how breaks work on test day.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground" data-testid="text-subtitle">
                Take a Break: Do Not Close Your Device
              </h2>
              <p className="text-muted-foreground" data-testid="text-resume-info">
                After the break, a <strong className="text-foreground">Resume Testing Now</strong> button will appear and you'll start the next section.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground" data-testid="text-rules-title">
                Follow these rules during the break:
              </h3>
              <ol className="space-y-2 text-muted-foreground list-decimal list-inside" data-testid="list-rules">
                <li>Do not disturb students who are still testing.</li>
                <li>Do not exit the app or close your laptop.</li>
                <li>Do not access phones, smartwatches, textbooks, notes, or the internet.</li>
                <li>Do not eat or drink near any testing device.</li>
                <li>Do not speak in the testing room; outside the room, do not discuss the exam with anyone.</li>
              </ol>
            </div>

            <Button 
              size="lg" 
              onClick={onResume} 
              className="mt-4"
              data-testid="button-resume"
            >
              Resume Testing Now
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-card border-t border-border px-4 py-3">
        <div className="text-foreground font-medium" data-testid="text-student-name">
          Nurislam Amanbek
        </div>
      </footer>
    </div>
  );
}
