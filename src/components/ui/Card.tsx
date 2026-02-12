
import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <motion.div
        ref={ref}
        whileHover={{ y: -4, shadow: "0px 10px 30px -10px rgba(79, 70, 229, 0.15)" }}
        className={cn(
            'rounded-2xl border border-slate-100 bg-white/50 backdrop-blur-xl text-slate-950 shadow-md transition-all duration-300',
            className
        )}
        {...props as any}
    />
));
Card.displayName = 'Card';

export { Card };

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        {...props}
    />
));
CardHeader.displayName = 'CardHeader';

export { CardHeader };

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            'font-bold leading-none tracking-tight text-slate-900',
            className
        )}
        {...props}
    />
));
CardTitle.displayName = 'CardTitle';

export { CardTitle };

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export { CardContent };
