import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, CheckCircle, ArrowLeft, ArrowRight, User, Mail, Phone,
  Sparkles, Check, Upload, FileText, Link as LinkIcon, MessageCircle,
  ExternalLink, ShieldCheck, Award, Briefcase, Code, Cpu, Palette,
  HelpCircle, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { registerRecruitment } from '../api';

const RecruitmentRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [ticketId, setTicketId] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    enrollmentNo: '',
    year: '2nd Year',
    branch: 'CS (Computer Science and Engineering)',
    branchOther: '',
    phone: '',
    email: '',

    // Step 2
    linkedinUrl: '',
    githubUrl: '',
    techSkillCategories: [],
    techSkillCategoriesOther: '',
    softwareSkills: [],
    softwareSkillsOther: '',
    hardwareSkills: [],
    hardwareSkillsOther: '',
    designingSkills: [],
    designingSkillsOther: '',
    projectDriveUrl: '',

    // Step 3
    softSkills: [],
    softSkillsOther: '',
    markedFieldsExperience: '',
    tellAboutYourself: '',
    significantAchievement: '',
    clubsJoined: [],
    clubsJoinedOther: '',

    // Step 4
    whyJoinClub: '',
    strengthsWeaknesses: '',
    handleTeamFailure: '',
    handleTeamConflict: '',
    whyHireYou: '',
    whatKnowAboutClub: '',
    fluxEventsAttended: '',
    otherEventsAttended: ''
  });

  const [errors, setErrors] = useState({});

  // Branch List matching specified codes: CS, BC, AI, EE, EC, ME, CE, IO, CY, AL
  const branches = [
    'CS (Computer Science and Engineering)',
    'BC (Block Chain)',
    'AI (Artificial Intelligence & Data Science)',
    'EE (Electrical Engineering)',
    'EC (Electronics and Communication Engineering)',
    'ME (Mechanical Engineering)',
    'CE (Civil Engineering)',
    'IO (Internet of Things)',
    'CY (Cyber Security)',
    'AL (Artificial Intelligence & Machine Learning)',
    'Other'
  ];

  const softwareSkillOptions = [
    'Web Development',
    'Artificial Intelligence',
    'Machine Learning',
    'Data Science',
    'Android Development',
    'Cloud Computing',
    'Database Management',
    'Programming Languages',
    'Deployment CI/CD DevOps',
    'Programming for Arduino (C/C++) or Similar Development Boards',
    'Cybersecurity/ Blockchain',
    'None of the above',
    'Other'
  ];

  const hardwareSkillOptions = [
    'Arduino or Similar Micro Controller',
    'Robotics',
    '3D Printing',
    'Embedded Systems',
    'Electronics',
    'VLSI',
    'None of the above',
    'Other'
  ];

  const designingSkillOptions = [
    'Graphic Designing',
    'UI/UX',
    'Blender or CAD (3D Object Design)',
    'Cinematography / Camera Operation',
    'Video Editing',
    'Photography & Camera Handling',
    'None Of the above',
    'Other'
  ];

  const softSkillOptions = [
    'Content Writing',
    'Public Speaking',
    'Social Media Page Handling',
    'Management',
    'Photography & Camera Handling',
    'Mentorship',
    'PR',
    'None of the above',
    'Other'
  ];

  const clubOptions = [
    'E-Cell',
    'Training and Placement Cell',
    'Photography Club (Mirage)',
    'Speakers and Skill Development Club (FIAT)',
    'Rudras Dance Crew',
    'Musical Club (SWAR)',
    'Startup Cell',
    'Coding Club',
    'Udaan DC Club',
    'National Cadets Corps (NCC)',
    'National Service Scheme (NSS)',
    'Google Developer Student Club (GDSC)',
    'Gitsetcode (Girls Community)',
    'VariableX Community',
    'Wiki Club',
    'None of the above',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (category, value) => {
    setFormData((prev) => {
      const list = prev[category] || [];
      const updated = list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value];
      return { ...prev, [category]: updated };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setResumeError('File size exceeds 1 MB limit.');
        setResumeFile(null);
      } else {
        setResumeError('');
        setResumeFile(file);
      }
    }
  };

  // Step Validations
  const validateStep1 = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    
    // Enrollment Number: Must start with 0108
    if (!formData.enrollmentNo.trim()) {
      errs.enrollmentNo = 'Enrollment number is required';
    } else if (!/^0108/i.test(formData.enrollmentNo.trim())) {
      errs.enrollmentNo = 'Enrollment number must start with 0108 (e.g., 0108CS231001)';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'WhatsApp contact number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim().replace(/\D/g, ''))) {
      errs.phone = 'Enter a valid 10-digit phone number';
    }

    // Email Address: Must end with @satiengg.in
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@satiengg\.in$/i.test(formData.email.trim())) {
      errs.email = 'Official college email is compulsory (@satiengg.in)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    if (formData.softwareSkills.length === 0) errs.softwareSkills = 'Select at least one software skill (or None)';
    if (formData.hardwareSkills.length === 0) errs.hardwareSkills = 'Select at least one hardware skill (or None)';
    if (formData.designingSkills.length === 0) errs.designingSkills = 'Select at least one designing skill (or None)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs = {};
    if (formData.softSkills.length === 0) errs.softSkills = 'Select at least one soft skill (or None)';
    if (!formData.markedFieldsExperience.trim()) errs.markedFieldsExperience = 'Please describe your experience in marked fields';
    if (!formData.tellAboutYourself.trim()) errs.tellAboutYourself = 'Please tell us about yourself';
    if (!formData.significantAchievement.trim()) errs.significantAchievement = 'Please mention your achievements or experience';
    if (formData.clubsJoined.length === 0) errs.clubsJoined = 'Select organizations you belong to (or None)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep4 = () => {
    const errs = {};
    if (!formData.whyJoinClub.trim()) errs.whyJoinClub = 'This field is required';
    if (!formData.strengthsWeaknesses.trim()) errs.strengthsWeaknesses = 'Please list 3 strengths and 3 weaknesses';
    if (!formData.handleTeamFailure.trim()) errs.handleTeamFailure = 'This field is required';
    if (!formData.handleTeamConflict.trim()) errs.handleTeamConflict = 'This field is required';
    if (!formData.whyHireYou.trim()) errs.whyHireYou = 'This field is required';
    if (!formData.whatKnowAboutClub.trim()) errs.whatKnowAboutClub = 'This field is required';
    if (!formData.fluxEventsAttended.trim()) errs.fluxEventsAttended = 'This field is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    if (currentStep === 1) isValid = validateStep1();
    if (currentStep === 2) isValid = validateStep2();
    if (currentStep === 3) isValid = validateStep3();

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep4()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await registerRecruitment(formData);
      if (response.data && response.data.success) {
        setTicketId(response.data.ticketId || `FLUX-2026-REG-${Math.floor(100000 + Math.random() * 900000)}`);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Submission failed. Please check your details or network connection.';
      setSubmitError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020202] text-slate-900 dark:text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans transition-colors duration-500 py-16 lg:py-24">
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] bg-cyan-500/10 blur-[140px] rounded-full opacity-40" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation Back Link */}
        <Link
          to="/events/recruitment-2026"
          className="inline-flex items-center gap-2 text-sm font-mono text-cyan-600 dark:text-cyan-400 hover:underline mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Recruitment Details
        </Link>

        {/* HEADER TITLE */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
            <Sparkles size={14} className="text-cyan-500 animate-pulse" />
            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold tracking-widest uppercase">
              SATI Vidisha // FLUX 2026
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white mb-3">
            Recruitment <span className="text-cyan-600 dark:text-cyan-500">Form</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-base max-w-xl mx-auto">
            Technical Club FLUX Recruitment 2026 — 2nd Year Undergraduate Application Portal
          </p>
        </div>

        {/* FORM CONTAINER */}
        {!isSubmitted ? (
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {/* Step Wizard Header */}
            <div className="grid grid-cols-4 gap-2 mb-10 pb-6 border-b border-slate-200 dark:border-white/10">
              {[
                { step: 1, label: 'Profile' },
                { step: 2, label: 'Tech Skills' },
                { step: 3, label: 'Experience' },
                { step: 4, label: 'Club Fit' }
              ].map((s) => (
                <div key={s.step} className="flex flex-col items-center text-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs mb-1.5 transition-all ${
                      currentStep === s.step
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 scale-105'
                        : currentStep > s.step
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-white/10 text-slate-400'
                    }`}
                  >
                    {currentStep > s.step ? <Check size={16} /> : s.step}
                  </div>
                  <span
                    className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                      currentStep === s.step
                        ? 'text-cyan-600 dark:text-cyan-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* STEP 1: PERSONAL & ACADEMIC PROFILE */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-3">
                    01 // Personal & Academic Details
                  </h3>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border ${
                        errors.fullName ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
                      } text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm`}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1 font-mono">{errors.fullName}</p>}
                  </div>

                  {/* Enrollment No & Year */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Enrollment Number * <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-normal lowercase">(e.g. Starts with 0108)</span>
                      </label>
                      <input
                        type="text"
                        name="enrollmentNo"
                        placeholder="0108CS231001"
                        value={formData.enrollmentNo}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border ${
                          errors.enrollmentNo ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
                        } text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm font-mono`}
                      />
                      {errors.enrollmentNo && <p className="text-red-500 text-xs mt-1 font-mono">{errors.enrollmentNo}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Year of Study *
                      </label>
                      <input
                        type="text"
                        name="year"
                        value="2nd Year"
                        disabled
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-cyan-600 dark:text-cyan-400 font-bold text-sm cursor-not-allowed opacity-90"
                      />
                    </div>
                  </div>

                  {/* Branch Select */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Branch *
                    </label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm font-mono"
                    >
                      {branches.map((b, i) => (
                        <option key={i} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  {formData.branch === 'Other' && (
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Specify Branch *
                      </label>
                      <input
                        type="text"
                        name="branchOther"
                        value={formData.branchOther}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                      />
                    </div>
                  )}

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        WhatsApp Contact No. *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border ${
                          errors.phone ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
                        } text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm font-mono`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1 font-mono">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Email Address * <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-normal lowercase">(Must be @satiengg.in)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="yourname@satiengg.in"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border ${
                          errors.email ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
                        } text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm font-mono`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1 font-mono">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-cyan-500/20"
                    >
                      Next: Tech & Design Skills <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: PROFILES, TECH, HARDWARE & DESIGNING SKILLS */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-3">
                    02 // Profiles, Resumes & Domain Skills
                  </h3>

                  {/* LinkedIn & GitHub Links */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                        LinkedIn Profile (URL)
                      </label>
                      <span className="block text-[11px] text-cyan-600 dark:text-cyan-400 font-mono mb-2">
                        (Best if you mention it)
                      </span>
                      <input
                        type="url"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                        GitHub Profile (URL)
                      </label>
                      <span className="block text-[11px] text-slate-400 font-mono mb-2">
                        (Optional repository portfolio link)
                      </span>
                      <input
                        type="url"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Google Drive Resume Link */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Resume Google Drive Link
                    </label>
                    <span className="block text-[11px] text-slate-400 font-mono mb-2">
                      Paste your Google Drive shareable link below (Make sure access is set to "Anyone with the link"):
                    </span>

                    <input
                      type="url"
                      name="resumeUrl"
                      placeholder="https://drive.google.com/file/d/your-resume-link"
                      value={formData.resumeUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-xs font-mono"
                    />
                  </div>



                  {/* Technical Skills Category */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Technical Skills Category *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['Software', 'Hardware', 'Designing', 'Other'].map((cat, i) => (
                        <label
                          key={i}
                          className={`flex items-center gap-2 p-3 rounded-2xl border text-xs font-bold cursor-pointer transition-all ${
                            formData.techSkillCategories.includes(cat)
                              ? 'bg-cyan-500/10 border-cyan-500 text-cyan-600 dark:text-cyan-400'
                              : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.techSkillCategories.includes(cat)}
                            onChange={() => handleCheckboxChange('techSkillCategories', cat)}
                            className="rounded text-cyan-600"
                          />
                          {cat}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Software Skills Checkboxes */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Software Skills (Tick all that apply) *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                      {softwareSkillOptions.map((opt, i) => (
                        <label
                          key={i}
                          className={`flex items-center gap-3 p-3 rounded-2xl border text-xs font-medium cursor-pointer transition-all ${
                            formData.softwareSkills.includes(opt)
                              ? 'bg-cyan-500/10 border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold'
                              : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.softwareSkills.includes(opt)}
                            onChange={() => handleCheckboxChange('softwareSkills', opt)}
                            className="rounded text-cyan-600"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                    {errors.softwareSkills && <p className="text-red-500 text-xs mt-1 font-mono">{errors.softwareSkills}</p>}
                  </div>

                  {/* Hardware Skills Checkboxes */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Hardware Skills (Tick all that apply) *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                      {hardwareSkillOptions.map((opt, i) => (
                        <label
                          key={i}
                          className={`flex items-center gap-3 p-3 rounded-2xl border text-xs font-medium cursor-pointer transition-all ${
                            formData.hardwareSkills.includes(opt)
                              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                              : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.hardwareSkills.includes(opt)}
                            onChange={() => handleCheckboxChange('hardwareSkills', opt)}
                            className="rounded text-emerald-600"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                    {errors.hardwareSkills && <p className="text-red-500 text-xs mt-1 font-mono">{errors.hardwareSkills}</p>}
                  </div>

                  {/* Designing Skills Checkboxes */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Designing Skills (Tick all that apply) *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                      {designingSkillOptions.map((opt, i) => (
                        <label
                          key={i}
                          className={`flex items-center gap-3 p-3 rounded-2xl border text-xs font-medium cursor-pointer transition-all ${
                            formData.designingSkills.includes(opt)
                              ? 'bg-purple-500/10 border-purple-500 text-purple-600 dark:text-purple-400 font-bold'
                              : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.designingSkills.includes(opt)}
                            onChange={() => handleCheckboxChange('designingSkills', opt)}
                            className="rounded text-purple-600"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                    {errors.designingSkills && <p className="text-red-500 text-xs mt-1 font-mono">{errors.designingSkills}</p>}
                  </div>

                  {/* Project Demo Drive URL */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Demo video / Documentation of your past projects
                    </label>
                    <span className="block text-[11px] text-slate-400 font-mono mb-2">
                      (Upload your projects to Google Drive and paste the link here.)
                    </span>
                    <input
                      type="url"
                      name="projectDriveUrl"
                      value={formData.projectDriveUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-1/3 py-4 px-6 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-900 dark:text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-2/3 flex items-center justify-center gap-2 py-4 px-6 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-cyan-500/20"
                    >
                      Next: Soft Skills & Experience <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: SOFT SKILLS, EXPERIENCE & ORGANIZATIONS */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-3">
                    03 // Soft Skills, Achievements & Clubs
                  </h3>

                  {/* Soft Skills */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Soft Skills (Tick all that apply) *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                      {softSkillOptions.map((opt, i) => (
                        <label
                          key={i}
                          className={`flex items-center gap-3 p-3 rounded-2xl border text-xs font-medium cursor-pointer transition-all ${
                            formData.softSkills.includes(opt)
                              ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
                              : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.softSkills.includes(opt)}
                            onChange={() => handleCheckboxChange('softSkills', opt)}
                            className="rounded text-amber-600"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                    {errors.softSkills && <p className="text-red-500 text-xs mt-1 font-mono">{errors.softSkills}</p>}
                  </div>

                  {/* Marked fields experience */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Write about your experience in above marked fields! *
                    </label>
                    <textarea
                      name="markedFieldsExperience"
                      rows={3}
                      value={formData.markedFieldsExperience}
                      onChange={handleInputChange}
                      className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border ${
                        errors.markedFieldsExperience ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
                      } text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm`}
                    />
                    {errors.markedFieldsExperience && <p className="text-red-500 text-xs mt-1 font-mono">{errors.markedFieldsExperience}</p>}
                  </div>

                  {/* Tell us about yourself */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Tell us about yourself! *
                    </label>
                    <textarea
                      name="tellAboutYourself"
                      rows={3}
                      value={formData.tellAboutYourself}
                      onChange={handleInputChange}
                      className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border ${
                        errors.tellAboutYourself ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
                      } text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm`}
                    />
                    {errors.tellAboutYourself && <p className="text-red-500 text-xs mt-1 font-mono">{errors.tellAboutYourself}</p>}
                  </div>

                  {/* Mention significant achievements */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Mention your significant Achievement / Experience *
                    </label>
                    <textarea
                      name="significantAchievement"
                      rows={3}
                      value={formData.significantAchievement}
                      onChange={handleInputChange}
                      className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border ${
                        errors.significantAchievement ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
                      } text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm`}
                    />
                    {errors.significantAchievement && <p className="text-red-500 text-xs mt-1 font-mono">{errors.significantAchievement}</p>}
                  </div>

                  {/* Clubs / OrganizationsJoined */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Choose the clubs/organizations you are a member of until now! *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                      {clubOptions.map((opt, i) => (
                        <label
                          key={i}
                          className={`flex items-center gap-3 p-3 rounded-2xl border text-xs font-medium cursor-pointer transition-all ${
                            formData.clubsJoined.includes(opt)
                              ? 'bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400 font-bold'
                              : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.clubsJoined.includes(opt)}
                            onChange={() => handleCheckboxChange('clubsJoined', opt)}
                            className="rounded text-blue-600"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                    {errors.clubsJoined && <p className="text-red-500 text-xs mt-1 font-mono">{errors.clubsJoined}</p>}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-1/3 py-4 px-6 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-900 dark:text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-2/3 flex items-center justify-center gap-2 py-4 px-6 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-cyan-500/20"
                    >
                      Next: Club Fit Questions <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: BEHAVIORAL & CLUB FIT QUESTIONS */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-3">
                    04 // Behavioral & FLUX Alignment
                  </h3>

                  {/* Why do you want to join the club? */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Why do you want to join the club? *
                    </label>
                    <textarea
                      name="whyJoinClub"
                      rows={3}
                      value={formData.whyJoinClub}
                      onChange={handleInputChange}
                      className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border ${
                        errors.whyJoinClub ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
                      } text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm`}
                    />
                    {errors.whyJoinClub && <p className="text-red-500 text-xs mt-1 font-mono">{errors.whyJoinClub}</p>}
                  </div>

                  {/* 3 strengths & 3 weaknesses */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      What are your 3 strengths and 3 weaknesses? *
                    </label>
                    <textarea
                      name="strengthsWeaknesses"
                      rows={3}
                      value={formData.strengthsWeaknesses}
                      onChange={handleInputChange}
                      className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border ${
                        errors.strengthsWeaknesses ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
                      } text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm`}
                    />
                    {errors.strengthsWeaknesses && <p className="text-red-500 text-xs mt-1 font-mono">{errors.strengthsWeaknesses}</p>}
                  </div>

                  {/* Handle rejection / failure */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      How would you handle rejection or failure while working in a team? *
                    </label>
                    <textarea
                      name="handleTeamFailure"
                      rows={3}
                      value={formData.handleTeamFailure}
                      onChange={handleInputChange}
                      className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border ${
                        errors.handleTeamFailure ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
                      } text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm`}
                    />
                    {errors.handleTeamFailure && <p className="text-red-500 text-xs mt-1 font-mono">{errors.handleTeamFailure}</p>}
                  </div>

                  {/* Handle conflicts */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      How do you usually handle conflicts or disagreements in a team? *
                    </label>
                    <textarea
                      name="handleTeamConflict"
                      rows={3}
                      value={formData.handleTeamConflict}
                      onChange={handleInputChange}
                      className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border ${
                        errors.handleTeamConflict ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
                      } text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm`}
                    />
                    {errors.handleTeamConflict && <p className="text-red-500 text-xs mt-1 font-mono">{errors.handleTeamConflict}</p>}
                  </div>

                  {/* Why hire you */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Why should we hire you, what makes you different from others? *
                    </label>
                    <textarea
                      name="whyHireYou"
                      rows={3}
                      value={formData.whyHireYou}
                      onChange={handleInputChange}
                      className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border ${
                        errors.whyHireYou ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
                      } text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm`}
                    />
                    {errors.whyHireYou && <p className="text-red-500 text-xs mt-1 font-mono">{errors.whyHireYou}</p>}
                  </div>

                  {/* What do you know about our club? */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      What do you know about our club? *
                    </label>
                    <textarea
                      name="whatKnowAboutClub"
                      rows={3}
                      value={formData.whatKnowAboutClub}
                      onChange={handleInputChange}
                      className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border ${
                        errors.whatKnowAboutClub ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
                      } text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm`}
                    />
                    {errors.whatKnowAboutClub && <p className="text-red-500 text-xs mt-1 font-mono">{errors.whatKnowAboutClub}</p>}
                  </div>

                  {/* FLUX Events participated */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Events or Workshops you have participated in that were conducted by FLUX: *
                    </label>
                    <textarea
                      name="fluxEventsAttended"
                      rows={2}
                      value={formData.fluxEventsAttended}
                      onChange={handleInputChange}
                      className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border ${
                        errors.fluxEventsAttended ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
                      } text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm`}
                    />
                    {errors.fluxEventsAttended && <p className="text-red-500 text-xs mt-1 font-mono">{errors.fluxEventsAttended}</p>}
                  </div>

                  {/* Other Events participated */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Which other events or workshops have you participated in apart from FLUX?
                    </label>
                    <textarea
                      name="otherEventsAttended"
                      rows={2}
                      value={formData.otherEventsAttended}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                    />
                  </div>

                  {submitError && (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-mono font-bold">
                      ⚠️ {submitError}
                    </div>
                  )}

                  {/* Submit Action */}
                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-1/3 py-4 px-6 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-900 dark:text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 flex items-center justify-center gap-2 py-4 px-6 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={16} /> Submit Full Application
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        ) : (
          /* SUCCESS CONFIRMATION RECEIPT WITH WHATSAPP GROUP LINK */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center shadow-2xl"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white mb-2">
              Registration Successful!
            </h2>

            <p className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-bold uppercase tracking-wider mb-6">
              Reference Ticket ID: {ticketId || `FLUX-2026-REG-${Math.floor(100000 + Math.random() * 900000)}`}
            </p>

            {/* Applicant Summary */}
            <div className="max-w-md mx-auto bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl text-left space-y-3 mb-8 text-sm">
              <div className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-bold text-slate-900 dark:text-white">{formData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                <span className="text-slate-500">Enrollment No:</span>
                <span className="font-bold font-mono text-slate-900 dark:text-white">{formData.enrollmentNo}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                <span className="text-slate-500">Branch & Year:</span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400">{formData.branch} (2nd Year)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Next Evaluation:</span>
                <span className="font-bold text-slate-900 dark:text-white">Pen & Paper Test (26 Sept)</span>
              </div>
            </div>

            {/* PROMINENT WHATSAPP GROUP JOIN CTA CARD */}
            <div className="max-w-md mx-auto bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-emerald-500/5 border border-emerald-500/40 p-6 rounded-2xl mb-8 text-center shadow-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <MessageCircle size={14} /> Action Required
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                Join Official Recruitment WhatsApp Group
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-6">
                Stay updated with test venue announcements, dates, schedules, and recruitment notices.
              </p>
              <a
                href="https://chat.whatsapp.com/JKSDCOwvPjcDFZvzPGKaeN?s=sh&p=a&mlu=4&ilr=4"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl uppercase tracking-widest text-xs transition-all shadow-lg shadow-emerald-500/30 group"
              >
                <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                Join WhatsApp Group <ExternalLink size={14} />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/events/recruitment-2026"
                className="py-3.5 px-6 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-widest transition-all"
              >
                View Recruitment Roadmap
              </Link>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                }}
                className="py-3.5 px-6 rounded-2xl bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-widest transition-all"
              >
                Register Another Candidate
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RecruitmentRegistration;
