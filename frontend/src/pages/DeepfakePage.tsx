import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanFace, Cpu, Zap } from 'lucide-react';
import { UploadBox } from '../components/UploadBox';
import { ResultCard, type DeepfakeResult, type RiskLevel } from '../components/ResultCard';

/* ── Mock result generator (UI-only demo) ──────────────────────── */
function generateMockResult(_file: File): DeepfakeResult {
    const score = Math.floor(Math.random() * 100);
    const confidence = Math.floor(Math.random() * 20) + 75; // 75-95%
    const level: RiskLevel = score > 70 ? 'danger' : score > 30 ? 'suspicious' : 'safe';
    return { score, confidence, level };
}

export const DeepfakePage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<DeepfakeResult | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileSelect = (f: File | null) => {
        setFile(f);
        setResult(null);
    };

    const handleAnalyze = () => {
        if (!file) return;
        setLoading(true);
        setResult(null);
        // Simulate async processing (UI demo only — no real API call)
        setTimeout(() => {
            setResult(generateMockResult(file));
            setLoading(false);
        }, 2200);
    };

    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-10">

            {/* ── Page Header ─────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-3"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-glass">
                        <ScanFace className="w-5 h-5 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Deepfake Detection
                    </h1>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                    Upload an image or short video to detect AI-generated or manipulated media.
                    Our system analyses facial inconsistencies, texture anomalies, and temporal artifacts.
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-4 mt-1">
                    {[
                        { icon: Cpu,  label: '12 AI Models', sublabel: 'Ensemble analysis' },
                        { icon: Zap,  label: '~2s Analysis', sublabel: 'Fast inference'    },
                    ].map(({ icon: Icon, label, sublabel }) => (
                        <div key={label} className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                            <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                            <div>
                                <p className="text-xs font-semibold text-gray-200">{label}</p>
                                <p className="text-[11px] text-gray-500">{sublabel}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ── Upload Section ───────────────────────────────────────── */}
            <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.01] backdrop-blur-sm p-6 flex flex-col gap-5 shadow-glass"
            >
                <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Upload Media</h2>
                <UploadBox onFileSelect={handleFileSelect} />

                {/* Analyze Button */}
                <AnimatePresence>
                    {file && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                        >
                            <motion.button
                                disabled={loading}
                                onClick={handleAnalyze}
                                whileHover={!loading ? { scale: 1.02 } : {}}
                                whileTap={!loading ? { scale: 0.98 } : {}}
                                className={`w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300
                                    ${loading
                                        ? 'bg-primary/20 text-primary/50 cursor-not-allowed border border-primary/20'
                                        : 'bg-gradient-to-r from-primary to-secondary text-black hover:shadow-neon-cyan cursor-pointer'
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <LoadingSpinner />
                                        Analysing…
                                    </span>
                                ) : 'Analyse for Deepfakes'}
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.section>

            {/* ── Result Section ───────────────────────────────────────── */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        key="loading-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-16 gap-4"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                            className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary"
                        />
                        <p className="text-gray-400 text-sm animate-pulse">Running deepfake analysis…</p>
                    </motion.div>
                )}

                {result && !loading && (
                    <motion.section
                        key="result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-widest mb-4">
                            Analysis Result
                        </h2>
                        <ResultCard result={result} />
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
};

/* Tiny inline spinner */
const LoadingSpinner: React.FC = () => (
    <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="block w-4 h-4 rounded-full border-2 border-black/30 border-t-black"
    />
);
