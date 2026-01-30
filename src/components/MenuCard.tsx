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
                "group flex items-center gap-3 p-2 2xl:p-3 rounded-xl shadow-sm cursor-pointer transition-all duration-300",
                isDark
                    ? "bg-slate-700/50 hover:bg-slate-700 border border-slate-600"
                    : "bg-white hover:shadow-md border border-slate-100 hover:border-emerald-200"
            )}>
            <div className="relative overflow-hidden rounded-lg w-12 h-12 2xl:w-20 2xl:h-20 flex-shrink-0">
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <div className="min-w-0 flex-1">
                <p className={clsx(
                    "text-[11px] 2xl:text-base font-bold leading-tight line-clamp-2 mb-0.5",
                    isDark ? "text-slate-100" : "text-slate-700"
                )}>
                    {recipe.name}
                </p>
                <p className={clsx(
                    "text-[9px] 2xl:text-xs truncate font-medium",
                    isDark ? "text-slate-400" : "text-slate-400"
                )}>
                    {recipe.tags[0]}
                </p>
            </div>
        </div>
    )
}
