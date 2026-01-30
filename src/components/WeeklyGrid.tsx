import clsx from 'clsx';
import { motion } from 'framer-motion';
import { MenuCard } from './MenuCard';
import type { Recipe } from '../types';


const MEALS = ['Desayuno', 'Media Mañana', 'Comida', 'Cena'];

interface WeeklyGridProps {
    dates: {
        name: string;
        date: number;
        month: string;
        isToday: boolean;
    }[];
    getRecipeForSlot: (dayIndex: number, mealIndex: number) => Recipe | null;
}

export const WeeklyGrid = ({ dates, getRecipeForSlot }: WeeklyGridProps) => {
    return (
        <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-w-[1000px] xl:min-w-0 xl:w-full h-full grid grid-cols-7 gap-3 2xl:gap-6"
        >
            {dates.map((day, dayIndex) => (
                <div
                    key={day.name}
                    className={clsx(
                        "rounded-2xl p-3 2xl:p-5 flex flex-col gap-3 2xl:gap-6 border transition-all h-full",
                        day.isToday
                            ? "bg-slate-800 border-slate-700 shadow-2xl shadow-slate-300 ring-4 ring-slate-200/50 scale-[1.01] z-10"
                            : "bg-white border-slate-100 hover:shadow-lg hover:border-slate-200"
                    )}
                >
                    {/* Column Header */}
                    <div className="mb-1 2xl:mb-4 text-center">
                        <p className={clsx(
                            "text-[10px] 2xl:text-sm font-bold uppercase tracking-wider mb-1",
                            day.isToday ? "text-emerald-400" : "text-slate-500"
                        )}>
                            {day.name} {day.date}
                        </p>
                        <h3 className={clsx(
                            "text-xs 2xl:text-xl font-black uppercase tracking-widest",
                            day.isToday ? "text-white" : "text-slate-900"
                        )}>
                            Desayuno
                        </h3>
                    </div>

                    {/* Meal Slots */}
                    <div className="flex-1 flex flex-col gap-3 2xl:gap-5">
                        {MEALS.map((mealType, mealIndex) => {
                            const recipe = getRecipeForSlot(dayIndex, mealIndex);
                            return (
                                <div key={mealType} className="flex flex-col gap-1 2xl:gap-2">
                                    {mealIndex > 0 && (
                                        <span className={clsx(
                                            "text-[9px] 2xl:text-xs font-black uppercase tracking-widest opacity-60",
                                            day.isToday ? "text-slate-400" : "text-slate-400"
                                        )}>
                                            {mealType === 'Media Mañana' ? 'Snack' : mealType}
                                        </span>
                                    )}
                                    <MenuCard recipe={recipe} isDark={day.isToday} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </motion.div>
    );
};
