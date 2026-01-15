import { useMenuStore } from '../store/useMenuStore';
import { RECIPES } from '../data/recipes';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, RefreshCw, ChefHat, CalendarDays, ArrowRight, Share2, Printer } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { MenuSkeleton } from '../components/MenuSkeleton';

export const ActiveMenuPage = () => {
    const { activeMenu, resetPreferences } = useMenuStore();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading for Skeleton demo
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    // Effect for "New Menu" celebration
    useEffect(() => {
        // Check if we just landed here with a filled menu (could use a URL param or just existence)
        if (!isLoading && activeMenu.length > 0) {
            // Simple check to avoid spamming confetti on every refresh might be good, 
            // but for now let's just trigger it once on mount if menu exists.
            // confetti({
            //     particleCount: 100,
            //     spread: 70,
            //     origin: { y: 0.6 }
            // });
        }
    }, [activeMenu.length, isLoading]);


    const orderedRecipes = activeMenu
        .map(p => RECIPES.find(r => r.id === p.recipeId))
        .filter(r => r !== undefined);

    // Generate days dynamically based on count
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    // If not exactly 7, we just map 1-to-1 or loop. For MVP assume 7 or less.
    const weeklyPlan = orderedRecipes.slice(0, 7).map((recipe, index) => ({
        day: days[index] || `Día ${index + 1}`,
        recipe
    }));

    if (isLoading) {
        return (
            <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-screen">
                <header className="mb-8 pl-1">
                    <div className="h-8 bg-slate-200 rounded w-48 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-slate-200 rounded w-64 animate-pulse"></div>
                </header>
                <MenuSkeleton />
            </div>
        )
    }

    if (orderedRecipes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
                <div className="bg-slate-100 p-8 rounded-full mb-6">
                    <CalendarDays size={64} className="text-slate-300" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-3">Tu agenda está vacía</h2>
                <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
                    Aún no tienes un menú activo para esta semana. ¡Vamos a planificar algo delicioso!
                </p>
                <div className="flex gap-4">
                    <Link
                        to="/tinder-mode"
                        className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-600 hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <ChefHat size={20} />
                        Crear Menú Mágico
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 max-w-[1600px] mx-auto">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight"
                    >
                        Tu Menú Semanal
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 mt-2 font-medium"
                    >
                        Del {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} al {new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <button className="bg-white text-slate-600 hover:text-emerald-600 hover:border-emerald-200 border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 flex items-center gap-2 font-semibold transition-all text-sm">
                        <Share2 size={18} />
                        Compartir
                    </button>
                    <button className="bg-white text-slate-600 hover:text-emerald-600 hover:border-emerald-200 border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 flex items-center gap-2 font-semibold transition-all text-sm">
                        <Printer size={18} />
                        Imprimir
                    </button>
                    <Link
                        to="/shopping-list"
                        className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-5 py-2.5 flex items-center gap-2 font-bold shadow-lg shadow-slate-200 transition-all text-sm"
                    >
                        <ShoppingCart size={18} />
                        Ver Lista de Compra
                    </Link>
                </motion.div>
            </header>

            {/* Horizontal Scroll / Grid Layout */}
            <div className="overflow-x-auto pb-8 -mx-4 px-4 xl:px-0 scrollbar-hide">
                <motion.div
                    className="flex xl:grid xl:grid-cols-7 gap-6 min-w-max xl:min-w-0"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.05 } }
                    }}
                >
                    {weeklyPlan.map((item, index) => (
                        <motion.div
                            key={item.recipe?.id || index}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } }
                            }}
                            className="w-[280px] xl:w-auto flex flex-col group"
                        >
                            {/* Day Header */}
                            <div className="flex items-center justify-between mb-4 px-1">
                                <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                                    {item.day.slice(0, 3)}
                                    <span className="text-slate-400 font-normal ml-1 hidden xl:inline">{item.day.slice(3)}</span>
                                </h3>
                                <div className="text-xs font-bold text-slate-300 bg-white border border-slate-100 px-2 py-1 rounded-md">
                                    13:30
                                </div>
                            </div>

                            {/* Recipe Card - Vertical Layout */}
                            {item.recipe ? (
                                <Link to={`/recipe/${item.recipe.id}`} className="block relative h-[380px] rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white border border-slate-100">
                                    <div className="h-[65%] w-full relative">
                                        <img
                                            src={item.recipe.image}
                                            alt={item.recipe.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm text-slate-700">
                                            <ChefHat size={16} />
                                        </div>
                                    </div>
                                    <div className="p-5 h-[35%] flex flex-col justify-between">
                                        <div>
                                            <div className="flex gap-2 mb-2">
                                                {item.recipe.tags.slice(0, 1).map(tag => (
                                                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h4 className="font-bold text-slate-900 leading-snug line-clamp-2 text-lg">
                                                {item.recipe.name}
                                            </h4>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-slate-500 font-medium pt-3 border-t border-slate-50">
                                            <span>{item.recipe.time} min</span>
                                            <span>{item.recipe.calories} kcal</span>
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <div className="h-[380px] rounded-[24px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-emerald-300 hover:text-emerald-500 hover:bg-emerald-50/30 transition-all cursor-pointer group/empty">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 group-hover/empty:bg-emerald-100 group-hover/empty:scale-110 transition-all">
                                        <span className="text-2xl">+</span>
                                    </div>
                                    <span className="text-sm font-bold">Añadir comida</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Global Actions Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 pt-8 border-t border-slate-200 flex justify-center"
            >
                <button
                    onClick={() => {
                        if (confirm('¿Seguro que quieres borrar este menú y empezar de cero?')) {
                            resetPreferences();
                            navigate('/tinder-mode');
                        }
                    }}
                    className="flex items-center gap-2 text-slate-400 hover:text-rose-500 font-medium px-4 py-2 rounded-lg hover:bg-rose-50 transition-colors text-sm"
                >
                    <RefreshCw size={16} />
                    Reiniciar Semana
                </button>
            </motion.div>
        </div>
    );
};
