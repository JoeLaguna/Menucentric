
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import clsx from 'clsx';
import { RECIPES } from '../data/recipes';
import { WeeklyGrid } from '../components/WeeklyGrid';
import { PlanContextPanel } from '../components/PlanContextPanel';
import { PlanInfoSidebar } from '../components/PlanInfoSidebar';
import { SidebarMealSelection } from '../components/MealSelection/SidebarMealSelection';
import type { Recipe } from '../types';

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const MEALS = ['Desayuno', 'Media Mañana', 'Comida', 'Cena'];

// Helper to generate generic preview dates
const getPreviewDates = () => {
    const today = new Date();
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
            isToday: i === 3 // Thursday as fake "today" for preview visual
        };
    });
}

export const PlanPreviewPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { planTitle, planImage } = location.state || {};
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // A/B Test State
    const [isMealSelectionOpen, setIsMealSelectionOpen] = useState(false);

    // Resize State
    const [sidebarWidth, setSidebarWidth] = useState(28); // Reverted to default responsive width
    const [isResizing, setIsResizing] = useState(false);

    const dates = useMemo(() => getPreviewDates(), []);

    // Mock generic recipe distribution
    const getRecipeForSlot = (dayIndex: number, mealIndex: number): Recipe | null => {
        const currentMealType = MEALS[mealIndex];
        const compatibleRecipes = RECIPES.filter(r =>
            r.tags.some(t => {
                const tag = t.toLowerCase();
                if (currentMealType === 'Desayuno') return tag === 'desayuno';
                if (currentMealType === 'Media Mañana') return tag === 'snack' || tag === 'desayuno';
                if (currentMealType === 'Comida') return tag === 'comida' || tag === 'legumbre' || tag === 'pasta';
                if (currentMealType === 'Cena') return tag === 'cena' || tag === 'ligero';
                return false;
            })
        );
        const pool = compatibleRecipes.length > 0 ? compatibleRecipes : RECIPES;
        const seed = dayIndex + (mealIndex * 7);
        return pool[seed % pool.length];
    };

    const handleBack = () => navigate(-1);

    // Flow A: Dedicated Page
    const handlePersonalize = () => {
        navigate('/meal-selection', {
            state: {
                planTitle: planTitle || "Plan Personalizado",
                planImage: planImage
            }
        });
    };

    // Flow B: Sidebar
    const handlePersonalizeSidebar = () => {
        setIsMealSelectionOpen(true);
    };

    const handleGenerateMenu = () => {
        setIsMealSelectionOpen(false);
        navigate('/home', { state: { showConfetti: true, planTitle: planTitle || 'Mi Menú Personalizado' } });
    };

    // Resize Handlers
    const startResizing = React.useCallback(() => {
        setIsResizing(true);
    }, []);

    const stopResizing = React.useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = React.useCallback(
        (mouseMoveEvent: MouseEvent) => {
            if (isResizing) {
                // Calculate width from the RIGHT side
                const newWidth = ((window.innerWidth - mouseMoveEvent.clientX) / window.innerWidth) * 100;
                if (newWidth > 20 && newWidth < 60) { // Limits maintained
                    setSidebarWidth(newWidth);
                }
            }
        },
        [isResizing]
    );

    React.useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    return (
        <div className="h-full bg-slate-50 dark:bg-slate-950 flex flex-col lg:flex-row overflow-hidden select-none transition-colors duration-300">

            {/* Right Panel - Grid Content (Now Left) */}
            <div className="flex-1 h-full relative flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden order-2 lg:order-1 transition-colors">

                {/* Simplified Header for Grid Area */}
                <div className="flex-shrink-0 px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-10 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 transition-colors">
                            <button className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md shadow-sm transition-all text-slate-500 dark:text-slate-400"><ChevronLeft size={18} /></button>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 px-3">Semana 31</span>
                            <button className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md shadow-sm transition-all text-slate-500 dark:text-slate-400"><ChevronRight size={18} /></button>
                        </div>
                    </div>

                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
                        <Share2 size={20} />
                    </button>
                </div>

                {/* Scrollable Grid Area */}
                <div className="flex-1 overflow-y-auto overflow-x-auto px-4 py-2 md:px-6 md:py-4 2xl:p-10 custom-scrollbar">
                    <div className="w-full min-w-0 mx-auto h-full">
                        <WeeklyGrid
                            dates={dates}
                            getRecipeForSlot={getRecipeForSlot}
                        />
                    </div>
                    {/* Bottom Spacer for mobile fab clearance */}
                    <div className="h-24 lg:hidden shrink-0" />
                </div>
            </div>

            {/* Drag Handle (Desktop Only) */}
            <div
                className="hidden lg:flex w-4 bg-slate-100/50 dark:bg-slate-800/50 hover:bg-emerald-500/20 dark:hover:bg-emerald-500/10 cursor-col-resize items-center justify-center transition-colors z-30 -mr-2 order-1 lg:order-2"
                onMouseDown={startResizing}
                style={{ cursor: 'col-resize' }}
            >
                <div className={clsx(
                    "w-1 h-8 rounded-full transition-colors",
                    isResizing ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"
                )} />
            </div>

            {/* Context Panel (Now Right) */}
            <div
                className="w-full lg:h-full flex-shrink-0 relative z-20 shadow-[-10px_0_30px_-5px_rgba(0,0,0,0.1)] transition-all duration-75 ease-out order-1 lg:order-3 bg-white dark:bg-slate-950 overflow-hidden"
                style={{ width: window.innerWidth >= 1024 ? `${sidebarWidth}%` : '100%', height: window.innerWidth < 1024 ? '40vh' : '100%' }}
            >
                <AnimatePresence mode="wait">
                    {isMealSelectionOpen ? (
                        <SidebarMealSelection
                            key="meal-selection"
                            planTitle={planTitle || "Plan Semanal"}
                            onGenerate={handleGenerateMenu}
                            onClose={() => setIsMealSelectionOpen(false)}
                        />
                    ) : (
                        <motion.div
                            key="context-panel"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full"
                        >
                            <PlanContextPanel
                                title={planTitle || "Plan Semanal"}
                                image={planImage || "/images/plans/default.jpg"}
                                onBack={handleBack}
                                onPersonalize={handlePersonalize}
                                onPersonalizeSidebar={handlePersonalizeSidebar}
                                className="h-full"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Optional Sidebar (Legacy) */}
            <PlanInfoSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onPersonalize={handlePersonalize}
                planTitle={planTitle}
            />
        </div>
    );
};
