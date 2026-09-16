import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Users, ExternalLink,
  ChevronDown, MessageCircle, Clock,
  Award, Zap, CheckCircle, Mail, Phone,
  FileText, UserCheck, Sparkles, Send, Globe
} from 'lucide-react';

const TimelineStageCard = ({ date, title, subtitle, description, status, icon: Icon, isLast, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative mb-12 lg:mb-16 last:mb-0 w-full">
      {/* Desktop Center Line */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-cyan-500/30 via-cyan-500/10 to-transparent top-0 -z-10" />

      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 w-full group relative">
        {/* Stage Badge Icon */}
        <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-2 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
          <Icon size={22} className="text-cyan-600 dark:text-cyan-400" />
        </div>

        {/* Mobile Line */}
        <div className="lg:hidden absolute left-[35px] top-12 bottom-[-48px] w-0.5 bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent last:hidden" />

        {/* Content Box */}
        <div className={`lg:contents ${isEven ? 'lg:text-right' : 'lg:flex-row-reverse'}`}>
          <div className={`${isEven ? 'order-1' : 'order-2'} w-full pl-20 lg:pl-0 pr-0`}>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200/60 dark:border-white/10 p-6 md:p-8 rounded-3xl hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500 relative ${isEven ? 'lg:mr-auto' : 'lg:ml-auto'} shadow-xl dark:shadow-none w-full group-hover:-translate-y-1`}
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-black tracking-widest uppercase border border-cyan-500/20">
                  <Calendar size={12} />
                  {date}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${status === 'Active'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 animate-pulse'
                  : 'bg-slate-500/10 text-slate-500 dark:text-slate-400 border border-slate-500/20'
                  }`}>
                  {status}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-black italic text-slate-900 dark:text-white uppercase tracking-tighter mb-1">
                {title}
              </h3>
              <p className="text-cyan-600 dark:text-cyan-400 font-mono text-xs uppercase tracking-wider mb-3">
                {subtitle}
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                {description}
              </p>
            </motion.div>
          </div>
          <div className={`${isEven ? 'order-2' : 'order-1'} hidden lg:block w-full`} />
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200/60 dark:border-white/10 rounded-2xl overflow-hidden bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl hover:border-cyan-500/30 transition-all shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-6 text-left gap-4"
      >
        <span className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100">{question}</span>
        <ChevronDown
          className={`text-cyan-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/60 dark:border-white/5 pt-4 text-sm md:text-base">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DomainCard = ({ domain, index }) => (
  <div className="w-[220px] sm:w-[350px] shrink-0 group relative rounded-3xl border border-slate-200/60 dark:border-white/10 p-6 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl hover:border-cyan-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between select-none">
    <div>
      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-sm group-hover:scale-110 transition-transform">
        {String(index).padStart(2, '0')}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
        {domain.name}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        {domain.desc}
      </p>
    </div>
  </div>
);

const Recruitment_26 = () => {
  const stages = [
    {
      date: "17 September",
      title: "Registration Opens",
      subtitle: "Phase 01 // Initial Application",
      description: "Official portal opens for online registration. Fill out your details, select your preferred domains, and enter the recruitment funnel.",
      status: "Upcoming",
      icon: Send
    },
    {
      date: "26 September",
      title: "Pen & Paper Test",
      subtitle: "Phase 02 // Aptitude & Skill Evaluation",
      description: "Offline assessment testing technical aptitude, logical reasoning, domain knowledge, and creative problem-solving skills.",
      status: "Upcoming",
      icon: FileText
    },
    {
      date: "10 October",
      title: "Personal Interview",
      subtitle: "Phase 03 // Core Panel Interview",
      description: "One-on-one interview with FLUX leads and executive office bearers evaluating passion, technical depth, and teamwork mindset.",
      status: "Upcoming",
      icon: UserCheck
    },
    {
      date: "12 October",
      title: "Final Result",
      subtitle: "Phase 04 // Induction",
      description: "Official announcement of shortlisted candidates selected to join Technical Club FLUX for the 2026 term.",
      status: "Upcoming",
      icon: Award
    }
  ];

  const domainsRow1 = [
    { name: "Technical Executive", desc: "Software engineering, algorithms, problem solving & coding sprints.", id: 1 },
    { name: "Web Developer", desc: "Building scalable web apps, UI components, and modern full-stack systems.", id: 2 },
    { name: "Video Editor", desc: "VFX, motion graphics, event reels, and cinematic storytelling.", id: 3 },
    { name: "Sponsorship & Promotion", desc: "Industry outreach, partner relationships, PR, and event execution.", id: 4 }
  ];

  const domainsRow2 = [
    { name: "Hardware / IoT", desc: "Robotics, microcontrollers, embedded circuits & sensor integration.", id: 5 },
    { name: "Graphic Designer", desc: "UI/UX wireframes, branding, promotional graphics, and visual design.", id: 6 },
    { name: "Content Writer", desc: "Blogs, technical documentation, event scripts & social media copy.", id: 7 },
    { name: "AI & Data Solutions", desc: "Machine learning pipelines, data analysis, and intelligent automation.", id: 8 }
  ];

  // Repeat items for seamless continuous looping
  const loopedRow1 = [...domainsRow1, ...domainsRow1, ...domainsRow1];
  const loopedRow2 = [...domainsRow2, ...domainsRow2, ...domainsRow2];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020202] text-slate-900 dark:text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans transition-colors duration-500">
      {/* HUD Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] bg-cyan-500/10 blur-[140px] rounded-full opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6"
          >
            <span className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-pulse" />
            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold tracking-[0.2em] uppercase">
              Official Recruitment Drive 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6 text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:via-slate-200 dark:to-slate-400"
          >
            Recruitment <span className="text-cyan-600 dark:text-cyan-500">"2026"</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-cyan-600 dark:text-cyan-400 font-mono tracking-widest uppercase italic mb-6"
          >
            Specialized in impossible things
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Become part of SATI's premier technical innovation club. Build cutting-edge robotics, software systems, IoT solutions, and elevate your engineering career.
          </motion.p>
        </div>

        {/* RECRUITMENT OVERVIEW */}
        <div className="max-w-4xl mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/40 dark:bg-white/[0.03] backdrop-blur-2xl border border-slate-200/60 dark:border-white/10 rounded-3xl p-8 md:p-10 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-cyan-500" size={28} />
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
                Recruitment Overview
              </h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base mb-8">
              The annual FLUX recruitment is designed to discover passionate, creative, and technical minds across engineering disciplines. Whether you code, design, build hardware, edit videos, or manage events — there is a role for you to lead and innovate.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/40 dark:bg-cyan-500/[0.04] backdrop-blur-md border border-cyan-500/20">
                <Calendar className="text-cyan-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Key Timeline Window</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-mono">17 September 2026 — 12 October 2026</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/40 dark:bg-cyan-500/[0.04] backdrop-blur-md border border-cyan-500/20">
                <MapPin className="text-cyan-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Campus Venue</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-mono">SATI Vidisha Campus // Written & Interview Venues TBA</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/40 dark:bg-cyan-500/[0.04] backdrop-blur-md border border-cyan-500/20">
                <Users className="text-cyan-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Eligibility</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-mono">Open for 2nd Year SATI Engineering Students</p>
                </div>
              </div>
            </div>

            {/* Action Buttons: Register Online, WhatsApp Group, Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <Link
                to="/events/recruitment-2026/register"
                className="flex items-center justify-center gap-2 py-4 px-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-bold uppercase tracking-wider text-xs transition-all shadow-lg shadow-cyan-500/20 text-center"
              >
                <Send size={15} /> Register Online
              </Link>
              <a
                href="https://chat.whatsapp.com/JKSDCOwvPjcDFZvzPGKaeN?s=sh&p=a&mlu=4&ilr=4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold uppercase tracking-wider text-xs transition-all shadow-lg shadow-emerald-500/20 text-center"
              >
                <MessageCircle size={16} /> WhatsApp Group
              </a>
              <a
                href="#need-help-contacts"
                className="flex items-center justify-center gap-2 py-4 px-4 bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 backdrop-blur-md text-slate-900 dark:text-white rounded-2xl font-bold uppercase tracking-wider text-xs transition-all border border-slate-200/60 dark:border-white/10 text-center"
              >
                <Phone size={15} /> Contact Leads
              </a>
            </div>
          </motion.div>
        </div>

        {/* TIMELINE STAGES */}
        <div className="max-w-5xl mx-auto mb-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4 text-slate-900 dark:text-white">
              Recruitment <span className="text-cyan-600 dark:text-cyan-500">Timeline</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-xl mx-auto">
              Track the official selection roadmap from registration to final club induction.
            </p>
            <div className="h-1 w-24 bg-cyan-500 mx-auto rounded-full mt-6" />
          </div>

          <div className="relative">
            {stages.map((stage, i) => (
              <TimelineStageCard
                key={i}
                index={i}
                date={stage.date}
                title={stage.title}
                subtitle={stage.subtitle}
                description={stage.description}
                status={stage.status}
                icon={stage.icon}
                isLast={i === stages.length - 1}
              />
            ))}
          </div>
        </div>

        {/* AVAILABLE DOMAINS / TEAMS - HORIZONTAL MOTION IN TWO OPPOSITE ROWS */}
        <div className="w-full max-w-7xl mx-auto mb-32 overflow-hidden">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4 text-slate-900 dark:text-white">
              Explore Our <span className="text-cyan-600 dark:text-cyan-500">Domains</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-xl mx-auto">
              Find your calling in technical development, hardware engineering, creative arts, or event management.
            </p>
            <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full mt-6" />
          </div>

          {/* Dual Opposite Marquee Container with edge mask */}
          <div className="space-y-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-2">
            {/* Row 1: Flowing Left */}
            <div className="flex overflow-hidden select-none group">
              <div className="flex gap-6 shrink-0 animate-marquee-row-left hover:[animation-play-state:paused]">
                {loopedRow1.map((d, idx) => (
                  <DomainCard key={`r1-${idx}`} domain={d} index={d.id} />
                ))}
              </div>
            </div>

            {/* Row 2: Flowing Right */}
            <div className="flex overflow-hidden select-none group">
              <div className="flex gap-6 shrink-0 animate-marquee-row-right hover:[animation-play-state:paused]">
                {loopedRow2.map((d, idx) => (
                  <DomainCard key={`r2-${idx}`} domain={d} index={d.id} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="max-w-3xl mx-auto mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4 text-slate-900 dark:text-white">
              Frequently Asked <span className="text-cyan-600 dark:text-cyan-500">Questions</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400">Everything you need to know about joining FLUX.</p>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="Who is eligible for FLUX Recruitment 2026?"
              answer="First and Second year undergraduate students from SATI Vidisha across all branches can apply."
            />
            <FAQItem
              question="Can I apply for multiple domains?"
              answer="Yes! You can express interest in up to two domains during online registration."
            />
            <FAQItem
              question="What is the format of the Pen & Paper Test?"
              answer="The test contains sections on general aptitude, logical reasoning, basic engineering concepts, and domain-specific problem statements."
            />
            <FAQItem
              question="What should I prepare for the Personal Interview?"
              answer="Be prepared to talk about your projects, technical interests, why you wish to join FLUX, and demonstrate your eagerness to learn."
            />
          </div>
        </div>

        {/* NEED HELP? SECTION (Technovision Style - Replaces Student Coordinators below FAQs) */}
        <div id="need-help-contacts" className="text-center bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200/60 dark:border-white/10 rounded-3xl p-8 sm:p-12 mb-12 max-w-4xl mx-auto shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tight mb-4 text-slate-900 dark:text-white">Need Help?</h2>
          <div className="flex flex-col items-center gap-4">
            <Link
              to="/contact"
              className="text-cyan-600 dark:text-cyan-400 font-bold text-sm tracking-wider uppercase hover:underline transition-colors"
            >
              Contact Us
            </Link>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <a
                href="mailto:flux.club@satiengg.in"
                className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors text-sm font-mono"
              >
                <Mail size={16} />
                <span>flux.club@satiengg.in</span>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-2">
              <a
                href="tel:+919981095190"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-white/[0.04] backdrop-blur-md border border-slate-200/50 dark:border-white/10 text-slate-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400 transition-all text-xs font-mono"
              >
                <Phone size={14} className="text-cyan-500" />
                <span>Disha Nathani - 9981095190</span>
              </a>
              <a
                href="tel:+917805823575"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-white/[0.04] backdrop-blur-md border border-slate-200/50 dark:border-white/10 text-slate-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400 transition-all text-xs font-mono"
              >
                <Phone size={14} className="text-cyan-500" />
                <span>Anshika Shukla - 7805823575</span>
              </a>
              <a
                href="tel:+917828879681"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-white/[0.04] backdrop-blur-md border border-slate-200/50 dark:border-white/10 text-slate-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400 transition-all text-xs font-mono"
              >
                <Phone size={14} className="text-cyan-500" />
                <span>Pramit Singh - 7828879681</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Embedded CSS for smooth horizontal 2-row opposite marquee */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee-row-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
        @keyframes marquee-row-right {
          0% { transform: translateX(-33.333333%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-row-left {
          animation: marquee-row-left 35s linear infinite;
        }
        .animate-marquee-row-right {
          animation: marquee-row-right 35s linear infinite;
        }
        `
      }} />
    </div>
  );
};

export default Recruitment_26;
