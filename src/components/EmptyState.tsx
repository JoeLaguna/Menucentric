import { motion } from 'framer-motion';
import { Divide as LucideIcon } from 'lucide-react';
import React from 'react';

interface EmptyStateProps {
    icon: React.ElementType;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center h-full min-h-[400px]">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300 relative"
            >
                <Icon size={48} strokeWidth={1.5} />
                <div className="absolute inset-0 rounded-full border border-slate-200 animate-pulse-slow"></div>
            </motion.div>

            <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-xl font-bold text-slate-800 mb-2"
            >
                {title}
            </motion.h3>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-slate-500 max-w-xs mb-8 leading-relaxed"
            >
                {description}
            </motion.p>

            {actionLabel && onAction && (
                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onAction}
                    className="bg-emerald-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-colors"
                >
                    {actionLabel}
                </motion.button>
            )}
        </div>
    );
};
