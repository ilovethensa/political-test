import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Question, Party } from "../types";
import { calculateResults, shuffle } from "../lib/utils";

export function usePoliticalTest(questions: Question[], parties: Party[]) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const answersParam = searchParams.get("answers");
  
  const [localAnswers, setLocalAnswers] = useState<Record<string, number>>({});
  const [localQuestionIndex, setLocalQuestionIndex] = useState(-1);
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);
  const [clickedOption, setClickedOption] = useState<number | null>(null);
  const [expandedParties, setExpandedParties] = useState<Record<string, boolean>>({});

  const isResultsMode = !!answersParam;

  const answers = useMemo(() => {
    if (!answersParam) return localAnswers;
    const decoded: Record<string, number> = {};
    questions.forEach((q, i) => {
      const val = parseInt(answersParam[i], 10);
      if (val >= 1 && val <= 5) decoded[q.id] = val;
    });
    return decoded;
  }, [answersParam, questions, localAnswers]);

    const currentQuestionIndex = isResultsMode ? questions.length : localQuestionIndex;

    const questionIndex = questionOrder[currentQuestionIndex];

    const currentQuestion = questionIndex !== undefined ? questions[questionIndex] : null;

  

    const results = useMemo(() => 

      isResultsMode ? calculateResults(answers, questions, parties) : [], 

      [isResultsMode, answers, questions, parties]

    );

  

    const handleAnswer = (value: number) => {

      if (clickedOption !== null || isResultsMode || !currentQuestion) return;

      

      setClickedOption(value);

      const newAnswers = { ...answers, [currentQuestion.id]: value };

      setLocalAnswers(newAnswers);

  

      setTimeout(() => {

        if (localQuestionIndex < questions.length - 1) {

          setLocalQuestionIndex(prev => prev + 1);

          setClickedOption(null);

        } else {

          const answersString = questions.map(q => newAnswers[q.id] || 3).join('');

          router.push(`/?answers=${answersString}`);

        }

      }, 200);

    };

  

    const startTest = () => {

      setQuestionOrder(shuffle(Array.from({ length: questions.length }, (_, i) => i)));

      setLocalQuestionIndex(0);

    };

  

    const resetAll = () => router.push('/');

  

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

  