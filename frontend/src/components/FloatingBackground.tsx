import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CURRENCY_SYMBOLS = ['$', '€', '£', '¥', '₹', '₿', '¢'];

export const FloatingBackground: React.FC = () => {
    const [elements, setElements] = useState<Array<{ id: number; symbol: string; x: number; y: number; size: number; duration: number; delay: number }>>([]);

    useEffect(() => {
        // Generate random stable elements
        const newElements = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            symbol: CURRENCY_SYMBOLS[Math.floor(Math.random() * CURRENCY_SYMBOLS.length)],
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1, // 1rem to 3rem
            duration: Math.random() * 20 + 25, // 25s to 45s
            delay: Math.random() * -30 // start at random animation point
        }));
        setElements(newElements);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
            <div className="absolute inset-0 bg-background mix-blend-multiply opacity-50" />

            {/* Dynamic Animated Elements */}
            {elements.map((el) => (
                <motion.div
                    key={el.id}
                    className="absolute text-primary/10 font-bold select-none"
                    style={{
                        left: `${el.x}%`,
                        top: `${el.y}%`,
                        fontSize: `${el.size}rem`,
                    }}
                    animate={{
                        y: [0, -150, 0],
                        x: [0, 80, 0],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: el.duration,
                        repeat: Infinity,
                        delay: el.delay,
                        ease: "linear",
                    }}
                >
                    {el.symbol}
                </motion.div>
            ))}

            {/* Glow Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />

            {/* Gradient Fades near edges */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        </div>
    );
};
