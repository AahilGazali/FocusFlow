
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="group relative overflow-hidden border border-indigo-500/30 bg-slate-800/60 backdrop-blur-xl shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/30 transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/50">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-500/10 transition-all duration-500"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                    <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Focus</CardTitle>
                    <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 group-hover:bg-indigo-500/30 transition-colors">
                        <ListTodo className="h-5 w-5 text-indigo-400" />
                    </div>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
                        {totalTasks}
                    </div>
                    <p className="text-sm text-slate-400 font-medium">
                        {pendingTasks} pending tasks
                    </p>
                </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border border-emerald-500/30 bg-slate-800/60 backdrop-blur-xl shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/30 transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/50">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-emerald-500/10 transition-all duration-500"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                    <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed</CardTitle>
                    <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 group-hover:bg-emerald-500/30 transition-colors">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    </div>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-3">
                        {completedTasks}
                    </div>
                    <p className="text-sm text-slate-400 font-medium mb-3">
                        {progress}% completion rate
                    </p>
                    <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700 ease-out shadow-lg shadow-emerald-500/50"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border border-purple-500/30 bg-slate-800/60 backdrop-blur-xl shadow-xl shadow-purple-500/10 hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-1 hover:border-purple-500/50">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-purple-500/10 transition-all duration-500"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                    <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Plan</CardTitle>
                    <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/30 group-hover:bg-purple-500/30 transition-colors">
                        <CalendarClock className="h-5 w-5 text-purple-400" />
                    </div>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                        {todaysTasks.length}
                    </div>
                    <p className="text-sm text-slate-400 font-medium">
                        {todaysCompleted} finished today
                    </p>
                </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border border-orange-500/30 bg-slate-800/60 backdrop-blur-xl shadow-xl shadow-orange-500/10 hover:shadow-orange-500/30 transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/50">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-orange-500/10 transition-all duration-500"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                    <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Productivity</CardTitle>
                    <div className="h-10 w-10 rounded-lg bg-orange-500/20 flex items-center justify-center border border-orange-500/30 group-hover:bg-orange-500/30 transition-colors">
                        <Activity className="h-5 w-5 text-orange-400" />
                    </div>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-2">
                        Good
                    </div>
                    <p className="text-sm text-slate-400 font-medium">Keep up the momentum!</p>
                </CardContent>
            </Card>
        </div>
    );
}
