import { MealCard } from './MealCard';
import type { Recipe } from '../../types';
import { Plus } from 'lucide-react';

interface MealGridProps {
    recipes: Recipe[];
    selectedIds: Set<string>;
    onToggle: (id: string) => void;
}

const SECTIONS = ['Desayuno', 'Comida', 'Cena'];

export const MealGrid = ({ recipes, selectedIds, onToggle }: MealGridProps) => {

    // Helper to group recipes (simple tag matching or derived logic)
    const getRecipesForSection = (section: string) => {
        return recipes.filter(r =>
            r.tags.some(t => t.toLowerCase() === section.toLowerCase()) ||
            (section === 'Comida' && r.tags.some(t => ['legumbre', 'pasta', 'arroz'].includes(t.toLowerCase()))) ||
            // Fallback for demo
            (section === 'Cena' && !r.tags.some(t => t.toLowerCase() === 'desayuno'))
        );
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-12 pb-32">
            <div className="max-w-[1920px] mx-auto space-y-16">

                {SECTIONS.map(section => {
                    const sectionRecipes = getRecipesForSection(section);
                    if (sectionRecipes.length === 0) return null;

                    return (
                        <div key={section} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <div className="flex items-center justify-between gap-4 mb-6 sticky top-0 z-30 py-3 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm px-4 md:px-6 transition-all">
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight uppercase flex items-center gap-3">
                                    {section}s
                                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-slate-800/50 px-2 py-1 rounded-md border border-slate-200/50 dark:border-slate-700/50">
                                        {sectionRecipes.filter(r => selectedIds.has(r.id)).length} / {sectionRecipes.length}
                                    </span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 md:gap-6">
                                {sectionRecipes.map(recipe => (
                                    <MealCard
                                        key={recipe.id}
                                        recipe={recipe}
                                        isSelected={selectedIds.has(recipe.id)}
                                        onToggle={() => onToggle(recipe.id)}
                                    />
                                ))}

                                {/* Contextual Add Button */}
                                <button className="aspect-[4/5] rounded-3xl border-4 border-dashed border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 flex flex-col items-center justify-center gap-3 text-slate-400 dark:text-slate-600 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all group">
                                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:scale-110 group-hover:shadow-lg transition-all flex items-center justify-center">
                                        <Plus size={32} />
                                    </div>
                                    <span className="font-bold text-sm uppercase tracking-wider">Añadir otro</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
