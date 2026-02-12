import { Suspense } from "react";
import testData from "../data/test-data.json";
import { Question, Party } from "../types";
import { TestClient } from "../components/TestClient";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ answers?: string }>;
}) {
  const { answers } = await searchParams;

  return (
    <div className="font-mono min-h-screen bg-black text-white flex flex-col items-center">
      <Suspense fallback={null}>
        <TestClient 
          key={answers || 'start'}
          questions={testData.questions as Question[]} 
          parties={testData.parties as Party[]} 
        />
      </Suspense>
    </div>
  );
}
