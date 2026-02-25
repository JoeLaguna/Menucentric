import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { Recipe } from '../../types';
import { useMenuStore } from '../../store/useMenuStore';

interface MealCardProps {
    recipe: Recipe;
    isSelected: boolean;
    onToggle: () => void;
}

export const MealCard = ({ recipe, isSelected, onToggle }: MealCardProps) => {
    const setSelectedRecipe = useMenuStore((state) => state.setSelectedRecipe);

    return (
        <div className="w-full aspect-[3/4] bg-transparent perspective-1000 group cursor-pointer relative" onClick={onToggle}>
            <motion.div
                className="relative w-full h-full transition-all duration-500"
                style={{ transformStyle: 'preserve-3d' }}
                initial={false}
                animate={{ rotateY: isSelected ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* FRONT SIDE (Unselected - Catalog Style) */}
                <div
                    className={clsx(
                        "absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-sm",
                        "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
                        "p-2.5 flex flex-col gap-3 group-hover:shadow-md transition-shadow",
                        isSelected && "pointer-events-none"
                    )}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="w-full aspect-square rounded-xl overflow-hidden shadow-inner flex-shrink-0">
                        <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <div className="px-1 flex-1 flex flex-col justify-start relative z-10">
                        <h3
                            className={clsx(
                                "font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base leading-snug line-clamp-3",
                                !isSelected && "hover:underline cursor-pointer"
                            )}
                            onClick={(e) => {
                                if (isSelected) return;
                                e.stopPropagation();
                                setSelectedRecipe(recipe);
                            }}
                        >
                            {recipe.name}
                        </h3>
                    </div>
                </div>

                {/* BACK SIDE (Selected - Solid Flat Card) */}
                <div
                    className={clsx(
                        "absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-sm",
                        "bg-[#8B736E] dark:bg-slate-700 border-2 border-[#8B736E] dark:border-slate-600",
                        "flex flex-col items-center justify-center p-6 text-center shadow-inner",
                        !isSelected && "pointer-events-none"
                    )}
                    style={{
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden'
                    }}
                >
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <h3
                            className={clsx(
                                "font-bold text-white text-md md:text-lg leading-snug",
                                isSelected && "hover:underline cursor-pointer"
                            )}
                            onClick={(e) => {
                                if (!isSelected) return;
                                e.stopPropagation();
                                setSelectedRecipe(recipe);
                            }}
                        >
                            {recipe.name}
                        </h3>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
