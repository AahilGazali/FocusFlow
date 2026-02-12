
import React from 'react';
import { TaskType } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, X, Calendar, Book } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TaskItemProps {
    task: TaskType;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
    const isCompleted = task.completed;

    return (
        <Card className={cn(
            "transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 group",
            isCompleted 
                ? "border-emerald-500/30 bg-slate-800/60 backdrop-blur-xl hover:border-emerald-500/50" 
                : "border-indigo-500/30 bg-slate-800/60 backdrop-blur-xl hover:border-indigo-500/50"
        )}>
            <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-start gap-4 flex-1">
                    <button
                        onClick={() => onToggle(task.id)}
                        className={cn(
                            "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 shadow-lg hover:scale-110 border cursor-pointer",
                            isCompleted 
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30" 
                                : "bg-indigo-500/20 text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/30"
                        )}
                        aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                        title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                    >
                        {isCompleted && <Check className="h-5 w-5 font-bold" />}
                    </button>

                    <div className="flex-1 space-y-2.5">
                        <h4 className={cn(
                            "font-bold text-lg leading-snug transition-all",
                            isCompleted 
                                ? "text-slate-400 line-through" 
                                : "text-slate-200"
                        )}>
                            {task.title}
                        </h4>
                        <div className="flex items-center gap-4 text-sm">
                            <span className={cn(
                                "flex items-center gap-2 px-4 py-1.5 rounded-lg font-semibold transition-all border",
                                isCompleted 
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                    : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                            )}>
                                <Book className="h-4 w-4" />
                                {task.subject}
                            </span>
                            <span className={cn(
                                "flex items-center gap-2 px-4 py-1.5 rounded-lg font-semibold transition-all border",
                                isCompleted 
                                    ? "bg-orange-500/10 text-orange-400 border-orange-500/20" 
                                    : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                            )}>
                                <Calendar className="h-4 w-4" />
                                {format(new Date(task.deadline), 'MMM d, yyyy')}
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => onDelete(task.id)}
                    className="h-10 w-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all duration-200 hover:scale-110 shrink-0 cursor-pointer"
                    aria-label="Delete task"
                    title="Delete task"
                >
                    <X className="h-5 w-5" />
                </button>
            </CardContent>
        </Card>
    );
}
