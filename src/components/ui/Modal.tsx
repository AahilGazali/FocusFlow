
"use client";

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop - Matching main page background, below header */}
            <div 
                className="fixed inset-x-0 top-24 bottom-0 z-[10000] animate-fade-in"
                style={{
                    background: '#0a0a0f',
                    backgroundImage: `
                        radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.15) 0px, transparent 50%),
                        radial-gradient(at 100% 0%, rgba(168, 85, 247, 0.15) 0px, transparent 50%),
                        radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.15) 0px, transparent 50%),
                        radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.15) 0px, transparent 50%)
                    `,
                    backgroundAttachment: 'fixed'
                }}
                onClick={onClose}
            />
            {/* Subtle overlay for modal focus */}
            <div 
                className="fixed inset-x-0 top-24 bottom-0 bg-slate-900/40 backdrop-blur-sm z-[10000]"
                onClick={onClose}
            />
            
            {/* Modal Container - Properly centered with header spacing */}
            <div 
                className="fixed inset-x-0 top-24 bottom-0 z-[10002] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
                style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
            >
                {/* Modal */}
                <div 
                    className={cn(
                        "relative bg-slate-800/98 backdrop-blur-xl border-2 border-indigo-500/50 rounded-2xl shadow-2xl shadow-indigo-500/40 max-w-lg w-full overflow-hidden pointer-events-auto animate-fade-in flex flex-col",
                        className
                    )}
                    onClick={(e) => e.stopPropagation()}
                    style={{ 
                        maxHeight: 'calc(100vh - 8rem)',
                        margin: 'auto'
                    }}
                >
                    {title && (
                        <div className="p-6 border-b border-indigo-500/30 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 shrink-0">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                    {title}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="h-9 w-9 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/70 transition-colors border border-slate-600/50 hover:border-slate-500"
                                    aria-label="Close"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="p-6 overflow-y-auto custom-scrollbar flex-1 min-h-0">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
