import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareWarning, ScanSearch, Fingerprint, ShieldAlert } from 'lucide-react';

const features = [
  {
    icon: MessageSquareWarning,
    title: 'Scam Message Analyzer',
    description: 'AI detects urgency, threats, and phishing patterns in SMS, email, and chat messages.',
    color: 'accent',
  },
  {
    icon: ScanSearch,
    title: 'OCR Text Detection',
    description: 'Extract and scan text from images and screenshots for hidden scam content.',
    color: 'primary',
  },
  {
    icon: Fingerprint,
    title: 'Deepfake Detection',
    description: 'Identify AI-manipulated media to prevent identity fraud and impersonation.',
    color: 'secondary',
  },
  {
    icon: ShieldAlert,
    title: 'Risk Score Explanation',
    description: 'Get a transparent risk breakdown explaining exactly why content is flagged.',
    color: 'accent',
  },
];

const colorMap: Record<string, { gradient: string; glow: string; text: string; border: string }> = {
  accent: {
    gradient: 'from-accent/20 to-accent/5',
    glow: 'shadow-[0_0_30px_rgba(0,255,170,0.08)]',
    text: 'text-accent',
    border: 'group-hover:border-accent/30',
  },
  primary: {
    gradient: 'from-primary/20 to-primary/5',
    glow: 'shadow-[0_0_30px_rgba(6,182,212,0.08)]',
    text: 'text-primary',
    border: 'group-hover:border-primary/30',
  },
  secondary: {
    gradient: 'from-secondary/20 to-secondary/5',
    glow: 'shadow-[0_0_30px_rgba(168,85,247,0.08)]',
    text: 'text-secondary',
    border: 'group-hover:border-secondary/30',
  },
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold uppercase tracking-widest text-accent mb-3"
          >
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            Everything You Need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              Stay Safe
            </span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => {
            const c = colorMap[feat.color];
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-all duration-300 ${c.glow} hover:${c.glow}`}
              >
                {/* Highlight gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none`} />

                {/* Icon */}
                <div className={`relative w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] ${c.border} flex items-center justify-center mb-5 transition-colors duration-300`}>
                  <feat.icon className={`w-6 h-6 ${c.text}`} />
                </div>

                <h3 className="relative text-lg font-semibold text-white mb-2 tracking-wide">
                  {feat.title}
                </h3>
                <p className="relative text-sm text-gray-400 leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
