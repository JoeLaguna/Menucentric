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
                "group flex items-center rounded-2xl shadow-sm cursor-pointer transition-all duration-300 w-full",
                // Fluid padding and gaps
                "gap-2 p-2", // Default (Mobile)
                "lg:gap-2 lg:p-1.5", // 1080p (Tightest)
                "xl:gap-2 xl:p-2.5", // 1440p
                "2xl:gap-3 2xl:p-3", // 4K+
                // Fluid minimum heights - reduced
                "min-h-[64px] md:min-h-[80px] lg:min-h-[64px] xl:min-h-[80px] 2xl:min-h-[110px]",
                isDark
                    ? "bg-slate-700/50 hover:bg-slate-700 border border-slate-600"
                    : "bg-white dark:bg-slate-800 hover:shadow-md border-[1.5px] border-transparent hover:border-emerald-200 dark:hover:border-emerald-500/30",
                !isDark && "ring-1 ring-slate-100 dark:ring-slate-700"
            )}>
            <div className={clsx(
                "relative overflow-hidden rounded-[10px] flex-shrink-0 flex items-center justify-center",
                // Proportional image sizing wrapper
                "w-[40%] max-w-[56px] 2xl:max-w-[76px] min-w-[32px] aspect-square",
                !imageSrc && "bg-slate-100 dark:bg-slate-700"
            )}>
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <span className="text-xl md:text-2xl 2xl:text-4xl">{emoji}</span>
                )}
            </div>

            {/* Content Container */}
            <div className="min-w-0 flex-1 flex flex-col justify-center">
                <p className={clsx(
                    "font-bold break-words",
                    "line-clamp-3 2xl:line-clamp-4", // Prevent vertical blowout
                    // Responsive text
                    // text-[clamp(10px,1.2vw,16px)] uses viewport width which might not map well to sidebar open/close, 
                    // combining basic responsive breakpoints with tight line height.
                    "text-[10px] leading-[1.15] xl:text-[11px] xl:leading-tight 2xl:text-sm",
                    isDark ? "text-slate-100" : "text-black dark:text-slate-100"
                )}>
                    {title}
                </p>
            </div>
        </div>
    )
}
