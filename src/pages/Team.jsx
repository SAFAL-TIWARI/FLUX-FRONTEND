import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Linkedin, X, User, ExternalLink, Activity, GraduationCap, Layers, ChevronDown, Compass
} from 'lucide-react';
import { TEAM_DATA, SESSIONS } from '../data/teamData';

/* ===================== HOOKS ===================== */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

/* ===================== SUB-COMPONENTS ===================== */
import { TechFrame, LeaderCard, AdaptiveScrollRow, MemberRegistryMatrix } from '../components/TeamComponents';

/* ===================== MAIN COMPONENT ===================== */

const FluxTeam = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeSession, setActiveSession] = useState('2026-27');
  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const isMobile = useIsMobile();

  const currentTeam = TEAM_DATA[activeSession] || TEAM_DATA['2026-27'];

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white pt-24 md:pt-32 pb-20 overflow-x-hidden font-sans transition-colors duration-500">

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-8">
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 dark:border-white/10 pb-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-[10px] tracking-[0.5em] uppercase">
              <Activity size={12} className="animate-pulse" /> System_Access_Active
            </div>
            <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400">
                The_Flux_Units
              </span>
            </h1>
          </div>

          {/* Cyberpunk Session Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            <div className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 tracking-[0.2em] uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
              SESSION_CYCLE:
            </div>

            <div className="relative z-30 w-full sm:w-auto">
              <button
                onClick={() => setIsSessionOpen(!isSessionOpen)}
                className="flex items-center justify-between gap-3 bg-white/80 dark:bg-[#0c0c0c] backdrop-blur-xl px-5 py-3 rounded-xl border border-slate-200 dark:border-cyan-500/30 text-xs font-mono font-bold tracking-widest text-slate-800 dark:text-cyan-400 hover:border-cyan-500 transition-all w-full sm:min-w-[180px] shadow-lg shadow-cyan-500/5"
              >
                <span className="flex items-center gap-2">
                  <span className="text-cyan-500 font-black">//</span> {activeSession}
                </span>
                <ChevronDown size={14} className={`text-cyan-500 transition-transform duration-300 ${isSessionOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isSessionOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-full sm:w-52 bg-white dark:bg-[#09090b] border border-slate-200 dark:border-cyan-500/30 rounded-xl shadow-2xl overflow-hidden p-1.5 z-50 backdrop-blur-2xl"
                  >
                    {SESSIONS.map((session) => (
                      <button
                        key={session}
                        onClick={() => {
                          setActiveSession(session);
                          setIsSessionOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
                          activeSession === session
                            ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <span>{session}</span>
                        {activeSession === session && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono">ACTIVE</span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSession}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* 1. CONVENORS */}
            {currentTeam.convenors && currentTeam.convenors.length > 0 && (
              <section className="mb-32">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-2 h-2 bg-cyan-500 rotate-45" />
                  <h3 className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-[0.4em]">Class_A // Commanders</h3>
                  <div className="h-px w-full bg-gradient-to-r from-cyan-500/50 to-transparent" />
                </div>
                <AdaptiveScrollRow
                  items={currentTeam.convenors}
                  isMobile={isMobile}
                  renderItem={(m) => (
                    <div onClick={() => setSelectedItem(m)} className="h-full">
                      <LeaderCard member={m} color="cyan" isMobile={isMobile} />
                    </div>
                  )}
                />
              </section>
            )}

            {/* 2. CO-CONVENORS */}
            {currentTeam.coConvenors && currentTeam.coConvenors.length > 0 && (
              <section className="mb-32">
                <div className="flex items-center gap-4 mb-12 flex-row-reverse">
                  <div className="w-2 h-2 bg-purple-500 rotate-45" />
                  <h3 className="text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-[0.4em]">Sub_Class // Strategists</h3>
                  <div className="h-px w-full bg-gradient-to-l from-purple-500/50 to-transparent" />
                </div>
                <AdaptiveScrollRow
                  items={currentTeam.coConvenors}
                  reverse
                  isMobile={isMobile}
                  renderItem={(m) => (
                    <div onClick={() => setSelectedItem(m)} className="h-full">
                      <LeaderCard member={m} color="purple" isMobile={isMobile} />
                    </div>
                  )}
                />
              </section>
            )}

            {/* 3. DOMAIN HEADS (3rd Year Domain Leads) */}
            {currentTeam.heads && currentTeam.heads.length > 0 && (
              <section className="mb-32">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-2 h-2 bg-emerald-500 rotate-45" />
                  <h3 className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.4em]">Tactical_Leads // Domain Heads</h3>
                  <div className="h-px w-full bg-gradient-to-r from-emerald-500/50 to-transparent" />
                </div>
                <AdaptiveScrollRow
                  items={currentTeam.heads}
                  isMobile={isMobile}
                  baseVelocity={2.2}
                  renderItem={(m) => (
                    <div onClick={() => setSelectedItem(m)} className="h-full">
                      <LeaderCard member={m} color="emerald" isMobile={isMobile} />
                    </div>
                  )}
                />
              </section>
            )}

            {/* 4. THIRD YEAR REGISTRY */}
            {currentTeam.thirdYear && currentTeam.thirdYear.length > 0 && (
              <section className="mb-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rotate-45" />
                  <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em]">Member_Registry // 3rd Year</h3>
                  <div className="h-px w-full bg-gradient-to-r from-black/10 dark:from-white/10 to-transparent" />
                </div>
                <MemberRegistryMatrix members={currentTeam.thirdYear} isMobile={isMobile} />
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* MODAL / LIGHTBOX */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-white/90 dark:bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="max-w-3xl w-full h-[90vh] md:h-auto bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 relative overflow-y-auto overflow-x-hidden shadow-2xl scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 aspect-square bg-zinc-950">
                  <img src={selectedItem.img} alt={selectedItem.name} className="w-full h-full object-cover" />
                </div>

                <div className="p-8 md:p-12 flex-1 space-y-6 relative">
                  <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 text-slate-400 hover:text-black dark:hover:text-white">
                    <X size={24} />
                  </button>
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 tracking-[0.4em] uppercase">Auth_Identity</div>
                    <h2 className="text-4xl font-black italic uppercase text-black dark:text-white tracking-tighter">{selectedItem.name}</h2>
                    <p className="font-mono text-slate-400 dark:text-white/40 text-[10px] uppercase">{selectedItem.role}</p>
                  </div>

                  <div className="flex gap-6 border-y border-gray-100 dark:border-white/5 py-4 my-2">
                    <div className="space-y-1">
                      <span className="flex items-center gap-1 text-[8px] font-mono text-slate-400 uppercase"><Layers size={10} /> Sector</span>
                      <span className="text-[10px] font-black uppercase tracking-wider block text-black dark:text-white">{selectedItem.branch}</span>
                    </div>
                    <div className="w-px h-8 bg-gray-100 dark:bg-white/5" />
                    <div className="space-y-1">
                      <span className="flex items-center gap-1 text-[8px] font-mono text-slate-400 uppercase"><GraduationCap size={10} /> Clearance</span>
                      <span className="text-[10px] font-black uppercase tracking-wider block text-black dark:text-white">{selectedItem.year}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-light italic">
                    {selectedItem.bio || "Core tactical unit member specialized in technical orchestration and development excellence."}
                  </p>

                  <div className="flex pt-4">
                    <a
                      href={selectedItem.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center gap-2 hover:bg-cyan-600 dark:hover:bg-cyan-500 hover:text-white transition-all text-[8px] md:text-[10px] font-black uppercase tracking-widest"
                    >
                      <Linkedin size={14} /> LinkedIn_Profile
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes scan { 
          0% { transform: translateY(-100%); } 
          100% { transform: translateY(300%); } 
        }
        .animate-scan { animation: scan linear infinite; }
      `}</style>
    </div>
  );
};

export default FluxTeam;