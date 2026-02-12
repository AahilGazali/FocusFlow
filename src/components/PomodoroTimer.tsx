
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Play, Pause, RotateCcw } from 'lucide-react';

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
            if (mode === 'focus') {
                alert("Focus session completed! Take a break.");
                setMode('break');
                setTimeLeft(BREAK_TIME);
            } else {
                alert("Break over! Ready to focus?");
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

    const progress = ((mode === 'focus' ? FOCUS_TIME : BREAK_TIME) - timeLeft) / (mode === 'focus' ? FOCUS_TIME : BREAK_TIME) * 100;

    return (
        <Card className={`text-center transition-colors ${mode === 'break' ? 'border-emerald-200 bg-emerald-50' : 'border-indigo-200 bg-indigo-50'}`}>
            <CardHeader>
                <CardTitle className="flex flex-col items-center justify-center space-y-2">
                    <span className="text-xs uppercase tracking-widest font-bold text-slate-500">
                        {mode === 'focus' ? 'Focus Session' : 'Short Break'}
                    </span>
                    <div className="text-6xl font-black text-slate-900 font-mono tracking-tighter">
                        {formatTime(timeLeft)}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-1000 ease-linear ${mode === 'break' ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        onClick={toggleTimer}
                        variant="primary"
                        className={`w-32 h-12 text-lg rounded-full shadow-lg ${mode === 'break'
                                ? 'bg-emerald-600 hover:bg-emerald-700'
                                : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                    >
                        {isActive ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                        {isActive ? 'Pause' : 'Start'}
                    </Button>

                    <Button
                        onClick={resetTimer}
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-12 w-12 hover:bg-white/50 text-slate-500"
                        title="Reset Timer"
                    >
                        <RotateCcw className="h-5 w-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
