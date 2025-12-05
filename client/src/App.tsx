import { useState, useEffect, useCallback } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import StartCodePage from "@/pages/start-code";
import QuizPage from "@/pages/quiz";
import CheckWorkPage from "@/pages/check-work";
import BreakPage from "@/pages/break";
import { sampleQuestions, type QuestionStatus } from "@shared/schema";

type AppPage = "start-code" | "quiz" | "check-work" | "break";

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>("start-code");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionStatuses, setQuestionStatuses] = useState<QuestionStatus[]>(
    sampleQuestions.map((q) => ({
      id: q.id,
      answered: false,
      markedForReview: false,
      selectedAnswer: undefined,
    }))
  );

  const requestFullscreen = useCallback(() => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {});
    }
  }, []);

  const handleStartTest = (newSessionId: string) => {
    setSessionId(newSessionId);
    setCurrentPage("quiz");
    requestFullscreen();
  };

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setQuestionStatuses((prev) =>
      prev.map((status) =>
        status.id === questionId
          ? { ...status, answered: true, selectedAnswer: answerId }
          : status
      )
    );
  };

  const handleMarkForReview = (questionId: number) => {
    setQuestionStatuses((prev) =>
      prev.map((status) =>
        status.id === questionId
          ? { ...status, markedForReview: !status.markedForReview }
          : status
      )
    );
  };

  const handleNavigate = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
    if (currentPage === "check-work") {
      setCurrentPage("quiz");
    }
  };

  const handleNext = () => {
    if (currentPage === "quiz") {
      if (currentQuestion < sampleQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setCurrentPage("check-work");
      }
    } else if (currentPage === "check-work") {
      setCurrentPage("break");
    }
  };

  const handleBack = () => {
    if (currentPage === "quiz" && currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else if (currentPage === "check-work") {
      setCurrentPage("quiz");
      setCurrentQuestion(sampleQuestions.length - 1);
    }
  };

  const handleOpenCheckWork = () => {
    setCurrentPage("check-work");
  };

  const handleResume = () => {
    setCurrentPage("quiz");
    setCurrentQuestion(0);
    setQuestionStatuses(
      sampleQuestions.map((q) => ({
        id: q.id,
        answered: false,
        markedForReview: false,
        selectedAnswer: undefined,
      }))
    );
  };

  const answeredCount = questionStatuses.filter((s) => s.answered).length;
  const progressPercent = Math.round((answeredCount / sampleQuestions.length) * 100);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {currentPage === "start-code" && (
          <StartCodePage onStartTest={handleStartTest} />
        )}
        {currentPage === "quiz" && (
          <QuizPage
            questions={sampleQuestions}
            questionStatuses={questionStatuses}
            currentQuestion={currentQuestion}
            onAnswerSelect={handleAnswerSelect}
            onMarkForReview={handleMarkForReview}
            onNavigate={handleNavigate}
            onNext={handleNext}
            onBack={handleBack}
            onOpenCheckWork={handleOpenCheckWork}
            studentName="Nurislam Amanbek"
          />
        )}
        {currentPage === "check-work" && (
          <CheckWorkPage
            questionStatuses={questionStatuses}
            currentQuestion={currentQuestion}
            onNavigate={handleNavigate}
            onBack={handleBack}
            onNext={handleNext}
            studentName="Nurislam Amanbek"
          />
        )}
        {currentPage === "break" && (
          <BreakPage
            breakDuration={600}
            onResume={handleResume}
            progressPercent={progressPercent}
          />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
