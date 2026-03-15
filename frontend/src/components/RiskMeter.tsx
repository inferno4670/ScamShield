import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const RiskMeter: React.FC<{ score: number }> = ({ score }) => {
    const [displayedScore, setDisplayedScore] = useState(0);

    useEffect(() => {
        if (score <= 0) {
            setDisplayedScore(0);
            return;
        }

        setDisplayedScore(0);
        const duration = 1500;
        const stepTime = Math.max(16, Math.floor(duration / score));

        const timer = setInterval(() => {
            setDisplayedScore((prev) => {
                if (prev >= score - 1) {
                    clearInterval(timer);
                    return score;
                }
                return prev + 1;
            });
        }, stepTime);

        return () => clearInterval(timer);
    }, [score]);

    const getColor = (s: number) => {
        if (s > 70) return '#ef4444'; // danger
        if (s > 30) return '#f59e0b'; // suspicious
        return '#10b981'; // safe
    };

    const currentColor = getColor(score);

    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 140 140">
                <circle
                    className="text-white/5"
                    strokeWidth="12"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="70"
                    cy="70"
                />
                <motion.circle
                    stroke={currentColor}
                    strokeWidth="12"
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx="70"
                    cy="70"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ strokeDasharray: circumference }}
                />
            </svg>
            <div className="z-10 flex flex-col items-center">
                <span className="text-4xl font-bold" style={{ color: currentColor }}>
                    {displayedScore}%
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                    Risk Score
                </span>
            </div>
            <motion.div
                className="absolute inset-4 rounded-full blur-2xl z-[-1]"
                style={{ backgroundColor: currentColor, opacity: 0.2 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </div>
    );
}
