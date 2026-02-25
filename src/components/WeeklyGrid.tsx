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
            className="w-full h-full flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-7 gap-4 md:gap-3 2xl:gap-6 pb-20 lg:pb-0"
        >
            {dates.map((day, dayIndex) => (
                <div
                    key={day.name}
                    className={clsx(
                        "rounded-2xl p-4 md:p-3 2xl:p-4 flex flex-col gap-2 2xl:gap-4 border transition-all h-full flex-shrink-0 snap-center min-w-[85vw] md:min-w-[45vw] lg:min-w-0",
                        hasBackground ? "backdrop-blur-sm" : "",
                        day.isToday
                            ? clsx(
                                hasBackground ? "bg-slate-800/80 dark:bg-emerald-900/30" : "bg-slate-800 dark:bg-emerald-900/10",
                                "border-slate-700 dark:border-emerald-500/20 shadow-xl shadow-slate-300 dark:shadow-none ring-1 ring-slate-200/50 dark:ring-emerald-500/20 z-10"
                            )
                            : clsx(
                                hasBackground ? "bg-white/70 dark:bg-slate-900/70" : "bg-white dark:bg-slate-900",
                                "border-slate-100 dark:border-slate-800"
                            )
                    )}
                >
                    {/* Column Header */}
                    <div className="mb-1 2xl:mb-2 text-center border-b border-dashed border-slate-200/20 pb-1">
                        <p className={clsx(
                            "text-[10px] md:text-xs 2xl:text-base font-bold uppercase tracking-wider",
                            day.isToday ? "text-emerald-400" : "text-slate-500 dark:text-slate-400"
                        )}>
                            {day.name}, {day.date} de {day.month}
                        </p>
                    </div>

                    {/* Meal Slots */}
                    <div className="flex-1 flex flex-col gap-2 2xl:gap-4">
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
                                <div key={mealType} className="flex flex-col gap-1 2xl:gap-2">
                                    <span className={clsx(
                                        "text-[9px] 2xl:text-xs font-black uppercase tracking-widest opacity-60",
                                        day.isToday ? "text-slate-400" : "text-slate-400 dark:text-slate-500"
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
