"use client";

import { Suspense } from "react";
import testData from "../data/test-data.json";
import { Question, Party } from "../types";
import { usePoliticalTest } from "../hooks/usePoliticalTest";
import { StartView } from "../components/StartView";
import { TestView } from "../components/TestView";
import { ResultsView } from "../components/ResultsView";

function TestContent() {
  const questions = testData.questions as Question[];
  const parties = testData.parties as Party[];
  
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

export default function Home() {
  return (
    <div className="font-mono min-h-screen bg-black text-white flex flex-col items-center transition-colors duration-500">
      <Suspense fallback={null}>
        <TestContent />
      </Suspense>
    </div>
  );
}
