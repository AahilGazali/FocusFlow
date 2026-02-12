
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Play, Pause, RotateCcw, Zap, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

const FOCUS_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

export function PomodoroTimer() {
    const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'focus' | 'break'>('focus');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);

            // Check if sound is enabled in settings
            const soundEnabled = localStorage.getItem('focusflow-sound') !== 'false';
            if (soundEnabled) {
                try {
                    const audio = new Audio('/notification.mp3');
                    audio.play().catch(() => { }); // Silent fail if no file
                } catch (e) {
                    // Ignore audio errors
                }
            }

            if (mode === 'focus') {
                // Always show confetti on focus completion
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#818cf8', '#c084fc', '#f472b6']
                });
                setMode('break');
                setTimeLeft(BREAK_TIME);
            } else {
                setMode('focus');
                setTimeLeft(FOCUS_TIME);
            }
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft, mode]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'focus' ? FOCUS_TIME : BREAK_TIME);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const totalTime = mode === 'focus' ? FOCUS_TIME : BREAK_TIME;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;

    // Circular Progress Calculation
    const radius = 140;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const isBreak = mode === 'break';

    return (
        <Card className="relative overflow-hidden border-0 bg-slate-900/60 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(99,102,241,0.25)] rounded-3xl group">
            {/* Dynamic Background Gradient */}
            <div
                className={`absolute inset-0 opacity-20 transition-all duration-1000 bg-gradient-to-br ${isBreak
                    ? 'from-emerald-500/30 via-teal-500/10 to-transparent'
                    : 'from-indigo-500/30 via-purple-500/10 to-transparent'
                    }`}
            />

            <CardContent className="flex flex-col items-center pt-12 pb-12 relative z-10">

                {/* Mode Indicator Pill */}
                <motion.div
                    layout
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-8 border transition-colors duration-500 ${isBreak
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                        }`}
                >
                    {isBreak ? (
                        <Sparkles className="w-3 h-3 animate-pulse" />
                    ) : (
                        <Zap className="w-3 h-3 animate-pulse" />
                    )}
                    {isBreak ? 'Recharge Phase' : 'Deep Focus Mode'}
                </motion.div>

                {/* Circular Timer Visualization */}
                <div className="relative flex items-center justify-center mb-10 group-hover:scale-105 transition-transform duration-700 ease-out">
                    {/* Ambient Glow behind timer */}
                    <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 transition-colors duration-1000 ${isBreak ? 'bg-emerald-500' : 'bg-indigo-600'
                        }`} />

                    <svg
                        height={radius * 2}
                        width={radius * 2}
                        className="transform -rotate-90 pointer-events-none drop-shadow-2xl"
                    >
                        {/* Background Circle */}
                        <circle
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth={stroke}
                            fill="transparent"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                        {/* Animated Progress Circle */}
                        <circle
                            stroke={isBreak ? '#34d399' : '#818cf8'}
                            strokeWidth={stroke}
                            strokeDasharray={circumference + ' ' + circumference}
                            style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s linear' }}
                            strokeLinecap="round"
                            fill="transparent"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                            className="drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]"
                        />
                    </svg>

                    {/* Timer Text */}
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <AnimatePresence mode='wait'>
                            <motion.span
                                key={timeLeft}
                                initial={{ opacity: 0.5, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`text-7xl font-bold font-mono tracking-tighter tabular-nums text-transparent bg-clip-text bg-gradient-to-br ${isBreak
                                    ? 'from-emerald-300 to-teal-500'
                                    : 'from-white via-indigo-200 to-indigo-400'
                                    }`}
                            >
                                {formatTime(timeLeft)}
                            </motion.span>
                        </AnimatePresence>
                        <span className="text-sm text-slate-400 font-medium mt-2 uppercase tracking-widest opacity-60">
                            {isActive ? 'Session Active' : 'Ready to Start'}
                        </span>
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                    <Button
                        onClick={toggleTimer}
                        className={`h-14 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border-0 text-white ${isBreak
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/25'
                            : 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-indigo-500/30'
                            }`}
                    >
                        {isActive ? <Pause className="mr-2 h-5 w-5 fill-current" /> : <Play className="mr-2 h-5 w-5 fill-current" />}
                        {isActive ? 'Pause' : 'Start'}
                    </Button>

                    <Button
                        onClick={resetTimer}
                        variant="ghost"
                        className="h-14 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5 rounded-2xl text-base font-medium backdrop-blur-sm transition-all"
                    >
                        <RotateCcw className="mr-2 h-5 w-5" />
                        Reset
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
