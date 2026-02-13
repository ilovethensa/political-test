import { Question, Party, PartyResult } from "../types";
import { getLabel } from "./constants";

export const calculateResults = (userAnswers: Record<string, number>, questions: Question[], parties: Party[]): PartyResult[] => {
  const activeQuestions = questions.filter(q => userAnswers[q.id] !== undefined && userAnswers[q.id] !== 3);
  const totalMaxDiff = activeQuestions.length * 4;

  return parties.map(party => {
    const breakdown = activeQuestions.map(q => {
      const diff = Math.abs(userAnswers[q.id] - q.positions[party.name]);
      return {
        questionId: q.id,
        questionText: q.description,
        userAnswer: userAnswers[q.id],
        partyPosition: q.positions[party.name],
        difference: diff,
        label: getLabel(diff),
      };
    });

    const totalDifference = breakdown.reduce((sum, item) => sum + item.difference, 0);

    return {
      party,
      totalDifference,
      compatibility: totalMaxDiff ? Math.round(((totalMaxDiff - totalDifference) / totalMaxDiff) * 100) : 0,
      breakdown,
    };
  }).sort((a, b) => b.compatibility - a.compatibility);
};

export const shuffle = <T,>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
