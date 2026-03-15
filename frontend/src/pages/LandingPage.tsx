import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-24">
            {/* Hero Section */}
            <div className="text-center max-w-3xl space-y-8 mt-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.1] text-gray-300 text-sm font-medium shadow-glass backdrop-blur-sm"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Next-Gen Scam Detection
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-md"
                >
                    Is that message <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary filter drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">safe?</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
                >
                    Protect yourself and your loved ones. Paste any suspicious SMS, email, or WhatsApp message to scan it for phishing links and fraud patterns instantly.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex justify-center pt-8"
                >
                    <div className="relative group rounded-full">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200" />
                        <Link
                            to="/analyzer"
                            className="relative inline-flex items-center justify-center px-10 py-5 font-bold text-white bg-surface rounded-full overflow-hidden transition-all hover:scale-[1.02] border border-white/10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="flex items-center gap-2 z-10 text-lg">
                                Start Analyzing <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                {[
                    { icon: Zap, title: "Instant Analysis", desc: "Powered by AI to detect urgency language, threats, and common scam semantics in milliseconds." },
                    { icon: Link, title: "Link Scanning", desc: "We automatically extract and verify URLs against known malicious domain databases." },
                    { icon: Lock, title: "Privacy First", desc: "We don't store your messages. Everything is processed ephemerally to ensure your privacy." }
                ].map((feat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + (i * 0.1) }}
                        className="group relative p-8 rounded-2xl bg-white/[0.01] border border-white/[0.05] shadow-glass hover:bg-white/[0.02] hover:border-white/10 transition-all duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                        <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-5 group-hover:border-primary/30 transition-colors shadow-inner">
                            <feat.icon className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3 tracking-wide relative z-10">{feat.title}</h3>
                        <p className="text-gray-400/90 leading-relaxed font-light relative z-10">{feat.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
