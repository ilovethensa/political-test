import { Question } from "../types";
import { OPTIONS } from "../lib/constants";
import { OptionButton } from "./OptionButton";

type TestViewProps = {
  currentQuestion: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  clickedOption: number | null;
  handleAnswer: (value: number) => void;
};

export function TestView({ 
  currentQuestion, 
  currentQuestionIndex, 
  totalQuestions, 
  clickedOption, 
  handleAnswer 
}: TestViewProps) {
  const getFontSize = (text: string) => {
    const len = text.length;
    if (len > 250) return "text-lg sm:text-xl";
    if (len > 200) return "text-xl sm:text-2xl";
    if (len > 150) return "text-2xl sm:text-2xl";
    if (len > 100) return "text-2xl sm:text-3xl";
    if (len > 50) return "text-3xl sm:text-4xl";
    return "text-4xl sm:text-5xl";
  };

  return (
    <>
      <div className="max-w-2xl w-full flex-grow flex flex-col justify-center px-6 pb-[450px] sm:pb-40 relative z-10">
        <header className="space-y-6">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500">
            Стъпка {currentQuestionIndex + 1} / {totalQuestions}
          </span>
          <h2 className={`${getFontSize(currentQuestion.description)} leading-snug tracking-tight`}>
            {currentQuestion.description}
          </h2>
        </header>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
        <div className={`max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-5 gap-3 ${clickedOption !== null ? 'pointer-events-none' : ''}`}>
          {OPTIONS.map((option) => (
            <OptionButton 
              key={option.value} 
              option={option} 
              handleAnswer={handleAnswer} 
              isClicked={clickedOption === option.value} 
            />
          ))}
        </div>
      </div>
    </>
  );
}
