import { useState, useEffect, useRef } from 'react';
import { useMenuStore } from '../store/useMenuStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { CalendarDays, Settings, ChevronLeft, ChevronRight, Share2, Wand2, Sparkles } from 'lucide-react';
import type { Recipe } from '../types';
import { RECIPES } from '../data/recipes';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuSkeleton } from '../components/MenuSkeleton';
import { WeeklyGrid } from '../components/WeeklyGrid';
import { BackgroundPicker } from '../components/BackgroundPicker';
import { SidebarMealSelection } from '../components/MealSelection/SidebarMealSelection';
import clsx from 'clsx';

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const MEALS = ['Desayuno', 'Media Mañana', 'Comida', 'Cena'];

// Simulated dates generator
const getDatesForWeek = (offsetWeeks: number = 0) => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sunday
    const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + distanceToMonday + (offsetWeeks * 7));

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
    const nextWeekMenu = useMenuStore((state) => state.nextWeekMenu);
    const background = useMenuStore((state) => state.background);

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [weekOffset, setWeekOffset] = useState<0 | 1>(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const settingsRef = useRef<HTMLDivElement>(null);

    const weekDates = getDatesForWeek(weekOffset).map((d, i) => ({
        ...d,
        isToday: weekOffset === 0 && new Date().getDay() === (i + 1) % 7
    }));

    // If we have confetti state, we assume we are coming from the magic generation
    // and should show the skeleton load first.
    const [isLoadingMagic, setIsLoadingMagic] = useState(!!location.state?.showConfetti);

    const triggerConfetti = () => {
        setIsLoadingMagic(true);
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#34d399', '#ffbbf24', '#818cf8'] });
            confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#34d399', '#ffbbf24', '#818cf8'] });

            if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();

        setTimeout(() => {
            setIsLoadingMagic(false);
        }, 2500);
    };

    useEffect(() => {
        if (location.state?.showConfetti) {
            triggerConfetti();

            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    // Close settings popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setIsSettingsOpen(false);
            }
        };

        if (isSettingsOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSettingsOpen]);

    const currentViewMenu = weekOffset === 0 ? activeMenu : (nextWeekMenu || []);

    const activeRecipes = currentViewMenu
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

    const isGhostMode = weekOffset === 1 && activeRecipes.length === 0;

    if (activeRecipes.length === 0 && weekOffset === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 text-center p-6 transition-colors">
                <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400 dark:text-slate-500">
                    <CalendarDays size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">No hay menú activo</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-xs">Activa un borrador para ver tu planificación semanal.</p>
                <button onClick={() => navigate('/menu/draft')} className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                    Ir al Borrador
                </button>
            </div>
        )
    }

    return (
        <div className={clsx(
            "h-screen flex flex-col overflow-hidden transition-colors relative",
            !background && "bg-slate-50 dark:bg-slate-950"
        )}>

            {/* Dynamic Background Layer */}
            <div className="absolute inset-0 z-0 transition-all duration-500">
                {background?.type === 'image' ? (
                    <>
                        <img src={background.value} alt="Fondo" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20" />
                    </>
                ) : background?.type === 'color' ? (
                    <div className={`w-full h-full ${background.value}`} />
                ) : null}
            </div>

            {/* Header */}
            <header className="relative z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2 md:px-6 md:py-4 flex items-center justify-between shadow-sm border-b border-slate-100/50 dark:border-slate-800/50 flex-shrink-0 transition-colors">
                <div>
                    <h1 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight 2xl:text-3xl transition-all">{location.state?.planTitle || "Plan Personalizado"}</h1>
                    <p className="hidden md:block text-xs text-slate-400 dark:text-slate-500 2xl:text-sm">by Jamie Oliver</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 transition-colors">
                        <button
                            disabled={weekOffset === 0}
                            onClick={() => setWeekOffset(0)}
                            className="p-1 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent rounded-md shadow-sm transition-all"
                        >
                            <ChevronLeft size={16} className="text-slate-500 dark:text-slate-400" />
                        </button>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 px-2 2xl:text-sm">
                            {weekOffset === 0 ? 'Esta Semana' : 'Próxima Semana'}
                        </span>
                        <button
                            disabled={weekOffset === 1}
                            onClick={() => setWeekOffset(1)}
                            className="p-1 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent rounded-md shadow-sm transition-all"
                        >
                            <ChevronRight size={16} className="text-slate-500 dark:text-slate-400" />
                        </button>
                    </div>

                    {/* Settings Popover */}
                    <div className="relative" ref={settingsRef}>
                        <button
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                            className={clsx(
                                "p-2 rounded-lg transition-all",
                                isSettingsOpen ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white shadow-inner" : "text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                            )}
                        >
                            <Settings size={20} className="2xl:w-6 2xl:h-6" />
                        </button>

                        <AnimatePresence>
                            {isSettingsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-800 p-4 z-50 transform origin-top-right overflow-hidden flex flex-col gap-4"
                                >
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Ajustes del Tablero</h3>

                                    <button
                                        onClick={() => navigate('/meal-selection')}
                                        className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg group-hover:scale-110 transition-transform">
                                                <Wand2 size={16} />
                                            </div>
                                            <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Personalizar Menú</span>
                                        </div>
                                    </button>

                                    <div className="flex flex-col gap-2">
                                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Fondo del Tablero</p>
                                        <BackgroundPicker />
                                    </div>

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                        title="Generar Nuevo Menú"
                    >
                        <Sparkles size={20} className="2xl:w-6 2xl:h-6" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                        <Share2 size={20} className="2xl:w-6 2xl:h-6" />
                    </button>
                </div>
            </header>

            <div className={clsx(
                "relative z-10 flex-1 flex flex-col overflow-y-auto overflow-x-auto p-4 md:p-6 2xl:p-10 transition-colors custom-scrollbar",
                !background && "bg-slate-50/50 dark:bg-slate-950"
            )}>
                <div className="w-full flex-1 min-w-0 mx-auto flex flex-col">
                    <AnimatePresence mode="wait">
                        {isLoadingMagic ? (
                            <MenuSkeleton key="skeleton" />
                        ) : (
                            <div className="relative h-full flex flex-col">
                                {isGhostMode && (
                                    <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 mb-8 backdrop-blur-md bg-white/60 dark:bg-slate-900/60 p-6 shadow-2xl rounded-3xl border border-white/50 dark:border-slate-700/50 flex flex-col items-center">
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 text-center">Planifica tu semana</h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 text-center max-w-sm">No tienes menú generado para la próxima semana. Visualiza tus opciones aquí.</p>
                                        <button
                                            onClick={() => setIsSidebarOpen(true)}
                                            className="bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-900/15"
                                        >
                                            <Sparkles size={18} />
                                            Generar Nuevo Menú
                                        </button>
                                    </div>
                                )}
                                <div className={clsx("transition-all h-full", isGhostMode && "opacity-60 blur-[2px] pointer-events-none")}>
                                    <WeeklyGrid
                                        dates={weekDates}
                                        getRecipeForSlot={getRecipeForSlot}
                                        hasBackground={!!background}
                                        isGhostMode={isGhostMode}
                                    />
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
                {/* Bottom Spacer for mobile fab clearance */}
                <div className="h-24 lg:hidden shrink-0" />
            </div>

            {/* Sidebar Overlay Modal */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <div className="fixed inset-0 z-50 flex justify-end">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="w-full sm:w-[600px] md:w-[700px] lg:w-[800px] bg-white dark:bg-slate-950 h-full relative z-10 shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.1)]"
                        >
                            <SidebarMealSelection
                                planTitle="Menú Próxima Semana"
                                isNextWeek={true}
                                onGenerate={() => {
                                    setIsSidebarOpen(false);
                                    setIsLoadingMagic(true);
                                    triggerConfetti();
                                }}
                                onClose={() => setIsSidebarOpen(false)}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
