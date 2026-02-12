
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { User, Settings, Trash2, Download, Upload, BarChart3, HelpCircle, X } from 'lucide-react';
import { TaskType } from '@/lib/types';
import { SettingsModal } from './SettingsModal';
import { AboutModal } from './AboutModal';
import { ConfirmModal } from './ConfirmModal';
import { Toast } from './Toast';

export function ProfileDropdown({ tasks, onClearAllTasks, onExportTasks, onImportTasks }: ProfileDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [showConfirmClear, setShowConfirmClear] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
        message: '',
        type: 'success',
        isVisible: false
    });
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const handleExport = () => {
        onExportTasks();
        setIsOpen(false);
    };

    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const importedTasks = JSON.parse(event.target?.result as string);
                        if (Array.isArray(importedTasks)) {
                            onImportTasks(importedTasks);
                            setToast({ message: 'Tasks imported successfully!', type: 'success', isVisible: true });
                        } else {
                            setToast({ message: 'Invalid file format', type: 'error', isVisible: true });
                        }
                    } catch (error) {
                        setToast({ message: 'Error importing tasks', type: 'error', isVisible: true });
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
        setIsOpen(false);
    };

    const handleClearAll = () => {
        setShowConfirmClear(true);
        setIsOpen(false);
    };

    const handleConfirmClear = () => {
        onClearAllTasks();
        setShowConfirmClear(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm flex items-center justify-center text-indigo-400 text-lg font-bold border border-indigo-500/30 shadow-lg hover:bg-indigo-500/30 hover:border-indigo-500/50 transition-all duration-200 hover:scale-110 cursor-pointer relative z-50"
                aria-label="User profile"
                title="Profile & Settings"
            >
                S
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsOpen(false)}
                    />
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-14 w-80 bg-slate-800/95 backdrop-blur-xl border border-indigo-500/30 rounded-2xl shadow-2xl shadow-indigo-500/20 z-50 overflow-hidden animate-fade-in">
                        {/* Header */}
                        <div className="p-4 border-b border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                        <User className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-200">Profile</h3>
                                        <p className="text-xs text-slate-400">Settings & Stats</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="p-4 border-b border-indigo-500/20">
                            <div className="flex items-center gap-2 mb-3">
                                <BarChart3 className="h-4 w-4 text-indigo-400" />
                                <span className="text-sm font-semibold text-slate-300">Your Stats</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-slate-700/50 rounded-lg p-2 text-center">
                                    <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                        {totalTasks}
                                    </div>
                                    <div className="text-xs text-slate-400">Total</div>
                                </div>
                                <div className="bg-slate-700/50 rounded-lg p-2 text-center">
                                    <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                                        {completedTasks}
                                    </div>
                                    <div className="text-xs text-slate-400">Done</div>
                                </div>
                                <div className="bg-slate-700/50 rounded-lg p-2 text-center">
                                    <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                        {completionRate}%
                                    </div>
                                    <div className="text-xs text-slate-400">Rate</div>
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                            <button
                                onClick={handleExport}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition-all duration-200 group"
                            >
                                <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">Export Tasks</span>
                            </button>

                            <button
                                onClick={handleImport}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition-all duration-200 group"
                            >
                                <Upload className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">Import Tasks</span>
                            </button>

                            <div className="h-px bg-indigo-500/20 my-2" />

                            <button
                                onClick={handleClearAll}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
                            >
                                <Trash2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">Clear All Tasks</span>
                            </button>

                            <div className="h-px bg-indigo-500/20 my-2" />

                            <button
                                onClick={() => {
                                    setShowSettings(true);
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition-all duration-200 group"
                            >
                                <Settings className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">Settings</span>
                            </button>

                            <button
                                onClick={() => {
                                    setShowAbout(true);
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition-all duration-200 group"
                            >
                                <HelpCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">About</span>
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Modals */}
            <SettingsModal 
                isOpen={showSettings} 
                onClose={() => setShowSettings(false)} 
            />
            <AboutModal 
                isOpen={showAbout} 
                onClose={() => setShowAbout(false)} 
            />
            <ConfirmModal
                isOpen={showConfirmClear}
                onClose={() => setShowConfirmClear(false)}
                onConfirm={handleConfirmClear}
                title="Clear All Tasks"
                message="Are you sure you want to clear all tasks? This action cannot be undone."
                confirmText="Clear All"
                cancelText="Cancel"
                variant="danger"
            />
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast({ ...toast, isVisible: false })}
            />
        </div>
    );
}
