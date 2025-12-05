import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, ChevronDown, MoreVertical, Pencil, MessageSquare } from "lucide-react";
import { type Question, type QuestionStatus } from "@shared/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface QuizPageProps {
  questions: Question[];
  questionStatuses: QuestionStatus[];
  currentQuestion: number;
  onAnswerSelect: (questionId: number, answerId: string) => void;
  onMarkForReview: (questionId: number) => void;
  onNavigate: (questionIndex: number) => void;
  onNext: () => void;
  onBack: () => void;
  onOpenCheckWork: () => void;
  studentName: string;
}

export default function QuizPage({
  questions,
  questionStatuses,
  currentQuestion,
  onAnswerSelect,
  onMarkForReview,
  onNavigate,
  onNext,
  onBack,
  onOpenCheckWork,
  studentName,
}: QuizPageProps) {
  const [showDirections, setShowDirections] = useState(false);
  const question = questions[currentQuestion];
  const status = questionStatuses[currentQuestion];
  const totalQuestions = questions.length;

  const answeredCount = questionStatuses.filter((s) => s.answered).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col" data-testid="page-quiz">
      <header className="bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-foreground" data-testid="text-section-title">
              Section 1, Module 1: Reading and Writing
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1" data-testid="button-directions">
                  Directions
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80">
                <div className="p-3 text-sm text-muted-foreground">
                  Read each passage and question carefully. Select the best answer from the choices provided.
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
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

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          {question.passage && (
            <div className="max-w-2xl mb-8">
              <p className="text-foreground leading-relaxed" data-testid="text-passage">
                {question.passage}
              </p>
            </div>
          )}
        </div>

        <div className="w-[400px] border-l border-border bg-background overflow-auto">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-lg px-3 py-1 font-semibold" data-testid="text-question-number">
                {currentQuestion + 1}
              </Badge>
              <button
                onClick={() => onMarkForReview(question.id)}
                className={`flex items-center gap-1 text-sm transition-colors ${
                  status.markedForReview
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="button-mark-review"
              >
                <Bookmark className={`w-4 h-4 ${status.markedForReview ? "fill-current" : ""}`} />
                Mark for Review
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs" data-testid="badge-progress">
                {progressPercent}%
              </Badge>
              <Button variant="ghost" size="icon" data-testid="button-annotate">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="p-4">
            <p className="text-foreground mb-6" data-testid="text-question">
              {question.text}
            </p>

            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => onAnswerSelect(question.id, option.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg border transition-all text-left ${
                    status.selectedAnswer === option.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                  data-testid={`button-option-${option.id}`}
                >
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      status.selectedAnswer === option.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground text-muted-foreground"
                    }`}
                  >
                    {option.id}
                  </span>
                  <span className="text-foreground pt-0.5">{option.text}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </Button>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-card border-t border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-foreground font-medium" data-testid="text-student-name">
            {studentName}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2" data-testid="button-question-navigator">
                Question {currentQuestion + 1} of {totalQuestions}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-80 p-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="font-medium">Section 1, Module 1: Reading and Writing Questions</span>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 border border-muted-foreground rounded-sm"></span>
                    Unanswered
                  </span>
                  <span className="flex items-center gap-1">
                    <Bookmark className="w-3 h-3 text-destructive fill-destructive" />
                    For Review
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-10 gap-1">
                {questions.map((_, index) => {
                  const qStatus = questionStatuses[index];
                  return (
                    <button
                      key={index}
                      onClick={() => onNavigate(index)}
                      className={`w-8 h-8 rounded text-sm font-medium flex items-center justify-center transition-colors ${
                        currentQuestion === index
                          ? "bg-primary text-primary-foreground"
                          : qStatus.answered
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted-foreground/20"
                      } ${qStatus.markedForReview ? "ring-2 ring-destructive ring-offset-1" : ""}`}
                      data-testid={`button-nav-question-${index + 1}`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2">
            {currentQuestion > 0 && (
              <Button onClick={onBack} data-testid="button-back">
                Back
              </Button>
            )}
            {currentQuestion < totalQuestions - 1 ? (
              <Button onClick={onNext} data-testid="button-next">
                Next
              </Button>
            ) : (
              <Button onClick={onOpenCheckWork} data-testid="button-check-work">
                Check Work
              </Button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
