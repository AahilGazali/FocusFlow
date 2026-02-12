
"use client";

import React, { useState, useEffect } from 'react';
import { Modal } from './ui/Modal';
import { Bell, Clock, Palette, Moon, Sun } from 'lucide-react';
import { Button } from './ui/Button';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [focusDuration, setFocusDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);

    useEffect(() => {
        // Load saved settings from localStorage
        const savedNotifications = localStorage.getItem('focusflow-notifications');
        const savedFocusDuration = localStorage.getItem('focusflow-focus-duration');
        const savedBreakDuration = localStorage.getItem('focusflow-break-duration');
        
        if (savedNotifications !== null) {
            setNotificationsEnabled(savedNotifications === 'true');
        }
        if (savedFocusDuration) {
            setFocusDuration(parseInt(savedFocusDuration, 10));
        }
        if (savedBreakDuration) {
            setBreakDuration(parseInt(savedBreakDuration, 10));
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('focusflow-notifications', notificationsEnabled.toString());
        localStorage.setItem('focusflow-focus-duration', focusDuration.toString());
        localStorage.setItem('focusflow-break-duration', breakDuration.toString());
        // Dispatch custom event to notify timer component
        window.dispatchEvent(new Event('focusflow-settings-changed'));
        onClose();
    };

    const requestNotificationPermission = async () => {
        if ('Notification' in window && Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                setNotificationsEnabled(true);
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="⚙️ Settings">
            <div className="space-y-6">
                {/* Notifications */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-indigo-400" />
                        <h3 className="font-semibold text-slate-200">Notifications</h3>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl border border-indigo-500/20">
                        <div>
                            <p className="text-slate-200 font-medium">Enable Notifications</p>
                            <p className="text-sm text-slate-400">Get notified when timer sessions complete</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notificationsEnabled}
                                onChange={(e) => {
                                    if (e.target.checked && 'Notification' in window && Notification.permission === 'default') {
                                        requestNotificationPermission();
                                    } else {
                                        setNotificationsEnabled(e.target.checked);
                                    }
                                }}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                        </label>
                    </div>
                </div>

                {/* Timer Settings */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-indigo-400" />
                        <h3 className="font-semibold text-slate-200">Timer Settings</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-700/50 rounded-xl border border-indigo-500/20">
                            <label className="block text-slate-200 font-medium mb-2">
                                Focus Duration (minutes)
                            </label>
                            <input
                                type="number"
                                min="5"
                                max="60"
                                value={focusDuration}
                                onChange={(e) => setFocusDuration(Math.max(5, Math.min(60, parseInt(e.target.value) || 25)))}
                                className="w-full px-4 py-2 bg-slate-600 border border-indigo-500/30 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="p-4 bg-slate-700/50 rounded-xl border border-indigo-500/20">
                            <label className="block text-slate-200 font-medium mb-2">
                                Break Duration (minutes)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="30"
                                value={breakDuration}
                                onChange={(e) => setBreakDuration(Math.max(1, Math.min(30, parseInt(e.target.value) || 5)))}
                                className="w-full px-4 py-2 bg-slate-600 border border-indigo-500/30 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-indigo-500/20">
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                    >
                        Save Settings
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
