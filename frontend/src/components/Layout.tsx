import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { FloatingBackground } from './FloatingBackground';

export const Layout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col relative text-gray-100 font-sans selection:bg-primary/30">
            <FloatingBackground />

            {/* Header - Ultra Transparent Glass */}
            <header className="fixed top-0 inset-x-0 z-50 bg-white/[0.02] backdrop-blur-[2px] border-b border-white/[0.05] shadow-glass">
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.1] group-hover:border-primary/50 transition-colors shadow-neon-cyan overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <ShieldCheck className="text-primary w-6 h-6 z-10" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all">
                            ScamShield
                        </span>
                    </Link>
                    <nav className="flex gap-8 text-sm font-medium text-gray-400">
                        <Link to="/analyzer" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Analyzer</Link>
                        <Link to="/deepfake" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Deepfake</Link>
                        <Link to="/about" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Privacy</Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-32 pb-12 flex flex-col relative z-10">
                <Outlet />
            </main>

            {/* Footer - Ultra Transparent Glass */}
            <footer className="w-full bg-white/[0.01] backdrop-blur-[2px] border-t border-white/[0.05] mt-auto relative z-10">
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-gray-500">
                    <p className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-safe animate-pulse" />
                        © 2026 ScamShield
                    </p>
                    <p className="flex items-center gap-1.5 text-gray-400">
                        <ShieldAlert className="w-4 h-4 text-secondary/70" /> No data stored. Ever.
                    </p>
                </div>
            </footer>
        </div>
    );
};
