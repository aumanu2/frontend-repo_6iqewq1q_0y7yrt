import { useState } from "react";
import { Calendar, Plus, Clock, CheckCircle2 } from "lucide-react";

export default function PlanBuilder({ onCreate }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [minutes, setMinutes] = useState(30);

  const addPlan = () => {
    if (!title.trim()) return;
    const plan = {
      id: crypto.randomUUID(),
      title: title.trim(),
      subject: subject.trim() || "Allgemein",
      minutes: Number(minutes) || 30,
      createdAt: new Date().toISOString(),
      done: false,
    };
    onCreate?.(plan);
    setTitle("");
    setSubject("");
    setMinutes(30);
  };

  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-white shadow-lg backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-2 text-white/80">
        <Calendar className="h-4 w-4" />
        <span className="text-sm font-medium">Lernplan erstellen</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Thema / Aufgabe"
          className="sm:col-span-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/50 focus:border-white/40"
        />
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Fach (z.B. Mathe)"
          className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/50 focus:border-white/40"
        />
        <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm">
          <Clock className="h-4 w-4 text-white/70" />
          <input
            type="number"
            min={5}
            max={180}
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-full bg-transparent text-right outline-none"
          />
          <span className="text-white/60">Min</span>
        </div>
        <button
          onClick={addPlan}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
        >
          <Plus className="h-4 w-4" /> Hinzufügen
        </button>
      </div>

      {/* Preview planned items */}
      <PlanList onToggle={(id) => {}} items={[]} />
    </div>
  );
}

export function PlanList({ items = [], onToggle }) {
  if (!items.length) {
    return (
      <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/60">
        Noch keine Einträge – leg los und plane deine Lernsessions.
      </div>
    );
  }
  return (
    <ul className="mt-3 space-y-2">
      {items.map((it) => (
        <li
          key={it.id}
          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2"
        >
          <div className="flex items-center gap-3">
            <button onClick={() => onToggle?.(it.id)} className="text-white/70">
              <CheckCircle2 className={`h-5 w-5 ${it.done ? "text-emerald-400" : "text-white/40"}`} />
            </button>
            <div>
              <div className="text-sm text-white/90">{it.title}</div>
              <div className="text-xs text-white/60">{it.subject} • {it.minutes} Min</div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
