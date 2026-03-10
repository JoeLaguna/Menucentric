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
    if (!recipe && !customItem) {
        return <div className={clsx("h-20 md:h-24 2xl:h-32 rounded-2xl border-2 border-dashed opacity-50 transition-colors", isDark ? "border-slate-600 bg-slate-700" : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800")}></div>;
    }

    const title = recipe ? recipe.name : customItem?.name;
    // Image logic: use recipe image, custom image, or fallback to emoji container
    const imageSrc = recipe ? recipe.image : customItem?.image;
    const emoji = customItem?.emoji;

    return (
        <div
            onClick={onClick}
            className={clsx(
                "group flex items-center rounded-2xl md:rounded-xl shadow-sm cursor-pointer transition-all duration-300 w-full",
                // Fluid padding and gaps - spacious on mobile, compact on desktop
                "gap-3 p-3", // Mobile (Spacious)
                "md:gap-2 md:p-2", // Tablet
                "lg:gap-1.5 lg:p-1", // 1080p (Tightest)
                "xl:gap-2 xl:p-1.5", // 1440p
                "2xl:gap-2.5 2xl:p-2.5", // 4K+
                // Fluid minimum heights - larger on mobile to show off the card
                "min-h-[72px] md:min-h-[64px] lg:min-h-[48px] xl:min-h-[56px] 2xl:min-h-[80px]",
                isDark
                    ? "bg-slate-700/50 hover:bg-slate-700 border border-slate-600"
                    : "bg-white dark:bg-slate-800 hover:shadow-md border-[1.5px] border-transparent hover:border-emerald-200 dark:hover:border-emerald-500/30",
                !isDark && "ring-1 ring-slate-100 dark:ring-slate-700"
            )}>
            <div className={clsx(
                "relative overflow-hidden rounded-[10px] flex-shrink-0 flex items-center justify-center",
                // Proportional image sizing wrapper - larger on mobile
                "w-[35%] max-w-[72px] md:max-w-[56px] lg:max-w-[48px] xl:max-w-[56px] 2xl:max-w-[64px] min-w-[32px] aspect-square",
                !imageSrc && "bg-slate-100 dark:bg-slate-700"
            )}>
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <span className="text-2xl md:text-xl xl:text-2xl 2xl:text-4xl">{emoji}</span>
                )}
            </div>

            {/* Content Container */}
            <div className="min-w-0 flex-1 flex flex-col justify-center">
                <p className={clsx(
                    "font-bold break-words",
                    "line-clamp-2 lg:line-clamp-3 2xl:line-clamp-4", // Prevent vertical blowout
                    // Responsive text - larger on mobile to match new card proportions
                    "text-[15px] leading-snug md:text-[13px] lg:text-[9px] lg:leading-[1.15] xl:text-[10px] xl:leading-tight 2xl:text-sm",
                    isDark ? "text-slate-100" : "text-black dark:text-slate-100"
                )}>
                    {title}
                </p>
            </div>
        </div>
    )
}
