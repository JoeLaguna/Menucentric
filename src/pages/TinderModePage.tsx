import { useState, useRef, createRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TinderCard } from '../components/TinderCard';
import { RecipeDetailsModal } from '../components/RecipeDetailsModal';
import { useMenuStore } from '../store/useMenuStore';
import type { Recipe } from '../types';
import { AnimatePresence, motion } from 'framer-motion';
import { Undo2, X, Check, LayoutGrid, Users, Utensils } from 'lucide-react';
import { RECIPES } from '../data/recipes';
import { MenuSkeleton } from '../components/MenuSkeleton';
import clsx from 'clsx';

// --- Types & Helper Components ---

type SectionType = 'Desayuno' | 'Media Mañana' | 'Comida' | 'Cena';
type Step = 'intro' | 'people' | 'meals' | 'swiping' | 'review';

interface DeckItem {
    id: string;
    type: 'recipe';
    recipe: Recipe;
    sectionType: SectionType;
}

// Helper to organize the deck
const buildDeck = (): DeckItem[] => {
    // Group recipes
    const prayers = {
        Desayuno: RECIPES.filter(r => r.tags.some(t => t.toLowerCase() === 'desayuno')),
        Comida: RECIPES.filter(r => r.tags.some(t => t.toLowerCase() === 'comida')),
        Cena: RECIPES.filter(r => r.tags.some(t => t.toLowerCase() === 'cena')),
    };

    const deck: DeckItem[] = [];

    // Stack Order: Bottom -> Top. 
    prayers.Cena.forEach(r => deck.push({ id: r.id, type: 'recipe', recipe: r, sectionType: 'Cena' }));
    prayers.Comida.forEach(r => deck.push({ id: r.id, type: 'recipe', recipe: r, sectionType: 'Comida' }));
    prayers.Desayuno.forEach(r => deck.push({ id: r.id, type: 'recipe', recipe: r, sectionType: 'Desayuno' }));

    return deck;
};

// --- Modals ---

// --- Mock Data & Helpers for Background ---
const BACKGROUND_DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const BACKGROUND_MEALS = ['Desayuno', 'Media Mañana', 'Comida', 'Cena'];

const MenuCard = ({ recipe, isDark }: { recipe: Recipe, isDark?: boolean }) => (
    <div className={clsx(
        "group flex items-center gap-3 p-2 2xl:p-3 rounded-xl shadow-sm transition-all duration-300",
        isDark
            ? "bg-slate-700/50 border border-slate-600"
            : "bg-white border border-slate-100"
    )}>
        <div className="relative overflow-hidden rounded-lg w-12 h-12 2xl:w-20 2xl:h-20 flex-shrink-0 bg-slate-200">
            <img
                src={recipe.image}
                alt=""
                className="w-full h-full object-cover grayscale-[0.2]"
            />
        </div>

        <div className="min-w-0 flex-1">
            <p className={clsx(
                "text-[10px] 2xl:text-base font-bold leading-tight line-clamp-2 mb-0.5",
                isDark ? "text-slate-100" : "text-slate-700"
            )}>
                {recipe.name}
            </p>
            <p className={clsx(
                "text-[9px] 2xl:text-xs truncate font-medium",
                isDark ? "text-slate-400" : "text-slate-400"
            )}>
                {recipe.tags[0] || 'Plato'}
            </p>
        </div>
    </div>
);

