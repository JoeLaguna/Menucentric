import clsx from 'clsx';
import type { Recipe } from '../types';

interface MenuCardProps {
    recipe: Recipe | null;
    isDark?: boolean;
    onClick?: () => void;
}

export const MenuCard = ({ recipe, isDark, onClick }: MenuCardProps) => {
    if (!recipe) return <div className={clsx("h-16 2xl:h-24 rounded-xl border-2 border-dashed opacity-50", isDark ? "border-slate-600 bg-slate-700" : "border-slate-200 bg-slate-50")}></div>;

    return (
        <div
            onClick={onClick}
            className={clsx(
                "group flex items-center gap-2 md:gap-3 p-2 2xl:p-3 rounded-xl shadow-sm cursor-pointer transition-all duration-300",
                isDark
                    ? "bg-slate-700/50 hover:bg-slate-700 border border-slate-600"
                    : "bg-white hover:shadow-md border border-slate-100 hover:border-emerald-200"
            )}>
            <div className="relative overflow-hidden rounded-lg w-10 h-10 md:w-12 md:h-12 2xl:w-14 2xl:h-14 flex-shrink-0">
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            {/* Content Container - Takes remaining space */}
            <div className="min-w-0 flex-1 flex flex-col justify-center">
                <p className={clsx(
                    "font-bold leading-tight mb-0.5 break-words",
                    "text-[10px] md:text-[11px] 2xl:text-sm", // Reduced from text-base to text-sm for better fit
                    "line-clamp-2",
                    isDark ? "text-slate-100" : "text-slate-700"
                )}>
                    {recipe.name}
                </p>
                <p className={clsx(
                    "truncate font-medium",
                    "text-[9px] 2xl:text-xs",
                    isDark ? "text-slate-400" : "text-slate-400"
                )}>
                    {recipe.tags[0]}
                </p>
            </div>
        </div>
    )
}
