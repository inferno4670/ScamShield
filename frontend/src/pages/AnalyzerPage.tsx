import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Search, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { RiskMeter } from '../components/RiskMeter';

export const AnalyzerPage: React.FC = () => {
    const [message, setMessage] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleAnalyze = async () => {
        if (!message.trim()) return;

        setIsAnalyzing(true);
        setResult(null);

        try {
            const response = await fetch('http://localhost:5000/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
            const data = await response.json();
            if (data.risk_score !== undefined) {
                data.score = data.risk_score;
            }
            setResult(data);
        } catch (e) {
            console.error('API Error, falling back to dummy data', e);
            // Fallback dummy result for UI demonstration if backend fails/isn't up
            setTimeout(() => {
                setResult({
                    score: Math.floor(Math.random() * 50) + 40,
                    classification: 'Suspicious / Potential Scam',
                    reasons: [
                        'API connection failed. Showing demo results.',
                        'Urgent financial language detected',
                        'Suspicious external link pattern simulated',
                        'Possible impersonation of trusted entity'
                    ]
                });
            }, 1500);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-12 h-full flex flex-col pt-8">
            {/* Input Area */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 flex-shrink-0"
            >
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-5xl font-bold">Message Analyzer</h1>
                    <p className="text-gray-400 max-w-lg mx-auto">Paste any SMS, WhatsApp, or email content to check if it's safe.</p>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 blur-2xl rounded-3xl opacity-0 group-focus-within:opacity-100 transition duration-700 pointer-events-none" />
                    <div className="relative bg-white/[0.02] backdrop-blur-[2px] border border-white/[0.05] rounded-3xl overflow-hidden shadow-glass flex flex-col focus-within:border-primary/40 focus-within:shadow-neon-cyan transition-all duration-500">
                        <textarea
                            className="w-full h-48 sm:h-64 bg-transparent p-6 sm:p-8 text-lg md:text-xl resize-none focus:outline-none placeholder:text-gray-600 focus:ring-0 text-white"
                            placeholder="e.g. 'Your bank account will be blocked. Click this link immediately to verify.'"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className="border-t border-white/[0.05] bg-black/30 p-4 sm:p-6 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <ShieldAlert className="w-4 h-4 text-safe" />
                                No data is stored
                            </div>
                            <button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing || !message.trim()}
                                className="relative group/btn flex items-center gap-2 px-8 py-3 bg-white/[0.03] border border-white/[0.1] hover:border-primary/50 hover:bg-white/[0.05] disabled:opacity-40 disabled:hover:bg-white/[0.03] disabled:border-white/[0.05] shadow-glass hover:shadow-neon-cyan text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                {isAnalyzing ? (
                                    <span className="flex items-center gap-2">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Search className="w-5 h-5" />
                                        </motion.div>
                                        Analyzing...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Search className="w-5 h-5" /> Analyze
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Results Section */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, scale: 0.95 }}
                        animate={{ opacity: 1, height: 'auto', scale: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex-1 overflow-hidden"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-4 pb-8">
                            {/* Risk Visualization */}
                            <div className="relative group p-8 rounded-3xl bg-white/[0.02] backdrop-blur-[2px] border border-white/[0.05] hover:border-white/10 shadow-glass flex flex-col items-center justify-center space-y-6 h-full transition-all duration-500 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <h3 className="text-xl font-medium text-gray-300 relative z-10">Analysis Result</h3>
                                <RiskMeter score={result.score} />
                                <div className="text-center pt-2">
                                    <span className={`inline-flex px-4 py-1.5 rounded-full text-sm font-bold border ${result.score > 70 ? 'bg-danger/10 text-danger border-danger/30' : result.score > 30 ? 'bg-suspicious/10 text-suspicious border-suspicious/30' : 'bg-safe/10 text-safe border-safe/30'}`}>
                                        {result.classification}
                                    </span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="relative group space-y-6 p-8 rounded-3xl bg-white/[0.02] backdrop-blur-[2px] border border-white/[0.05] hover:border-white/10 shadow-glass h-full transition-all duration-500 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-bl from-secondary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <h3 className="text-xl font-medium text-gray-200 pb-4 border-b border-white/[0.05] flex items-center gap-2 relative z-10">
                                    <Info className="w-5 h-5 text-primary" /> Detected Signals
                                </h3>
                                {result.reasons && result.reasons.length > 0 ? (
                                    <ul className="space-y-4">
                                        {result.reasons.map((reason: string, i: number) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * i }}
                                                className="flex items-start gap-3"
                                            >
                                                <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${result.score > 60 ? 'text-danger' : 'text-suspicious'}`} />
                                                <span className="text-gray-300">{reason}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="flex items-center gap-3 text-safe bg-safe/5 p-4 rounded-2xl border border-safe/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                                        <CheckCircle className="w-6 h-6 flex-shrink-0" />
                                        <span>No suspicious signals detected. This message appears to be safe.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
