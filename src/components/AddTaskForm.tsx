
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { TaskType } from '@/lib/types';
import { Calendar, PlusCircle, BookOpen } from 'lucide-react';

interface AddTaskFormProps {
    onAddTask: (task: Omit<TaskType, 'id' | 'createdAt' | 'completed'>) => void;
}

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !subject.trim() || !deadline) {
            // Visual feedback for empty fields
            if (!title.trim()) {
                const titleInput = e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement;
                titleInput?.focus();
            }
            return;
        }

        onAddTask({
            title: title.trim(),
            subject: subject.trim(),
            deadline,
        });

        setTitle('');
        setSubject('');
        setDeadline('');
    };

    return (
        <Card className="h-full border border-indigo-500/30 bg-slate-800/60 backdrop-blur-xl shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-300">
            <CardHeader className="border-b border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="h-12 w-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 shadow-lg">
                        <PlusCircle className="h-6 w-6 text-indigo-400" />
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-black">
                        New Task
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2.5">
                        <label className="text-sm font-bold text-slate-300 leading-none">
                            What do you need to study?
                        </label>
                        <Input
                            placeholder="e.g. Complete Algebra Chapter 5"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="h-12 bg-slate-700/50 backdrop-blur-sm border-indigo-500/30 focus-visible:border-indigo-400 focus-visible:ring-indigo-400/30 transition-all text-slate-100 placeholder:text-slate-500"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2.5">
                            <label className="text-sm font-bold text-slate-300 leading-none">Subject</label>
                            <Input
                                placeholder="Math"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                icon={<BookOpen className="h-4 w-4 text-indigo-400" />}
                                className="h-12 bg-slate-700/50 backdrop-blur-sm border-indigo-500/30 focus-visible:border-indigo-400 focus-visible:ring-indigo-400/30 transition-all text-slate-100 placeholder:text-slate-500"
                                required
                            />
                        </div>

                        <div className="space-y-2.5">
                            <label className="text-sm font-bold text-slate-300 leading-none">Deadline</label>
                            <Input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                icon={<Calendar className="h-4 w-4 text-indigo-400" />}
                                className="h-12 bg-slate-700/50 backdrop-blur-sm border-indigo-500/30 focus-visible:border-indigo-400 focus-visible:ring-indigo-400/30 transition-all text-slate-100 placeholder:text-slate-500"
                                required
                            />
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full mt-4 h-14 text-base font-bold bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                        aria-label="Add new task"
                    >
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Add to List
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
