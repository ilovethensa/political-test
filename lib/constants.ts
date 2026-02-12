import { Option } from "../types";

export const OPTIONS: Option[] = [
  { value: 1, label: "Напълно против", color: "text-red-400 border-red-500 bg-red-900/40", flashColor: "bg-red-500/50" },
  { value: 2, label: "Против", color: "text-orange-400 border-orange-500 bg-orange-900/40", flashColor: "bg-orange-500/50" },
  { value: 3, label: "Неутрално", color: "text-gray-400 border-gray-500 bg-gray-900/40", flashColor: "bg-gray-500/50" },
  { value: 4, label: "За", color: "text-lime-400 border-lime-500 bg-lime-900/40", flashColor: "bg-lime-500/50" },
  { value: 5, label: "Напълно за", color: "text-green-400 border-green-500 bg-green-900/40", flashColor: "bg-green-500/50" },
];

export const getLabel = (diff: number) => {
  if (diff === 0) return "Пълно съгласие";
  if (diff <= 1) return "Съгласие";
  if (diff <= 2) return "Различие";
  if (diff <= 3) return "Силно различие";
  return "Пълно несъгласие";
};

export const getOptionData = (value: number) => {
  const rounded = Math.round(value);
  return OPTIONS.find(o => o.value === rounded) || { 
    value: 3, 
    label: "Неутрално", 
    color: "text-gray-400 border-gray-500 bg-gray-900/40", 
    flashColor: "bg-gray-500/50" 
  };
};
