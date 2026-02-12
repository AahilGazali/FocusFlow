
import React, { useState } from 'react';
import { TaskType, FilterType } from '@/lib/types';
import { TaskItem } from './TaskItem';
import { Button } from '@/components/ui/Button';
import { ListTodo } from 'lucide-react';

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
                <h2 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    Studying Queue
                </h2>
                <div className="flex bg-slate-800/60 backdrop-blur-xl p-1.5 rounded-xl border border-indigo-500/30 shadow-lg">
                    {(['All', 'Pending', 'Completed'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`
                                px-5 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 cursor-pointer
                                ${filter === f
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                                }
                            `}
                            aria-label={`Filter by ${f}`}
                            aria-pressed={filter === f}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4">
                {filteredTasks.length === 0 ? (
                    <div className="text-center py-16 bg-slate-800/40 backdrop-blur-xl rounded-2xl border-2 border-dashed border-indigo-500/30 animate-fade-in">
                        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-indigo-500/10 mb-4 border border-indigo-500/30">
                            <ListTodo className="h-10 w-10 text-indigo-400" />
                        </div>
                        <p className="text-slate-200 font-bold text-lg">No tasks found in this view.</p>
                        <p className="text-slate-400 text-sm mt-2">Add a new task to get started!</p>
                    </div>
                ) : (
                    filteredTasks.map((task, index) => (
                        <div key={task.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                            <TaskItem
                                task={task}
                                onToggle={onToggleTask}
                                onDelete={onDeleteTask}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
