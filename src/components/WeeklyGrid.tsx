import clsx from 'clsx';
import { motion } from 'framer-motion';
import { MenuCard } from './MenuCard';
import type { Recipe } from '../types';


import { useMenuStore } from '../store/useMenuStore';

const MEALS = ['Desayuno', 'Media Mañana', 'Comida', 'Cena'];

interface WeeklyGridProps {
    dates: {
        name: string;
        date: number;
        month: string;
        isToday: boolean;
    }[];
    getRecipeForSlot: (dayIndex: number, mealIndex: number) => Recipe | null;
    hasBackground?: boolean;
    isGhostMode?: boolean;
}

export const WeeklyGrid = ({ dates, getRecipeForSlot, hasBackground, isGhostMode = false }: WeeklyGridProps) => {
    const setSelectedRecipe = useMenuStore((state) => state.setSelectedRecipe);

    return (
        <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full flex-1 h-full flex overflow-x-auto hide-scrollbar snap-x snap-mandatory lg:grid lg:grid-cols-7 gap-4 md:gap-3 2xl:gap-3 2xl:pb-0 pb-20 lg:pb-0"
        >
            {dates.map((day, dayIndex) => (
                <div
                    key={day.name}
                    className={clsx(
                        "rounded-xl flex flex-col transition-all h-full min-h-0 flex-shrink-0 snap-center min-w-[85vw] md:min-w-[45vw] lg:min-w-0",
                        // Fluid padding and gaps
                        "p-3 gap-2", // Default (Mobile)
                        "lg:p-2 lg:gap-2", // 1080p
                        "xl:p-3 xl:gap-3", // 1440p
                        "2xl:p-4 2xl:gap-4", // 4K+
                        hasBackground ? "backdrop-blur-sm" : "",
                        day.isToday
                            ? clsx(
                                hasBackground ? "bg-slate-800/90 dark:bg-slate-800/90" : "bg-[#2A344A] dark:bg-[#2A344A]", // Darker blue-slate for today
                                "shadow-xl z-10"
                            )
                            : clsx(
                                hasBackground ? "bg-white/80 dark:bg-slate-800/80" : "bg-[#DEE4F0] dark:bg-[#344054]", // Light slate-blue for other days
                                "border-transparent"
                            )
                    )}
                >
                    {/* Column Header */}
                    <div className="flex-shrink-0 mb-1 lg:mb-1 xl:mb-2 2xl:mb-4 text-center border-b border-solid border-slate-300/50 dark:border-slate-700 pb-1 lg:pb-1 xl:pb-2 2xl:pb-3 mt-1">
                        <p className={clsx(
                            "font-bold uppercase tracking-wider",
                            "text-[10px] md:text-xs", // Mobile
                            "lg:text-[9px]", // 1080p
                            "xl:text-xs", // 1440p
                            "2xl:text-sm", // 4K+
                            day.isToday ? "text-emerald-400" : "text-slate-600 dark:text-slate-400"
                        )}>
                            {day.name}, {day.date} de {day.month}
                        </p>
                    </div>

                    {/* Meal Slots */}
                    <div className="flex-1 flex flex-col gap-3 lg:gap-2 xl:gap-3 2xl:gap-6">
                        {MEALS.map((mealType, mealIndex) => {
                            const recipe = getRecipeForSlot(dayIndex, mealIndex);

                            if (isGhostMode) {
                                return (
                                    <div key={mealType} className="flex flex-col gap-1 2xl:gap-2">
                                        <span className={clsx(
                                            "text-[9px] 2xl:text-xs font-black uppercase tracking-widest opacity-60",
                                            day.isToday ? "text-slate-400" : "text-slate-400 dark:text-slate-500"
                                        )}>
                                            {mealType === 'Media Mañana' ? 'Snack' : mealType}
                                        </span>
                                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl h-16 md:h-20 lg:h-24 w-full opacity-60 flex items-center justify-center">
                                            {/* Ghost Slot Placeholder */}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div key={mealType} className="flex flex-col gap-1 lg:gap-1 xl:gap-1.5 2xl:gap-3">
                                    <span className={clsx(
                                        "font-black uppercase tracking-wide",
                                        "text-[10px]", // Mobile
                                        "lg:text-[8px]", // 1080p
                                        "xl:text-[9px]", // 1440p
                                        "2xl:text-sm", // 4K+
                                        day.isToday ? "text-emerald-400/80" : "text-slate-500/80 dark:text-slate-400"
                                    )}>
                                        {mealType === 'Media Mañana' ? 'Snack' : mealType}
                                    </span>

                                    <MenuCard
                                        recipe={recipe}
                                        isDark={day.isToday}
                                        onClick={() => recipe && setSelectedRecipe(recipe)}
                                    />

                                    {/* Side Items - Additional Intake */}
                                    {mealType === 'Desayuno' && (
                                        <MenuCard
                                            customItem={{ name: 'Café solo / Té', emoji: '☕', tag: 'Bebida' }}
                                            isDark={day.isToday}
                                        />
                                    )}
                                    {mealType === 'Comida' && (
                                        <MenuCard
                                            customItem={{ name: 'Pieza de fruta', emoji: '🍎', tag: 'Postre' }}
                                            isDark={day.isToday}
                                        />
                                    )}
                                    {mealType === 'Cena' && (
                                        <MenuCard
                                            customItem={{ name: 'Yogur o fruta', emoji: '🥣', tag: 'Postre' }}
                                            isDark={day.isToday}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </motion.div>
    );
};