// A background that mirrors the actual ActiveMenuPage structure
const RealMenuBackground = () => {
    return (
        <div className="w-full h-full flex flex-col bg-slate-50/50 p-6 md:p-8 2xl:p-12 overflow-hidden opacity-100">
            {/* Header Mock */}
            <div className="mb-8 flex items-center justify-between opacity-50">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Plan Vegano</h1>
                    <p className="text-xs text-slate-400">by MenuCentric AI</p>
                </div>
                <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                    <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-7 gap-3 2xl:gap-6 scale-[0.85] 2xl:scale-95 origin-top-center">
                {BACKGROUND_DAYS.map((dayName, i) => {
                    // Make Wednesday the "active" dark day for visual interest
                    const isToday = i === 2;

                    return (
                        <div
                            key={dayName}
                            className={clsx(
                                "rounded-2xl p-3 2xl:p-5 flex flex-col gap-3 2xl:gap-5 border h-full",
                                isToday
                                    ? "bg-slate-800 border-slate-700 shadow-2xl"
                                    : "bg-white border-slate-100"
                            )}
                        >
                            {/* Column Header */}
                            <div className="mb-1 2xl:mb-4 text-center">
                                <p className={clsx(
                                    "text-[10px] 2xl:text-sm font-bold uppercase tracking-wider mb-1",
                                    isToday ? "text-emerald-400" : "text-slate-500"
                                )}>
                                    {dayName} {12 + i}
                                </p>
                                <h3 className={clsx(
                                    "text-xs 2xl:text-xl font-black uppercase tracking-widest",
                                    isToday ? "text-white" : "text-slate-900"
                                )}>
                                    Desayuno
                                </h3>
                            </div>

                            {/* Meal Slots */}
                            <div className="flex-1 flex flex-col gap-3 2xl:gap-5">
                                {BACKGROUND_MEALS.map((mealType, j) => {
                                    // Pick a random recipe seeded by index
                                    const recipe = RECIPES[(i * 4 + j) % RECIPES.length];

                                    return (
                                        <div key={mealType} className="flex flex-col gap-1 2xl:gap-2">
                                            {j > 0 && (
                                                <span className={clsx(
                                                    "text-[9px] 2xl:text-xs font-black uppercase tracking-widest opacity-60",
                                                    isToday ? "text-slate-400" : "text-slate-400"
                                                )}>
                                                    {mealType === 'Media Mañana' ? 'Snack' : mealType}
                                                </span>
                                            )}
                                            <MenuCard recipe={recipe} isDark={isToday} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Helper: Visual Mock of the Calendar Background matching ActiveMenuPage design
// We update this helper too to use the RealMenuBackground so consistency is maintained everywhere
// Helper: Visual Mock of the Calendar Background matching ActiveMenuPage design
// Now using a SKELETON representation for the Draft phase as requested
const MockCalendarBackground = () => (
    <div className="absolute inset-0 z-0 opacity-50 pointer-events-none overflow-hidden bg-slate-50">
        <div className="w-full h-full flex flex-col p-6 md:p-8 2xl:p-12">
            {/* Skeleton Header matching RealMenuBackground */}
            <div className="mb-8 flex items-center justify-between opacity-50">
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
                    <div className="h-4 w-24 bg-slate-200 rounded-lg animate-pulse" />
                </div>
                <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse"></div>
                    <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse"></div>
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="flex-1 scale-[0.85] 2xl:scale-95 origin-top-center">
                <MenuSkeleton />
            </div>
        </div>
    </div>
);


const BackgroundWrapper = ({ children, maxWidth = "max-w-md 2xl:max-w-xl" }: { children: React.ReactNode, maxWidth?: string }) => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white overflow-hidden">
        {/* Background Menu to simulate context */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <RealMenuBackground />
        </div>

        {/* Overlay for focus - Lighter blur as requested */}
        <div className="absolute inset-0 z-0 bg-slate-900/40 backdrop-blur-[1px] pointer-events-none" />

        {/* Modal */}
        <div className={`z-10 w-full ${maxWidth} transition-all duration-300 relative`}>
            {children}
        </div>
    </div>
);

const IntroModal = ({ onNext }: { onNext: () => void }) => {
    // Mock data for the "Some recipes" strip
    const sampleRecipes = RECIPES.slice(0, 4);

    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]"
        >
            {/* Left Content */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Nuevo</span>
                        <div className="flex gap-2 text-slate-400">
                            {/* Mock Social Icons */}
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center hover:bg-sky-100 hover:text-sky-500 transition-colors cursor-pointer"><Users size={12} /></div>
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center hover:bg-emerald-100 hover:text-emerald-500 transition-colors cursor-pointer"><Check size={12} /></div>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 leading-tight">
                        Tu Menú Semanal <br />
                        <span className="text-emerald-500">Saludable & Fácil</span>
                    </h1>
                    <p className="text-slate-400 text-sm font-medium mb-6 uppercase tracking-wide">by MenuCentric AI</p>

                    <p className="text-slate-600 leading-relaxed text-lg mb-8">
                        Un plan diseñado para <strong>ahorrarte tiempo</strong> y mejorar tu alimentación.
                        Selecciona tus platos favoritos y nosotros generamos automáticamente tu menú y
                        tu lista de la compra. ¡Comer bien nunca fue tan fácil!
                    </p>

                    <button
                        onClick={onNext}
                        className="w-full bg-rose-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-200 hover:bg-rose-600 hover:scale-[1.02] transition-all active:scale-95 text-lg mb-10 flex items-center justify-center gap-2"
                    >
                        Empezar es gratis
                    </button>
                </div>

                {/* Recipes Strip */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-sm font-bold text-slate-700 mb-3">Algunas recetas de tu plan:</p>
                    <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
                        {sampleRecipes.map(recipe => (
                            <img
                                key={recipe.id}
                                src={recipe.image}
                                alt={recipe.name}
                                className="w-16 h-16 rounded-lg object-cover shadow-sm flex-shrink-0"
                            />
                        ))}
                        <div className="w-16 h-16 rounded-lg bg-slate-200 flex flex-col items-center justify-center text-slate-500 text-xs font-bold leading-tight flex-shrink-0">
                            <span>+50</span>
                            <span>Recetas</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Content */}
            <div className="w-full md:w-[400px] bg-slate-50 p-8 flex flex-col border-l border-slate-100">
                {/* Hero Image */}
                <div className="rounded-2xl overflow-hidden shadow-md mb-8 h-64 md:h-auto flex-1 relative group">
                    <img
                        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt="Healthy Food"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Benefits */}
                <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-4">Lo que consigues</h3>
                    <ul className="space-y-4">
                        {[
                            'Ahorra tiempo en la cocina',
                            'Lista de compra automática',
                            'Reduce el desperdicio',
                            'Mejora tu energía diaria'
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                                    <Check size={12} strokeWidth={3} />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};

const ConfigPeopleModal = ({ onNext }: { onNext: (val: number) => void }) => {
    const [selected, setSelected] = useState(2);

    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col w-full"
        >
            {/* Progress Bar (Step 1 of 2) */}
            <div className="h-1.5 w-full bg-slate-100">
                <div className="h-full bg-emerald-500 w-1/2"></div>
            </div>

            <div className="p-8 2xl:p-12">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 mb-6">
                    <Users size={24} />
                </div>

                <h2 className="text-2xl 2xl:text-3xl font-bold text-slate-900 mb-2">¿Para cuántos cocinas?</h2>
                <p className="text-slate-500 text-sm mb-12">Ajustaremos las cantidades de la lista de la compra automáticamente.</p>

                {/* Big Number Display */}
                <div className="flex justify-center items-baseline gap-2 mb-8">
                    <span className="text-6xl font-extrabold text-slate-900">{selected}</span>
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">PERSONAS</span>
                </div>

                {/* Slider UI Mock */}
                <div className="relative h-2 bg-slate-100 rounded-full mb-4 mx-4">
                    <div
                        className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${((selected - 1) / 3) * 100}%` }}
                    ></div>
                    {/* Knobs / Click areas */}
                    {[1, 2, 3, 4].map((n) => (
                        <div
                            key={n}
                            onClick={() => setSelected(n)}
                            className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 cursor-pointer transition-all hover:scale-110 ${n <= selected ? 'bg-white border-emerald-500 z-10' : 'bg-slate-200 border-white'
                                }`}
                            style={{ left: `${((n - 1) / 3) * 100}%`, marginLeft: '-12px' }}
                        ></div>
                    ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest px-1 mb-12">
                    <span>Solo yo</span>
                    <span>Familia XL</span>
                </div>

                <button
                    onClick={() => onNext(selected)}
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    Continuar
                </button>
            </div>
        </motion.div>
    )
};

const ConfigMealsModal = ({ onNext }: { onNext: (val: number) => void }) => {
    const [selected, setSelected] = useState(5); // Default to 5 as per design image

    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col w-full"
        >
            {/* Progress Bar (Step 2 of 2) */}
            <div className="h-1.5 w-full bg-slate-100">
                <div className="h-full bg-emerald-500 w-full"></div>
            </div>

            <div className="p-8 2xl:p-12">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-6">
                    <Utensils size={24} />
                </div>

                <h2 className="text-2xl 2xl:text-3xl font-bold text-slate-900 mb-2">Comidas diarias</h2>
                <p className="text-slate-500 text-sm mb-8">Define la estructura de tu día para que organicemos el menú.</p>

                <div className="space-y-4 mb-12">
                    {/* Option 3 Meals */}
                    <div
                        onClick={() => setSelected(3)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between group ${selected === 3
                            ? 'border-emerald-500 bg-emerald-50/30'
                            : 'border-slate-100 hover:border-emerald-200'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === 3 ? 'border-emerald-500' : 'border-slate-300'}`}>
                                {selected === 3 && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>}
                            </div>
                            <div>
                                <p className={`font-bold ${selected === 3 ? 'text-slate-900' : 'text-slate-700'}`}>3 Comidas</p>
                                <p className="text-xs text-slate-400">Desayuno, Comida, Cena</p>
                            </div>
                        </div>
                    </div>

                    {/* Option 5 Meals */}
                    <div
                        onClick={() => setSelected(5)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between group ${selected === 5
                            ? 'border-emerald-500 bg-emerald-50/50'
                            : 'border-slate-100 hover:border-emerald-200'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === 5 ? 'border-emerald-500' : 'border-slate-300'}`}>
                                {selected === 5 && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>}
                            </div>
                            <div>
                                <p className={`font-bold ${selected === 5 ? 'text-slate-900' : 'text-slate-700'}`}>5 Comidas</p>
                                <p className="text-xs text-slate-400 font-medium text-emerald-600">Incluye Media Mañana y Merienda</p>
                            </div>
                        </div>
                        {selected === 5 && <Check size={20} className="text-emerald-500" />}
                    </div>
                </div>

                <button
                    onClick={() => onNext(selected)}
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    Continuar
                </button>
            </div>
        </motion.div>
    )
};

// Review Draft Overlay Component (Updated Style)
const DraftReviewOverlay = ({ preferences, onGenerate, _onEdit }: { preferences: any[], onGenerate: () => void, _onEdit: () => void }) => {
    const selected = preferences
        .filter(p => p.wantsThisWeek)
        .map(p => RECIPES.find(r => r.id === p.recipeId))
        .filter(Boolean) as Recipe[];

    const byType = {
        Desayuno: selected.filter(r => r.tags.some(t => t.toLowerCase() === 'desayuno')),
        Comida: selected.filter(r => r.tags.some(t => t.toLowerCase() === 'comida')),
        Cena: selected.filter(r => r.tags.some(t => t.toLowerCase() === 'cena')),
    };

    return (
        <div className="fixed inset-0 z-[100] flex flex-col bg-slate-50 overflow-hidden">
            {/* Background "Calendar" Hint */}
            <MockCalendarBackground />

            {/* Content Container (Center Modal) */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-8 2xl:p-16 overflow-y-auto z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="w-full max-w-5xl 2xl:max-w-7xl bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-6 md:p-8 2xl:p-10 border-b border-slate-100 bg-white sticky top-0 z-10">
                        <h2 className="text-2xl 2xl:text-4xl font-bold text-slate-900 mb-2">Tu Selección</h2>
                        <p className="text-slate-500 2xl:text-xl">Revisa los platos antes de generar tu menú.</p>
                    </div>

                    {/* Scrollable List */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 2xl:p-10 space-y-8 2xl:space-y-12">
                        {Object.entries(byType).map(([type, recipes]) => recipes.length > 0 && (
                            <div key={type}>
                                <h3 className="text-xs 2xl:text-lg font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-3">
                                    {type}
                                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[10px] 2xl:text-sm border border-slate-200">{recipes.length}</span>
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-3 2xl:gap-6">
                                    {recipes.map(recipe => (
                                        <div key={recipe.id} className="group relative bg-white border border-slate-200 rounded-xl 2xl:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                                            <div className="aspect-square relative">
                                                <img src={recipe.image} className="w-full h-full object-cover" alt="" />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                            </div>
                                            <div className="p-3 2xl:p-5">
                                                <p className="text-[11px] 2xl:text-lg font-bold text-slate-800 leading-tight line-clamp-2 mb-1">{recipe.name}</p>
                                                <p className="text-[9px] 2xl:text-sm text-slate-400 uppercase tracking-wide">{recipe.tags?.[0]}</p>
                                            </div>
                                            {/* Remove Button Mock */}
                                            <button className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-50 hover:text-rose-500 shadow-sm">
                                                <X size={16} className="2xl:w-5 2xl:h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 md:p-6 2xl:p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                        <button
                            onClick={_onEdit}
                            className="px-6 2xl:px-10 py-3 2xl:py-5 rounded-xl 2xl:rounded-2xl font-bold text-slate-500 hover:bg-white hover:text-slate-700 transition-colors 2xl:text-xl"
                        >
                            Editar
                        </button>
                        <button
                            onClick={onGenerate}
                            className="flex-1 bg-slate-900 text-white font-bold py-3 2xl:py-5 px-6 rounded-xl 2xl:rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg active:scale-95 2xl:text-xl"
                        >
                            <LayoutGrid size={18} className="2xl:w-6 2xl:h-6" />
                            Generar Menú Personalizado
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export const TinderModePage = () => {
    const navigate = useNavigate();
    const initialDeck = useMemo(() => buildDeck(), []);

    const [deck, setDeck] = useState<DeckItem[]>(initialDeck);
    const [history, setHistory] = useState<DeckItem[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const cardRefs = useRef<React.RefObject<any>[]>([]);
    const [isSwiping, setIsSwiping] = useState(false);

    // Step State
    const [step, setStep] = useState<Step>('intro');

    // Initialize/Sync store
    const addPreference = useMenuStore((state) => state.addPreference);
    const preferences = useMenuStore((state) => state.preferences);
    const activateMenu = useMenuStore((state) => state.activateMenu);

    // Ensure refs exist
    if (cardRefs.current.length !== deck.length) {
        cardRefs.current = Array(deck.length).fill(0).map((_, i) => cardRefs.current[i] || createRef());
    }

    const activeIndex = deck.length - 1;
    const activeItem = deck[activeIndex];

    // Dynamic Header Title
    const currentSectionHeader = useMemo(() => {
        if (!activeItem) return "Completado";
        return `Eligiendo ${activeItem.sectionType}s`;
    }, [activeItem]);

    const handleSwipe = (direction: 'left' | 'right') => {
        if (!activeItem) return;

        if (activeItem.type === 'recipe') {
            addPreference(activeItem.recipe.id, direction === 'right');
        }

        setTimeout(() => {
            const newHistory = [...history, activeItem];
            const newDeck = deck.slice(0, -1);
            setHistory(newHistory);
            setDeck(newDeck);
            setIsSwiping(false);
        }, 300);
    };

    const manualSwipe = async (direction: 'left' | 'right') => {
        if (isSwiping || activeIndex < 0) return;
        setIsSwiping(true);

        const ref = cardRefs.current[activeIndex];
        if (ref && ref.current) {
            await ref.current.swipe(direction);
        }
    };

    const handleUndo = () => {
        if (history.length === 0) return;
        const lastItem = history[history.length - 1];
        setHistory(history.slice(0, -1));
        setDeck([...deck, lastItem]);
    };

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedRecipe || step !== 'swiping') return; // Only enable keys during swiping mode

            if (e.key === 'ArrowLeft') {
                manualSwipe('left');
            } else if (e.key === 'ArrowRight') {
                manualSwipe('right');
            } else if (e.key === 'Backspace') {
                handleUndo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, isSwiping, selectedRecipe, history, step]);

    const handleGenerateMenu = () => {
        activateMenu();
        navigate('/home', { state: { showConfetti: true } });
    };

    // Check for end of deck
    useEffect(() => {
        if (deck.length === 0 && step === 'swiping') {
            setStep('review');
        }
    }, [deck.length, step]);


    // Step Rendering
    if (step === 'intro') {
        return (
            <BackgroundWrapper maxWidth="max-w-5xl">
                <IntroModal onNext={() => setStep('people')} />
            </BackgroundWrapper>
        )
    }

    if (step === 'people') {
        return (
            <BackgroundWrapper>
                <ConfigPeopleModal onNext={(val) => {
                    console.log('People:', val); // Persist if needed
                    setStep('meals');
                }} />
            </BackgroundWrapper>
        )
    }

    if (step === 'meals') {
        return (
            <BackgroundWrapper>
                <ConfigMealsModal onNext={(val) => {
                    console.log('Meals per day:', val); // Persist if needed
                    setStep('swiping');
                }} />
            </BackgroundWrapper>
        )
    }

    if (step === 'review') {
        return (
            <DraftReviewOverlay
                preferences={preferences}
                onGenerate={handleGenerateMenu}
                _onEdit={() => { }}
            />
        );
    }

    // Default: 'swiping'
    return (
        <div className="min-h-full flex flex-col items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
            {/* Dynamic Header */}
            <div className="absolute top-0 left-0 right-0 pt-8 pb-4 px-6 flex justify-center items-center z-10 bg-gradient-to-b from-slate-50 to-transparent">
                <motion.div
                    key={activeItem?.sectionType || 'done'}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col items-center"
                >
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full mb-2">
                        Paso {history.length + 1} de {initialDeck.length}
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900">{currentSectionHeader}</h2>
                </motion.div>
            </div>

            {/* Card Container */}
            <div className="relative w-full max-w-[360px] h-[600px] flex items-center justify-center mt-12">
                <AnimatePresence>
                    {deck.map((item, index) => {
                        const indexFromTop = deck.length - 1 - index;
                        const isTop = indexFromTop === 0;

                        if (indexFromTop > 2) return null;

                        const stackVariants = {
                            animate: {
                                scale: 1 - indexFromTop * 0.05,
                                y: indexFromTop * 15,
                                zIndex: 50 - indexFromTop,
                                opacity: 1 - indexFromTop * 0.1,
                                filter: isTop ? 'none' : 'brightness(0.95)',
                                transition: { duration: 0.3 }
                            },
                            exit: {
                                transition: { duration: 0.2 }
                            }
                        };

                        return (
                            <motion.div
                                key={item.id}
                                className="absolute inset-0 flex items-center justify-center"
                                variants={stackVariants}
                                initial="animate"
                                animate="animate"
                                exit="exit"
                                style={{ transformOrigin: 'bottom center' }}
                            >
                                <TinderCard
                                    ref={cardRefs.current[index]}
                                    recipe={item.recipe}
                                    onSwipe={handleSwipe}
                                    onShowDetails={() => setSelectedRecipe(item.recipe)}
                                    style={{ pointerEvents: isTop ? 'auto' : 'none' }}
                                />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Controls */}
            {deck.length > 0 && (
                <div className="mt-8 flex items-center gap-8 z-10 w-full max-w-[320px] justify-between px-4">
                    <button onClick={handleUndo} disabled={history.length === 0} className="w-14 h-14 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        <Undo2 size={24} />
                    </button>
                    <button onClick={() => manualSwipe('left')} className="w-16 h-16 bg-white rounded-full shadow-xl border border-rose-100 flex items-center justify-center text-rose-500 hover:bg-rose-50 hover:scale-110 transition-all">
                        <X size={32} />
                    </button>
                    <button onClick={() => manualSwipe('right')} className="w-16 h-16 bg-emerald-500 rounded-full shadow-xl shadow-emerald-200 flex items-center justify-center text-white hover:bg-emerald-600 hover:scale-110 transition-all">
                        <Check size={32} />
                    </button>
                </div>
            )}

            {/* Recipe Detail Modal */}
            <AnimatePresence>
                {selectedRecipe && (
                    <RecipeDetailsModal
                        recipe={selectedRecipe}
                        onClose={() => setSelectedRecipe(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
