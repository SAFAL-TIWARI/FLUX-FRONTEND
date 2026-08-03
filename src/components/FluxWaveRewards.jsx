import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Globe, Briefcase, Sparkles } from 'lucide-react';

const rewards = [
  {
    id: 1,
    title: "EXCITING PRIZES",
    subtitle: "1st, 2nd & 3rd Position winners will get Trophy, Winner Certificate and Cash Prizes.",
    icon: Trophy,
    color: "text-amber-400",
    glow: "drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]",
    dotColor: "bg-amber-400"
  },
  {
    id: 2,
    title: "PARTICIPATION & WINNER CERTIFICATES",
    subtitle: "All registered participants will receive official E-Certificate of Participation.",
    icon: Award,
    color: "text-pink-400",
    glow: "drop-shadow-[0_0_12px_rgba(244,114,182,0.6)]",
    dotColor: "bg-pink-400"
  },
  {
    id: 3,
    title: "CONNECT WITH INDUSTRY EXPERTS",
    subtitle: "Direct interaction, mentorship & guidance from tech domain leaders.",
    icon: Globe,
    color: "text-lime-400",
    glow: "drop-shadow-[0_0_12px_rgba(163,230,53,0.6)]",
    dotColor: "bg-lime-400"
  },
  {
    id: 4,
    title: "INTERNSHIP & NETWORKING OPPORTUNITIES",
    subtitle: "Exclusive internship referrals, career growth & hiring pathways.",
    icon: Briefcase,
    color: "text-cyan-400",
    glow: "drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]",
    dotColor: "bg-cyan-400"
  }
];

const FluxWaveRewards = () => {
  return (
    <section id="rewards" className="relative w-full px-4 sm:px-6 md:px-12 lg:px-24 py-8 md:py-10 z-10 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Transparent Cyber Banner Box */}
        <div className="relative rounded-2xl md:rounded-3xl border border-purple-500/30 dark:border-cyan-500/30 bg-white/5 dark:bg-white/[0.02]  p-6 sm:p-8 shadow-[0_0_30px_rgba(168,85,247,0.08)] overflow-hidden">
          
          {/* Top Pill Tag */}
          <div className="mb-6 sm:mb-8 flex items-center justify-start">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-400/50 bg-purple-950/40 text-white text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              WHY TO PARTICIPATE ?
            </div>
          </div>

          {/* 4 Dividers Grid Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 lg:divide-x divide-slate-200/10 dark:divide-white/10">
            {rewards.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center px-4 py-2 group"
                >
                  {/* Icon */}
                  <div className="mb-3 transition-transform duration-300 group-hover:scale-110">
                    <Icon className={`w-12 h-12 sm:w-14 sm:h-14 ${item.color} ${item.glow}`} strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 max-w-[220px] ${item.color}`}
                    style={{ fontFamily: '"AudiowideReal", sans-serif' }}
                  >
                    {item.title}
                  </h3>

                  {/* Subtitle / Details */}
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed max-w-[240px] mb-4 font-medium">
                    {item.subtitle}
                  </p>

                  {/* Underline Dot Accent (◦——◦) matching screenshot design */}
                  <div className="mt-auto flex items-center justify-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`}></span>
                    <span className={`w-10 h-[1.5px] ${item.dotColor}`}></span>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`}></span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default FluxWaveRewards;
