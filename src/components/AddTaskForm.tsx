
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
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5 text-indigo-600" />
                    New Task
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            What do you need to study?
                        </label>
                        <Input
                            placeholder="e.g. Complete Algebra Chapter 5"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Subject</label>
                            <Input
                                placeholder="Math"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                icon={<BookOpen className="h-4 w-4" />}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Deadline</label>
                            <Input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                icon={<Calendar className="h-4 w-4" />}
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full mt-2">
                        Add to List
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
