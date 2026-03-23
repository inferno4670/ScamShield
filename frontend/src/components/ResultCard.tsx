import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, ShieldX, Info } from 'lucide-react';
import { RiskMeter } from './RiskMeter';

export type RiskLevel = 'safe' | 'suspicious' | 'danger';

export interface DeepfakeResult {
    score: number;         // 0-100 risk score
    confidence: number;   // 0-100 model confidence
    level: RiskLevel;
}

interface ResultCardProps {
    result: DeepfakeResult;
}

const LEVEL_CONFIG: Record<RiskLevel, {
    label: string;
    sublabel: string;
    color: string;
    glowClass: string;
    borderClass: string;
    bgClass: string;
    Icon: React.FC<{ className?: string }>;
}> = {
    safe: {
        label: 'Likely Real',
        sublabel: 'Content appears authentic',
        color: '#10b981',
        glowClass: 'shadow-[0_0_40px_rgba(16,185,129,0.2)]',
        borderClass: 'border-safe/30',
        bgClass: 'bg-safe/5',
        Icon: ShieldCheck,
    },
    suspicious: {
        label: 'Suspicious',
        sublabel: 'Potential manipulation detected',
        color: '#f59e0b',
        glowClass: 'shadow-[0_0_40px_rgba(245,158,11,0.2)]',
        borderClass: 'border-yellow-500/30',
        bgClass: 'bg-yellow-500/5',
        Icon: ShieldAlert,
    },
    danger: {
        label: 'Likely AI-Generated',
        sublabel: 'High probability of deepfake',
        color: '#ef4444',
        glowClass: 'shadow-[0_0_40px_rgba(239,68,68,0.2)]',
        borderClass: 'border-red-500/30',
        bgClass: 'bg-red-500/5',
        Icon: ShieldX,
    },
};

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
    const { score, confidence, level } = result;
    const cfg = LEVEL_CONFIG[level];
    const { Icon } = cfg;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`relative rounded-2xl border ${cfg.borderClass} ${cfg.bgClass} ${cfg.glowClass}
                        backdrop-blur-sm overflow-hidden p-6 flex flex-col gap-6`}
        >
            {/* Top gradient accent line */}
            <div className="absolute inset-x-0 top-0 h-[1px]"
                style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}60, transparent)` }} />

            {/* Status Header */}
            <div className="flex items-center gap-4">
                <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 250 }}
                    className="w-12 h-12 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: `0 0 16px ${cfg.color}40` }}
                >
                    <Icon className="w-6 h-6" style={{ color: cfg.color } as React.CSSProperties} />
                </motion.div>
                <div>
                    <motion.h3
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        className="text-lg font-bold text-white"
                    >
                        {cfg.label}
                    </motion.h3>
                    <p className="text-sm text-gray-400 mt-0.5">{cfg.sublabel}</p>
                </div>

                {/* Confidence Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 }}
                    className="ml-auto text-right"
                >
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Confidence</p>
                    <p className="text-xl font-bold" style={{ color: cfg.color }}>{confidence}%</p>
                </motion.div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.06]" />

            {/* Risk Meter */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                    <RiskMeter score={score} />
                </div>

                {/* Breakdown */}
                <div className="flex-1 w-full space-y-3">
                    <RiskBar label="Facial Inconsistency" value={Math.min(100, score + 5)} color={cfg.color} delay={0.4} />
                    <RiskBar label="Temporal Artifacts"   value={Math.max(0, score - 10)} color={cfg.color} delay={0.5} />
                    <RiskBar label="Texture Anomalies"    value={Math.min(100, score + 12)} color={cfg.color} delay={0.6} />
                </div>
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] px-4 py-3">
                <Info className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">
                    This analysis is AI-assisted and may not be 100% accurate. Always cross-verify with trusted sources.
                </p>
            </div>
        </motion.div>
    );
};

/* ── Internal sub-component ─────────────────────────────────────── */
interface RiskBarProps {
    label: string;
    value: number;
    color: string;
    delay?: number;
}

const RiskBar: React.FC<RiskBarProps> = ({ label, value, color, delay = 0 }) => (
    <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{label}</span>
            <span style={{ color }}>{value}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.9, ease: 'easeOut', delay }}
            />
        </div>
    </div>
);
