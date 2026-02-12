
"use client";

import { useState, useEffect } from 'react';
import { TaskType } from '@/lib/types';
import { DashboardStats } from '@/components/DashboardStats';
import { AddTaskForm } from '@/components/AddTaskForm';
import { TaskList } from '@/components/TaskList';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { ProfileModal } from '@/components/ProfileModal';
import { SettingsModal } from '@/components/SettingsModal';
import { AchievementsModal } from '@/components/AchievementsModal';
import { Sparkles, Terminal, User, Settings, LogOut, Trophy } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [achievementsModalOpen, setAchievementsModalOpen] = useState(false);

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
    <main className="min-h-screen relative selection:bg-indigo-500/30 selection:text-indigo-200 overflow-hidden font-sans text-slate-200">

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[128px] mix-blend-screen animate-pulse duration-[4s]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px] mix-blend-screen animate-pulse duration-[7s]" />
      </div>

      {/* Header */}
      <header className="fixed w-full z-50 backdrop-blur-xl bg-slate-900/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center border border-indigo-500/50">
                <Terminal className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white">
                Focus<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Flow</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold border border-emerald-500/20 uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              System Online
            </div>
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[1px] cursor-pointer hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white">
                  AH
                </div>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden z-50 backdrop-blur-3xl"
                  >
                    <div className="p-4 border-b border-white/5 bg-indigo-500/10">
                      <p className="text-sm font-bold text-white">Aahil Gazali</p>
                      <p className="text-xs text-indigo-300 font-medium mt-0.5">Level 5 Scholar</p>
                    </div>

                    <div className="p-2 space-y-1">
                      <button
                        onClick={() => {
                          setProfileModalOpen(true);
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          setAchievementsModalOpen(true);
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left"
                      >
                        <Trophy className="h-4 w-4" />
                        Achievements
                      </button>
                      <button
                        onClick={() => {
                          setSettingsModalOpen(true);
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32 space-y-12">

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
          <div className="space-y-2">
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-[0.9]">
              Deploy your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                potential.
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl font-medium">
              Advanced task orchestration for focused minds.
            </p>
          </div>
          <div className="text-xs font-bold text-indigo-300 bg-indigo-500/10 px-4 py-2 rounded-lg border border-indigo-500/20 uppercase tracking-widest">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </section>

        {/* Dashboard Stats */}
        <DashboardStats tasks={tasks} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12 icon-theme-dark">

          {/* Main Content: Tasks */}
          <div className="xl:col-span-2 space-y-8">
            <AddTaskForm onAddTask={addTask} />
            <TaskList
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          </div>

          {/* Sidebar: Timer & Widgets */}
          <div className="space-y-6 xl:sticky xl:top-32 h-fit">
            <PomodoroTimer />

            {/* Quote Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500" />
              <div className="relative bg-slate-900 rounded-2xl p-8 border border-white/10 shadow-2xl">
                <div className="absolute top-0 right-0 p-24 bg-purple-500/10 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none" />

                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    Neural Stimulus
                  </div>
                  <p className="text-xl md:text-2xl font-bold font-serif italic leading-relaxed text-slate-200 mb-6">
                    "{quote.text}"
                  </p>
                  <div className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    — {quote.author}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modals */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        tasks={tasks}
      />
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />
      <AchievementsModal
        isOpen={achievementsModalOpen}
        onClose={() => setAchievementsModalOpen(false)}
        tasks={tasks}
      />
    </main>
  );
}
