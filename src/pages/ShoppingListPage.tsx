import { useMenuStore } from '../store/useMenuStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trash2, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { EmptyState } from '../components/EmptyState';

export const ShoppingListPage = () => {
    const { shoppingList, toggleIngredient, addIngredient } = useMenuStore();
    const [newItemName, setNewItemName] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItemName.trim()) {
            addIngredient(newItemName, 'Despensa');
            setNewItemName('');
        }
    };

    // Group by category
    const grouped = shoppingList.reduce((acc, item) => {
        const cat = item.category || 'Varios';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
    }, {} as Record<string, typeof shoppingList>);

    const totalItems = shoppingList.length;
    const checkedItems = shoppingList.filter(i => i.checked).length;
    const progress = totalItems === 0 ? 0 : (checkedItems / totalItems) * 100;

    if (totalItems === 0) {
        return (
            <div className="h-full">
                <header className="p-4">
                    <Link to="/home" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors">
                        <ArrowLeft size={20} /> Volver al menú
                    </Link>
                </header>
                <EmptyState
                    icon={ShoppingBag}
                    title="Tu lista está vacía"
                    description="Genera un menú para ver los ingredientes aquí, o añade cosas manualmente."
                />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 max-w-3xl mx-auto shadow-2xl shadow-slate-200 border-x border-slate-100 min-h-screen bg-white">
            {/* Header Sticky */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <ShoppingBag className="text-emerald-500" size={32} />
                        Lista de Compra
                    </h1>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-slate-800">{checkedItems}/{totalItems}</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-emerald-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            <div className="p-6 space-y-8 pb-32">
                {/* Manual Add Input */}
                <form onSubmit={handleAdd} className="relative group">
                    <input
                        type="text"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder="Añadir algo más..."
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium placeholder:text-slate-400"
                    />
                    <button
                        type="submit"
                        disabled={!newItemName.trim()}
                        className="absolute right-2 top-2 bottom-2 w-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center hover:bg-emerald-600 disabled:opacity-50 disabled:hover:bg-emerald-500 transition-all shadow-md shadow-emerald-200"
                    >
                        <Plus size={24} />
                    </button>
                </form>

                {Object.entries(grouped).map(([category, items]) => (
                    <section key={category}>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 pl-2 sticky top-[140px] bg-slate-50/90 backdrop-blur py-2 z-10 w-fit rounded-r-lg pr-4">
                            {category}
                        </h3>
                        <div className="space-y-3">
                            <AnimatePresence>
                                {items.map(item => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        onClick={() => toggleIngredient(item.id)}
                                        className={clsx(
                                            "group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border",
                                            item.checked
                                                ? "bg-slate-50 border-transparent opacity-60"
                                                : "bg-white border-slate-100 shadow-sm hover:border-emerald-200 hover:shadow-md"
                                        )}
                                    >
                                        <div className={clsx(
                                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                                            item.checked
                                                ? "bg-emerald-500 border-emerald-500 text-white"
                                                : "border-slate-300 group-hover:border-emerald-400"
                                        )}>
                                            {item.checked && <Check size={14} strokeWidth={4} />}
                                        </div>

                                        <div className="flex-1">
                                            <span className={clsx(
                                                "text-lg font-medium transition-all block",
                                                item.checked ? "text-slate-400 line-through" : "text-slate-800"
                                            )}>
                                                {item.name}
                                            </span>
                                        </div>

                                        {item.amount && !item.checked && (
                                            <span className="text-sm font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-lg">
                                                {item.amount}
                                            </span>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </section>
                ))}
            </div>

            {/* Floating Tip can go here */}
            {totalItems > 0 && progress < 100 && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl shadow-slate-900/40 z-30 flex items-start gap-3"
                >
                    <div className="text-2xl">💡</div>
                    <div>
                        <p className="text-sm text-slate-300 font-medium">Tip Pro</p>
                        <p className="text-sm">Revisa tu despensa antes de salir. ¡Ahorrarás dinero!</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};
