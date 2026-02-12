"use client";

import { useEffect, useRef } from "react";
import { Question, Party } from "../types";
import { usePoliticalTest } from "../hooks/usePoliticalTest";
import { StartView } from "./StartView";
import { TestView } from "./TestView";
import { ResultsView } from "./ResultsView";
import { logTestResult } from "../app/actions";
import { useSearchParams } from "next/navigation";

type TestClientProps = {
  questions: Question[];
  parties: Party[];
};

export function TestClient({ questions, parties }: TestClientProps) {
  const searchParams = useSearchParams();
  const answersParam = searchParams.get("answers");
  const hasLogged = useRef(false);

  const {
    currentQuestionIndex,
    currentQuestion,
    isResultsMode,
    results,
    clickedOption,
    expandedParties,
    startTest,
    handleAnswer,
    resetAll,
    toggleParty,
  } = usePoliticalTest(questions, parties);

  useEffect(() => {
    if (isResultsMode && answersParam && !hasLogged.current) {
      hasLogged.current = true;
      logTestResult(answersParam);
    }
  }, [isResultsMode, answersParam]);

  if (isResultsMode) {
    return <ResultsView results={results} expandedParties={expandedParties} toggleParty={toggleParty} resetAll={resetAll} />;
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
