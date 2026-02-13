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
    <div className="font-mono h-screen h-[100dvh] bg-black text-white overflow-hidden">
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
