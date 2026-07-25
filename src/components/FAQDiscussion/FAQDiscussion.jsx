// src/components/FAQDiscussion/FAQDiscussion.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, ChevronUp, MessageSquare, ThumbsUp,
  Plus, Send, CheckCircle, X, Loader2
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const CATEGORIES = ['General', 'Events', 'Projects', 'Membership', 'Other'];

const FAQDiscussion = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [showAskForm, setShowAskForm] = useState(false);
  const [answerForms, setAnswerForms] = useState({});
  const [newQuestion, setNewQuestion] = useState({ question: '', askedBy: '', category: 'General' });
  const [submitting, setSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/faq`);
      const data = await res.json();
      if (data.success) setFaqs(data.data);
      else setError('Failed to load questions');
    } catch {
      setError('Could not connect to server. Is your backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFAQs(); }, []);

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.question.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/faq`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion),
      });
      const data = await res.json();
      if (data.success) {
        setFaqs([data.data, ...faqs]);
        setNewQuestion({ question: '', askedBy: '', category: 'General' });
        setShowAskForm(false);
      }
    } catch {
      alert('Failed to submit question. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitAnswer = async (faqId) => {
    const form = answerForms[faqId];
    if (!form?.text?.trim()) return;
    try {
      const res = await fetch(`${API_URL}/api/faq/${faqId}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: form.text, author: form.author || 'Anonymous' }),
      });
      const data = await res.json();
      if (data.success) {
        setFaqs(faqs.map(f => f._id === faqId ? data.data : f));
        setAnswerForms(prev => ({ ...prev, [faqId]: { text: '', author: '' } }));
      }
    } catch {
      alert('Failed to post answer.');
    }
  };

  const handleUpvote = async (faqId, e) => {
    e.stopPropagation();
    try {
      const res = await fetch(`${API_URL}/api/faq/${faqId}/upvote`, { method: 'PUT' });
      const data = await res.json();
      if (data.success) setFaqs(faqs.map(f => f._id === faqId ? data.data : f));
    } catch {}
  };

  const filteredFaqs = activeFilter === 'All'
    ? faqs
    : faqs.filter(f => f.category === activeFilter);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="flex flex-col gap-4">

      {/* ── Top bar: category filters + Ask button ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {['All', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                activeFilter === cat
                  ? 'bg-cyan-500 border-cyan-500 text-black'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowAskForm(!showAskForm)}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-500/20 transition-all hover:scale-105"
        >
          {showAskForm ? <X size={13} /> : <Plus size={13} />}
          {showAskForm ? 'Cancel' : 'Ask a Question'}
        </button>
      </div>

      {/* ── Ask Question Form ── */}
      <AnimatePresence>
        {showAskForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-500 mb-4">
                Ask Your Question
              </h3>
              <form onSubmit={handleSubmitQuestion} className="space-y-3">
                <textarea
                  value={newQuestion.question}
                  onChange={e => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  placeholder="What would you like to know?"
                  rows={3}
                  required
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 resize-none text-sm transition-colors"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={newQuestion.askedBy}
                    onChange={e => setNewQuestion({ ...newQuestion, askedBy: e.target.value })}
                    placeholder="Your name (optional)"
                    className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                  />
                  <select
                    value={newQuestion.category}
                    onChange={e => setNewQuestion({ ...newQuestion, category: e.target.value })}
                    className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                  >
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-colors disabled:opacity-60 text-sm"
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  Submit Question
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scrollable Question Feed ── */}
      <div className="h-[420px] overflow-y-auto pr-1 space-y-3">

        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="flex gap-2 items-center text-slate-400 text-sm">
              <Loader2 size={16} className="animate-spin text-cyan-500" />
              Loading community questions…
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-slate-400">{error}</p>
          </div>
        )}

        {!loading && !error && filteredFaqs.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-slate-400">No questions yet. Be the first to ask!</p>
          </div>
        )}

        {!loading && !error && filteredFaqs.map((faq, idx) => (
          <motion.div
            key={faq._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
              expandedId === faq._id
                ? 'bg-white dark:bg-[#12121e] border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.12)]'
                : 'bg-white/80 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-purple-500/40'
            }`}
          >
            {/* ── Question row ── */}
            <div
              className="flex items-start gap-3 p-5 cursor-pointer"
              onClick={() => setExpandedId(expandedId === faq._id ? null : faq._id)}
            >
              {/* Upvote button */}
              <button
                onClick={(e) => handleUpvote(faq._id, e)}
                className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-cyan-400 transition-colors flex-shrink-0 mt-0.5"
              >
                <ThumbsUp size={13} />
                <span className="text-[11px] font-bold">{faq.upvotes}</span>
              </button>

              {/* Question body */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full">
                    {faq.category}
                  </span>
                  {faq.isResolved && (
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      <CheckCircle size={9} /> Resolved
                    </span>
                  )}
                </div>
                <p className="font-bold text-slate-800 dark:text-white text-sm leading-snug">
                  {faq.question}
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400 flex-wrap">
                  <span>
                    {faq.askedBy ? (
                      <>By <span className="text-slate-500 dark:text-slate-300 font-medium">{faq.askedBy}</span></>
                    ) : 'Anonymous'}
                  </span>
                  <span>{formatDate(faq.createdAt)}</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={10} />
                    {faq.answers.length} answer{faq.answers.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Expand chevron */}
              <div className={`p-1.5 rounded-lg transition-all duration-300 flex-shrink-0 ${
                expandedId === faq._id
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-400'
              }`}>
                {expandedId === faq._id
                  ? <ChevronUp size={15} />
                  : <ChevronDown size={15} />
                }
              </div>
            </div>

            {/* ── Expanded: answers + reply form ── */}
            <AnimatePresence>
              {expandedId === faq._id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-slate-100 dark:border-white/5 px-5 pb-5 pt-4 space-y-4">

                    {/* Existing answers */}
                    {faq.answers.length > 0 && (
                      <div className="space-y-3">
                        {faq.answers.map((ans, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="w-0.5 bg-gradient-to-b from-cyan-500 to-purple-600 rounded-full flex-shrink-0 mt-1" />
                            <div className="flex-1">
                              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                                {ans.text}
                              </p>
                              <p className="text-[11px] text-slate-400 mt-1">
                                — {ans.author || 'Anonymous'} · {formatDate(ans.createdAt)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Post an answer */}
                    <div className="space-y-2">
                      <textarea
                        value={answerForms[faq._id]?.text || ''}
                        onChange={e => setAnswerForms(prev => ({
                          ...prev,
                          [faq._id]: { ...prev[faq._id], text: e.target.value }
                        }))}
                        placeholder="Write your answer…"
                        rows={2}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 resize-none text-sm transition-colors"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={answerForms[faq._id]?.author || ''}
                          onChange={e => setAnswerForms(prev => ({
                            ...prev,
                            [faq._id]: { ...prev[faq._id], author: e.target.value }
                          }))}
                          placeholder="Your name (optional)"
                          className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                        />
                        <button
                          onClick={() => handleSubmitAnswer(faq._id)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 rounded-xl text-sm font-bold hover:bg-cyan-500/30 transition-colors whitespace-nowrap"
                        >
                          <Send size={12} /> Post
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQDiscussion;