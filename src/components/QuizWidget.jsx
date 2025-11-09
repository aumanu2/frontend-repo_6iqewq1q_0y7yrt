import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";

const sampleQuestions = [
  {
    q: "Welcher Planet ist der dritte von der Sonne?",
    options: ["Merkur", "Venus", "Erde", "Mars"],
    answer: 2,
  },
  {
    q: "Was ist 7 × 8?",
    options: ["54", "56", "64", "48"],
    answer: 1,
  },
];

export default function QuizWidget({ onFinish }) {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [finished, setFinished] = useState(false);

  const q = sampleQuestions[i];
  const progress = useMemo(() => (i + (picked !== null ? 1 : 0)) / sampleQuestions.length, [i, picked]);

  const select = (idx) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (i + 1 === sampleQuestions.length) {
        setFinished(true);
        onFinish?.({ score: score + (idx === q.answer ? 1 : 0), total: sampleQuestions.length });
      } else {
        setI((n) => n + 1);
        setPicked(null);
      }
    }, 700);
  };

  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-white shadow-lg backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium text-white/80">Schnell-Quiz</div>
        <div className="text-xs text-white/60">Score: {score}</div>
      </div>

      {/* Progress bar */}
      <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>

      {!finished ? (
        <div>
          <div className="mb-3 text-sm text-white/90">{q.q}</div>
          <div className="grid gap-2">
            {q.options.map((opt, idx) => {
              const state = picked === null ? "idle" : idx === q.answer ? "correct" : idx === picked ? "wrong" : "idle";
              return (
                <button
                  key={idx}
                  onClick={() => select(idx)}
                  className={`flex items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition ${
                    state === "correct"
                      ? "border-emerald-300/40 bg-emerald-300/10"
                      : state === "wrong"
                      ? "border-rose-300/40 bg-rose-300/10"
                      : "border-white/20 bg-white/10 hover:bg-white/20"
                  }`}
                >
                  <span className="text-white/90">{opt}</span>
                  {state === "correct" && <Check className="h-4 w-4 text-emerald-300" />}
                  {state === "wrong" && <X className="h-4 w-4 text-rose-300" />}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center text-sm text-white/80">
          Geschafft! Du hast {score} von {sampleQuestions.length} richtig.
        </div>
      )}
    </div>
  );
}
