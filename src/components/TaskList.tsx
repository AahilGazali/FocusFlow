
"use client";

import React, { useState } from 'react';
import { TaskType, FilterType } from '@/lib/types';
import { TaskItem } from './TaskItem';
import { AnimatePresence, motion } from 'framer-motion';

interface TaskListProps {
    tasks: TaskType[];
    onToggleTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
}

export function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
    const [filter, setFilter] = useState<FilterType>('All');

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'Completed') return task.completed;
        if (filter === 'Pending') return !task.completed;
        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="w-1 h-6 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]" />
                    Mission Log
                </h2>

                <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/5 backdrop-blur-md">
                    {(['All', 'Pending', 'Completed'] as const).map((f) => {
                        const isActive = filter === f;
                        return (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`
                  relative z-10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300
                  ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'}
                `}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="filter-pill"
                                        className="absolute inset-0 bg-indigo-600 shadow-lg shadow-indigo-600/20 rounded-lg"
                                        style={{ zIndex: -1 }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {f}
                            </button>
                        );
                    })}
                </div>
            </div>

            <motion.div
                layout
                className="grid gap-3 relative min-h-[200px]"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredTasks.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-dashed border-slate-800 bg-slate-900/20"
                        >
                            <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 ring-1 ring-white/10">
                                <span className="text-2xl opacity-50">🚀</span>
                            </div>
                            <p className="text-slate-300 font-semibold text-lg">All Systems Clear</p>
                            <p className="text-slate-500 text-sm max-w-xs mx-auto mt-1">
                                No active missions in this sector. Add a new task to begin.
                            </p>
                        </motion.div>
                    ) : (
                        filteredTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggle={onToggleTask}
                                onDelete={onDeleteTask}
                            />
                        ))
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
