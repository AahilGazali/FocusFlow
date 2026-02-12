
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Play, Pause, RotateCcw } from 'lucide-react';

const DEFAULT_FOCUS_TIME = 25 * 60; // 25 minutes
const DEFAULT_BREAK_TIME = 5 * 60; // 5 minutes

export function PomodoroTimer() {
    const [focusDuration, setFocusDuration] = useState(DEFAULT_FOCUS_TIME);
    const [breakDuration, setBreakDuration] = useState(DEFAULT_BREAK_TIME);
    const [timeLeft, setTimeLeft] = useState(DEFAULT_FOCUS_TIME);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'focus' | 'break'>('focus');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Load settings from localStorage
    useEffect(() => {
        const savedFocusDuration = localStorage.getItem('focusflow-focus-duration');
        const savedBreakDuration = localStorage.getItem('focusflow-break-duration');
        
        if (savedFocusDuration) {
            const minutes = parseInt(savedFocusDuration, 10);
            setFocusDuration(minutes * 60);
            setTimeLeft(minutes * 60);
        }
        if (savedBreakDuration) {
            const minutes = parseInt(savedBreakDuration, 10);
            setBreakDuration(minutes * 60);
        }
    }, []);

    // Listen for settings changes
    useEffect(() => {
        const handleStorageChange = () => {
            const savedFocusDuration = localStorage.getItem('focusflow-focus-duration');
            const savedBreakDuration = localStorage.getItem('focusflow-break-duration');
            
            if (savedFocusDuration) {
                const minutes = parseInt(savedFocusDuration, 10);
                setFocusDuration(minutes * 60);
                if (mode === 'focus' && !isActive) {
                    setTimeLeft(minutes * 60);
                }
            }
            if (savedBreakDuration) {
                const minutes = parseInt(savedBreakDuration, 10);
                setBreakDuration(minutes * 60);
                if (mode === 'break' && !isActive) {
                    setTimeLeft(minutes * 60);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        // Also listen for custom event when settings are saved
        window.addEventListener('focusflow-settings-changed', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('focusflow-settings-changed', handleStorageChange);
        };
    }, [mode, isActive]);

    // Request notification permission on mount
    useEffect(() => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (mode === 'focus') {
                // Use browser notification if available, otherwise alert
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification('Focus Session Completed!', {
                        body: 'Take a break.',
                        icon: '/favicon.ico'
                    });
                } else {
                    alert("Focus session completed! Take a break.");
                }
                setMode('break');
                setTimeLeft(breakDuration);
            } else {
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification('Break Over!', {
                        body: 'Ready to focus?',
                        icon: '/favicon.ico'
                    });
                }
                setMode('focus');
                setTimeLeft(focusDuration);
            }
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft, mode]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'focus' ? focusDuration : breakDuration);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = ((mode === 'focus' ? focusDuration : breakDuration) - timeLeft) / (mode === 'focus' ? focusDuration : breakDuration) * 100;

    return (
        <Card className={`text-center border shadow-2xl transition-all duration-500 overflow-hidden relative ${
            mode === 'break' 
                ? 'border-emerald-500/30 bg-slate-800/60 backdrop-blur-xl' 
                : 'border-indigo-500/30 bg-slate-800/60 backdrop-blur-xl'
        }`}>
            <div className={`absolute inset-0 opacity-10 ${
                mode === 'break' 
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500' 
                    : 'bg-gradient-to-br from-indigo-500 to-purple-500'
            }`}></div>
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 blur-3xl ${
                mode === 'break' ? 'bg-emerald-500/20' : 'bg-indigo-500/20'
            }`}></div>
            
            <CardHeader className="relative z-10 pb-4">
                <CardTitle className="flex flex-col items-center justify-center space-y-4">
                    <span className={`text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full border ${
                        mode === 'break' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                            : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                    }`}>
                        {mode === 'focus' ? 'Focus Session' : 'Short Break'}
                    </span>
                    <div className={`text-7xl font-black font-mono tracking-tighter ${
                        mode === 'break' 
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400' 
                            : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400'
                    }`}>
                        {formatTime(timeLeft)}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 relative z-10 pb-8">
                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-1000 ease-linear shadow-lg ${
                            mode === 'break' 
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/50' 
                                : 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-indigo-500/50'
                        }`}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        onClick={toggleTimer}
                        variant="primary"
                        className={`w-36 h-14 text-lg font-bold rounded-xl shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                            mode === 'break'
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-emerald-500/30'
                                : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-indigo-500/30'
                        }`}
                        aria-label={isActive ? 'Pause timer' : 'Start timer'}
                    >
                        {isActive ? <Pause className="mr-2 h-6 w-6" /> : <Play className="mr-2 h-6 w-6" />}
                        {isActive ? 'Pause' : 'Start'}
                    </Button>

                    <Button
                        onClick={resetTimer}
                        variant="ghost"
                        size="icon"
                        className={`rounded-xl h-14 w-14 bg-slate-700/50 border transition-all duration-300 hover:scale-110 cursor-pointer ${
                            mode === 'break'
                                ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                                : 'border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10'
                        }`}
                        title="Reset Timer"
                        aria-label="Reset timer"
                    >
                        <RotateCcw className="h-6 w-6" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
