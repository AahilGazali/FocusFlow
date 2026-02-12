"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, Trophy, Star, Target, Zap, Award, Crown } from 'lucide-react';
import { TaskType } from '@/lib/types';

interface AchievementsModalProps {
    isOpen: boolean;
    onClose: () => void;
    tasks: TaskType[];
}

export function AchievementsModal({ isOpen, onClose, tasks }: AchievementsModalProps) {
    if (!isOpen) return null;

    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;

    const achievements = [
        {
            id: 1,
            title: 'First Steps',
            description: 'Create your first task',
            icon: Star,
            unlocked: totalTasks >= 1,
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/20'
        },
        {
            id: 2,
            title: 'Task Master',
            description: 'Complete 5 tasks',
            icon: Target,
            unlocked: completedTasks >= 5,
            color: 'text-blue-400',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20'
        },
        {
            id: 3,
            title: 'Productivity Pro',
            description: 'Complete 10 tasks',
            icon: Zap,
            unlocked: completedTasks >= 10,
            color: 'text-purple-400',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20'
        },
        {
            id: 4,
            title: 'Focus Champion',
            description: 'Create 10 tasks',
            icon: Award,
            unlocked: totalTasks >= 10,
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-500/10',
            borderColor: 'border-emerald-500/20'
        },
        {
            id: 5,
            title: 'Elite Scholar',
            description: 'Complete 20 tasks',
            icon: Crown,
            unlocked: completedTasks >= 20,
            color: 'text-orange-400',
            bgColor: 'bg-orange-500/10',
            borderColor: 'border-orange-500/20'
        },
        {
            id: 6,
            title: 'Legendary',
            description: 'Complete 50 tasks',
            icon: Trophy,
            unlocked: completedTasks >= 50,
            color: 'text-pink-400',
            bgColor: 'bg-pink-500/10',
            borderColor: 'border-pink-500/20'
        }
    ];

    const unlockedCount = achievements.filter(a => a.unlocked).length;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
                <div className="sticky top-0 z-10 relative p-6 bg-gradient-to-br from-indigo-600 to-purple-600">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <X className="h-5 w-5 text-white" />
                    </button>

                    <div className="flex items-center gap-3 mb-4">
                        <Trophy className="h-8 w-8 text-yellow-300" />
                        <div>
                            <h2 className="text-2xl font-bold text-white">Achievements</h2>
                            <p className="text-indigo-200 text-sm">Track your progress and unlock rewards</p>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-white">Progress</span>
                            <span className="text-sm font-bold text-white">{unlockedCount} / {achievements.length}</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500"
                                style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => {
                        const Icon = achievement.icon;
                        return (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: achievement.id * 0.05 }}
                                className={`relative p-4 rounded-xl border transition-all ${achievement.unlocked
                                        ? `${achievement.bgColor} ${achievement.borderColor} hover:scale-105`
                                        : 'bg-slate-800/30 border-slate-700/50 opacity-50'
                                    }`}
                            >
                                {achievement.unlocked && (
                                    <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1 shadow-lg">
                                        <Star className="h-4 w-4 text-white fill-white" />
                                    </div>
                                )}

                                <div className="flex items-start gap-3">
                                    <div className={`p-3 rounded-lg ${achievement.unlocked ? achievement.bgColor : 'bg-slate-700/50'}`}>
                                        <Icon className={`h-6 w-6 ${achievement.unlocked ? achievement.color : 'text-slate-500'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-bold ${achievement.unlocked ? 'text-white' : 'text-slate-500'}`}>
                                            {achievement.title}
                                        </h3>
                                        <p className={`text-sm mt-1 ${achievement.unlocked ? 'text-slate-300' : 'text-slate-600'}`}>
                                            {achievement.description}
                                        </p>
                                        {achievement.unlocked && (
                                            <span className="inline-block mt-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                                                ✓ Unlocked
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}
