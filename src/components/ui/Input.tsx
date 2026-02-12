
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, icon, ...props }, ref) => {
        return (
            <div className="relative">
                <input
                    ref={ref}
                    className={cn(
                        'flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        icon && 'pl-10',
                        className
                    )}
                    {...props}
                />
                {icon && (
                    <div className="absolute left-3 top-2.5 text-slate-400">
                        {icon}
                    </div>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
