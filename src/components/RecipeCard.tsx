import React from 'react';
import { motion } from 'framer-motion';

interface RecipeCardProps {
    title: string;
    image: string;
    time: number;
    cost: 1 | 2 | 3;
    tags: string[];
    className?: string;
    onClick?: () => void;
}

export const RecipeCard = ({ title, image, time, cost, tags, className, onClick }: RecipeCardProps) => {
    // Logic for icon selection based on time
    const isQuick = time <= 5;
    const iconSrc = isQuick ? '/icons/hands.svg' : '/icons/Pot.svg';

    // Helper to render cost symbols
    const renderCost = (level: number) => {
        return (
            <span className="flex tracking-[1px]">
                {[...Array(3)].map((_, i) => (
                    <span key={i} className={i < level ? 'text-slate-700 font-bold' : 'text-slate-300'}
                    >
                        €
                    </span>
                ))}
            </span>
        );
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`
                bg-white rounded-[20px] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden
                border border-slate-100 flex flex-col
                ${className || ''}
            `}
        >
            {/* Image Container */}
            <div className="aspect-[5/4] w-full overflow-hidden relative bg-slate-100">
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1 line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-4 line-clamp-1">
                        {/* Clean up filename or use description if available, for now just tags/category */}
                        {tags.join(' · ')}
                    </p>
                </div>

                {/* Metadata Row */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    {/* Time & Effort */}
                    <div className="flex items-center gap-2" title={isQuick ? "Fácil y rápido" : "Requiere cocinado"}>
                        <img
                            src={iconSrc}
                            alt={isQuick ? "Hands" : "Pot"}
                            className="w-5 h-5 opacity-60"
                        />
                        <span className="text-sm font-semibold text-slate-600">{time} min</span>
                    </div>

                    <div className="w-px h-4 bg-slate-200 mx-2" />

                    {/* Cost */}
                    <div className="flex items-center" title="Coste estimado">
                        {renderCost(cost)}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
