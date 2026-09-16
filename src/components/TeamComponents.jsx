import React, { memo, useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { User, Cpu, Shield, Layers, Zap } from 'lucide-react';

// Utility for infinite wrapping
const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const getColorMap = (color) => {
    switch (color) {
        case 'purple':
            return {
                border: 'border-purple-500',
                bg: 'bg-purple-500',
                text: 'text-purple-500',
                scan: 'via-purple-500/20',
                gradient: 'from-purple-500/50'
            };
        case 'emerald':
            return {
                border: 'border-emerald-500',
                bg: 'bg-emerald-500',
                text: 'text-emerald-500',
                scan: 'via-emerald-500/20',
                gradient: 'from-emerald-500/50'
            };
        case 'amber':
            return {
                border: 'border-amber-500',
                bg: 'bg-amber-500',
                text: 'text-amber-500',
                scan: 'via-amber-500/20',
                gradient: 'from-amber-500/50'
            };
        case 'blue':
            return {
                border: 'border-blue-500',
                bg: 'bg-blue-500',
                text: 'text-blue-500',
                scan: 'via-blue-500/20',
                gradient: 'from-blue-500/50'
            };
        case 'cyan':
        default:
            return {
                border: 'border-cyan-500',
                bg: 'bg-cyan-500',
                text: 'text-cyan-500',
                scan: 'via-cyan-500/20',
                gradient: 'from-cyan-500/50'
            };
    }
};

export const TechFrame = memo(({ children, className = "", scanSpeed = "2s", isMobile, color = "cyan" }) => {
    const colors = getColorMap(color);
    return (
        <div className={`relative group p-0.5 md:p-1 ${className}`}>
            {/* Tech Corners */}
            <div className={`absolute top-0 left-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-l-2 ${colors.border} z-10`} />
            <div className={`absolute top-0 right-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-r-2 ${colors.border} z-10`} />
            <div className={`absolute bottom-0 left-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-l-2 ${colors.border} z-10`} />
            <div className={`absolute bottom-0 right-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-r-2 ${colors.border} z-10`} />

            {/* Background is dark to prevent light bleed on images */}
            <div className="relative overflow-hidden rounded-sm bg-zinc-900 dark:bg-black h-full w-full">
                {!isMobile && (
                    <div
                        className={`absolute inset-0 bg-gradient-to-b from-transparent ${colors.scan} to-transparent h-1/2 w-full -translate-y-full group-hover:animate-scan z-20 pointer-events-none`}
                        style={{ animationDuration: scanSpeed }}
                    />
                )}
                <div className="w-full h-full relative">
                    {children}
                </div>
            </div>
        </div>
    );
});

export const LeaderCard = memo(({ member, color = "cyan", isMobile }) => {
    const colors = getColorMap(color);
    const Wrapper = isMobile ? 'div' : motion.div;

    return (
        <Wrapper
            whileHover={!isMobile ? { y: -8 } : {}}
            className="group bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/5 h-full w-full flex flex-col cursor-pointer transition-colors"
        >
            <TechFrame color={color} className="aspect-[4/5] w-full" isMobile={isMobile}>
                <img
                    src={member.img}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={member.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-20" />
            </TechFrame>

            {/* TEXT AREA: Displaying Name, Role, and Academic Data */}
            <div className="px-3 md:px-5 py-4 md:py-6 flex flex-col justify-center h-28 md:h-36">
                <h4 className="text-lg md:text-2xl font-black italic uppercase tracking-tighter mb-1 text-black dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                    {member.name}
                </h4>

                <div className="flex items-center gap-2 mb-2">
                    <div className={`h-[1px] w-4 ${colors.bg}`} />
                    <p className={`text-[8px] md:text-[10px] font-mono uppercase tracking-[0.2em] ${colors.text}`}>
                        {member.role}
                    </p>
                </div>

                {/* Dynamic Branch and Year Info */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[8px] md:text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase opacity-80">
                    <span>{member.branch}</span>
                    <span className="opacity-30">|</span>
                    <span className="text-black dark:text-white/60">[{member.year}]</span>
                </div>
            </div>
        </Wrapper>
    );
});

export const AdaptiveScrollRow = memo(({ items, renderItem, reverse = false, baseVelocity = 2.5, isMobile }) => {
    if (!items || items.length === 0) return null;

    // 4 copies for seamless looping
    const content = [...items, ...items, ...items, ...items];

    // Motion value for the scroll position (in percentage)
    const baseX = useMotionValue(0);

    // Drive the X transform based on baseX, wrapping between -25% and 0%
    const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    useAnimationFrame((t, delta) => {
        if (isDragging) return;

        let moveBy = baseVelocity * (delta / 2000); // baseVelocity = % per second

        if (reverse) {
            baseX.set(baseX.get() + moveBy);
        } else {
            baseX.set(baseX.get() - moveBy);
        }
    });

    const handlePan = (event, info) => {
        if (!containerRef.current) return;
        const totalWidth = containerRef.current.offsetWidth;
        const deltaPercentage = (info.delta.x / totalWidth) * 100;
        baseX.set(baseX.get() + deltaPercentage);
    };

    return (
        <div className="flex overflow-hidden py-4 select-none cursor-grab active:cursor-grabbing touch-pan-y">
            <motion.div
                ref={containerRef}
                className="flex gap-6 md:gap-10 flex-nowrap"
                style={{ x }}
                onPanStart={() => setIsDragging(true)}
                onPan={handlePan}
                onPanEnd={() => setIsDragging(false)}
            >
                {content.map((item, i) => (
                    <div key={i} className="shrink-0 w-[280px] md:w-[350px]">
                        {renderItem(item)}
                    </div>
                ))}
            </motion.div>
        </div>
    );
});

/* ===================== NEW UNIQUE COMPACT 3RD YEAR MATRIX ===================== */

const getBranchBadge = (branch) => {
    const b = branch?.toLowerCase() || '';
    if (b.includes('blockchain')) return { label: 'CSE_BC', color: 'text-purple-600 dark:text-purple-400 border-purple-500/30 bg-purple-500/10' };
    if (b.includes('computer') || b.includes('cse')) return { label: 'CSE', color: 'text-cyan-600 dark:text-cyan-400 border-cyan-500/30 bg-cyan-500/10' };
    if (b.includes('information') || b.includes('it')) return { label: 'IT', color: 'text-blue-600 dark:text-blue-400 border-blue-500/30 bg-blue-500/10' };
    if (b.includes('aiads') || b.includes('intelligence')) return { label: 'AIADS', color: 'text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10' };
    if (b.includes('electronics') || b.includes('ece')) return { label: 'ECE', color: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10' };
    return { label: 'CORE', color: 'text-slate-600 dark:text-slate-400 border-slate-500/30 bg-slate-500/10' };
};

export const MemberRegistryMatrix = memo(({ members }) => {
    const [viewMode, setViewMode] = useState('stream'); // 'stream' or 'matrix'

    if (!members || members.length === 0) return null;

    // Double the members array for continuous seamless looping ticker
    const loopedLane1 = [...members, ...members, ...members, ...members];
   

    return (
        <div className="relative rounded-2xl md:rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-black/50 p-5 md:p-7 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Background cyber grid & ambient aura */}
            <div className="absolute inset-0 bg-[radial-gradient(#06b6d415_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-50" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10 border-b border-slate-200/80 dark:border-white/5 pb-4">
                <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping absolute" />
                        <div className="w-2 h-2 rounded-full bg-cyan-500 relative" />
                    </div>
                    <div>
                        <div className="text-[11px] font-mono tracking-widest uppercase font-black text-slate-900 dark:text-white flex items-center gap-2">
                            TACTICAL_NETWORK
                        </div>
                        <p className="text-[9px] font-mono text-slate-500 dark:text-slate-400">
                            {members.length} ACTIVE UNITS REGISTERED IN SYSTEM
                        </p>
                    </div>
                </div>

                {/* View Switcher */}
                <div className="flex items-center gap-1 bg-white dark:bg-zinc-900/80 p-1 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <button
                        onClick={() => setViewMode('stream')}
                        className={`px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-lg transition-all flex items-center gap-.5 ${
                            viewMode === 'stream'
                                ? 'bg-cyan-500 text-white dark:text-black shadow-md shadow-cyan-500/20'
                                : 'text-slate-500 hover:text-cyan-500 dark:hover:text-white'
                        }`}
                    >
                        <Zap size={11} /> Stream
                    </button>
                    <button
                        onClick={() => setViewMode('matrix')}
                        className={`px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-lg transition-all flex items-center gap-1.5 ${
                            viewMode === 'matrix'
                                ? 'bg-cyan-500 text-white dark:text-black shadow-md shadow-cyan-500/20'
                                : 'text-slate-500 hover:text-cyan-500 dark:hover:text-white'
                        }`}
                    >
                        <Layers size={11} /> Matrix Grid
                    </button>
                </div>
            </div>

            {/* Dynamic Content View */}
            {viewMode === 'stream' ? (
                <div className="space-y-3 relative z-10 py-1 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                    {/* Lane 1 - Flow Left */}
                    <div className="flex gap-3 overflow-hidden select-none hover:[animation-play-state:paused] group">
                        <div className="flex gap-3 shrink-0 animate-marquee hover:[animation-play-state:paused]">
                            {loopedLane1.map((member, i) => {
                                const badge = getBranchBadge(member.branch);
                                return (
                                    <div
                                        key={`lane1-${i}`}
                                        className="inline-flex items-center gap-3 bg-white dark:bg-zinc-950/90 border border-slate-200 dark:border-white/10 hover:border-cyan-500 px-4 py-2.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-cyan-500/20 hover:scale-105 shrink-0 cursor-default"
                                    >
                                        <div className="w-10 h-6 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-[9px] font-mono font-black border border-cyan-500/20 shrink-0">
                                            {String((i % members.length) + 1).padStart(2, '0')}
                                        </div>
                                        <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tight whitespace-nowrap">
                                            {member.name}
                                        </span>
                                        <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded border uppercase shrink-0 ${badge.color}`}>
                                            {badge.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 relative z-10 py-1">
                    {members.map((member, idx) => {
                        const badge = getBranchBadge(member.branch);
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.02 }}
                                whileHover={{ y: -3, scale: 1.02 }}
                                className="group relative flex flex-col justify-between bg-white dark:bg-zinc-950/90 border border-slate-200 dark:border-white/10 hover:border-cyan-500 p-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-cyan-500/10"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[9px] font-mono text-cyan-500 font-bold">
                                        #{String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span className={`text-[7px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase ${badge.color}`}>
                                        {badge.label}
                                    </span>
                                </div>
                                <h5 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight truncate group-hover:text-cyan-500 transition-colors">
                                    {member.name}
                                </h5>
                                <p className="text-[8px] font-mono text-slate-400 dark:text-slate-500 uppercase truncate mt-0.5">
                                    {member.branch}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            )}

           

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(100%); }
                }
                .animate-marquee {
                    animation: marquee 100s linear infinite;
                }
                `
            }} />
        </div>
    );
});
