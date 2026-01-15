import { useMenuStore } from '../store/useMenuStore';
import { Plus, ChevronRight, BookHeart, Utensils, Play, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export const MealListsPage = () => {
    const mealLists = useMenuStore((state) => state.mealLists);
    const deleteMealList = useMenuStore((state) => state.deleteMealList);

    // Mock handler for creating new list (Phase 2: Use a real modal)
    const handleCreateList = () => {
        const createList = useMenuStore.getState().createMealList;
        const name = prompt("Nombre de la nueva lista:");
        if (name) createList(name, "Lista personalizada");
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <header className="bg-white border-b border-slate-100 px-6 py-6 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Mis Listas</h1>
                        <p className="text-sm text-slate-500">Tus colecciones de recetas favoritas.</p>
                    </div>
                    <button
                        onClick={handleCreateList}
                        className="p-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors shadow-lg active:scale-95"
                    >
                        <Plus size={24} />
                    </button>
                </div>
            </header>

            {/* Content */}
            <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Create New Card (Visual alternative to floating button) */}
                    <button
                        onClick={handleCreateList}
                        className="group flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-2xl hover:border-emerald-400 hover:bg-emerald-50 transition-all min-h-[160px]"
                    >
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3 group-hover:bg-white group-hover:text-emerald-500 group-hover:shadow-md transition-all">
                            <Plus size={24} />
                        </div>
                        <span className="font-bold text-slate-400 group-hover:text-emerald-600">Nueva Lista</span>
                    </button>

                    {/* Meal Lists */}
                    {mealLists.map((list) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={list.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 group relative flex flex-col h-full min-h-[160px]"
                        >
                            {/* Colorful Header/Cover */}
                            <div className={clsx("h-24 bg-gradient-to-r p-4 flex flex-col justify-between", list.gradient)}>
                                <div className="flex justify-between items-start text-white/90">
                                    <BookHeart size={20} />
                                    {/* Action Menu (Delete) */}
                                    {!list.isSystem && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (confirm('¿Borrar esta lista?')) deleteMealList(list.id);
                                            }}
                                            className="p-1.5 bg-black/20 rounded-full hover:bg-black/30 text-white transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>
                                <h3 className="text-white font-bold text-lg leading-tight shadow-black/10 drop-shadow-md">
                                    {list.name}
                                </h3>
                            </div>

                            {/* Body */}
                            <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                                <div>
                                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                                        {list.description || "Sin descripción"}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 w-fit px-2 py-1 rounded-md">
                                        <Utensils size={12} />
                                        <span>{list.recipeIds.length} Recetas</span>
                                    </div>
                                </div>

                                {/* Action Footer */}
                                <div className="mt-4 pt-3 border-t border-slate-50 flex items-center gap-2">
                                    <button
                                        className="flex-1 bg-slate-900 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-colors"
                                        onClick={() => console.log('View List', list.id)}
                                    >
                                        Ver Platos <ChevronRight size={14} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            // Future: Play Tinder mode with ONLY this list's items (or filtered)
                                            console.log('Play List', list.id);
                                        }}
                                        className="w-8 h-8 flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors"
                                        title="Generar Menú con esta lista"
                                    >
                                        <Play size={14} fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
