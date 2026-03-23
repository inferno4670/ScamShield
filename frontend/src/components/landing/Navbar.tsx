import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '/about' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAnchor = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#030305]/80 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.1] group-hover:border-accent/60 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,170,0.1)]">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <ShieldCheck className="text-accent w-5 h-5 z-10" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-accent transition-colors duration-300">
            ScamShield
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleAnchor(link.href)}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/analyzer"
            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-black bg-accent hover:bg-accent/90 transition-all duration-200 shadow-[0_0_20px_rgba(0,255,170,0.3)] hover:shadow-[0_0_30px_rgba(0,255,170,0.5)] hover:scale-105"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-[#030305]/95 backdrop-blur-xl border-b border-white/[0.07]"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleAnchor(link.href)}
                  className="text-left text-base font-medium text-gray-300 hover:text-white py-3 border-b border-white/[0.05] transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex items-center gap-4 pt-4">
                <Link
                  to="/analyzer"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center px-5 py-2.5 rounded-full text-sm font-semibold text-black bg-accent hover:bg-accent/90 transition-all shadow-[0_0_20px_rgba(0,255,170,0.3)]"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
