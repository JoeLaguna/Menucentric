import { useState, useRef, useEffect } from 'react';
import { TinderCard, TinderCardRef } from '../components/TinderCard';
import { RECIPES } from '../data/recipes';
import { useMenuStore } from '../store/useMenuStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ArrowLeft, Settings2, Sparkles, ChefHat, Check, Pizza, Trash2 } from 'lucide-react';
import { RecipeDetailsModal } from '../components/RecipeDetailsModal';
import { useNavigate } from 'react-router-dom';
import type { Recipe } from '../types';

export const TinderModePage = () => {
    // --- State & Store ---
    const { addPreference, preferences, activateMenu } = useMenuStore();
    const navigate = useNavigate();

    // Local state for the "Deck" of recipes
    // We shuffle randomly on mount for variety
    const [deck, setDeck] = useState<Recipe[]>([]);
    
    // Tutorial / Onboarding Modal State
    const [step, setStep] = useState<'intro' | 'people' | 'meals' | 'swiping'>('intro');
    
    // Review Overlay State
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    useEffect(() => {
        // Initialize Deck with simple shuffle
        const shuffled = [...RECIPES].sort(() => 0.5 - Math.random());
        setDeck(shuffled);
    }, []);

    // Current top card index
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardRefs = useRef<Array<TinderCardRef | null>>([]);

    const [selectedRecipeForModal, setSelectedRecipeForModal] = useState<Recipe | null>(null);

    // Helpers
    const currentRecipe = deck[currentIndex];
    const canSwipe = currentIndex < deck.length;

    // Handlers
    const handleSwipe = (dir: 'left' | 'right', recipe: Recipe) => {
        if (dir === 'right') {
            addPreference(recipe.id, true);
        } else {
            addPreference(recipe.id, false);
        }
        // Move to next card
        setCurrentIndex(prev => prev + 1);
    };

    const triggerSwipe = async (dir: 'left' | 'right') => {
        if (canSwipe && cardRefs.current[currentIndex]) {
            await cardRefs.current[currentIndex]?.swipe(dir);
        }
    };

    // Review Logic
    const likedRecipes = deck.filter(r => preferences.find(p => p.recipeId === r.id && p.wantsThisWeek));

    const handleCreateMenu = () => {
        activateMenu();
        navigate('/home');
    };

    // --- Renders ---

    if (step !== 'swiping') {
        // Onboarding Flow
        return (
            <div className="fixed inset-0 z-50 bg-white flex items-center justify-center p-6">
                <AnimatePresence mode="wait">
                    {step === 'intro' && <IntroModal onNext={() => setStep('people')} />}
                    {step === 'people' && <ConfigPeopleModal onNext={() => setStep('meals')} onBack={() => setStep('intro')} />}
                    {step === 'meals' && <ConfigMealsModal onNext={() => setStep('swiping')} onBack={() => setStep('people')} />}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className="h-[100dvh] flex flex-col bg-slate-50 relative overflow-hidden">
            {/* Header */}
            <header className="h-16 px-6 flex items-center justify-between z-20 sticky top-0 bg-transparent">
                <button 
                    onClick={() => navigate('/')} 
                    className="p-2 rounded-full bg-white/50 backdrop-blur text-slate-600 hover:bg-white transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>

                <div className="flex flex-col items-center">
                   <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                       Descubrir
                   </span>
                </div>

                <div className="flex gap-3">
                   <button 
                       onClick={() => setIsReviewOpen(true)}
                       className="relative p-2 rounded-full bg-white text-slate-700 shadow-sm hover:scale-105 transition-transform"
                    >
                       <ChefHat size={24} />
                       {likedRecipes.length > 0 && (
                           <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-slate-50">
                               {likedRecipes.length}
                           </span>
                       )}
                   </button>
                    <button className="p-2 rounded-full bg-white/50 backdrop-blur text-slate-600 hover:bg-white transition-colors">
                        <Settings2 size={24} />
                    </button>
                </div>
            </header>

            {/* Cards Container */}
            <div className="flex-1 relative flex items-center justify-center w-full max-w-lg mx-auto mb-12">
                <AnimatePresence>
                    {deck.slice(currentIndex, currentIndex + 3).reverse().map((recipe, i) => {
                        // We map in reverse to stack correctly in DOM (last one on top visually if absolute)
                        // Actually with absolute stacking, the last rendered is on top.
                        // So slice(currentIndex, currentIndex + 3) gives [current, next, nextnext].
                        // If we render them normally, nextnext is LAST in DOM -> ON TOP. 
                        // We want current to be ON TOP. So we need to reverse the slice for rendering OR use z-index.
                        // Let's use reverse() on the map.
                        
                        // Wait, index logic:
                        // deck[currentIndex] should be z-index 3 (top)
                        // deck[currentIndex+1] should be z-index 2
                        // ...
                        
                        const realIndex = currentIndex + (2 - i); // Logic flip due to reverse map?
                        // Actually easier: just map the slice normally, and apply z-index manually.
                        // <TinderCard ... style={{ zIndex: 100 - actualIndex }} />
                       
                        return null; // Don't use this block, see below.
                    })}
                </AnimatePresence>

               {/* Correct Stacking Loop */}
               <div className="relative w-full h-full flex items-center justify-center">
                   {deck.map((recipe, index) => {
                       // Only render current and next few for performance
                       if (index < currentIndex || index > currentIndex + 2) return null;
                       
                       const isTop = index === currentIndex;
                       return (
                           <TinderCard
                               key={recipe.id}
                               ref={el => cardRefs.current[index] = el}
                               recipe={recipe}
                               onSwipe={(dir) => handleSwipe(dir, recipe)}
                               onShowDetails={() => setSelectedRecipeForModal(recipe)}
                               style={{ 
                                   zIndex: 100 - index,
                                   scale: isTop ? 1 : 0.95 + (0.05 * (index - currentIndex)), // slight depth effect could be inverse
                                   // Actually we want cards BEHIND to be smaller.
                                   // Top card scale 1. Next card scale 0.95.
                                }} 
                           />
                       )
                   })}
                   
                   {/* Empty State when Deck Finished */}
                   {currentIndex >= deck.length && (
                       <div className="text-center p-8">
                           <h2 className="text-2xl font-bold text-slate-800 mb-2">¡Eso es todo!</h2>
                           <p className="text-slate-500 mb-6">Has revisado todas nuestra sugerencias.</p>
                           <button 
                               onClick={() => setDeck([...RECIPES.sort(() => 0.5 - Math.random())]) || setCurrentIndex(0)}
                               className="text-emerald-600 font-bold hover:underline"
                           >
                               Volver a empezar
                           </button>
                       </div>
                   )}
               </div>
            </div>

            {/* Action Bar (Footer) */}
            <div className="h-24 px-8 pb-8 flex items-center justify-center gap-6 z-20">
                <button
                    onClick={() => triggerSwipe('left')}
                    className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-rose-500 hover:scale-110 active:scale-95 transition-all focus:outline-none ring-1 ring-slate-100"
                >
                    <X size={32} strokeWidth={3} />
                </button>
                
                {/* Super Like / Star (Optional middle button) */}
                 <button className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-amber-400 hover:scale-110 active:scale-95 transition-all">
                     <Sparkles size={24} fill="currentColor" />
                 </button>

                <button
                    onClick={() => triggerSwipe('right')}
                    className="w-16 h-16 rounded-full bg-emerald-500 shadow-xl shadow-emerald-200 flex items-center justify-center text-white hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all focus:outline-none"
                >
                    <Heart size={32} fill="currentColor" />
                </button>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedRecipeForModal && (
                    <RecipeDetailsModal 
                        recipe={selectedRecipeForModal} 
                        onClose={() => setSelectedRecipeForModal(null)} 
                    />
                )}
            </AnimatePresence>
            
            {/* Draft Review Overlay */}
            <AnimatePresence>
                {isReviewOpen && (
                    <DraftReviewOverlay 
                        recipes={likedRecipes} 
                        onClose={() => setIsReviewOpen(false)}
                        onConfirm={handleCreateMenu}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};


// --- Sub-components for Onboarding ---
// Kept in same file for MVP simplicity, would normally extract.

const IntroModal = ({ onNext }: { onNext: () => void }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }}
        className="max-w-md w-full text-center"
    >
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
            <Sparkles size={48} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4">Bienvenido a MenuCentric</h2>
        <p className="text-slate-500 text-lg mb-8 leading-relaxed">
            Olvídate de pensar qué cocinar. Diseña tu menú semanal en segundos haciendo swipe en las recetas que más te gusten.
        </p>
        <button onClick={onNext} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform">
            Empezar
        </button>
    </motion.div>
);

const ConfigPeopleModal = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
    const [count, setCount] = useState(2);
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="max-w-md w-full"
        >
            <button onClick={onBack} className="text-slate-400 hover:text-slate-800 mb-6 flex items-center gap-1"><ArrowLeft size={18}/> Volver</button>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">¿Para cuántos cocinas?</h2>
            <p className="text-slate-500 mb-8">Ajustaremos las cantidades de la lista de compra.</p>
            
            <div className="flex justify-between gap-4 mb-8">
                {[1, 2, 3, 4].map(num => (
                    <button 
                        key={num}
                        onClick={() => setCount(num)}
                        className={`
                            flex-1 py-6 rounded-2xl text-2xl font-bold border-2 transition-all
                            ${count === num ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}
                        `}
                    >
                        {num}
                    </button>
                ))}
            </div>

            <button onClick={onNext} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg">
                Continuar
            </button>
        </motion.div>
    );
};

