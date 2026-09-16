import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Users, ExternalLink,
  ChevronDown, MessageCircle, Clock,
  Award, Zap, CheckCircle, Mail, Phone,
  FileText, UserCheck, Sparkles, Send, Globe,
  Instagram, Linkedin, Youtube, Facebook
} from 'lucide-react';


const TimelineStageCard = ({ date, title, subtitle, description, status, icon: Icon, isLast, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative mb-12 lg:mb-16 last:mb-0 w-full">
      {/* Desktop Center Line */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-cyan-500/30 via-cyan-500/10 to-transparent top-0 -z-10" />

      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 w-full group relative">
        {/* Stage Badge Icon */}
        <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border-2 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
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
              className={`bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-6 md:p-8 rounded-3xl hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500 relative ${isEven ? 'lg:mr-auto' : 'lg:ml-auto'} shadow-xl dark:shadow-none w-full group-hover:-translate-y-1`}
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
    <div className="border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white/80 dark:bg-white/5 backdrop-blur-xl hover:border-cyan-500/30 transition-all shadow-sm">
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
            <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-white/5 pt-4 text-sm md:text-base">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Recruitment_26 = () => {

  const stages = [
    {
      date: "15 September",
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

  const domains = [
    { name: "Technical Executive", desc: "Software engineering, algorithms, problem solving & coding sprints.", color: "from-cyan-500/20 to-blue-500/20" },
    { name: "Hardware / IoT", desc: "Robotics, microcontrollers, embedded circuits & sensor integration.", color: "from-emerald-500/20 to-teal-500/20" },
    { name: "Web Developer", desc: "Building scalable web apps, UI components, and modern full-stack systems.", color: "from-indigo-500/20 to-purple-500/20" },
    { name: "Graphic Designer", desc: "UI/UX wireframes, branding, promotional graphics, and visual design.", color: "from-pink-500/20 to-rose-500/20" },
    { name: "Video Editor", desc: "VFX, motion graphics, event reels, and cinematic storytelling.", color: "from-amber-500/20 to-orange-500/20" },
    { name: "Content Writer", desc: "Blogs, technical documentation, event scripts & social media copy.", color: "from-violet-500/20 to-fuchsia-500/20" },
    { name: "Sponsorship & Promotion", desc: "Industry outreach, partner relationships, PR, and event execution.", color: "from-blue-500/20 to-cyan-500/20" }
  ];

  const contacts = [
    { name: "Disha Nathani", phone: "9981095190", role: "Student Coordinator" },
    { name: "Anshika Shukla", phone: "7805823575", role: "Student Coordinator" },
    { name: "Pramit Singh", phone: "7828879681", role: "Student Coordinator" }
  ];

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
            Technical Club <span className="text-cyan-600 dark:text-cyan-500">"FLUX"</span>
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
            className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-10 shadow-xl"
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
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15">
                <Calendar className="text-cyan-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Key Timeline Window</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-mono">15 September 2026 — 12 October 2026</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15">
                <MapPin className="text-cyan-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Campus Venue</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-mono">SATI Vidisha Campus // Written & Interview Venues TBA</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15">
                <Users className="text-cyan-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Eligibility</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-mono">Open for  2nd Year SATI Engineering Students</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <Link
                to="/events/recruitment-2026/register"
                className="flex items-center justify-center gap-2 py-4 px-6 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-cyan-500/20"
              >
                <Send size={16} /> Register Online
              </Link>
              <a
                href="#contact-representatives"
                className="flex items-center justify-center gap-2 py-4 px-6 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-900 dark:text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all border border-slate-200 dark:border-white/10"
              >
                <Phone size={16} /> Contact Lead
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

        {/* AVAILABLE DOMAINS / TEAMS */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4 text-slate-900 dark:text-white">
              Explore Our <span className="text-cyan-600 dark:text-cyan-500">Domains</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-xl mx-auto">
              Find your calling in technical development, hardware engineering, creative arts, or event management.
            </p>
            <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((d, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group relative rounded-3xl border border-slate-200 dark:border-white/10 p-6 bg-white/80 dark:bg-white/5 backdrop-blur-xl hover:border-cyan-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-500 font-mono font-bold text-sm group-hover:scale-110 transition-transform">
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{d.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{d.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono text-cyan-600 dark:text-cyan-400">
                  <span>Recruiting 2026</span>
                  <CheckCircle size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CONTACT REPRESENTATIVES SECTION */}
        <div id="contact-representatives" className="max-w-5xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4 text-slate-900 dark:text-white">
              Student <span className="text-cyan-600 dark:text-cyan-500">Coordinators</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base">
              Have questions regarding the recruitment process? Reach out directly to our student coordinators.
            </p>
            <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contacts.map((contact, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-8 rounded-3xl text-center group hover:border-cyan-500/40 transition-all shadow-lg"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{contact.name}</h3>
                <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-4">{contact.role}</p>
                <a
                  href={`tel:+91${contact.phone}`}
                  className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold border border-cyan-500/20 hover:bg-cyan-500 hover:text-white transition-all"
                >
                  <Phone size={14} /> +91 {contact.phone}
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="max-w-3xl mx-auto mb-32">
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

        {/* FOOTER SOCIAL HUB */}
        <div className="text-center border-t border-slate-200 dark:border-white/10 pt-16">
          <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Connect With Technical Club FLUX</h3>

          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm font-mono">
            <a href="https://instagram.com/fluxsati" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors">
              <Instagram size={18} /> @fluxsati
            </a>
            <a href="https://linkedin.com/in/satiengg.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors">
              <Linkedin size={18} /> /satiengg.in
            </a>
            <a href="mailto:flux@satingg.in" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors">
              <Mail size={18} /> flux@satingg.in
            </a>
            <a href="https://clubflux.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors">
              <Globe size={18} /> clubflux.in
            </a>
          </div>

          <p className="text-xs text-slate-400 font-mono">
            © 2026 TECHNICAL CLUB FLUX // SATI VIDISHA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recruitment_26;
