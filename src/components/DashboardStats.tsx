
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { TaskType } from '@/lib/types';
import { CheckCircle2, ListTodo, CalendarClock, Activity } from 'lucide-react';
import { format } from 'date-fns';

interface DashboardStatsProps {
    tasks: TaskType[];
}

export function DashboardStats({ tasks }: DashboardStatsProps) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const today = format(new Date(), 'yyyy-MM-dd');
    const todaysTasks = tasks.filter((t) => t.deadline === today);
    const todaysCompleted = todaysTasks.filter((t) => t.completed).length;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Focus</CardTitle>
                    <ListTodo className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalTasks}</div>
                    <p className="text-xs text-slate-500">
                        {pendingTasks} pending tasks
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{completedTasks}</div>
                    <p className="text-xs text-slate-500">
                        {progress}% completion rate
                    </p>
                    <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Today's Plan</CardTitle>
                    <CalendarClock className="h-4 w-4 text-indigo-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{todaysTasks.length}</div>
                    <p className="text-xs text-slate-500">
                        {todaysCompleted} finished today
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Productivity</CardTitle>
                    <Activity className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Good</div>
                    <p className="text-xs text-slate-500">Keep up the momentum!</p>
                </CardContent>
            </Card>
        </div>
    );
}