const ConfigMealsModal = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="max-w-md w-full"
        >
            <button onClick={onBack} className="text-slate-400 hover:text-slate-800 mb-6 flex items-center gap-1"><ArrowLeft size={18}/> Volver</button>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">¿Qué quieres planificar?</h2>
            <p className="text-slate-500 mb-8">Selecciona las comidas del día para tu menú.</p>
            
            <div className="space-y-3 mb-8">
                {['Desayunos', 'Comidas', 'Cenas'].map(meal => (
                    <label key={meal} className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-4">
                            <Pizza size={20} />
                        </div>
                        <span className="font-bold text-slate-700 flex-1">{meal}</span>
                        <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center">
                            {/* Fake Checkbox logic */}
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        </div>
                    </label>
                ))}
            </div>

            <button onClick={onNext} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all">
                ¡A cocinar!
            </button>
        </motion.div>
    );
};

// Draft Review Overlay Component
const DraftReviewOverlay = ({ recipes, onClose, onConfirm }: { recipes: Recipe[], onClose: () => void, onConfirm: () => void }) => {
    // We want the background to be visible but blurred/dimmed. 
    // And actually showing the "ActiveMenuPage" skeleton or structure behind would be cool if possible,
    // but within this component we are on TinderPage. 
    
    // For now, simple list.
    return (
        <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-[60] bg-slate-50 flex flex-col"
        >
            {/* Mock Header for the "Menu Preview" Look */}
            <div className="absolute top-0 left-0 right-0 h-48 bg-slate-900 -z-10" /> 
            
            <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full p-6 pt-12">
               <div className="flex justify-between items-start mb-8 text-white">
                   <div>
                       <h2 className="text-3xl font-bold">Resumen de tu Menú</h2>
                       <p className="text-slate-400">Has seleccionado {recipes.length} recetas</p>
                   </div>
                   <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                       <X size={24} />
                   </button>
               </div>

               <div className="flex-1 overflow-y-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-2">
                   {recipes.length === 0 ? (
                       <div className="h-full flex flex-col items-center justify-center text-slate-400">
                           <p>No has dado like a ninguna receta aún.</p>
                       </div>
                   ) : (
                       <ul className="space-y-1">
                           {recipes.map(recipe => (
                               <li key={recipe.id} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors group">
                                   <img src={recipe.image} className="w-16 h-16 rounded-xl object-cover" />
                                   <div className="flex-1">
                                       <h4 className="font-bold text-slate-900">{recipe.name}</h4>
                                       <span className="text-xs text-slate-400 font-medium">{recipe.difficulty} · {recipe.time} min</span>
                                   </div>
                                   <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                                       <Trash2 size={18} />
                                   </button>
                               </li>
                           ))}
                       </ul>
                   )}
               </div>

                <div className="pt-6">
                    <button 
                        onClick={onConfirm}
                        className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-3"
                    >
                        <Check size={24} />
                        Confirmar y Generar Calendario
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
