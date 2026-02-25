import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { PlanCard } from '../components/PlanCard';

// Helper to get image path
const getImg = (name: string) => `/images/plans/${name}`;

// Data (Kept from original)
const CATEGORIES = [
    {
        id: 'fitness',
        title: 'Fitness',
        icon: '💪',
        plans: [
            { title: 'Ganancia Muscular', image: getImg('Fit2.jpg'), tag: 'Hipertrofia', description: 'Maximiza el crecimiento con alto contenido proteico.' },
            { title: 'Desayunos Power', image: getImg('comiendo 3.jpg'), tag: 'Energía', description: 'Empieza el día con fuerza.' },
            { title: 'Proteína Pura', image: getImg('Menu Proteico.jpg'), tag: 'Alto en Proteína', description: 'Fuentes de proteína magra de alta calidad.' },
            { title: 'Fitness Semanal', image: getImg('coach1.jpg'), tag: 'Equilibrado', description: 'Entrenamiento y nutrición balanceada.' },
            { title: 'Vida Fit', image: getImg('fit.jpg'), tag: 'Lifestyle', description: 'Comer sano no es aburrido.' },
            { title: 'Consejos Coach', image: getImg('coach.jpg'), tag: 'Tips', description: 'Comidas pre y post entreno.' },
        ]
    },
    {
        id: 'quick',
        title: 'Rápidas',
        icon: '⚡',
        plans: [
            { title: 'Cenas 15\'', image: getImg('Comiendo facil.jpg'), tag: '15 min', description: 'Ligeras y sin estrés.' },
            { title: 'Snacks', image: getImg('comiendo 2.jpeg'), tag: 'Saludable', description: 'Picar sin culpa.' },
            { title: 'Bocados', image: getImg('comiendo 4.jpeg'), tag: 'On-the-go', description: 'Para cuando no hay tiempo.' },
            { title: 'Express', image: getImg('Comiendo1.jpg'), tag: 'Rápido', description: 'Listas en un parpadeo.' },
        ]
    },
    {
        id: 'mediterranean',
        title: 'Mediterránea',
        icon: '🍅',
        plans: [
            { title: 'Dieta Mediterránea', image: getImg('mediterraneo.jpg'), tag: 'Clásico', description: 'Salud y sabor.' },
            { title: 'Mar y Tierra', image: getImg('mediterraneo.jpg'), tag: 'Fresco', description: 'Lo mejor de dos mundos.' }, // Fallback image if needed
            { title: 'Sabores del Mar', image: getImg('mediterranean_girl.jpg'), tag: 'Pescados', description: 'Frescura del océano.' },
            { title: 'Recetas de Paula', image: getImg('paula1.jpg'), tag: 'Casero', description: 'Cocina con toque moderno.' },
            { title: 'Clásicos de Mamá', image: getImg('cocinando.jpg'), tag: 'Tradición', description: 'Como en casa.' },
            { title: 'Favoritos Emily', image: getImg('emily.jpg'), tag: 'Top', description: 'Amadas por la comunidad.' },
        ]
    },
    {
        id: 'vegetarian',
        title: 'Veggie',
        icon: '🥗',
        plans: [
            { title: 'Vegetariano Flex', image: getImg('fruta-y-verdura.jpg'), tag: 'Flex', description: 'Delicioso sin carne.' },
            { title: 'Green Power', image: getImg('Meallist1.jpg'), tag: 'Vegano', description: 'Todo el poder de las plantas.' },
        ]
    },
    {
        id: 'family',
        title: 'Familia',
        icon: '👨‍👩‍👧‍👦',
        plans: [
            { title: 'Para Todos', image: getImg('familia.jpg'), tag: 'Familiar', description: 'Gustará a grandes y pequeños.' },
            { title: 'Menú Familiar', image: getImg('Meallist2.jpg'), tag: 'Semanal', description: 'Planifica para toda la casa.' },
        ]
    },
    {
        id: 'smart',
        title: 'Smart',
        icon: '🧠',
        plans: [
            { title: 'Caprichos', image: getImg('mike-wilson-195742.jpg'), tag: 'Cheat', description: 'Porque te lo mereces.' },
            { title: 'Noche de Cine', image: getImg('movie night.jpg'), tag: 'Fun', description: 'Para el maratón de series.' },
            { title: 'Ahorro Total', image: getImg('MealList3.jpg'), tag: 'Económico', description: 'Bueno, bonito y barato.' },
            { title: 'Inspiración', image: getImg('frase.jpg'), tag: 'Daily', description: 'Frases y motivación.' },
        ]
    }
];

