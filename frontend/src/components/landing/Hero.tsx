import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThreeModel } from './ThreeModel';

export const Hero: React.FC = () => {
  const scrollToHow = () => {
    document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100vh] flex items-center pt-20 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/[0.05] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/[0.03] blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left: Copy */}
        <div className="flex flex-col items-start space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/[0.08] border border-accent/20 text-accent text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            AI-Powered Protection
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Detect Scams{' '}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-300 to-primary">
              Before They
            </span>{' '}
            <br className="hidden sm:block" />
            Detect You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed"
          >
            AI-powered scam detection that analyzes messages, links, and media
            instantly. Stay safe from phishing, fraud, and deepfakes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            {/* Primary CTA */}
            <Link
              to="/analyzer"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-black bg-accent transition-all duration-300 shadow-[0_0_25px_rgba(0,255,170,0.3)] hover:shadow-[0_0_40px_rgba(0,255,170,0.5)] hover:scale-105"
            >
              Analyze Message
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary CTA */}
            <button
              onClick={scrollToHow}
              className="group inline-flex items-center gap-2 px-6 py-4 rounded-full text-base font-medium text-gray-300 border border-white/10 hover:border-white/25 hover:bg-white/[0.03] transition-all duration-300"
            >
              <Play className="w-4 h-4 text-accent" />
              How It Works
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-4 pt-4"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br from-gray-600 to-gray-800"
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              <span className="text-accent font-semibold">2,500+</span> scans today
            </p>
          </motion.div>
        </div>

        {/* Right: 3D Model */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full"
        >
          <ThreeModel />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
