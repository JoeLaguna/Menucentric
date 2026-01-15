import { useState, useEffect } from 'react';
import { useMenuStore } from '../store/useMenuStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { CalendarDays, Settings, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import type { Recipe } from '../types';
import { RECIPES } from '../data/recipes';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { MenuSkeleton } from '../components/MenuSkeleton';

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const MEALS = ['Desayuno', 'Media Mañana', 'Comida', 'Cena'];

// Simulated dates generator
const getDatesForWeek = () => {
    const today = new Date();
    // Assuming today is Thursday for the demo visual match, or just use real dates
    // For visual fidelity with reference, let's generate dates starting from a Monday
    const currentDay = today.getDay(); // 0 is Sunday
    const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + distanceToMonday);

    return DAYS.map((day, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return {
            name: day,
            date: d.getDate(),
            month: d.toLocaleString('es-ES', { month: 'short' }),
            isToday: i === 3 // Hardcoded Thursday as "Today" for visual demo match with reference image? Or actually use today: d.toDateString() === today.toDateString()
        };
    });
};

export const ActiveMenuPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const activeMenu = useMenuStore((state) => state.activeMenu);


    const weekDates = getDatesForWeek().map((d, i) => ({
        ...d,
        isToday: new Date().getDay() === (i + 1) % 7 // Simple check matching index
    }));

    // If we have confetti state, we assume we are coming from the magic generation
    // and should show the skeleton load first.
    const [isLoadingMagic, setIsLoadingMagic] = useState(!!location.state?.showConfetti);

    useEffect(() => {
        if (location.state?.showConfetti) {
            // Trigger confetti
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#34d399', '#ffbbf24', '#818cf8'] });
                confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#34d399', '#ffbbf24', '#818cf8'] });

                if (Date.now() < end) requestAnimationFrame(frame);
            };
            frame();

            // Transition from Skeleton to Real content after delay
            const timer = setTimeout(() => {
                setIsLoadingMagic(false);
            }, 2500);

            // Clear state so it doesn't run again on simple re-renders
            window.history.replaceState({}, document.title);

            return () => clearTimeout(timer);
        }
    }, [location.state]);

    // Map preferences to actual recipes
    const activeRecipes = activeMenu
        .map(p => RECIPES.find(r => r.id === p.recipeId))
        .filter(Boolean) as Recipe[];

    // Use similar mock distribution logic for now
    const getRecipeForSlot = (dayIndex: number, mealIndex: number) => {
        if (activeRecipes.length === 0) return null;
        const seed = dayIndex + (mealIndex * 3);
        const currentMealType = MEALS[mealIndex];
        const categoryRecipes = activeRecipes.filter(r =>
            r.tags.some(t => {
                if (currentMealType === 'Desayuno') return t === 'Desayuno';
                if (currentMealType === 'Media Mañana') return t === 'Snack' || t === 'Desayuno' || t === 'Rápido';
                if (currentMealType === 'Comida') return t === 'Comida' || t === 'Legumbre';
                if (currentMealType === 'Cena') return t === 'Cena' || t === 'Ligero';
                return false;
            })
        );
        const pool = categoryRecipes.length > 0 ? categoryRecipes : activeRecipes;
        return pool[seed % pool.length];
    };

    if (activeRecipes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-center p-6">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <CalendarDays size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">No hay menú activo</h2>
                <p className="text-slate-500 mb-6 max-w-xs">Activa un borrador para ver tu planificación semanal.</p>
                <button onClick={() => navigate('/menu/draft')} className="text-emerald-600 font-semibold hover:underline">
                    Ir al Borrador
                </button>
            </div>
        )
    }

    return (
        <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-white px-6 py-4 flex items-center justify-between shadow-sm border-b border-slate-100 flex-shrink-0 z-10">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight 2xl:text-3xl transition-all">Plan Vegano</h1>
                    <p className="text-xs text-slate-400 2xl:text-sm">by Jamie Oliver</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                        <button className="p-1 hover:bg-white rounded-md shadow-sm transition-all"><ChevronLeft size={16} className="text-slate-500" /></button>
                        <span className="text-xs font-bold text-slate-600 px-2 2xl:text-sm">Semana 31</span>
                        <button className="p-1 hover:bg-white rounded-md shadow-sm transition-all"><ChevronRight size={16} className="text-slate-500" /></button>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600">
                        <Settings size={20} className="2xl:w-6 2xl:h-6" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600">
                        <Share2 size={20} className="2xl:w-6 2xl:h-6" />
                    </button>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-4 md:p-6 2xl:p-10 bg-slate-50/50">
                <AnimatePresence mode="wait">
                    {isLoadingMagic ? (
                        <MenuSkeleton key="skeleton" />
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="min-w-[1000px] xl:min-w-0 xl:w-full h-full grid grid-cols-7 gap-3 2xl:gap-6"
                        >
                            {weekDates.map((day, dayIndex) => (
                                <div
                                    key={day.name}
                                    className={clsx(
                                        "rounded-2xl p-3 2xl:p-5 flex flex-col gap-3 2xl:gap-6 border transition-all h-full",
                                        day.isToday
                                            ? "bg-slate-800 border-slate-700 shadow-2xl shadow-slate-300 ring-4 ring-slate-200/50 scale-[1.01] z-10"
                                            : "bg-white border-slate-100 hover:shadow-lg hover:border-slate-200"
                                    )}
                                >
                                    {/* Column Header */}
                                    <div className="mb-1 2xl:mb-4 text-center">
                                        <p className={clsx(
                                            "text-[10px] 2xl:text-sm font-bold uppercase tracking-wider mb-1",
                                            day.isToday ? "text-emerald-400" : "text-slate-500"
                                        )}>
                                            {day.name} {day.date}
                                        </p>
                                        <h3 className={clsx(
                                            "text-xs 2xl:text-xl font-black uppercase tracking-widest",
                                            day.isToday ? "text-white" : "text-slate-900"
                                        )}>
                                            Desayuno
                                        </h3>
                                    </div>

                                    {/* Meal Slots */}
                                    <div className="flex-1 flex flex-col gap-3 2xl:gap-5">
                                        {MEALS.map((mealType, mealIndex) => {
                                            const recipe = getRecipeForSlot(dayIndex, mealIndex);
                                            // Determine label (skip first as header covers it?)
                                            // The design usually lists Breakfast items directly under "Breakfast" header.
                                            // But for subsequent meals "Lunch", "Dinner", we need labels.
                                            return (
                                                <div key={mealType} className="flex flex-col gap-1 2xl:gap-2">
                                                    {mealIndex > 0 && (
                                                        <span className={clsx(
                                                            "text-[9px] 2xl:text-xs font-black uppercase tracking-widest opacity-60",
                                                            day.isToday ? "text-slate-400" : "text-slate-400"
                                                        )}>
                                                            {mealType === 'Media Mañana' ? 'Snack' : mealType}
                                                        </span>
                                                    )}
                                                    <MenuCard recipe={recipe} isDark={day.isToday} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

const MenuCard = ({ recipe, isDark }: { recipe: Recipe | null, isDark?: boolean }) => {
    if (!recipe) return <div className={clsx("h-16 2xl:h-24 rounded-xl border-2 border-dashed opacity-50", isDark ? "border-slate-600 bg-slate-700" : "border-slate-200 bg-slate-50")}></div>;

    return (
        <div className={clsx(
            "group flex items-center gap-3 p-2 2xl:p-3 rounded-xl shadow-sm cursor-pointer transition-all duration-300",
            isDark
                ? "bg-slate-700/50 hover:bg-slate-700 border border-slate-600"
                : "bg-white hover:shadow-md border border-slate-100 hover:border-emerald-200"
        )}>
            <div className="relative overflow-hidden rounded-lg w-12 h-12 2xl:w-20 2xl:h-20 flex-shrink-0">
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <div className="min-w-0 flex-1">
                <p className={clsx(
                    "text-[11px] 2xl:text-base font-bold leading-tight line-clamp-2 mb-0.5",
                    isDark ? "text-slate-100" : "text-slate-700"
                )}>
                    {recipe.name}
                </p>
                <p className={clsx(
                    "text-[9px] 2xl:text-xs truncate font-medium",
                    isDark ? "text-slate-400" : "text-slate-400"
                )}>
                    {recipe.tags[0]}
                </p>
            </div>
        </div>
    )
}
