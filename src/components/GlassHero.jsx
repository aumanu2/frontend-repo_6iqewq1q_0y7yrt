import { Rocket, Bell, Trophy, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function GlassHero({ overallProgress = 0, badges = [] }) {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-purple-400/30 blur-2xl" />
        <div className="absolute bottom-0 left-10 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl px-4 pt-10 pb-6 sm:pt-16"
      >
        {/* Nav */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">StudyFlow</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white/90 shadow-lg shadow-black/10 backdrop-blur-xl transition hover:bg-white/20">
              <Bell className="h-4 w-4" />
              Reminders
            </button>
          </div>
        </div>

        {/* Hero card (liquid glass) */}
        <div className="relative rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-10">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-white/5" />

          <div className="relative z-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Dein Lernhub: Pläne, Karteikarten, Quizze – alles an einem Ort
              </h1>
              <p className="mt-3 text-sm text-white/80 sm:text-base">
                Erstelle smarte Lernpläne, wiederhole mit Karteikarten, teste dich mit Quizzen und sammle Badges. Angepasst an dein Niveau – mobilfreundlich und super übersichtlich.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-xl bg-white/80 px-4 py-2 text-sm font-medium text-slate-900 shadow hover:bg-white">
                  <Sparkles className="h-4 w-4" /> Jetzt starten
                </button>
                <div className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-white/80 backdrop-blur-xl">
                  <Trophy className="h-4 w-4 text-yellow-300" /> {badges.length} Badges
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="relative mx-auto w-full max-w-xs">
                <svg viewBox="0 0 120 120" className="h-40 w-40">
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                  <circle cx="60" cy="60" r="50" stroke="#ffffff30" strokeWidth="12" fill="none" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="url(#grad)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${Math.PI * 100}`}
                    strokeDashoffset={`${Math.PI * 100 * (1 - Math.min(1, Math.max(0, overallProgress)))}`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-white">{Math.round(overallProgress * 100)}%</div>
                    <div className="text-xs text-white/70">Fortschritt</div>
                  </div>
                </div>
              </div>
              {/* Badges row */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {badges.slice(0, 3).map((b, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur-xl"
                  >
                    <Trophy className="h-3 w-3 text-yellow-300" /> {b}
                  </span>
                ))}
                {badges.length === 0 && (
                  <span className="text-xs text-white/60">Sammle Badges, indem du Aufgaben abschließt.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
