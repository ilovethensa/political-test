export type Question = {
  id: string;
  description: string;
  positions: Record<string, number>;
};

export type Party = {
  name: string;
  description: string;
};

export type ResultBreakdown = {
  questionId: string;
  questionText: string;
  userAnswer: number;
  partyPosition: number;
  difference: number;
  label: string;
};

export type PartyResult = {
  party: Party;
  totalDifference: number;
  compatibility: number;
  breakdown: ResultBreakdown[];
};

export type Option = {
  value: number;
  label: string;
  color: string;
  flashColor: string;
};
