import { useMemo, useState } from "react";
import GlassHero from "./components/GlassHero";
import PlanBuilder, { PlanList } from "./components/PlanBuilder";
import Flashcards from "./components/Flashcards";
import QuizWidget from "./components/QuizWidget";

export default function App() {
  const [plans, setPlans] = useState([]);
  const [badges, setBadges] = useState(["Starter", "Quiz-Profi"]);

  const overallProgress = useMemo(() => {
    if (!plans.length) return 0.2;
    const done = plans.filter((p) => p.done).length;
    return done / plans.length;
  }, [plans]);

  const addPlan = (p) => setPlans((arr) => [p, ...arr]);
  const togglePlan = (id) => setPlans((arr) => arr.map((p) => (p.id === id ? { ...p, done: !p.done } : p)));

  const onQuizFinish = ({ score, total }) => {
    if (score === total) {
      setBadges((b) => (b.includes("Perfekt!") ? b : ["Perfekt!", ...b]));
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,#312e81_0%,#0f172a_45%,#020617_100%)] text-white">
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <GlassHero overallProgress={overallProgress} badges={badges} />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <PlanBuilder onCreate={addPlan} />
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-xl">
              <div className="mb-2 text-sm font-medium text-white/80">Geplante Sessions</div>
              <PlanList items={plans} onToggle={togglePlan} />
            </div>
          </div>
          <div className="space-y-4">
            <Flashcards />
            <QuizWidget onFinish={onQuizFinish} />
          </div>
        </div>

        <footer className="mt-10 text-center text-xs text-white/50">
          Mobilfreundlich, klar strukturiert und mit Liquid-Glass-Look & Feel.
        </footer>
      </div>
    </div>
  );
}