export const LandingPage = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('all');

    // Flatten all plans for "All" view or filter by category
    const displayedPlans = useMemo(() => {
        if (activeCategory === 'all') {
            return CATEGORIES.flatMap(cat => cat.plans.map(p => ({ ...p, categoryTitle: cat.title })));
        }
        return CATEGORIES.find(c => c.id === activeCategory)?.plans || [];
    }, [activeCategory]);

    return (
        <div className="mt-16 h-[calc(100vh-4rem)] overflow-y-auto bg-white dark:bg-slate-950 pb-24 font-sans transition-colors duration-300">
            {/* --- Header / Filters --- */}
            <div className="sticky top-16 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 shadow-sm pt-6 pb-2 transition-colors">
                <div className="max-w-7xl mx-auto px-6 flex flex-col gap-6">

                    {/* Search Pill (Centered) */}
                    <div className="hidden md:flex w-full max-w-2xl mx-auto bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm hover:shadow-md transition-all items-center p-2 pl-8 cursor-pointer group">
                        <div className="flex-1 flex items-center gap-4 divide-x divide-slate-200 dark:divide-slate-700">
                            <span className="text-base font-semibold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Cualquier plan</span>
                            <span className="text-base font-semibold text-slate-900 dark:text-slate-100 px-6 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Cualquier semana</span>
                            <span className="text-base text-slate-500 dark:text-slate-400 px-6 font-normal line-clamp-1">¿Cuántos sois?</span>
                        </div>
                        <div className="bg-emerald-500 rounded-full p-3 text-white shadow-md group-hover:scale-105 transition-transform">
                            <Search size={22} strokeWidth={2.5} />
                        </div>
                    </div>

                    {/* Mobile Search Placeholder */}
                    <div className="md:hidden flex items-center gap-4 bg-slate-100 rounded-full px-6 py-4">
                        <Search size={20} className="text-slate-500" />
                        <span className="text-slate-500 font-medium text-base">Buscar planes...</span>
                    </div>

                    {/* --- Category Filter Bar --- */}
                    <div className="flex items-center gap-10 overflow-x-auto scrollbar-hide pb-4 pt-2 px-2 md:justify-center">
                        {/* 'All' Tab */}
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`flex flex-col items-center gap-3 min-w-[72px] cursor-pointer group transition-all ${activeCategory === 'all' ? 'text-black scale-105' : 'text-slate-500 hover:text-slate-800 hover:scale-105'}`}
                        >
                            <span className="text-4xl filter drop-shadow-sm">🌍</span>
                            <span className={`text-sm font-bold whitespace-nowrap pb-3 border-b-2 transition-all ${activeCategory === 'all' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent group-hover:border-slate-300 dark:group-hover:border-slate-600'}`}>
                                Todos
                            </span>
                        </button>

                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex flex-col items-center gap-3 min-w-[72px] cursor-pointer group transition-all ${activeCategory === cat.id ? 'text-black dark:text-white scale-105' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:scale-105'}`}
                            >
                                <span className="text-4xl filter drop-shadow-sm">
                                    {cat.icon}
                                </span>
                                <span className={`text-sm font-bold whitespace-nowrap pb-3 border-b-2 transition-all ${activeCategory === cat.id ? 'border-black dark:border-white' : 'border-transparent group-hover:border-slate-300 dark:group-hover:border-slate-600'}`}>
                                    {cat.title}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- Mobile Floating Map Toggle Mock --- */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 md:hidden">
                <button className="bg-slate-900 text-white px-5 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 text-sm">
                    Map <MapPin size={14} />
                </button>
            </div>

            {/* --- Main Grid --- */}
            <main className="max-w-[1920px] mx-auto px-6 py-8">
                {/* Section Title (Optional, helpful context) */}
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-slate-900 dark:text-white font-bold text-lg">
                        {activeCategory === 'all' ? 'Explora todos los planes' : `Planes de ${CATEGORIES.find(c => c.id === activeCategory)?.title}`}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
                    {displayedPlans.map((plan, i) => (
                        <PlanCard
                            key={`${activeCategory}-${i}`}
                            {...plan}
                            className="w-full"
                            onClick={() => navigate('/plan-preview', {
                                state: {
                                    planTitle: plan.title,
                                    planImage: plan.image
                                }
                            })}
                        />
                    ))}
                </div>

                {displayedPlans.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-400">No se encontraron planes en esta categoría.</p>
                    </div>
                )}
            </main>
        </div >
    );
};
