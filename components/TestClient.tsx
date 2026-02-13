"use client";

import { Question, Party } from "../types";
import { usePoliticalTest } from "../hooks/usePoliticalTest";
import { StartView } from "./StartView";
import { TestView } from "./TestView";
import { ResultsView } from "./ResultsView";
import { useSearchParams } from "next/navigation";

type TestClientProps = {
  questions: Question[];
  parties: Party[];
};

export function TestClient({ questions, parties }: TestClientProps) {
  const searchParams = useSearchParams();
  const {
    currentQuestionIndex,
    currentQuestion,
    isResultsMode,
    results,
    clickedOption,
    startTest,
    handleAnswer,
    resetAll,
  } = usePoliticalTest(questions, parties);

  if (isResultsMode) {
    return <ResultsView results={results} resetAll={resetAll} />;
  }

  if (currentQuestionIndex === -1) {
    return <StartView onStart={startTest} />;
  }

  if (currentQuestion) {
    return (
      <TestView 
        currentQuestion={currentQuestion} 
        currentQuestionIndex={currentQuestionIndex} 
        totalQuestions={questions.length} 
        clickedOption={clickedOption} 
        handleAnswer={handleAnswer} 
      />
    );
  }

  return null;
}
