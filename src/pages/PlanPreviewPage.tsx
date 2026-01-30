

import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { RECIPES } from '../data/recipes';
import { WeeklyGrid } from '../components/WeeklyGrid';
import { PlanContextPanel } from '../components/PlanContextPanel';
import { PlanInfoSidebar } from '../components/PlanInfoSidebar';
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

    const handlePersonalize = () => {
        navigate('/tinder-mode', {
            state: {
                planTitle: planTitle || "Plan Personalizado",
                planImage: planImage
            }
        });
    };

    return (
        <div className="h-screen bg-slate-50 flex flex-col lg:flex-row overflow-hidden">

            {/* Left Panel - Context (Sticky/Fixed aesthetic) */}
            <div className="w-full lg:w-[35%] h-[40vh] lg:h-full flex-shrink-0 relative z-20 shadow-2xl">
                <PlanContextPanel
                    title={planTitle || "Plan Semanal"}
                    image={planImage || "/images/plans/default.jpg"}
                    onBack={handleBack}
                    onPersonalize={handlePersonalize}
                    className="h-full"
                />
            </div>

            {/* Right Panel - Grid Content */}
            <div className="flex-1 h-full relative flex flex-col bg-slate-50 overflow-hidden">

                {/* Simplified Header for Grid Area */}
                <div className="flex-shrink-0 px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                            <button className="p-1 hover:bg-white rounded-md shadow-sm transition-all text-slate-500"><ChevronLeft size={18} /></button>
                            <span className="text-sm font-bold text-slate-700 px-3">Semana 31</span>
                            <button className="p-1 hover:bg-white rounded-md shadow-sm transition-all text-slate-500"><ChevronRight size={18} /></button>
                        </div>
                    </div>

                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                        <Share2 size={20} />
                    </button>
                </div>

                {/* Scrollable Grid Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8">
                    <div className="max-w-[1600px] mx-auto">
                        <WeeklyGrid
                            dates={dates}
                            getRecipeForSlot={getRecipeForSlot}
                        />
                    </div>
                    {/* Bottom Spacer for mobile fab clearance if needed */}
                    <div className="h-24 lg:h-8" />
                </div>
            </div>

            {/* Sidebar (Optional info) */}
            <PlanInfoSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onPersonalize={handlePersonalize}
                planTitle={planTitle}
            />
        </div>
    );
};
