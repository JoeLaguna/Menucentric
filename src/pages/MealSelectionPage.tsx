import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StickyHeader } from '../components/MealSelection/StickyHeader';
import type { AIPreset } from '../components/MealSelection/StickyHeader';
import { MealGrid } from '../components/MealSelection/MealGrid';
import { ActionFooter } from '../components/MealSelection/ActionFooter';
import { RECIPES } from '../data/recipes';
import { useMenuStore } from '../store/useMenuStore';

export const MealSelectionPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { planTitle } = location.state || {}; // Pass through plan info

    // Store integration
    // Store integration
    const activateMenu = useMenuStore((state) => state.activateMenu);
    const setPreferences = useMenuStore((state) => state.setPreferences);
    const activeMenu = useMenuStore((state) => state.activeMenu);

    // Local State
    // Initialize from activeMenu to allow "Edit" functionality
    const [selectedIds, setSelectedIds] = useState<Set<string>>(() => {
        const initial = new Set<string>();
        activeMenu.forEach(p => {
            if (p.wantsThisWeek) initial.add(p.recipeId);
        });
        return initial;
    });

    const [activePreset, setActivePreset] = useState<AIPreset>('none');

    // Toggle Logic
    const handleToggle = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedIds(newSet);
    };

    // AI Preset Logic
    useEffect(() => {
        if (activePreset === 'none') return;

        const newSet = new Set<string>();

        RECIPES.forEach(recipe => {
            let shouldSelect = false;

            if (activePreset === 'healthy') {
                shouldSelect = recipe.calories < 550 || recipe.tags.some(t => ['saludable', 'ligero', 'veggie'].includes(t.toLowerCase()));
            } else if (activePreset === 'express') {
                shouldSelect = recipe.time <= 20;
            } else if (activePreset === 'savings') {
                // Mock logic: select "Legumbre", "Pasta", "Arroz" as cheaper options
                shouldSelect = recipe.tags.some(t => ['legumbre', 'pasta', 'arroz', 'económico'].includes(t.toLowerCase()));
            }

            if (shouldSelect) newSet.add(recipe.id);
        });

        // Apply "Sweep" animation effect by replacing state
        // In a real app we might want to additive or toggle, but "replacing" feels more like a "Mode"
        setSelectedIds(newSet);

        // Optional: Reset preset after application or keep it as a toggle? 
        // For "Bring" pattern, usually pills are filters/actions. Let's keep it active visually.
    }, [activePreset]);

    const handleGenerate = () => {
        // Sync to store using bulk update
        const newPreferences = Array.from(selectedIds).map(id => ({
            recipeId: id,
            wantsThisWeek: true
        }));

        // Overwrite preferences with current selection
        setPreferences(newPreferences);

        activateMenu();
        navigate('/home', { state: { showConfetti: true, planTitle: planTitle || 'Mi Menú Personalizado' } });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col relative transition-colors duration-300">

            <StickyHeader
                activePreset={activePreset}
                onPresetChange={setActivePreset}
                totalSelected={selectedIds.size}
            />

            <MealGrid
                recipes={RECIPES}
                selectedIds={selectedIds}
                onToggle={handleToggle}
            />

            <ActionFooter
                selectedCount={selectedIds.size}
                targetCount={14} // Mock target: 7 days * 2 main meals
                onGenerate={handleGenerate}
            />

        </div>
    );
};
