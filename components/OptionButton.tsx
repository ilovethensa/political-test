import { Option } from "../types";

type OptionButtonProps = {
  option: Option;
  handleAnswer: (value: number) => void;
  isClicked: boolean;
};

export const OptionButton = ({ option, handleAnswer, isClicked }: OptionButtonProps) => {
  return (
    <button 
      onClick={() => handleAnswer(option.value)} 
      className={`w-full text-left sm:text-center py-4 px-4 sm:px-2 border ${option.color} transition-all duration-100 ease-out ${isClicked ? option.flashColor : 'bg-transparent'} flex flex-col justify-between h-full`}
    >
      <div className="flex sm:flex-col justify-between items-center sm:justify-center h-full gap-2">
        <span className="text-[10px] sm:text-[9px] uppercase tracking-widest leading-tight">{option.label}</span>
        <span className="text-[10px] opacity-30 font-light">{option.value}</span>
      </div>
    </button>
  );
};
