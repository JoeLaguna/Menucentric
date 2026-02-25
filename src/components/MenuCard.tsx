import clsx from 'clsx';
import type { Recipe } from '../types';

interface MenuCardProps {
    recipe?: Recipe | null;
    customItem?: {
        name: string;
        image?: string;
        emoji?: string;
        tag: string;
    };
    isDark?: boolean;
    onClick?: () => void;
}

export const MenuCard = ({ recipe, customItem, isDark, onClick }: MenuCardProps) => {
    // If neither recipe nor custom item is provided, show empty state
    if (!recipe && !customItem) {
        return <div className={clsx("h-16 2xl:h-24 rounded-xl border-2 border-dashed opacity-50 transition-colors", isDark ? "border-slate-600 bg-slate-700" : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800")}></div>;
    }

    const title = recipe ? recipe.name : customItem?.name;
    const tag = recipe ? recipe.tags[0] : customItem?.tag;
    // Image logic: use recipe image, custom image, or fallback to emoji container
    const imageSrc = recipe ? recipe.image : customItem?.image;
    const emoji = customItem?.emoji;

    return (
        <div
            onClick={onClick}
            className={clsx(
                "group flex items-center gap-2 md:gap-3 p-2 2xl:p-3 rounded-xl shadow-sm cursor-pointer transition-all duration-300 w-full",
                isDark
                    ? "bg-slate-700/50 hover:bg-slate-700 border border-slate-600"
                    : "bg-white dark:bg-slate-800 hover:shadow-md border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-500/30"
            )}>
            <div className={clsx(
                "relative overflow-hidden rounded-lg w-10 h-10 md:w-12 md:h-12 2xl:w-14 2xl:h-14 flex-shrink-0 flex items-center justify-center",
                !imageSrc && "bg-slate-100 dark:bg-slate-700"
            )}>
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <span className="text-xl md:text-2xl">{emoji}</span>
                )}
            </div>

            {/* Content Container - Takes remaining space */}
            <div className="min-w-0 flex-1 flex flex-col justify-center">
                <p className={clsx(
                    "font-bold leading-tight mb-0.5 break-words",
                    "text-[10px] md:text-[11px] 2xl:text-sm", // Reduced from text-base to text-sm for better fit
                    "line-clamp-2",
                    isDark ? "text-slate-100" : "text-slate-700 dark:text-slate-200"
                )}>
                    {title}
                </p>
                <p className={clsx(
                    "truncate font-medium",
                    "text-[9px] 2xl:text-xs",
                    isDark ? "text-slate-400" : "text-slate-400 dark:text-slate-500"
                )}>
                    {tag}
                </p>
            </div>
        </div>
    )
}
