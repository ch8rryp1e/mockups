import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, ChevronDown, MoreVertical, Pencil } from "lucide-react";
import { type QuestionStatus } from "@shared/schema";

interface CheckWorkPageProps {
  questionStatuses: QuestionStatus[];
  currentQuestion: number;
  onNavigate: (questionIndex: number) => void;
  onBack: () => void;
  onNext: () => void;
  studentName: string;
}

export default function CheckWorkPage({
  questionStatuses,
  currentQuestion,
  onNavigate,
  onBack,
  onNext,
  studentName,
}: CheckWorkPageProps) {
  const totalQuestions = questionStatuses.length;
  const answeredCount = questionStatuses.filter((s) => s.answered).length;
  const unansweredCount = totalQuestions - answeredCount;
  const markedForReviewCount = questionStatuses.filter((s) => s.markedForReview).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col" data-testid="page-check-work">
      <header className="bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-foreground" data-testid="text-section-title">
              Section 1, Module 1: Reading and Writing
            </h1>
            <Button variant="outline" size="sm" className="gap-1" data-testid="button-directions">
              Directions
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" data-testid="button-show">
              Show
            </Button>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Button variant="ghost" size="icon" data-testid="button-highlight">
                <Pencil className="w-4 h-4" />
              </Button>
              <span>Highlights & Notes</span>
              <Button variant="ghost" size="icon" data-testid="button-more">
                <MoreVertical className="w-4 h-4" />
              </Button>
              <span>More</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl text-center space-y-8">
          <h2 className="text-3xl font-semibold text-foreground" data-testid="text-title">
            Check Your Work
          </h2>

          <div className="space-y-2 text-muted-foreground">
            <p data-testid="text-instruction-1">
              On test day, you won't be able to move on to the next module until time expires.
            </p>
            <p data-testid="text-instruction-2">
              For these practice questions, you can click <strong className="text-foreground">Next</strong> when you're ready to move on.
            </p>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground" data-testid="text-section-name">
                Section 1, Module 1: Reading and Writing Questions
              </h3>
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-4 h-4 border-2 border-muted-foreground rounded-sm"></span>
                  Unanswered
                </span>
                <span className="flex items-center gap-2 text-destructive">
                  <Bookmark className="w-4 h-4 fill-current" />
                  For Review
                </span>
              </div>
            </div>

            <div className="grid grid-cols-10 gap-2" data-testid="grid-questions">
              {questionStatuses.map((status, index) => (
                <button
                  key={index}
                  onClick={() => onNavigate(index)}
                  className={`w-10 h-10 rounded-md text-sm font-semibold flex items-center justify-center transition-all ${
                    status.answered
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground border-2 border-muted-foreground/30"
                  } ${status.markedForReview ? "ring-2 ring-destructive ring-offset-2" : ""} hover:scale-105`}
                  data-testid={`button-question-${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border flex justify-center gap-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground" data-testid="text-answered-count">
                  {answeredCount}
                </div>
                <div className="text-muted-foreground">Answered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground" data-testid="text-unanswered-count">
                  {unansweredCount}
                </div>
                <div className="text-muted-foreground">Unanswered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive" data-testid="text-review-count">
                  {markedForReviewCount}
                </div>
                <div className="text-muted-foreground">For Review</div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <footer className="bg-card border-t border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-foreground font-medium" data-testid="text-student-name">
            {studentName}
          </div>

          <Button variant="outline" className="gap-2" data-testid="button-question-nav">
            Question {currentQuestion + 1} of {totalQuestions}
            <ChevronDown className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button onClick={onBack} data-testid="button-back">
              Back
            </Button>
            <Button onClick={onNext} data-testid="button-next">
              Next
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
