import { Play, MoreHorizontal, Trash2, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { MealList } from '../store/useMenuStore';
import { RECIPES } from '../data/recipes';

interface MealListCardProps {
    list: MealList;
    onDelete?: (id: string) => void;
    onClick?: () => void;
    onPlay?: () => void;
}

export const MealListCard = ({ list, onDelete, onClick, onPlay }: MealListCardProps) => {
    // Get recipe images for the collage (max 4)
    const listRecipes = list.recipeIds
        .map(id => RECIPES.find(r => r.id === id))
        .filter(r => r !== undefined);

    const coverImages = listRecipes
        .map(r => r?.image)
        .filter(Boolean)
        .slice(0, 4);

    const hasImages = coverImages.length > 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4 }}
            className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 border border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col h-full cursor-pointer"
            onClick={onClick}
        >
            {/* Aspect Ratio Container for Cover */}
            <div className="aspect-[4/3] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                {hasImages ? (
                    <div className={clsx(
                        "w-full h-full grid gap-0.5",
                        coverImages.length === 1 && "grid-cols-1",
                        coverImages.length === 2 && "grid-cols-2",
                        coverImages.length === 3 && "grid-cols-2 grid-rows-2", // 3rd usually takes full width or ignored depending on layout, let's just show 4 grid for simplicity or 3 logic
                        coverImages.length >= 4 && "grid-cols-2 grid-rows-2"
                    )}>
                        {coverImages.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt=""
                                className={clsx(
                                    "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
                                    // Handle 3 images layout specifically if needed, otherwise 4th grid slot is empty
                                    coverImages.length === 3 && i === 2 && "col-span-2"
                                )}
                            />
                        ))}
                    </div>
                ) : (
                    // Fallback Gradient if no images
                    <div className={clsx(
                        "w-full h-full bg-gradient-to-br flex items-center justify-center",
                        list.gradient || "from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700"
                    )}>
                        <CalendarDays className="text-white/50 w-16 h-16" />
                    </div>
                )}

                {/* Overlay Gradient for readability of overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                {/* Play Button Overlay - Appears on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onPlay?.();
                        }}
                        className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-emerald-400 hover:scale-110 transition-all transform"
                    >
                        <Play size={24} fill="currentColor" className="ml-1" />
                    </button>
                </div>

                {/* Top Actions */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {!list.isSystem && onDelete && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(list.id);
                            }}
                            className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-red-500/80 transition-colors"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Content Body */}
            <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {list.name}
                    </h3>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">
                    {list.description || "Sin descripción"}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {list.recipeIds.length} Recetas
                    </span>

                    {/* Tiny avatars of recipes (redundant maybe? let's stick to simple count for clean look) */}
                    <button className="text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
