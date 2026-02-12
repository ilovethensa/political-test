'use server'

import testData from "../data/test-data.json";
import { Question, Party } from "../types";
import { calculateResults } from "../lib/utils";

export async function logTestResult(answersParam: string) {
  const endpoint = process.env.ANALYTICS_ENDPOINT;
  if (!endpoint || !answersParam) return;

  try {
    const questions = testData.questions as Question[];
    const parties = testData.parties as Party[];
    
    // Decode answers from the URL string
    const answers: Record<string, number> = {};
    const values = answersParam.split('').map(v => parseInt(v, 10));
    
    if (values.length !== questions.length) return;

    questions.forEach((q, i) => {
      if (values[i] >= 1 && values[i] <= 5) {
        answers[q.id] = values[i];
      }
    });

    const results = calculateResults(answers, questions, parties);

    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testId: "political-test",
        answers,
        results,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('Analytics error:', error);
  }
}