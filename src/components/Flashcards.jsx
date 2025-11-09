import { useMemo, useState } from "react";
import { Shuffle, ChevronRight, ChevronLeft } from "lucide-react";

const sample = [
  { q: "Was ist Photosynthese?", a: "Der Prozess, bei dem Pflanzen Lichtenergie in chemische Energie umwandeln." },
  { q: "a² + b² = ?", a: "c² (Satz des Pythagoras)" },
  { q: "Capital of France?", a: "Paris" },
];

export default function Flashcards() {
  const [index, setIndex] = useState(0);
  const [showA, setShowA] = useState(false);
  const [shuffled, setShuffled] = useState(false);

  const cards = useMemo(() => {
    if (!shuffled) return sample;
    return [...sample].sort(() => Math.random() - 0.5);
  }, [shuffled]);

  const next = () => {
    setShowA(false);
    setIndex((i) => (i + 1) % cards.length);
  };
  const prev = () => {
    setShowA(false);
    setIndex((i) => (i - 1 + cards.length) % cards.length);
  };

  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-white shadow-lg backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium text-white/80">Karteikarten</div>
        <button
          onClick={() => setShuffled((s) => !s)}
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/80 hover:bg-white/20"
        >
          <Shuffle className="h-4 w-4" /> Mischen
        </button>
      </div>

      <div
        onClick={() => setShowA((v) => !v)}
        className="relative mx-auto flex h-36 w-full max-w-md cursor-pointer select-none items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-4 text-center shadow-inner"
      >
        <div className="text-sm text-white/90">
          {!showA ? cards[index].q : cards[index].a}
        </div>
        <div className="pointer-events-none absolute bottom-2 right-3 text-[10px] text-white/50">Tippen zum Umdrehen</div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-3">
        <button onClick={prev} className="rounded-xl border border-white/20 bg-white/10 p-2 text-white/80 hover:bg-white/20">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-xs text-white/70">
          {index + 1} / {cards.length}
        </div>
        <button onClick={next} className="rounded-xl border border-white/20 bg-white/10 p-2 text-white/80 hover:bg-white/20">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
