"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, User, Calendar, Target, TrendingUp } from 'lucide-react';
import { TaskType } from '@/lib/types';
import { format } from 'date-fns';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    tasks: TaskType[];
}

export function ProfileModal({ isOpen, onClose, tasks }: ProfileModalProps) {
    if (!isOpen) return null;

    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const pendingTasks = totalTasks - completedTasks;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            >
                <div className="relative p-6 bg-gradient-to-br from-indigo-600 to-purple-600">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <X className="h-5 w-5 text-white" />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold text-white border-2 border-white/30">
                            AH
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Aahil Gazali</h2>
                            <p className="text-indigo-200 font-medium">Level 5 Scholar</p>
                            <p className="text-indigo-300 text-sm mt-1">Member since {format(new Date(), 'MMMM yyyy')}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                            <div className="flex items-center gap-2 text-indigo-400 mb-2">
                                <Target className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Total Tasks</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{totalTasks}</p>
                        </div>

                        <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                            <div className="flex items-center gap-2 text-emerald-400 mb-2">
                                <TrendingUp className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Completed</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{completedTasks}</p>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-slate-400">Success Rate</span>
                            <span className="text-sm font-bold text-white">{completionRate}%</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                                style={{ width: `${completionRate}%` }}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-white/5">
                            <span className="text-sm text-slate-300">Pending Tasks</span>
                            <span className="text-sm font-bold text-orange-400">{pendingTasks}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-white/5">
                            <span className="text-sm text-slate-300">Current Streak</span>
                            <span className="text-sm font-bold text-indigo-400">5 days 🔥</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
