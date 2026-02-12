
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
        <Card className={cn("transition-all duration-300 hover:shadow-md", isCompleted ? "bg-slate-50 border-slate-200" : "bg-white")}>
            <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-start gap-4 flex-1">
                    <Button
                        variant={isCompleted ? "primary" : "outline"}
                        size="sm"
                        className={cn("h-6 w-6 rounded-full p-0 flex items-center justify-center shrink-0 mt-0.5", isCompleted ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-500" : "")}
                        onClick={() => onToggle(task.id)}
                    >
                        {isCompleted && <Check className="h-3 w-3 text-white" />}
                    </Button>

                    <div className="flex-1 space-y-1">
                        <h4 className={cn("font-medium text-sm leading-none", isCompleted && "text-slate-500 line-through")}>
                            {task.title}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                                <Book className="h-3 w-3 text-indigo-500" />
                                {task.subject}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-orange-500" />
                                {format(new Date(task.deadline), 'MMM d, yyyy')}
                            </span>
                        </div>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-red-500 h-8 w-8 p-0"
                    onClick={() => onDelete(task.id)}
                >
                    <X className="h-4 w-4" />
                </Button>
            </CardContent>
        </Card>
    );
}
