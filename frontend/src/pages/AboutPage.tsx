import React from 'react';
import { Shield, EyeOff, Code, HeartHandshake } from 'lucide-react';

export const AboutPage: React.FC = () => {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-16 py-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold">About ScamShield</h1>
                <p className="text-gray-400 max-w-xl mx-auto text-lg">
                    Protecting the vulnerable from the next generation of digital fraud.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                            <Shield className="text-primary w-6 h-6" /> The Mission
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            ScamShield was built to protect everyday people from digital fraud.
                            Our goal is to show how AI-powered message analysis can prevent scam victimization. Scam texts, phishing links,
                            and impersonation attempts affect millions. We want to stop them before they do harm.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                            <Code className="text-primary w-6 h-6" /> Technology
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            This prototype utilizes a React frontend combined with a Python Flask backend. It demonstrates
                            Natural Language Processing strategies to detect urgency, financial threats, and malicious links
                            in milliseconds.
                        </p>
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="relative group space-y-4 p-8 rounded-3xl bg-white/[0.02] backdrop-blur-[2px] border border-white/[0.05] hover:border-white/10 shadow-glass transition-all duration-500 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <h2 className="text-2xl font-semibold text-white flex items-center gap-2 relative z-10 w-fit">
                            <EyeOff className="text-safe w-6 h-6" /> Privacy Guarantee
                            <div className="absolute -inset-2 bg-safe/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500 z-[-1]" />
                        </h2>
                        <p className="text-gray-200 leading-relaxed relative z-10">
                            <strong>Your messages are never stored.</strong>
                        </p>
                        <p className="text-gray-400/90 text-sm leading-relaxed relative z-10 font-light">
                            We process text payloads temporarily in memory during analysis. No logs, databases, or third-party tracking
                            retain the contents of the messages you check. Privacy is a core tenant of the ScamShield architecture.
                        </p>
                    </section>

                    <section className="relative group space-y-4 p-8 rounded-3xl bg-white/[0.02] backdrop-blur-[2px] border border-white/[0.05] hover:border-primary/30 shadow-glass hover:shadow-neon-cyan transition-all duration-500 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <h2 className="text-2xl font-semibold text-white flex items-center gap-2 relative z-10">
                            <HeartHandshake className="text-primary w-6 h-6 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" /> Our Vision
                        </h2>
                        <p className="text-blue-100/90 text-sm leading-relaxed relative z-10 font-light">
                            This web app acts as a demonstration prototype showing how scam detection could later run
                            automatically on mobile devices, alerting users before they interact with malicious content.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};
