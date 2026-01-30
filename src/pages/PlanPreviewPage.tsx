import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Share2, Info, Wand2, ArrowLeft } from 'lucide-react';
import { RECIPES } from '../data/recipes';
import { WeeklyGrid } from '../components/WeeklyGrid';
import { PlanInfoSidebar } from '../components/PlanInfoSidebar';
import type { Recipe } from '../types';

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const MEALS = ['Desayuno', 'Media Mañana', 'Comida', 'Cena'];

// Helper to generate generic preview dates (always nice looking starting Monday)
const getPreviewDates = () => {
    // Current date or fixed date for consistency
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
    const { planTitle, planImage } = location.state || {}; // Expecting basic plan info
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const dates = useMemo(() => getPreviewDates(), []);

    // Mock generic recipe distribution matching categories loosely
    const getRecipeForSlot = (dayIndex: number, mealIndex: number): Recipe | null => {
        const currentMealType = MEALS[mealIndex];
        // Filter recipes loosely by meal type to make it look realistic
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
        // Simple consistent seed
        const seed = dayIndex + (mealIndex * 7);
        return pool[seed % pool.length];
    };

    const handleBack = () => navigate(-1);

    // Start specific personalization flow
    const handlePersonalize = () => {
        navigate('/tinder-mode', {
            state: {
                planTitle: planTitle || "Plan Personalizado",
                planImage: planImage
            }
        });
    };

    return (
        <div className="h-screen bg-slate-50 flex flex-col overflow-hidden relative">
            {/* Header */}
            <header className="bg-white px-6 py-4 flex items-center justify-between shadow-sm border-b border-slate-100 flex-shrink-0 z-10 transition-all">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBack}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                    >
                        <ArrowLeft size={22} />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{planTitle || "Vista Previa del Plan"}</h1>
                        <p className="text-xs text-slate-400">by Jamie Oliver</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Week Nav - Static/Mock for Preview */}
                    <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                        <button className="p-1 hover:bg-white rounded-md shadow-sm transition-all"><ChevronLeft size={16} className="text-slate-500" /></button>
                        <span className="text-xs font-bold text-slate-600 px-2">Semana 31</span>
                        <button className="p-1 hover:bg-white rounded-md shadow-sm transition-all"><ChevronRight size={16} className="text-slate-500" /></button>
                    </div>

                    <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>

                    {/* Actions */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
                    >
                        <Info size={20} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                        <Share2 size={20} />
                    </button>

                    <button
                        onClick={handlePersonalize}
                        className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-95 ml-2"
                    >
                        <Wand2 size={16} className="text-purple-400" />
                        Personalizar
                    </button>
                </div>
            </header>

            {/* Content Area - Weekly Grid */}
            <div className="flex-1 overflow-auto p-4 md:p-6 2xl:p-10 bg-slate-50/50">
                <WeeklyGrid
                    dates={dates}
                    getRecipeForSlot={getRecipeForSlot}
                />
            </div>

            {/* Mobile Fab for CTA */}
            <div className="md:hidden fixed bottom-6 right-6 z-20">
                <button
                    onClick={handlePersonalize}
                    className="w-14 h-14 bg-slate-900 text-white rounded-full shadow-xl flex items-center justify-center animate-bounce-slow"
                >
                    <Wand2 size={24} className="text-purple-400" />
                </button>
            </div>

            {/* Sidebar */}
            <PlanInfoSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onPersonalize={handlePersonalize}
                planTitle={planTitle}
            />
        </div>
    );
};
