
"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { TaskType } from '@/lib/types';
import { CheckCircle2, ListTodo, CalendarClock, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface DashboardStatsProps {
    tasks: TaskType[];
}

const StatCard = ({ title, value, subtext, icon: Icon, color, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
        <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all overflow-hidden relative group">
            {/* Background Glow */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-${color}-500`} />

            <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-400 ring-1 ring-${color}-500/20`}>
                        <Icon className="h-6 w-6" />
                    </div>
                    {/* Sparkle decoration */}
                    <div className="text-white/20">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
                        </svg>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide">{title}</h3>
                    <div className="text-3xl font-bold text-white mt-1 tabular-nums tracking-tight">
                        {value}
                    </div>
                    <p className="text-xs text-slate-500 mt-2 font-medium flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full bg-${color}-500 inline-block`} />
                        {subtext}
                    </p>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

export function DashboardStats({ tasks }: DashboardStatsProps) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const today = format(new Date(), 'yyyy-MM-dd');
    const todaysTasks = tasks.filter((t) => t.deadline === today);
    const todaysCompleted = todaysTasks.filter((t) => t.completed).length;

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
                title="Total Tasks"
                value={totalTasks}
                subtext={`${pendingTasks} remaining`}
                icon={ListTodo}
                color="blue"
                delay={0.1}
            />

            <StatCard
                title="Completed"
                value={completedTasks}
                subtext={`${progress}% success rate`}
                icon={CheckCircle2}
                color="emerald"
                delay={0.2}
            />

            <StatCard
                title="Due Today"
                value={todaysTasks.length}
                subtext={`${todaysCompleted} done so far`}
                icon={CalendarClock}
                color="purple"
                delay={0.3}
            />

            <StatCard
                title="Productivity"
                value={progress > 75 ? 'Elite' : progress > 40 ? 'Good' : 'Normal'}
                subtext="Keep grinding!"
                icon={Zap} // Changed icon
                color="orange"
                delay={0.4}
            />
        </div>
    );
}
