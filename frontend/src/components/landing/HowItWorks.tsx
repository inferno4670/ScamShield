import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, BarChart3 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Paste or Upload Content',
    description: 'Drop a suspicious message, URL, or screenshot into the analyzer.',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'AI Analyzes Patterns',
    description: 'Our model scans for phishing links, urgency cues, and fraud indicators.',
  },
  {
    number: '03',
    icon: BarChart3,
    title: 'Get Risk Score & Explanation',
    description: 'Receive a clear safety score with transparent reasoning for every flag.',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-accent/[0.03] blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold uppercase tracking-widest text-accent mb-3"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            Three Simple Steps to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              Safety
            </span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[16.66%] right-[16.66%] h-px">
            <div className="w-full h-full bg-gradient-to-r from-accent/30 via-primary/30 to-accent/30" />
            <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent/60 to-transparent animate-pulse" />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Step circle */}
              <div className="relative mb-8">
                {/* Outer glow ring */}
                <div className="absolute -inset-3 rounded-full bg-accent/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative w-[120px] h-[120px] rounded-full bg-white/[0.03] border border-white/[0.08] group-hover:border-accent/30 flex items-center justify-center transition-all duration-300">
                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs font-bold text-accent">
                    {step.number}
                  </div>

                  <step.icon className="w-10 h-10 text-accent/80 group-hover:text-accent transition-colors duration-300" />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 tracking-wide">
                {step.title}
              </h3>
              <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-16"
        >
          <a
            href="/analyzer"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-black bg-accent transition-all duration-300 shadow-[0_0_25px_rgba(0,255,170,0.3)] hover:shadow-[0_0_40px_rgba(0,255,170,0.5)] hover:scale-105"
          >
            Try It Now Free
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
