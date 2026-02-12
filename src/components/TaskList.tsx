
import React, { useState } from 'react';
import { TaskType, FilterType } from '@/lib/types';
import { TaskItem } from './TaskItem';
import { Button } from '@/components/ui/Button';

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
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight text-slate-900">Studying Queue</h2>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    {(['All', 'Pending', 'Completed'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`
                px-3 py-1.5 text-sm font-medium rounded-md transition-all
                ${filter === f
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-900'
                                }
              `}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-3">
                {filteredTasks.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-xl border-dashed border-2 border-slate-200">
                        <p className="text-slate-500 text-sm">No tasks found in this view.</p>
                    </div>
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
            </div>
        </div>
    );
}
