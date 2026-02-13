type StartViewProps = {
  onStart: () => void;
};

export function StartView({ onStart }: StartViewProps) {
  return (
    <div className="flex flex-col h-screen h-[100dvh] w-full max-w-3xl mx-auto overflow-hidden">
      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center space-y-8 min-h-0">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl tracking-tight">
            Политически тест
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Открийте коя партия е най-близо до вашите възгледи.
          </p>
        </div>
        <button
          onClick={onStart}
          className="px-10 py-4 border border-white hover:bg-white hover:text-black transition-all uppercase text-sm font-medium"
        >
          Начало
        </button>
      </div>
    </div>
  );
}
