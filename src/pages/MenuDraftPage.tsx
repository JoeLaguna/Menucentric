import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, AlertCircle, Coffee, Sun, Utensils, Moon, Wand2 } from 'lucide-react';
import { useMenuStore } from '../store/useMenuStore';
import { RECIPES } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
    { id: 'desayuno', title: 'Desayuno', tags: ['Desayuno'], icon: Coffee, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'media-manana', title: 'Media Mañana', tags: ['Desayuno', 'Snack', 'Rápido'], icon: Sun, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'comida', title: 'Comida', tags: ['Comida'], icon: Utensils, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'cena', title: 'Cena', tags: ['Cena'], icon: Moon, color: 'text-indigo-600', bg: 'bg-indigo-50' },
];

export const MenuDraftPage = () => {
    const navigate = useNavigate();
    const activateMenu = useMenuStore((state) => state.activateMenu);
    const [isGenerating, setIsGenerating] = useState(false);

    // Helper to get recipes for a category
    const getRecipesForCategory = (categoryTags: string[]) => {
        // Filter recipes that match AT LEAST one of the category tags
        const filtered = RECIPES.filter(recipe =>
            recipe.tags.some(tag => categoryTags.includes(tag))
        );
        // Return up to 7 recipes (shuffled or sliced)
        return filtered.slice(0, 7);
    };

    const handleGenerate = () => {
        setIsGenerating(true);

        // Wait for the magic animation
        setTimeout(() => {
            activateMenu();
            navigate('/home', { state: { showConfetti: true } });
        }, 3500);
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-24 relative">
            <AnimatePresence>
                {isGenerating && <MagicLoadingOverlay />}
            </AnimatePresence>

            {/* Header */}
            <header className="bg-white border-b border-slate-100 sticky top-0 z-30 px-6 py-4 shadow-sm/50 backdrop-blur-md bg-white/90">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                        >
                            <ArrowLeft size={22} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Borrador de Menú</h1>
                            <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Semana del 12 al 18 de Enero
                            </p>
                        </div>
                    </div>

                    <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all hover:scale-105 active:scale-95">
                        <Sparkles size={16} className="text-amber-400" />
                        Autocompletar
                    </button>
                </div>
            </header>

            {/* Content Lists */}
            <main className="max-w-[1600px] mx-auto py-8">
                <div className="flex flex-col gap-12">
                    {CATEGORIES.map((category) => {
                        const recipes = getRecipesForCategory(category.tags);
                        const Icon = category.icon;

                        return (
                            <section key={category.id} className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="px-6 sm:px-10 mb-6 flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${category.bg} flex items-center justify-center`}>
                                        <Icon size={20} className={category.color} />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wide">
                                        {category.title}
                                    </h2>
                                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                                        {recipes.length} opciones
                                    </span>
                                </div>

                                <div className="overflow-x-auto pb-8 pt-2 px-6 sm:px-10 scrollbar-hide">
                                    <div className="flex gap-6 min-w-min">
                                        {recipes.length > 0 ? (
                                            recipes.map((recipe, index) => (
                                                <motion.div
                                                    key={recipe.id}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className="w-[280px] flex-shrink-0 snap-start"
                                                >
                                                    <RecipeCard
                                                        title={recipe.name}
                                                        image={recipe.image}
                                                        time={recipe.time}
                                                        cost={recipe.cost || 1}
                                                        tags={recipe.tags}
                                                        onClick={() => console.log('View recipe', recipe.id)}
                                                    />
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="w-full flex items-center justify-center p-12 bg-slate-100/50 rounded-3xl border border-dashed border-slate-200 text-slate-400">
                                                <div className="flex flex-col items-center gap-2">
                                                    <AlertCircle size={24} />
                                                    <span className="font-medium">No hay recetas disponibles para esta categoría</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* "View More" Placeholder Card */}
                                        {recipes.length > 0 && (
                                            <div className="w-[100px] flex-shrink-0 flex items-center justify-center">
                                                <button className="w-14 h-14 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:scale-110 transition-all group">
                                                    <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" size={24} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>
            </main>

            {/* Floating Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-6 z-20 pointer-events-none">
                <div className="max-w-xl mx-auto pointer-events-auto">
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full bg-slate-900 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3 hover:bg-slate-800 hover:scale-[1.02] transition-all active:scale-95 ring-4 ring-white disabled:scale-100 disabled:opacity-80"
                    >
                        {isGenerating ? (
                            <Sparkles className="animate-spin" size={24} />
                        ) : (
                            <Wand2 size={24} className="text-purple-400" />
                        )}
                        {isGenerating ? 'Creando tu menú...' : 'Generar Plan Mágico'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const MagicLoadingOverlay = () => {
    const [step, setStep] = useState(0);
    const steps = [
        "Analizando tus preferencias...",
        "Calculando balance nutricional...",
        "Optimizando lista de la compra...",
        "Aplicando un poco de magia...",
        "¡Tu menú está listo!"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStep(s => (s < steps.length - 1 ? s + 1 : s));
        }, 700);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/95 flex flex-col items-center justify-center text-white"
        >
            <div className="relative w-32 h-32 mb-8">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-t-4 border-l-4 border-emerald-400/30"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border-b-4 border-r-4 border-purple-400/30"
                />
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Sparkles size={48} className="text-yellow-400" />
                </motion.div>
            </div>

            <motion.h2
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent text-center px-4"
            >
                {steps[step]}
            </motion.h2>
        </motion.div>
    );
};
