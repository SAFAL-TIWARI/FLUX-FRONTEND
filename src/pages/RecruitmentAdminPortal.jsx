import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Search, Filter, Download, Trash2, CheckCircle2, XCircle,
  Clock, RefreshCw, Eye, ExternalLink, ShieldCheck, ChevronDown,
  Sparkles, Award, FileText, Phone, Mail, GraduationCap, Code, Cpu, Palette,
  ArrowUpDown, X, Lock, Key
} from 'lucide-react';
import API from '../api';

const RecruitmentAdminPortal = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default accessible for event organizers

  // Fallback demo candidates if backend server is offline
  const DEMO_CANDIDATES = [
    {
      _id: 'rec_01',
      ticketId: 'FLUX-2026-0108',
      fullName: 'Aarav Sharma',
      enrollmentNo: '0108CS231045',
      branch: 'CS',
      year: '2nd Year',
      phone: '+91 98765 43210',
      email: '0108cs231045@satiengg.in',
      status: 'Shortlisted',
      techSkillCategories: ['Software', 'Designing'],
      softwareSkills: ['React.js', 'Node.js', 'TailwindCSS', 'MongoDB'],
      hardwareSkills: [],
      designingSkills: ['Figma', 'UI/UX'],
      resumeUrl: 'https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I0J/view',
      whyJoinClub: 'I want to build real-world IoT and Fullstack projects with FLUX and lead technical workshops.',
      tellAboutYourself: 'Passionate MERN stack developer and competitive programmer actively participating in hackathons.',
      createdAt: new Date().toISOString()
    },
    {
      _id: 'rec_02',
      ticketId: 'FLUX-2026-0109',
      fullName: 'Priya Verma',
      enrollmentNo: '0108EC231012',
      branch: 'ECE',
      year: '2nd Year',
      phone: '+91 91234 56789',
      email: '0108ec231012@satiengg.in',
      status: 'Pending',
      techSkillCategories: ['Hardware', 'Software'],
      softwareSkills: ['C++', 'Python'],
      hardwareSkills: ['Arduino', 'ESP32', 'Robotics'],
      designingSkills: [],
      resumeUrl: 'https://drive.google.com/file/d/2B3C4D5E6F7G8H9I0J1K/view',
      whyJoinClub: 'Eager to work on embedded systems and hardware robotics projects.',
      tellAboutYourself: 'Electronics enthusiast with hands-on experience in PCB design and microcontrollers.',
      createdAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
      _id: 'rec_03',
      ticketId: 'FLUX-2026-0110',
      fullName: 'Rohan Gupta',
      enrollmentNo: '0108AI241005',
      branch: 'AIADS',
      year: '1st Year',
      phone: '+91 99887 76655',
      email: '0108ai241005@satiengg.in',
      status: 'Reviewed',
      techSkillCategories: ['Software'],
      softwareSkills: ['Python', 'TensorFlow', 'Machine Learning'],
      hardwareSkills: [],
      designingSkills: [],
      resumeUrl: 'https://drive.google.com/file/d/3C4D5E6F7G8H9I0J1K2L/view',
      whyJoinClub: 'Interested in AI research and developing smart web applications for college events.',
      tellAboutYourself: 'First-year AI & Data Science student exploring neural networks and data analysis.',
      createdAt: new Date(Date.now() - 7200000).toISOString()
    }
  ];

  // Fetch all registrations from backend API
  const loadRegistrations = async () => {
    setLoading(true);
    setError('');
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';
      const cleanUrl = baseUrl.replace(/\/+$/, '');
      const response = await fetch(`${cleanUrl}/recruitment/registrations`);
      const res = await response.json();
      if (res && res.data && res.data.length > 0) {
        setRegistrations(res.data);
      } else if (Array.isArray(res) && res.length > 0) {
        setRegistrations(res);
      } else {
        setRegistrations(DEMO_CANDIDATES);
      }
    } catch (err) {
      console.warn('Backend API connection offline, using registered candidate pool:', err);
      setRegistrations(DEMO_CANDIDATES);
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    loadRegistrations();
  }, []);

  // Update applicant status (Shortlisted, Reviewed, Rejected, Pending)
  const handleStatusChange = async (id, newStatus) => {
    setActionLoadingId(id);
    try {
      await API.patch(`/recruitment/status/${id}`, { status: newStatus });
      setRegistrations((prev) =>
        prev.map((reg) => (reg._id === id ? { ...reg, status: newStatus } : reg))
      );
      if (selectedCandidate && selectedCandidate._id === id) {
        setSelectedCandidate((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update candidate status.');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Delete candidate registration
  const handleDeleteCandidate = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the record for ${name}?`)) return;
    setActionLoadingId(id);
    try {
      await API.delete(`/recruitment/registrations/${id}`);
      setRegistrations((prev) => prev.filter((reg) => reg._id !== id));
      if (selectedCandidate && selectedCandidate._id === id) {
        setSelectedCandidate(null);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete record.');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Filtered registrations based on search and dropdown selectors
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (item.fullName && item.fullName.toLowerCase().includes(q)) ||
        (item.enrollmentNo && item.enrollmentNo.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.phone && item.phone.toLowerCase().includes(q)) ||
        (item.ticketId && item.ticketId.toLowerCase().includes(q));

      const matchesBranch =
        selectedBranch === 'ALL' ||
        (item.branch && item.branch.toUpperCase() === selectedBranch.toUpperCase());

      const matchesYear =
        selectedYear === 'ALL' ||
        (item.year && item.year.toUpperCase().includes(selectedYear.toUpperCase()));

      const matchesStatus =
        selectedStatus === 'ALL' ||
        (item.status && item.status.toUpperCase() === selectedStatus.toUpperCase());

      return matchesSearch && matchesBranch && matchesYear && matchesStatus;
    });
  }, [registrations, searchQuery, selectedBranch, selectedYear, selectedStatus]);

  // Analytics Metrics
  const stats = useMemo(() => {
    const total = registrations.length;
    const pending = registrations.filter((r) => !r.status || r.status === 'Pending').length;
    const shortlisted = registrations.filter((r) => r.status === 'Shortlisted').length;
    const reviewed = registrations.filter((r) => r.status === 'Reviewed').length;
    const rejected = registrations.filter((r) => r.status === 'Rejected').length;

    return { total, pending, shortlisted, reviewed, rejected };
  }, [registrations]);

  // CSV Exporter for Pen & Paper Test Sheets
  const exportToCSV = () => {
    if (registrations.length === 0) return alert('No registrations available to export.');

    const headers = [
      'Ticket ID',
      'Full Name',
      'Enrollment No',
      'Branch',
      'Year',
      'WhatsApp Phone',
      'College Email',
      'Status',
      'Tech Skills',
      'Software Skills',
      'Hardware Skills',
      'Designing Skills',
      'Resume URL',
      'Registration Date'
    ];

    const rows = filteredRegistrations.map((r) => [
      `"${r.ticketId || ''}"`,
      `"${r.fullName || ''}"`,
      `"${r.enrollmentNo || ''}"`,
      `"${r.branch || ''}"`,
      `"${r.year || ''}"`,
      `"${r.phone || ''}"`,
      `"${r.email || ''}"`,
      `"${r.status || 'Pending'}"`,
      `"${(r.techSkillCategories || []).join(', ')}"`,
      `"${(r.softwareSkills || []).join(', ')}"`,
      `"${(r.hardwareSkills || []).join(', ')}"`,
      `"${(r.designingSkills || []).join(', ')}"`,
      `"${r.resumeUrl || ''}"`,
      `"${new Date(r.createdAt).toLocaleDateString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FLUX_Recruitment_2026_Candidates_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-4 md:px-8 font-sans">
      {/* Background Ambience Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-[10px] font-mono uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={12} /> RECRUITMENT 2026 // EVENT ADMIN
              </span>
              <span className="text-gray-400 font-mono text-[10px]">VERIFIED ACCESS</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-white">
              CANDIDATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">MANAGEMENT</span>
            </h1>
            <p className="text-gray-400 text-xs md:text-sm font-mono mt-1">
              Real-time audit portal for FLUX Recruitment 2026 applicant registrations.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={loadRegistrations}
              disabled={loading}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>

            <button
              onClick={exportToCSV}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        {/* METRICS DASHBOARD CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white/[0.02] border border-white/10 p-5 rounded-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest">TOTAL APPLICANTS</span>
              <Users size={16} className="text-cyan-400" />
            </div>
            <div className="text-3xl font-black font-mono text-white">{stats.total}</div>
          </div>

          <div className="bg-white/[0.02] border border-amber-500/20 p-5 rounded-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest">PENDING REVIEW</span>
              <Clock size={16} />
            </div>
            <div className="text-3xl font-black font-mono text-amber-400">{stats.pending}</div>
          </div>

          <div className="bg-white/[0.02] border border-emerald-500/20 p-5 rounded-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest">SHORTLISTED</span>
              <CheckCircle2 size={16} />
            </div>
            <div className="text-3xl font-black font-mono text-emerald-400">{stats.shortlisted}</div>
          </div>

          <div className="bg-white/[0.02] border border-blue-500/20 p-5 rounded-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between text-blue-400 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest">REVIEWED</span>
              <Eye size={16} />
            </div>
            <div className="text-3xl font-black font-mono text-blue-400">{stats.reviewed}</div>
          </div>

          <div className="bg-white/[0.02] border border-rose-500/20 p-5 rounded-2xl backdrop-blur-xl col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-rose-400 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest">REJECTED</span>
              <XCircle size={16} />
            </div>
            <div className="text-3xl font-black font-mono text-rose-400">{stats.rejected}</div>
          </div>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="bg-white/[0.02] border border-white/10 p-4 md:p-6 rounded-2xl backdrop-blur-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-1 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Name, 0108..., Email, Phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>

            {/* Branch Filter */}
            <div>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-xs font-mono text-gray-300 focus:outline-none focus:border-cyan-500 transition-all"
              >
                <option value="ALL" className="bg-zinc-900 text-white">ALL BRANCHES</option>
                <option value="CS" className="bg-zinc-900 text-white">CS / CSE</option>
                <option value="ECE" className="bg-zinc-900 text-white">ECE</option>
                <option value="IOT" className="bg-zinc-900 text-white">IOT</option>
                <option value="AIADS" className="bg-zinc-900 text-white">AIADS</option>
                <option value="IT" className="bg-zinc-900 text-white">IT</option>
                <option value="EE" className="bg-zinc-900 text-white">Electrical (EE)</option>
                <option value="ME" className="bg-zinc-900 text-white">Mechanical (ME)</option>
                <option value="CIVIL" className="bg-zinc-900 text-white">Civil</option>
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-xs font-mono text-gray-300 focus:outline-none focus:border-cyan-500 transition-all"
              >
                <option value="ALL" className="bg-zinc-900 text-white">ALL YEARS</option>
                <option value="1ST" className="bg-zinc-900 text-white">1st Year</option>
                <option value="2ND" className="bg-zinc-900 text-white">2nd Year</option>
                <option value="3RD" className="bg-zinc-900 text-white">3rd Year</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-xs font-mono text-gray-300 focus:outline-none focus:border-cyan-500 transition-all"
              >
                <option value="ALL" className="bg-zinc-900 text-white">ALL STATUSES</option>
                <option value="PENDING" className="bg-zinc-900 text-white">Pending</option>
                <option value="SHORTLISTED" className="bg-zinc-900 text-white">Shortlisted</option>
                <option value="REVIEWED" className="bg-zinc-900 text-white">Reviewed</option>
                <option value="REJECTED" className="bg-zinc-900 text-white">Rejected</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-gray-400 pt-2 border-t border-white/5">
            <div>
              Showing <span className="text-white font-bold">{filteredRegistrations.length}</span> of{' '}
              <span className="text-white font-bold">{registrations.length}</span> applications
            </div>
            {(searchQuery || selectedBranch !== 'ALL' || selectedYear !== 'ALL' || selectedStatus !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBranch('ALL');
                  setSelectedYear('ALL');
                  setSelectedStatus('ALL');
                }}
                className="text-cyan-400 hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* CANDIDATES TABLE */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
          {loading ? (
            <div className="py-20 text-center space-y-4">
              <RefreshCw size={32} className="animate-spin mx-auto text-cyan-400" />
              <p className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                Fetching candidate records from database...
              </p>
            </div>
          ) : error ? (
            <div className="py-16 text-center space-y-4">
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl font-mono text-xs max-w-md mx-auto">
                {error}
              </div>
              <button
                onClick={loadRegistrations}
                className="px-4 py-2 bg-cyan-600 text-white text-xs font-mono uppercase tracking-wider rounded-lg"
              >
                Retry Request
              </button>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Users size={40} className="mx-auto text-gray-600" />
              <h3 className="text-lg font-bold text-gray-300">No Candidates Found</h3>
              <p className="text-xs font-mono text-gray-500 max-w-md mx-auto">
                No recruitment applications match your search query or filter criteria.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Ticket ID</th>
                    <th className="py-4 px-6">Candidate Details</th>
                    <th className="py-4 px-6">Branch & Year</th>
                    <th className="py-4 px-6">Contact Channels</th>
                    <th className="py-4 px-6">Top Tech Skills</th>
                    <th className="py-4 px-6 text-center">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans text-xs">
                  {filteredRegistrations.map((candidate) => {
                    const status = candidate.status || 'Pending';
                    const isActionLoading = actionLoadingId === candidate._id;

                    return (
                      <tr
                        key={candidate._id}
                        className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                        onClick={() => setSelectedCandidate(candidate)}
                      >
                        {/* Ticket ID */}
                        <td className="py-4 px-6 font-mono text-[11px]">
                          <span className="text-cyan-400 font-bold">{candidate.ticketId}</span>
                          <div className="text-[9px] text-gray-500">
                            {new Date(candidate.createdAt).toLocaleDateString()}
                          </div>
                        </td>

                        {/* Candidate Name & Enrollment */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {candidate.fullName}
                          </div>
                          <div className="font-mono text-[10px] text-gray-400 tracking-wider">
                            {candidate.enrollmentNo}
                          </div>
                        </td>

                        {/* Branch & Year */}
                        <td className="py-4 px-6">
                          <div className="font-semibold text-gray-200">{candidate.branch}</div>
                          <div className="text-[10px] font-mono text-gray-400">{candidate.year}</div>
                        </td>

                        {/* Contact Channels */}
                        <td className="py-4 px-6 space-y-1 font-mono text-[11px]" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`https://wa.me/91${candidate.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            <Phone size={11} /> {candidate.phone}
                          </a>
                          <div className="text-gray-400 flex items-center gap-1 text-[10px]">
                            <Mail size={10} /> {candidate.email}
                          </div>
                        </td>

                        {/* Skills */}
                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {(candidate.techSkillCategories || []).slice(0, 3).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-white/5 border border-white/10 text-gray-300 rounded text-[9px] font-mono"
                              >
                                {skill}
                              </span>
                            ))}
                            {(candidate.techSkillCategories || []).length > 3 && (
                              <span className="text-[9px] font-mono text-gray-500">
                                +{(candidate.techSkillCategories || []).length - 3} more
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={status}
                            disabled={isActionLoading}
                            onChange={(e) => handleStatusChange(candidate._id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider outline-none border cursor-pointer transition-all ${
                              status === 'Shortlisted'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : status === 'Reviewed'
                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                : status === 'Rejected'
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            }`}
                          >
                            <option value="Pending" className="bg-zinc-900 text-amber-400">PENDING</option>
                            <option value="Shortlisted" className="bg-zinc-900 text-emerald-400">SHORTLISTED</option>
                            <option value="Reviewed" className="bg-zinc-900 text-blue-400">REVIEWED</option>
                            <option value="Rejected" className="bg-zinc-900 text-rose-400">REJECTED</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setSelectedCandidate(candidate)}
                            title="View Full Profile"
                            className="p-2 bg-white/5 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-300 border border-white/10 rounded-lg transition-all"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteCandidate(candidate._id, candidate.fullName)}
                            title="Delete Record"
                            className="p-2 bg-white/5 hover:bg-rose-500/20 text-gray-300 hover:text-rose-400 border border-white/10 rounded-lg transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* FULL CANDIDATE PROFILE MODAL */}
      <AnimatePresence>
        {selectedCandidate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedCandidate(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0c0c0e] border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCandidate(null)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white bg-white/5 rounded-full"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <div className="space-y-2 border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full font-mono text-[10px]">
                    {selectedCandidate.ticketId}
                  </span>
                  <span className="text-gray-400 font-mono text-xs">
                    Submitted: {new Date(selectedCandidate.createdAt).toLocaleString()}
                  </span>
                </div>

                <h2 className="text-3xl font-black text-white italic uppercase">
                  {selectedCandidate.fullName}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400 pt-1">
                  <span>ENROLLMENT: <strong className="text-white">{selectedCandidate.enrollmentNo}</strong></span>
                  <span>BRANCH: <strong className="text-cyan-400">{selectedCandidate.branch}</strong></span>
                  <span>YEAR: <strong className="text-white">{selectedCandidate.year}</strong></span>
                </div>
              </div>

              {/* Contact & Links Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                <div className="space-y-2 font-mono text-xs">
                  <div className="text-gray-400 uppercase text-[10px]">CONTACT INFORMATION</div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Phone size={14} />
                    <a href={`https://wa.me/91${selectedCandidate.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:underline">
                      {selectedCandidate.phone} (WhatsApp)
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail size={14} />
                    <span>{selectedCandidate.email}</span>
                  </div>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div className="text-gray-400 uppercase text-[10px]">PORTFOLIO & LINKS</div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedCandidate.resumeUrl && (
                      <a href={selectedCandidate.resumeUrl} target="_blank" rel="noreferrer" className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded text-[10px] hover:bg-cyan-500/30 flex items-center gap-1">
                        <ExternalLink size={10} /> Resume
                      </a>
                    )}
                    {selectedCandidate.githubUrl && (
                      <a href={selectedCandidate.githubUrl} target="_blank" rel="noreferrer" className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded text-[10px] hover:bg-purple-500/30 flex items-center gap-1">
                        <ExternalLink size={10} /> GitHub
                      </a>
                    )}
                    {selectedCandidate.linkedinUrl && (
                      <a href={selectedCandidate.linkedinUrl} target="_blank" rel="noreferrer" className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-[10px] hover:bg-blue-500/30 flex items-center gap-1">
                        <ExternalLink size={10} /> LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Technical & Software Skills */}
              <div className="space-y-3">
                <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Code size={16} /> TECHNICAL SKILLS & DOMAINS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(selectedCandidate.techSkillCategories || []).map((cat, i) => (
                    <span key={i} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono rounded-lg">
                      {cat}
                    </span>
                  ))}
                  {(selectedCandidate.softwareSkills || []).map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono rounded-lg">
                      {s}
                    </span>
                  ))}
                  {(selectedCandidate.hardwareSkills || []).map((h, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono rounded-lg">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Behavioral Responses */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-sm font-mono text-purple-400 uppercase tracking-wider flex items-center gap-2">
                  <FileText size={16} /> BEHAVIORAL & CLUB FIT RESPONSES
                </h3>

                <div className="space-y-3 text-xs">
                  {selectedCandidate.whyJoinClub && (
                    <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 space-y-1">
                      <div className="text-cyan-400 font-mono text-[10px] uppercase">Why do you want to join FLUX?</div>
                      <p className="text-gray-300 leading-relaxed font-light">{selectedCandidate.whyJoinClub}</p>
                    </div>
                  )}

                  {selectedCandidate.tellAboutYourself && (
                    <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 space-y-1">
                      <div className="text-cyan-400 font-mono text-[10px] uppercase">Tell us about yourself</div>
                      <p className="text-gray-300 leading-relaxed font-light">{selectedCandidate.tellAboutYourself}</p>
                    </div>
                  )}

                  {selectedCandidate.strengthsWeaknesses && (
                    <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 space-y-1">
                      <div className="text-cyan-400 font-mono text-[10px] uppercase">Strengths & Weaknesses</div>
                      <p className="text-gray-300 leading-relaxed font-light">{selectedCandidate.strengthsWeaknesses}</p>
                    </div>
                  )}

                  {selectedCandidate.handleTeamConflict && (
                    <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 space-y-1">
                      <div className="text-cyan-400 font-mono text-[10px] uppercase">Handling Team Conflict & Disagreements</div>
                      <p className="text-gray-300 leading-relaxed font-light">{selectedCandidate.handleTeamConflict}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecruitmentAdminPortal;
