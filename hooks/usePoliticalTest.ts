import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Question, Party, PartyResult } from "../types";
import { calculateResults, shuffle } from "../lib/utils";

export function usePoliticalTest(questions: Question[], parties: Party[]) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);
  const [clickedOption, setClickedOption] = useState<number | null>(null);
  const [expandedParties, setExpandedParties] = useState<Record<string, boolean>>({});
  const [isResultsMode, setIsResultsMode] = useState(false);

  // Sync with URL
  useEffect(() => {
    const answersParam = searchParams.get("answers");
    if (answersParam) {
      const decoded: Record<string, number> = {};
      questions.forEach((q, i) => {
        const val = parseInt(answersParam[i], 10);
        if (val >= 1 && val <= 5) decoded[q.id] = val;
      });
      setAnswers(decoded);
      setIsResultsMode(true);
      setCurrentQuestionIndex(questions.length);
    } else {
      setAnswers({});
      setIsResultsMode(false);
      setCurrentQuestionIndex(-1);
      setQuestionOrder([]);
      setClickedOption(null);
      setExpandedParties({});
    }
  }, [searchParams, questions]);

  const results = useMemo(() => 
    isResultsMode ? calculateResults(answers, questions, parties) : [], 
    [isResultsMode, answers, questions, parties]
  );

  const currentQuestion = questionOrder[currentQuestionIndex] !== undefined 
    ? questions[questionOrder[currentQuestionIndex]] 
    : null;

  const handleAnswer = (value: number) => {
    if (clickedOption !== null || isResultsMode || !currentQuestion) return;
    
    setClickedOption(value);
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setClickedOption(null);
      } else {
        const answersString = questions.map(q => newAnswers[q.id] || 3).join('');
        router.push(`/?answers=${answersString}`);
      }
    }, 200);
  };

  const startTest = () => {
    setQuestionOrder(shuffle(Array.from({ length: questions.length }, (_, i) => i)));
    setCurrentQuestionIndex(0);
  };

  const resetAll = () => {
    setExpandedParties({});
    setClickedOption(null);
    router.push('/');
  };

  const toggleParty = (partyName: string, defaultExpanded: boolean) => {
    setExpandedParties(prev => ({ ...prev, [partyName]: !(prev[partyName] ?? defaultExpanded) }));
  };

  return {
    answers,
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
  };
}
