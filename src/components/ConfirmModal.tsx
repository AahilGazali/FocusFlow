
"use client";

import React from 'react';
import { Modal } from './ui/Modal';
import { AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger'
}: ConfirmModalProps) {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const variantStyles = {
        danger: 'text-red-400 bg-red-500/10 border-red-500/30',
        warning: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
        info: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="space-y-6">
                <div className={`flex items-start gap-4 p-4 rounded-xl border ${variantStyles[variant]}`}>
                    <AlertTriangle className="h-6 w-6 shrink-0 mt-0.5" />
                    <p className="text-slate-200 leading-relaxed">{message}</p>
                </div>

                <div className="flex gap-3">
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                        {cancelText}
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        variant={variant === 'danger' ? 'danger' : 'primary'}
                        className={`flex-1 ${
                            variant === 'danger' 
                                ? 'bg-red-500 hover:bg-red-600' 
                                : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                        }`}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
