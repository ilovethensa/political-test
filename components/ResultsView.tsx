import { Question, PartyResult } from "../types";
import { getOptionData } from "../lib/constants";

type ResultsViewProps = {
  results: PartyResult[];
  expandedParties: Record<string, boolean>;
  toggleParty: (partyName: string, defaultExpanded: boolean) => void;
  resetAll: () => void;
};

export function ResultsView({ results, expandedParties, toggleParty, resetAll }: ResultsViewProps) {
  return (
    <div className="w-full max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8 space-y-16">
      <header className="text-center space-y-4">
        <h1 className="text-3xl tracking-tight">Резултати</h1>
        <p className="text-gray-400">Вашата съвместимост в спектъра.</p>
      </header>
      
      <div className="space-y-6">
        {results.map((result, idx) => {
          const isDefaultExpanded = idx === 0;
          const isExpanded = expandedParties[result.party.name] ?? isDefaultExpanded;
          return (
            <section key={result.party.name} className="border border-white transition-all">
              <button 
                onClick={() => toggleParty(result.party.name, isDefaultExpanded)}
                className="w-full text-left p-8 flex flex-col sm:flex-row justify-between items-baseline gap-4 hover:bg-white/5 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h2 className={`text-3xl ${idx === 0 ? 'text-green-400' : 'text-white'}`}>{result.party.name}</h2>
                    <span className="text-xs text-gray-500 uppercase tracking-widest">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                  <p className="text-gray-400 max-w-md text-sm">{result.party.description}</p>
                </div>
                <div className={`text-5xl font-extralight tracking-tighter ${idx === 0 ? 'text-green-400' : 'text-white'}`}>
                  {result.compatibility}<span className="text-2xl ml-1">%</span>
                </div>
              </button>
              
              {isExpanded && (
                <div className="px-8 pb-8 space-y-6 border-t border-gray-800 pt-8 animate-in fade-in slide-in-from-top-2 duration-300">
                  {result.breakdown.map((item) => (
                    <div key={item.questionId} className="flex flex-col gap-4 py-6 border-b border-gray-800 last:border-b-0">
                      <p className="text-sm text-gray-200 leading-relaxed">{item.questionText}</p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-center">
                        {[
                          { label: "Вашето мнение", val: item.userAnswer },
                          { label: "Мнение на партията", val: item.partyPosition }
                        ].map((opinion, i) => (
                          <div key={i} className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-widest text-gray-500">{opinion.label}</span>
                            <span className={`text-sm font-medium ${getOptionData(opinion.val).color.split(' ')[0]}`}>
                              {getOptionData(opinion.val).label}
                            </span>
                          </div>
                        ))}

                        <div className="flex flex-col gap-1 col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-gray-800 pt-2 sm:pt-0 sm:pl-4">
                          <span className="text-[10px] uppercase tracking-widest text-gray-500">Разлика: {item.difference}</span>
                          <span className={`text-xs ${
                            item.difference <= 1 ? 'text-green-400' : 
                            item.difference === 2 ? 'text-yellow-400' : 
                            'text-red-400'
                          }`}>
                            {item.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
      
      <footer className="pt-12 pb-10 flex justify-center">
        <button onClick={resetAll} className="px-10 py-3 border border-white hover:bg-white hover:text-black transition-all">Рестарт</button>
      </footer>
    </div>
  );
}
