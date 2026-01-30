import { motion } from 'framer-motion';
import { X, Clock, ChefHat, Flame, List, CheckCircle2 } from 'lucide-react';
import type { Recipe } from '../types';

interface RecipeDetailsModalProps {
    recipe: Recipe;
    onClose: () => void;
}

export const RecipeDetailsModal = ({ recipe, onClose }: RecipeDetailsModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/80 pointer-events-auto"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-white w-full max-w-lg h-[85vh] sm:h-auto sm:max-h-[85vh] sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden flex flex-col relative pointer-events-auto"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Header Image */}
                <div className="h-64 shrink-0 relative">
                    <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6">
                        <div className="flex gap-2 mb-2">
                            {recipe.tags.map(tag => (
                                <span key={tag} className="text-xs font-semibold bg-emerald-500 text-white px-2 py-0.5 rounded shadow-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h2 className="text-2xl font-bold text-white leading-tight">{recipe.name}</h2>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Stats */}
                    <div className="flex justify-between px-4 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex flex-col items-center gap-1">
                            <Clock size={20} className="text-indigo-500" />
                            <span className="text-sm font-semibold text-slate-700">{recipe.time} min</span>
                            <span className="text-xs text-slate-400">Tiempo</span>
                        </div>
                        <div className="w-px bg-slate-200" />
                        <div className="flex flex-col items-center gap-1">
                            <ChefHat size={20} className="text-emerald-500" />
                            <span className="text-sm font-semibold text-slate-700">{recipe.difficulty}</span>
                            <span className="text-xs text-slate-400">Dificultad</span>
                        </div>
                        <div className="w-px bg-slate-200" />
                        <div className="flex flex-col items-center gap-1">
                            <Flame size={20} className="text-rose-500" />
                            <span className="text-sm font-semibold text-slate-700">{recipe.calories}</span>
                            <span className="text-xs text-slate-400">Kcal</span>
                        </div>
                    </div>

                    {/* Description */}
                    {recipe.description && (
                        <div>
                            <p className="text-slate-600 leading-relaxed italic border-l-4 border-emerald-400 pl-4 py-1">
                                "{recipe.description}"
                            </p>
                        </div>
                    )}

                    {/* Ingredients */}
                    {recipe.ingredients && (
                        <div>
                            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                                <List size={20} className="text-emerald-600" />
                                Ingredientes
                            </h3>
                            <ul className="space-y-3">
                                {recipe.ingredients.map((ing, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600 bg-slate-50 p-3 rounded-lg hover:bg-emerald-50/50 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                                        <span>{ing}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Preparation */}
                    {recipe.steps && (
                        <div>
                            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                                <CheckCircle2 size={20} className="text-emerald-600" />
                                Preparación
                            </h3>
                            <div className="space-y-6 relative ml-2">
                                <div className="absolute left-[11px] top-6 bottom-6 w-px bg-slate-200" />
                                {recipe.steps.map((step, i) => (
                                    <div key={i} className="relative flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10 ring-4 ring-white">
                                            {i + 1}
                                        </div>
                                        <div className="pb-4">
                                            <p className="text-slate-600 leading-relaxed">{step}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
