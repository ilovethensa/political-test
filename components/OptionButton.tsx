import { Option } from "../types";

type OptionButtonProps = {
  option: Option;
  handleAnswer: (value: number) => void;
  isClicked: boolean;
};

export const OptionButton = ({ option, handleAnswer, isClicked }: OptionButtonProps) => {
  // Extract background classes from option.color if any, to avoid conflicts
  // but here it's easier to just use the flashColor when clicked.
  return (
    <button 
      onClick={() => handleAnswer(option.value)} 
      className={`w-full text-left sm:text-center py-3 sm:py-4 px-4 sm:px-2 border transition-all duration-100 ease-out flex flex-col justify-between h-full ${option.color} ${isClicked ? option.flashColor : ''}`}
    >
      <div className="flex sm:flex-col justify-between items-center sm:justify-center h-full gap-2">
        <span className="text-[10px] sm:text-[9px] uppercase tracking-widest leading-tight">{option.label}</span>
        <span className="text-[10px] opacity-30 font-light">{option.value}</span>
      </div>
    </button>
  );
};
