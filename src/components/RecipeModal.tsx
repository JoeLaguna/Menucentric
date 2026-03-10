import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Flame, BarChart, ChefHat, ShoppingBag } from 'lucide-react';
import { useMenuStore } from '../store/useMenuStore';

export const RecipeModal = () => {
    const selectedRecipe = useMenuStore((state) => state.selectedRecipe);
    const setSelectedRecipe = useMenuStore((state) => state.setSelectedRecipe);

    if (!selectedRecipe) return null;

    return (
        <AnimatePresence>
            {selectedRecipe && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedRecipe(null)}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 pt-16 md:pt-8"
                    >
                        {/* Mobile Global Close Button */}
                        <button
                            onClick={() => setSelectedRecipe(null)}
                            className="absolute top-4 right-4 md:hidden z-[60] p-2 bg-slate-800/50 hover:bg-slate-800/80 text-white rounded-full backdrop-blur-md border border-white/10 shadow-lg"
                        >
                            <X size={24} />
                        </button>

                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative"
                        >
                            {/* Desktop Close Button */}
                            <button
                                onClick={() => setSelectedRecipe(null)}
                                className="hidden md:block absolute top-4 right-4 z-20 p-2 bg-black/5 hover:bg-black/10 text-slate-400 hover:text-slate-600 rounded-full transition-all"
                            >
                                <X size={24} />
                            </button>

                            {/* Left Side: Image & Key Stats */}
                            <div className="w-full md:w-2/5 relative h-64 md:h-auto">
                                <img
                                    src={selectedRecipe.image}
                                    alt={selectedRecipe.name}
                                    className="w-full h-full object-cover absolute inset-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />

                                {/* Mobile Title Overlay */}
                                <div className="absolute bottom-0 left-0 p-6 md:hidden">
                                    <h2 className="text-2xl font-black text-white leading-tight mb-2 drop-shadow-md">{selectedRecipe.name}</h2>
                                    <div className="flex gap-2">
                                        {selectedRecipe.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-xs font-bold px-2 py-1 bg-white/20 backdrop-blur-md text-white rounded-lg border border-white/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Content */}
                            <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
                                {/* Desktop Header */}
                                <div className="hidden md:block p-8 pb-4">
                                    <div className="flex items-start justify-between mb-4">
                                        <h2 className="text-3xl lg:text-4xl font-black text-slate-800 leading-tight">{selectedRecipe.name}</h2>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {selectedRecipe.tags.map(tag => (
                                            <span key={tag} className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="flex flex-col items-center justify-center p-2">
                                            <Clock className="w-5 h-5 text-emerald-500 mb-1" />
                                            <span className="text-sm font-bold text-slate-700">{selectedRecipe.time} min</span>
                                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Tiempo</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center p-2 border-l border-slate-200">
                                            <Flame className="w-5 h-5 text-orange-500 mb-1" />
                                            <span className="text-sm font-bold text-slate-700">{selectedRecipe.calories}</span>
                                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Kcal</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center p-2 border-l border-slate-200">
                                            <BarChart className="w-5 h-5 text-blue-500 mb-1" />
                                            <span className="text-sm font-bold text-slate-700">{selectedRecipe.difficulty}</span>
                                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Dificultad</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Body Content */}
                                <div className="p-6 md:p-8 pt-0 space-y-8">
                                    {/* Description */}
                                    <div className="prose prose-slate">
                                        <p className="text-slate-600 text-lg leading-relaxed">
                                            {selectedRecipe.description || "Una receta deliciosa y equilibrada, perfecta para disfrutar en cualquier momento."}
                                        </p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        {/* Ingredients */}
                                        <div className="space-y-4">
                                            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                                                <ShoppingBag className="w-5 h-5 text-emerald-500" />
                                                Ingredientes
                                            </h3>
                                            <ul className="space-y-3">
                                                {selectedRecipe.ingredients?.map((ing, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm group">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 group-hover:scale-150 transition-transform" />
                                                        <span className="flex-1">{ing}</span>
                                                    </li>
                                                )) || <li className="text-slate-400 italic">No especificados</li>}
                                            </ul>
                                        </div>

                                        {/* Steps */}
                                        <div className="space-y-4">
                                            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                                                <ChefHat className="w-5 h-5 text-orange-500" />
                                                Preparación
                                            </h3>
                                            <div className="space-y-6 relative pl-2">
                                                <div className="absolute left-[3px] top-2 bottom-2 w-0.5 bg-slate-100" />
                                                {selectedRecipe.steps?.map((step, i) => (
                                                    <div key={i} className="relative pl-6">
                                                        <div className="absolute left-[-4px] top-1.5 w-3 h-3 rounded-full bg-orange-100 border-2 border-orange-400" />
                                                        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1 block">Paso {i + 1}</span>
                                                        <p className="text-slate-600 text-sm leading-relaxed">{step}</p>
                                                    </div>
                                                )) || <p className="text-slate-400 italic">No especificados</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-8"></div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
