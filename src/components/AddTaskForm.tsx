
"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { TaskType } from '@/lib/types';
import { Calendar, PlusCircle, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface AddTaskFormProps {
    onAddTask: (task: Omit<TaskType, 'id' | 'createdAt' | 'completed'>) => void;
}

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !subject || !deadline) return;

        onAddTask({
            title,
            subject,
            deadline,
        });

        setTitle('');
        setSubject('');
        setDeadline('');
    };

    return (
        <Card className="border-0 bg-transparent shadow-none overflow-visible">
            <CardContent className="p-0">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                >
                    {/* Ambient Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

                    <form
                        onSubmit={handleSubmit}
                        className="relative space-y-5 bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 ring-1 ring-white/5 shadow-2xl"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                <PlusCircle className="h-5 w-5" />
                            </div>
                            <h3 className="tex-lg font-bold text-white tracking-tight">New Mission</h3>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Task</label>
                            <Input
                                placeholder="e.g. Master React Hooks"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-indigo-500/50 focus:ring-indigo-500/20 h-12 text-base transition-all"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Subject</label>
                                <div className="relative">
                                    <Input
                                        className="pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-indigo-500/50"
                                        placeholder="Subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        icon={<BookOpen className="h-4 w-4 text-slate-500" />}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Deadline</label>
                                <div className="relative">
                                    <Input
                                        type="date"
                                        className="pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-indigo-500/50 text-sm" // smaller text for date
                                        value={deadline}
                                        onChange={(e) => setDeadline(e.target.value)}
                                        icon={<Calendar className="h-4 w-4 text-slate-500" />}
                                        required
                                        style={{ colorScheme: 'dark' }} // Force dark calendar picker
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold tracking-wide shadow-lg shadow-indigo-500/25 border-0 rounded-xl"
                        >
                            Add to Queue
                        </Button>
                    </form>
                </motion.div>
            </CardContent>
        </Card>
    );
}
