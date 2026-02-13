import { useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Question, Party } from "../types";
import { calculateResults, shuffle } from "../lib/utils";

export function usePoliticalTest(questions: Question[], parties: Party[]) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const answersParam = searchParams.get("answers");
  
  const [localAnswers, setLocalAnswers] = useState<Record<string, number>>({});
  const [index, setIndex] = useState(-1);
  const [order, setOrder] = useState<number[]>([]);
  const [clickedOption, setClickedOption] = useState<number | null>(null);

  const isResultsMode = !!answersParam;

  const answers = useMemo(() => {
    if (!answersParam) return localAnswers;
    return questions.reduce((acc, q, i) => {
      const val = parseInt(answersParam[i], 10);
      if (val >= 1 && val <= 5) acc[q.id] = val;
      return acc;
    }, {} as Record<string, number>);
  }, [answersParam, questions, localAnswers]);

  const currentQuestion = useMemo(() => {
    const questionIndex = order[index];
    return questionIndex !== undefined ? questions[questionIndex] : null;
  }, [questions, order, index]);

  const results = useMemo(() => 
    isResultsMode ? calculateResults(answers, questions, parties) : [], 
    [isResultsMode, answers, questions, parties]
  );

  const handleAnswer = useCallback((value: number) => {
    if (clickedOption !== null || isResultsMode || !currentQuestion) return;
    
    setClickedOption(value);
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setLocalAnswers(newAnswers);

    setTimeout(() => {
      if (index < questions.length - 1) {
        setIndex(prev => prev + 1);
        setClickedOption(null);
      } else {
        const answersString = questions.map(q => newAnswers[q.id] ?? 3).join('');
        router.push(`/?answers=${answersString}`);
      }
    }, 200);
  }, [clickedOption, isResultsMode, currentQuestion, answers, index, questions, router]);

  const startTest = useCallback(() => {
    setOrder(shuffle(questions.map((_, i) => i)));
    setIndex(0);
  }, [questions]);

  const resetAll = useCallback(() => router.push('/'), [router]);

  return {
    answers,
    currentQuestionIndex: index,
    currentQuestion,
    isResultsMode,
    results,
    clickedOption,
    startTest,
    handleAnswer,
    resetAll,
  };
}