"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Moon, Sun, Bell, Volume2, VolumeX, Check } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [notifications, setNotifications] = useState(true);
    const [sound, setSound] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Load settings from localStorage on mount
    useEffect(() => {
        const savedNotifications = localStorage.getItem('focusflow-notifications');
        const savedSound = localStorage.getItem('focusflow-sound');
        const savedDarkMode = localStorage.getItem('focusflow-darkmode');

        if (savedNotifications !== null) setNotifications(savedNotifications === 'true');
        if (savedSound !== null) setSound(savedSound === 'true');
        if (savedDarkMode !== null) setDarkMode(savedDarkMode === 'true');
    }, []);

    const showToastMessage = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const handleNotificationsToggle = () => {
        const newValue = !notifications;
        setNotifications(newValue);
        localStorage.setItem('focusflow-notifications', String(newValue));
        showToastMessage(newValue ? 'Notifications enabled ✓' : 'Notifications disabled');

        if (newValue) {
            // Request notification permission
            if ('Notification' in window && Notification.permission === 'default') {
                Notification.requestPermission();
            }
        }
    };

    const handleSoundToggle = () => {
        const newValue = !sound;
        setSound(newValue);
        localStorage.setItem('focusflow-sound', String(newValue));
        showToastMessage(newValue ? 'Sound effects enabled ✓' : 'Sound effects disabled');

        // Play a test sound if enabling
        if (newValue) {
            try {
                const audio = new Audio('/notification.mp3');
                audio.volume = 0.3;
                audio.play().catch(() => { });
            } catch (e) {
                // Ignore
            }
        }
    };

    const handleDarkModeToggle = () => {
        const newValue = !darkMode;
        setDarkMode(newValue);
        localStorage.setItem('focusflow-darkmode', String(newValue));
        showToastMessage(newValue ? 'Dark mode enabled ✓' : 'Light mode enabled ✓');

        // Apply theme change to document
        if (newValue) {
            document.documentElement.classList.add('dark');
            document.body.style.background = 'linear-gradient(to bottom right, #0f172a, #1e1b4b)';
        } else {
            document.documentElement.classList.remove('dark');
            document.body.style.background = 'linear-gradient(to bottom right, #f8fafc, #e0e7ff)';
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-md bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                >
                    <div className="relative p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-b border-white/5">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <X className="h-5 w-5 text-white" />
                        </button>

                        <h2 className="text-2xl font-bold text-white">Settings</h2>
                        <p className="text-slate-400 text-sm mt-1">Customize your experience</p>
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Preferences</h3>

                            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    {darkMode ? <Moon className="h-5 w-5 text-indigo-400" /> : <Sun className="h-5 w-5 text-yellow-400" />}
                                    <div>
                                        <p className="text-sm font-medium text-white">Dark Mode</p>
                                        <p className="text-xs text-slate-400">{darkMode ? 'Currently enabled' : 'Currently disabled'}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleDarkModeToggle}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-indigo-600' : 'bg-slate-600'
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Bell className="h-5 w-5 text-purple-400" />
                                    <div>
                                        <p className="text-sm font-medium text-white">Notifications</p>
                                        <p className="text-xs text-slate-400">Task reminders & alerts</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleNotificationsToggle}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-purple-600' : 'bg-slate-600'
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    {sound ? <Volume2 className="h-5 w-5 text-emerald-400" /> : <VolumeX className="h-5 w-5 text-slate-400" />}
                                    <div>
                                        <p className="text-sm font-medium text-white">Sound Effects</p>
                                        <p className="text-xs text-slate-400">Timer completion sounds</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSoundToggle}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${sound ? 'bg-emerald-600' : 'bg-slate-600'
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${sound ? 'translate-x-6' : 'translate-x-0'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <p className="text-xs text-slate-500 text-center">
                                FocusFlow v1.0 • Made with ❤️ by Aahil
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 border border-white/10 rounded-xl px-6 py-3 shadow-2xl flex items-center gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <Check className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-white font-medium">{toastMessage}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
