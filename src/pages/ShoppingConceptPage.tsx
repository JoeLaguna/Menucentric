
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, ShoppingCart, LayoutGrid, List as ListIcon, RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useMenuStore } from '../store/useMenuStore';

// Type Definitions
type ViewMode = 'classic' | 'visual';

const getIconForCategory = (category: string, name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('pollo')) return '🍗';
    if (lowerName.includes('huevo')) return '🥚';
    if (lowerName.includes('leche')) return '🥛';
    if (lowerName.includes('pan')) return '🥖';
    if (lowerName.includes('arroz')) return '🍚';
    if (lowerName.includes('pasta') || lowerName.includes('spaghetti')) return '🍝';
    if (lowerName.includes('tomate')) return '🍅';
    if (lowerName.includes('aguacate')) return '🥑';
    if (lowerName.includes('queso')) return '🧀';
    if (lowerName.includes('lechuga')) return '🥬';
    if (lowerName.includes('salmon') || lowerName.includes('pescado')) return '🐟';
    if (lowerName.includes('piña')) return '🍍';
    if (lowerName.includes('tortilla')) return '🌮';
    if (lowerName.includes('carne')) return '🥩';
    if (lowerName.includes('manzana')) return '🍎';
    if (lowerName.includes('pera')) return '🍐';
    if (lowerName.includes('platano')) return '🍌';
    if (lowerName.includes('cerdo')) return '🥓';
    if (lowerName.includes('cafe')) return '☕';
    if (lowerName.includes('agua')) return '💧';
    if (lowerName.includes('vino')) return '🍷';
    if (lowerName.includes('cerveza')) return '🍺';

    // Fallback by Category
    switch (category) {
        case 'Frutas y Verduras': return '🥦';
        case 'Carnes': return '🥩';
        case 'Lácteos': return '🥛';
        case 'Despensa': return '🥫';
        case 'Panadería': return '🥐';
        default: return '🛍️'; // Generic Fallback
    }
};

export const ShoppingConceptPage = () => {
    const navigate = useNavigate();
    const shoppingList = useMenuStore((state) => state.shoppingList);
    const toggleIngredient = useMenuStore((state) => state.toggleIngredient);

    const [viewMode, setViewMode] = useState<ViewMode>('visual');

    // Derived State
    const activeItems = shoppingList.filter(i => !i.checked).map(i => ({ ...i, icon: getIconForCategory(i.category, i.name) }));
    const purchasedItems = shoppingList.filter(i => i.checked).map(i => ({ ...i, icon: getIconForCategory(i.category, i.name) }));

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header / Mode Switcher */}
            <header className="bg-white border-b border-slate-100 p-4 sticky top-0 z-10 shadow-sm">
                <div className="max-w-md mx-auto flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="text-sm text-slate-500 hover:text-slate-800">
                        &larr; Volver
                    </button>

                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('classic')}
                            className={clsx(
                                "p-2 rounded-md flex items-center gap-2 text-sm font-medium transition-all",
                                viewMode === 'classic' ? "bg-white shadow-sm text-emerald-600" : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            <ListIcon size={16} /> Lista Clásica
                        </button>
                        <button
                            onClick={() => setViewMode('visual')}
                            className={clsx(
                                "p-2 rounded-md flex items-center gap-2 text-sm font-medium transition-all",
                                viewMode === 'visual' ? "bg-white shadow-sm text-rose-500" : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            <LayoutGrid size={16} /> Visual (Bring!)
                        </button>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 p-4 max-w-md mx-auto w-full overflow-hidden">
                <AnimatePresence mode="wait">
                    {viewMode === 'classic' ? (
                        <motion.div
                            key="classic"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6"
                        >
                            {/* CLASSIC IMPLEMENTATION (Simplified) */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-100 divide-y divide-slate-100">
                                {activeItems.length === 0 && <p className="p-4 text-center text-slate-400 italic">¡Todo comprado!</p>}
                                {activeItems.map(item => (
                                    <div key={item.id} className="p-4 flex items-center gap-3 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => toggleIngredient(item.id)}>
                                        <div className="w-5 h-5 rounded border-2 border-slate-300 flex items-center justify-center text-white">
                                            {/* Empty Checkbox */}
                                        </div>
                                        <span className="font-medium text-slate-700">{item.name}</span>
                                        <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">{item.amount}</span>
                                    </div>
                                ))}
                            </div>

                            {purchasedItems.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-2 px-2">Comprado</h3>
                                    <div className="opacity-60 bg-slate-50 rounded-xl border border-slate-100 divide-y divide-slate-100">
                                        {purchasedItems.map(item => (
                                            <div key={item.id} className="p-4 flex items-center gap-3 cursor-pointer" onClick={() => toggleIngredient(item.id)}>
                                                <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center text-white">
                                                    <Check size={14} />
                                                </div>
                                                <span className="line-through text-slate-500">{item.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="visual"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col gap-8 pb-20"
                        >
                            {/* VISUAL / BRING IMPLEMENTATION */}

                            {/* SECTION: TO BUY (Red/Accent) */}
                            <div>
                                <div className="flex items-center justify-between mb-4 px-1">
                                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                        <ShoppingCart className="text-rose-500" size={20} />
                                        Por Comprar
                                        <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{activeItems.length}</span>
                                    </h2>
                                </div>

                                <motion.div layout className="grid grid-cols-3 gap-3">
                                    <AnimatePresence>
                                        {activeItems.map(item => (
                                            <motion.button
                                                layoutId={item.id}
                                                key={item.id}
                                                onClick={() => toggleIngredient(item.id)}
                                                className="aspect-square bg-white rounded-2xl shadow-sm border-2 border-rose-50 hover:border-rose-200 hover:shadow-md transition-all flex flex-col items-center justify-center p-2 group relative overflow-hidden"
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <span className="text-3xl mb-2 filter drop-shadow-sm group-hover:scale-110 transition-transform">{item.icon}</span>
                                                <span className="text-xs font-bold text-slate-700 text-center leading-tight line-clamp-2">{item.name}</span>
                                                <span className="text-[10px] text-slate-400 mt-1">{item.amount}</span>
                                            </motion.button>
                                        ))}
                                    </AnimatePresence>

                                    {/* Add Button Mock */}
                                    <button className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 text-slate-400 flex flex-col items-center justify-center hover:border-slate-400 hover:text-slate-500 transition-colors">
                                        <Plus size={24} />
                                    </button>
                                </motion.div>
                            </div>

                            {/* SECTION: RECENT / PANTRY (Gray) */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-1 flex items-center gap-2">
                                    <RotateCcw size={14} />
                                    Recientes / Despensa
                                </h3>

                                <motion.div layout className="grid grid-cols-4 gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                                    {purchasedItems.map(item => (
                                        <motion.button
                                            layoutId={item.id}
                                            key={item.id}
                                            onClick={() => toggleIngredient(item.id)}
                                            className="aspect-square bg-slate-100 rounded-xl flex flex-col items-center justify-center p-1 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <span className="text-xl mb-1 grayscale">{item.icon}</span>
                                            <span className="text-[10px] font-medium text-slate-500 text-center truncate w-full px-1">{item.name}</span>
                                        </motion.button>
                                    ))}
                                </motion.div>
                            </div>

                            <div className="text-center text-xs text-slate-400 mt-8">
                                <p>En el modo visual, los items no se borran.</p>
                                <p>Se mueven al "Historial" para recomprar fácil.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};
