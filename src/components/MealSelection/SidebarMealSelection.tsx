import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Wand2, LeafyGreen, Clock, DollarSign, Plus } from 'lucide-react';
import { RECIPES } from '../../data/recipes';
import { useMenuStore } from '../../store/useMenuStore';
import clsx from 'clsx';
import { MealCard } from './MealCard';

export type AIPreset = 'none' | 'healthy' | 'express' | 'savings';

interface SidebarMealSelectionProps {
    onClose: () => void;
    planTitle: string;
    onGenerate: () => void;
    isNextWeek?: boolean;
}

const SECTIONS = ['Desayuno', 'Comida', 'Cena'];

export const SidebarMealSelection = ({ onClose, planTitle, onGenerate, isNextWeek = false }: SidebarMealSelectionProps) => {
    const activeMenu = useMenuStore((state) => state.activeMenu);
    const nextWeekMenu = useMenuStore((state) => state.nextWeekMenu);
    const setPreferences = useMenuStore((state) => state.setPreferences);
    const setNextWeekMenu = useMenuStore((state) => state.setNextWeekMenu);
    const activateMenu = useMenuStore((state) => state.activateMenu);

    const [selectedIds, setSelectedIds] = useState<Set<string>>(() => {
        const initial = new Set<string>();
        const sourceMenu = isNextWeek ? (nextWeekMenu || []) : activeMenu;
        sourceMenu.forEach(p => {
            if (p.wantsThisWeek) initial.add(p.recipeId);
        });
        return initial;
    });

    const [activePreset, setActivePreset] = useState<AIPreset>('none');

    const handleToggle = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedIds(newSet);
        setActivePreset('none');
    };

    useEffect(() => {
        if (activePreset === 'none') return;
        const newSet = new Set<string>();

        RECIPES.forEach(recipe => {
            let shouldSelect = false;
            if (activePreset === 'healthy') {
                shouldSelect = recipe.calories <= 550 || recipe.tags.some(t => ['saludable', 'ligero', 'veggie'].includes(t.toLowerCase()));
            } else if (activePreset === 'express') {
                shouldSelect = recipe.time <= 20;
            } else if (activePreset === 'savings') {
                shouldSelect = recipe.tags.some(t => ['legumbre', 'pasta', 'arroz', 'económico'].includes(t.toLowerCase()));
            }

            if (shouldSelect) newSet.add(recipe.id);
        });
        setSelectedIds(newSet);
    }, [activePreset]);

    const handleApply = () => {
        const prefs = Array.from(selectedIds).map(id => ({
            recipeId: id,
            wantsThisWeek: true
        }));

        if (isNextWeek) {
            setNextWeekMenu(prefs);
        } else {
            setPreferences(prefs);
            activateMenu();
        }

        onGenerate();
        onClose();
    };

    const targetCount = 14;
    const isComplete = selectedIds.size >= targetCount;

    const getRecipesForSection = (section: string) => {
        return RECIPES.filter(r =>
            r.tags.some(t => t.toLowerCase() === section.toLowerCase()) ||
            (section === 'Comida' && r.tags.some(t => ['legumbre', 'pasta', 'arroz'].includes(t.toLowerCase()))) ||
            (section === 'Cena' && !r.tags.some(t => t.toLowerCase() === 'desayuno'))
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full h-full bg-slate-50 dark:bg-slate-950 flex flex-col overflow-hidden relative"
        >
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 md:px-6 sticky top-0 z-20 flex-shrink-0 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">Selección Rápida</h2>
                        <p className="text-sm text-slate-500 font-medium">{planTitle}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Preset Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x flex-nowrap">
                    <button
                        onClick={() => setActivePreset('healthy')}
                        className={clsx(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap snap-start transition-all",
                            activePreset === 'healthy' ? "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                        )}
                    >
                        <LeafyGreen size={14} /> Healthy
                    </button>
                    <button
                        onClick={() => setActivePreset('express')}
                        className={clsx(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap snap-start transition-all",
                            activePreset === 'express' ? "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-400" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                        )}
                    >
                        <Clock size={14} /> Express
                    </button>
                    <button
                        onClick={() => setActivePreset('savings')}
                        className={clsx(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap snap-start transition-all",
                            activePreset === 'savings' ? "bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                        )}
                    >
                        <DollarSign size={14} /> Ahorro
                    </button>
                </div>
            </div>

            {/* Scrolling Content - Meal Grid Style */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 pb-32">
                {SECTIONS.map(section => {
                    const sectionRecipes = getRecipesForSection(section);
                    if (sectionRecipes.length === 0) return null;

                    return (
                        <div key={section} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between mb-4 sticky top-0 z-10 py-2 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm">
                                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                    {section}s
                                </h3>
                                <div className="text-sm font-bold text-slate-500 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-800/80 px-3 py-1 rounded-md">
                                    {sectionRecipes.filter(r => !selectedIds.has(r.id)).length} <span className="opacity-70">/ {sectionRecipes.length}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3">
                                {sectionRecipes.map(recipe => (
                                    <MealCard
                                        key={recipe.id}
                                        recipe={recipe}
                                        isSelected={selectedIds.has(recipe.id)}
                                        onToggle={() => handleToggle(recipe.id)}
                                    />
                                ))}

                                {/* Add Button Box */}
                                <button className="aspect-[4/5] rounded-3xl border-2 md:border-4 border-dashed border-slate-200 dark:border-slate-800 hover:border-emerald-300 flex flex-col items-center justify-center gap-2 lg:gap-3 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all group">
                                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:scale-110 flex items-center justify-center transition-all">
                                        <Plus size={24} className="md:w-8 md:h-8" />
                                    </div>
                                    <span className="font-bold text-[10px] md:text-xs uppercase tracking-wider">Añadir</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Sticky Footer */}
            <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 shrink-0 flex items-center justify-between relative z-20">
                <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Selección</p>
                    <div className="flex items-baseline gap-1">
                        <span className={clsx("text-lg md:text-xl font-black", isComplete ? "text-emerald-500" : "text-slate-700 dark:text-slate-200")}>
                            {selectedIds.size}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">/ 14</span>
                    </div>
                </div>

                <button
                    onClick={handleApply}
                    disabled={selectedIds.size === 0}
                    className={clsx(
                        "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all text-sm md:text-base",
                        selectedIds.size > 0
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl shadow-slate-900/10 hover:scale-[1.02] active:scale-[0.98]"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                    )}
                >
                    <Wand2 size={18} />
                    Generar
                </button>
            </div>
        </motion.div>
    );
};
