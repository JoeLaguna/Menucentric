import { X, Clock, DollarSign, Utensils, Share2, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlanInfoSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onPersonalize: () => void;
    planTitle: string;
    description?: string;
}

export const PlanInfoSidebar = ({ isOpen, onClose, onPersonalize, planTitle, description }: PlanInfoSidebarProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop - Invisible to show menu behind */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-transparent"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-[400px] bg-white shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
                            <h2 className="text-xl font-bold text-slate-900">Detalles del Plan</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {/* Plan Info */}
                            <div className="mb-8">
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                                    Recomendado
                                </span>
                                <h3 className="text-3xl font-bold text-slate-900 mb-2 leading-tight">{planTitle}</h3>
                                <p className="text-slate-500 leading-relaxed">
                                    {description || "Un plan equilibrado diseñado por expertos para maximizar tu bienestar sin sacrificar el sabor. Perfecto para empezar a cuidarte."}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                                        <Utensils size={16} />
                                        <span className="text-xs font-bold uppercase tracking-wider">Recetas</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">21</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                                        <Clock size={16} />
                                        <span className="text-xs font-bold uppercase tracking-wider">Cocina</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">3.5h</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 col-span-2">
                                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                                        <DollarSign size={16} />
                                        <span className="text-xs font-bold uppercase tracking-wider">Coste Estimado</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-2xl font-bold text-slate-900">45€ - 55€</p>
                                        <span className="text-xs text-slate-400">/ semana</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-slate-900 mb-3">Categorías</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Saludable', 'Bajo en Grasa', 'Rápido', 'Económico', 'Sin Gluten'].map(tag => (
                                        <span key={tag} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                            <button
                                onClick={onPersonalize}
                                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/10 hover:bg-slate-800 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2 mb-3"
                            >
                                <Wand2 size={20} className="text-purple-400" />
                                Crear mi menú personalizado
                            </button>

                            <button className="w-full bg-white text-slate-700 font-bold py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                <Share2 size={18} />
                                Compartir
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
