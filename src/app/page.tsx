
"use client";

import { useState, useEffect } from 'react';
import { TaskType } from '@/lib/types';
import { DashboardStats } from '@/components/DashboardStats';
import { AddTaskForm } from '@/components/AddTaskForm';
import { TaskList } from '@/components/TaskList';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { ProfileDropdown } from '@/components/ProfileDropdown';
import { Button } from '@/components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

const QUOTES = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "It always seems impossible until it is done.", author: "Nelson Mandela" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" }
];

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    const saved = localStorage.getItem('focus-flow-tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse tasks", e);
      }
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem('focus-flow-tasks', JSON.stringify(tasks));
    }
  }, [tasks, hasLoaded]);

  const addTask = (newTask: Omit<TaskType, 'id' | 'createdAt' | 'completed'>) => {
    const task: TaskType = {
      ...newTask,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      completed: false,
    };
    setTasks([task, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `focusflow-tasks-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importTasks = (importedTasks: TaskType[]) => {
    setTasks(importedTasks);
  };

  if (!hasLoaded) return null;

  return (
    <main className="min-h-screen pb-20 relative">
      {/* Animated grid background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className="relative bg-slate-900/40 backdrop-blur-2xl border-b border-indigo-500/20 sticky top-0 z-[10003] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-50 animate-glow"></div>
              <div className="relative h-14 w-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/50 transition-transform hover:scale-110 hover:rotate-3">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 tracking-tight">
                FocusFlow
              </h1>
              <p className="text-xs text-slate-400 -mt-1 font-medium">Your Study Companion</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ProfileDropdown
              tasks={tasks}
              onClearAllTasks={clearAllTasks}
              onExportTasks={exportTasks}
              onImportTasks={importTasks}
            />
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">

        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 tracking-tight">
              Welcome back!
            </h2>
            <p className="text-xl text-slate-300 font-medium">Ready to focus and conquer your tasks today?</p>
          </div>
          <div className="text-sm font-semibold text-indigo-300 bg-slate-800/60 backdrop-blur-xl px-6 py-3 rounded-xl border border-indigo-500/30 shadow-lg shadow-indigo-500/10">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </section>

        {/* Dashboard Stats */}
        <DashboardStats tasks={tasks} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Tasks */}
          <div className="lg:col-span-2 space-y-8">
            <AddTaskForm onAddTask={addTask} />
            <TaskList
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          </div>

          {/* Sidebar: Timer */}
          <div className="space-y-8">
            <div className="sticky top-28 space-y-8">
              <PomodoroTimer />

              <div className="border border-purple-500/30 bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 text-center shadow-xl shadow-purple-500/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-50"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Daily Motivation</span>
                  </div>
                  <p className="text-xl font-semibold italic leading-relaxed mb-3 text-slate-200">"{quote.text}"</p>
                  <p className="text-slate-400 text-sm font-medium">- {quote.author}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
