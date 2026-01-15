import { useState, useMemo } from 'react';
import { useMenuStore } from '../store/useMenuStore';
import { RECIPES } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Wand2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MEAL_TYPES = ['Desayuno', 'Media Mañana', 'Comida', 'Cena'];

export const MenuDraftPage = () => {
    const { addPreference, preferences, activateMenu } = useMenuStore();
    const navigate = useNavigate();
    const [selectedMeal, setSelectedMeal] = useState('Comida');
    const [isGenerating, setIsGenerating] = useState(false);

    // Filter recipes by current meal tab
    const filteredRecipes = useMemo(() => {
        return RECIPES.filter(r => r.tags.includes(selectedMeal));
    }, [selectedMeal]);

    const handleToggle = (id: string) => {
        const exists = preferences.find(p => p.recipeId === id && p.wantsThisWeek);
        addPreference(id, !exists);
    };

    const handleCreateMenu = () => {
        setIsGenerating(true);
        // Simulate "AI" processing time
        setTimeout(() => {
            activateMenu();
            setIsGenerating(false);
            navigate('/home');
        }, 2000); // 2 secons delay
    };

    const selectedCount = preferences.length;

    return (
        <div className="min-h-screen bg-slate-50 pb-24 md:pb-8 relative">
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-4 md:px-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Diseña tu Menú</h1>
                        <p className="text-slate-500 text-sm hidden md:block">Selecciona tus platos favoritos para esta semana</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <span className="block text-2xl font-bold text-emerald-600 leading-none">{selectedCount}</span>
                            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Platos</span>
                        </div>
                        <button
                            onClick={handleCreateMenu}
                            disabled={selectedCount === 0}
                            className={`
                                flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-all
                                ${selectedCount > 0
                                    ? 'bg-slate-900 text-white hover:bg-slate-800 hover:scale-105 shadow-emerald-200'
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                            `}
                        >
                            <Wand2 size={20} className={selectedCount > 0 ? "animate-pulse" : ""} />
                            <span className="hidden md:inline">Generar Menú</span>
                            <span className="md:hidden">Generar</span>
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="max-w-7xl mx-auto mt-6 overflow-x-auto scrollbar-hide">
                    <div className="flex space-x-2 min-w-max pb-2">
                        {MEAL_TYPES.map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedMeal(type)}
                                className={`
                                    px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap
                                    ${selectedMeal === type
                                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                                        : 'bg-white text-slate-600 hover:bg-slate-100'}
                                `}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredRecipes.map(recipe => {
                        const isSelected = preferences.some(p => p.recipeId === recipe.id && p.wantsThisWeek);
                        return (
                            <div key={recipe.id} className="relative group">
                                <RecipeCard
                                    title={recipe.name}
                                    image={recipe.image}
                                    time={recipe.time}
                                    cost={recipe.cost || 1}
                                    tags={recipe.tags}
                                    onClick={() => handleToggle(recipe.id)}
                                    className={isSelected ? 'ring-4 ring-emerald-500 ring-offset-2 scale-[0.98]' : ''}
                                />
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute top-4 right-4 bg-emerald-500 text-white p-2 rounded-full shadow-lg z-10"
                                    >
                                        <ArrowRight size={20} />
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Magic Loading Overlay */}
            <AnimatePresence>
                {isGenerating && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center text-white"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="bg-gradient-to-tr from-emerald-400 to-indigo-500 w-24 h-24 rounded-2xl mb-8 shadow-2xl shadow-emerald-500/50"
                        />
                        <h2 className="text-4xl font-black mb-4 tracking-tight">Cocinando tu Plan...</h2>
                        <p className="text-slate-300 text-lg">Nuestra IA está organizando tu semana perfecta.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
