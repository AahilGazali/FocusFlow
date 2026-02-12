
"use client";

import React from 'react';
import { Modal } from './ui/Modal';
import { CheckCircle2, Clock, BarChart3, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="ℹ️ About FocusFlow">
            <div className="space-y-6">
                {/* App Info */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
                        <CheckCircle2 className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                        FocusFlow v1.0
                    </h3>
                    <p className="text-slate-300">
                        A productivity app to help you stay focused and organized.
                    </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                    <h4 className="font-semibold text-slate-200 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-indigo-400" />
                        Features
                    </h4>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-4 bg-slate-700/50 rounded-xl border border-indigo-500/20">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                            <div>
                                <p className="font-medium text-slate-200">Task Management</p>
                                <p className="text-sm text-slate-400">Organize and track your study tasks with ease</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-slate-700/50 rounded-xl border border-indigo-500/20">
                            <Clock className="h-5 w-5 text-indigo-400 mt-0.5 shrink-0" />
                            <div>
                                <p className="font-medium text-slate-200">Pomodoro Timer</p>
                                <p className="text-sm text-slate-400">Stay focused with customizable focus and break sessions</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-slate-700/50 rounded-xl border border-indigo-500/20">
                            <BarChart3 className="h-5 w-5 text-purple-400 mt-0.5 shrink-0" />
                            <div>
                                <p className="font-medium text-slate-200">Progress Tracking</p>
                                <p className="text-sm text-slate-400">Monitor your productivity with detailed statistics</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="pt-4 border-t border-indigo-500/20 space-y-2">
                    <p className="text-sm text-slate-400 text-center">
                        Built with Next.js, React, and Tailwind CSS
                    </p>
                    <p className="text-xs text-slate-500 text-center">
                        © 2026 FocusFlow. All rights reserved.
                    </p>
                </div>

                {/* Close Button */}
                <Button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                >
                    Got it!
                </Button>
            </div>
        </Modal>
    );
}
