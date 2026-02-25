import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMenuStore } from '../store/useMenuStore';
import { EmptyState } from '../components/EmptyState';
import { ArrowLeft, ShoppingCart, Check, Plus, AlertCircle, X, Share2, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

// Category Color System
const CATEGORY_STYLES: Record<string, { color: string, bg: string, border: string, text: string, textDark: string }> = {
    'Frutas y Verduras': { color: 'bg-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', textDark: 'text-emerald-400' },
    'Carnes': { color: 'bg-rose-500', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', textDark: 'text-rose-400' },
    'Lácteos': { color: 'bg-amber-400', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', textDark: 'text-amber-400' },
    'Despensa': { color: 'bg-blue-500', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', textDark: 'text-blue-400' },
    'default': { color: 'bg-slate-400', bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', textDark: 'text-slate-400' }
};

const getCategoryStyle = (cat: string) => CATEGORY_STYLES[cat] || CATEGORY_STYLES['default'];

export const ShoppingListPage = () => {
    const navigate = useNavigate();
    const shoppingList = useMenuStore((state) => state.shoppingList);
    const toggleIngredient = useMenuStore((state) => state.toggleIngredient);
    const addIngredient = useMenuStore((state) => state.addIngredient);

    const [showPantryTip, setShowPantryTip] = useState(true);
    const [addingToCategory, setAddingToCategory] = useState<string | null>(null);
    const [newItemName, setNewItemName] = useState('');

    // Group by category
    const grouped = shoppingList.reduce((acc, item) => {
        const cat = item.category || 'Otros';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
    }, {} as Record<string, typeof shoppingList>);

    const handleAddItem = (category: string) => {
        if (!newItemName.trim()) return;
        addIngredient(newItemName, category);
        setNewItemName('');
        setAddingToCategory(null);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors duration-300">
            {/* Header */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between shadow-sm transition-colors">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-tight">Lista de Compra</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{shoppingList.filter(i => !i.checked).length} pendientes</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors hidden md:block">
                        <Printer size={20} />
                    </button>
                    <button className="text-white bg-slate-900 dark:bg-slate-700 p-2 rounded-full hover:bg-slate-800 dark:hover:bg-slate-600 transition-all shadow-md active:scale-95">
                        <Share2 size={18} />
                    </button>
                    {/* Concept Test Link */}
                    <button
                        onClick={() => navigate('/shopping-concepts')}
                        className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-bold hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors shadow-sm border border-indigo-200 dark:border-indigo-800"
                    >
                        Test Concept
                    </button>
                </div>
            </header>

            <main className="p-4 md:p-6 max-w-7xl mx-auto">
                {/* Pantry Reminder */}
                <AnimatePresence>
                    {showPantryTip && shoppingList.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-slate-900 dark:bg-slate-800 text-white rounded-xl p-4 mb-6 shadow-lg flex items-start gap-3 relative overflow-hidden"
                        >
                            <div className="bg-slate-800 dark:bg-slate-700 p-2 rounded-full shrink-0">
                                <AlertCircle size={20} className="text-emerald-400" />
                            </div>
                            <div className="pr-8">
                                <h3 className="font-bold text-sm mb-1">Antes de salir...</h3>
                                <p className="text-xs text-slate-300 leading-relaxed">Revisa tu despensa. Muchos ingredientes básicos como sal, aceite o especias ya los podrías tener.</p>
                            </div>
                            <button
                                onClick={() => setShowPantryTip(false)}
                                className="absolute top-2 right-2 p-1 text-slate-500 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {shoppingList.length === 0 ? (
                    <EmptyState
                        icon={ShoppingCart}
                        title="Lista de compra vacía"
                        description="Tu lista se generará automáticamente cuando actives un menú semanal."
                        actionLabel="Ir al Menú Activo"
                        onAction={() => navigate('/home')}
                    />
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {Object.entries(grouped).map(([category, items]) => {
                            const style = getCategoryStyle(category);

                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    key={category}
                                    className="break-inside-avoid bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col transition-colors"
                                >
                                    {/* Card Header with Color Indicator */}
                                    <div className="flex items-center gap-3 p-4 border-b border-slate-50 dark:border-slate-800">
                                        <div className={clsx("w-1.5 h-8 rounded-full", style.color)}></div>
                                        <h3 className={clsx("font-bold text-lg", style.text, `dark:${style.textDark}`)}>{category}</h3>
                                        <span className="ml-auto text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 rounded-full">
                                            {items.length}
                                        </span>
                                    </div>

                                    {/* Items List */}
                                    <div className="divide-y divide-slate-50 dark:divide-slate-800">
                                        {items.map((item) => (
                                            <motion.div
                                                layout
                                                key={item.id}
                                                onClick={() => toggleIngredient(item.id)}
                                                className={clsx(
                                                    "group flex items-center justify-between p-3 md:p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors",
                                                    item.checked && "bg-slate-50/80 dark:bg-slate-800/50"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={clsx(
                                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                                                        item.checked
                                                            ? "bg-slate-400 border-slate-400 scale-90"
                                                            : "border-slate-200 dark:border-slate-700 group-hover:border-emerald-400 bg-white dark:bg-slate-800"
                                                    )}>
                                                        {item.checked && <Check size={14} className="text-white" />}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className={clsx(
                                                            "font-medium text-[15px] transition-all",
                                                            item.checked ? "text-slate-400 dark:text-slate-500 line-through" : "text-slate-700 dark:text-slate-200"
                                                        )}>
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className={clsx(
                                                    "text-xs font-medium px-2 py-1 rounded-md transition-colors",
                                                    item.checked ? "text-slate-300 dark:text-slate-600 bg-transparent" : "text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800"
                                                )}>
                                                    {item.amount}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Add Product Footer */}
                                    <div className="p-3 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                                        {addingToCategory === category ? (
                                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    placeholder="Ej. Servilletas..."
                                                    className="flex-1 bg-white dark:bg-slate-800 text-sm border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 focus:border-transparent shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                                    value={newItemName}
                                                    onChange={(e) => setNewItemName(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') handleAddItem(category);
                                                        if (e.key === 'Escape') setAddingToCategory(null);
                                                    }}
                                                />
                                                <button
                                                    onClick={() => handleAddItem(category)}
                                                    className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 p-2 rounded-lg hover:bg-slate-800 dark:hover:bg-white transition-colors"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setAddingToCategory(category)}
                                                className="w-full py-2 flex items-center justify-center gap-2 text-sm font-semibold text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all border border-dashed border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                                            >
                                                <Plus size={16} />
                                                Añadir producto
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};
