import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, MapPin, Users, ArrowLeft,
  Sparkles, CheckCircle, Code, Award,
  Cpu, Rocket, Terminal, ExternalLink
} from 'lucide-react';

import posterImg from '../assets/banner/9.jpeg';

const CodeToCreation_26 = () => {
  const highlights = [
    {
      icon: Code,
      title: "MERN Stack Mastery",
      desc: "Learn MongoDB, Express.js, React, and Node.js from scratch to construct complete web apps."
    },
    {
      icon: Cpu,
      title: "AI Tools 10x Velocity",
      desc: "Leverage state-of-the-art AI pair programming and assistant workflows to build features rapidly."
    },
    {
      icon: Rocket,
      title: "Live Interactive Build",
      desc: "Hands-on CRUD deployment during the workshop session with real-time mentor guidance."
    },
    {
      icon: Award,
      title: "Goodies & Certificates",
      desc: "Exclusive merchandise, tech goodies, and official certificates for all active participants."
    }
  ];

  const curriculum = [
    "Frontend Fundamentals with React & Tailwind CSS",
    "Backend APIs & RESTful Microservices with Node.js",
    "Database Modeling with MongoDB & Mongoose",
    "AI Code Assistants & Workflow Optimization",
    "Building & Deploying a Full-Stack Web Application"
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020202] text-slate-900 dark:text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans transition-colors duration-500">
      {/* Background HUD Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] bg-cyan-500/10 blur-[140px] rounded-full opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-cyan-500 hover:border-cyan-500/40 transition-all"
          >
            <ArrowLeft size={16} /> Back to Events
          </Link>
        </div>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              <span className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-pulse" />
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold tracking-[0.2em] uppercase">
                Hands-On Web Development Workshop
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black italic uppercase tracking-tighter leading-none text-slate-900 dark:text-white">
              Code To <span className="text-cyan-600 dark:text-cyan-500">Creation</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              Transform your logic into functional web applications. Join speaker <strong className="text-cyan-600 dark:text-cyan-400">Devanshu Vishwakarma</strong> for an immersive session on modern full-stack development, AI acceleration, and live app creation.
            </p>

            {/* Quick Meta Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl">
                <Calendar className="text-cyan-500 mb-2" size={20} />
                <p className="text-xs font-mono text-slate-400 uppercase">Date & Time</p>
                <p className="font-bold text-sm text-slate-900 dark:text-white">17 Aug 2026 (Mon)</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl">
                <MapPin className="text-cyan-500 mb-2" size={20} />
                <p className="text-xs font-mono text-slate-400 uppercase">Venue</p>
                <p className="font-bold text-sm text-slate-900 dark:text-white">Smart Classroom</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl">
                <Users className="text-cyan-500 mb-2" size={20} />
                <p className="text-xs font-mono text-slate-400 uppercase">Speaker / Host</p>
                <p className="font-bold text-sm text-slate-900 dark:text-white">Devanshu V.</p>
              </div>
            </div>
          </motion.div>

          {/* Event Poster Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5"
          >
            <div className="relative group overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl bg-black">
              <img
                src={posterImg}
                alt="Code To Creation Poster"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>
        </div>

        {/* WORKSHOP HIGHLIGHTS */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">
              Workshop <span className="text-cyan-600 dark:text-cyan-500">Highlights</span>
            </h2>
            <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h, idx) => {
              const IconComp = h.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 mb-4 group-hover:scale-110 transition-transform">
                    <IconComp size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{h.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{h.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CURRICULUM & TERMINAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          <div className="lg:col-span-7 bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-cyan-500" size={24} />
              <h3 className="text-2xl font-black italic uppercase tracking-tighter">What You Will Learn</h3>
            </div>
            <ul className="space-y-4">
              {curriculum.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="text-cyan-500 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-slate-700 dark:text-slate-300 text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 bg-[#050505] border border-cyan-500/20 rounded-3xl p-6 font-mono text-xs text-cyan-400/90 leading-relaxed shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-4">
              <span className="flex items-center gap-2 font-bold text-cyan-400">
                <Terminal size={16} /> WORKSHOP_SPECS.LOG
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed text-cyan-300/80 mb-6">
{`> event: Hands-On_Web_Development_Workshop
> speaker: Devanshu_Vishwakarma
> date: 17_August_2026_(Monday)
> venue: SMART_CLASSROOM
> focus: MERN_Stack, AI_Tools_10x_Faster
> status: Registration_Open
> perks: Goodies & Rewards`}
            </pre>
            <div className="pt-4 border-t border-cyan-500/20 text-slate-500 text-[11px]">
              TECHNICAL CLUB FLUX // SATI VIDISHA
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CodeToCreation_26;
