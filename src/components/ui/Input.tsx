
"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, icon, ...props }, ref) => {
        return (
            <div className="relative group">
                <motion.input
                    ref={ref}
                    whileFocus={{ scale: 1.01, borderColor: '#6366f1' }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                        'flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm group-hover:border-indigo-200',
                        icon && 'pl-11',
                        className
                    )}
                    {...props as any}
                />
                {icon && (
                    <div className="absolute left-4 top-3.5 text-slate-400 transition-colors group-focus-within:text-indigo-500">
                        {icon}
                    </div>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
