
"use client";

import React from 'react';
import { TaskType } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Check, X, Calendar, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskItemProps {
    task: TaskType;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
    const isCompleted = task.completed;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.01 }}
            className="group relative"
        >
            <div
                className={cn(
                    "relative overflow-hidden rounded-xl border p-4 transition-all duration-300 backdrop-blur-md",
                    isCompleted
                        ? "bg-slate-900/40 border-slate-800/50"
                        : "bg-slate-800/40 border-white/10 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10"
                )}
            >
                {/* Glow Effects */}
                {!isCompleted && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}

                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4 flex-1">
                        <button
                            onClick={() => onToggle(task.id)}
                            className={cn(
                                "h-6 w-6 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                                isCompleted
                                    ? "bg-emerald-500 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                                    : "bg-transparent border-slate-600 hover:border-indigo-400"
                            )}
                        >
                            <AnimatePresence>
                                {isCompleted && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <Check className="h-3 w-3 text-white stroke-[3]" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>

                        <div className="flex-1 min-w-0">
                            <h4 className={cn(
                                "font-medium text-base truncate transition-colors duration-300",
                                isCompleted ? "text-slate-500 line-through decoration-slate-600" : "text-slate-200 group-hover:text-white"
                            )}>
                                {task.title}
                            </h4>
                            <div className="flex items-center gap-3 mt-1 text-xs font-medium text-slate-500">
                                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-800/50 border border-slate-700/50 text-indigo-300">
                                    <BookOpen className="h-3 w-3" />
                                    {task.subject}
                                </span>
                                <span className={cn(
                                    "flex items-center gap-1.5",
                                    new Date(task.deadline) < new Date() && !isCompleted ? 'text-red-400' : 'text-slate-400'
                                )}>
                                    <Calendar className="h-3 w-3" />
                                    {format(new Date(task.deadline), 'MMM d')}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        onClick={() => onDelete(task.id)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
