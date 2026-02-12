
"use client";

import { useState, useEffect } from 'react';
import { TaskType } from '@/lib/types';
import { DashboardStats } from '@/components/DashboardStats';
import { AddTaskForm } from '@/components/AddTaskForm';
import { TaskList } from '@/components/TaskList';
import { PomodoroTimer } from '@/components/PomodoroTimer';
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

  if (!hasLoaded) return null;

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 transition-all">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">FocusFlow</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-sm font-medium border border-slate-200">
              S
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back!</h2>
            <p className="text-slate-500 mt-1">Ready to focus and conquer your tasks today?</p>
          </div>
          <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
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
            <div className="sticky top-24 space-y-8">
              <PomodoroTimer />

              <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-xl p-6 text-white text-center shadow-lg">
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-2">Daily Motivation</p>
                <p className="text-lg font-medium italic">"{quote.text}"</p>
                <p className="text-indigo-300 text-sm mt-2">- {quote.author}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
