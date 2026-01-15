import { useNavigate } from 'react-router-dom';
import { useMenuStore } from '../store/useMenuStore';
import { PlanCard } from '../components/PlanCard';
import { Search, SlidersHorizontal, ArrowRight, Zap, Leaf, Heart, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const CATEGORIES = [
  { id: 'all', label: 'Todo' },
  { id: 'rapido', label: 'Rápido y Fácil' },
  { id: 'fit', label: 'Fitness' },
  { id: 'veggie', label: 'Vegetariano' },
  { id: 'family', label: 'Familiar' },
  { id: 'budget', label: 'Económico' },
];

const FEATURED_PLANS = [
  {
    id: 'plan-1',
    title: 'Semana Mediterránea',
    description: 'Platos frescos, ligeros y llenos de sabor. Ideal para el verano.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tag: 'Popular'
  },
  {
    id: 'plan-2',
    title: 'Batch Cooking Domingo',
    description: 'Cocina 2 horas, come toda la semana. Optimizado para tupper.',
    image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tag: 'Ahorro de Tiempo'
  },
  {
    id: 'plan-3',
    title: 'Keto para Principiantes',
    description: 'Bajo en carbohidratos, alto en grasas saludables. Menú de introducción.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tag: 'Dieta'
  },
  {
    id: 'plan-4',
    title: 'Cenas en 15 Minutos',
    description: 'Recetas express para terminar el día sin complicaciones.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tag: 'Express'
  },
  {
    id: 'plan-5',
    title: 'Vegetariano Gourmet',
    description: 'Descubre que comer verduras no es aburrido. Platos de restaurante en casa.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tag: 'Chef Choice'
  },
  {
    id: 'plan-6',
    title: 'Desayunos Energéticos',
    description: 'Empieza el día con fuerza. Bowls, tostadas y batidos.',
    image: 'https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tag: 'Mañanas'
  }
];

export const LandingPage = () => {
  const navigate = useNavigate();
  const { createMealList } = useMenuStore();
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCreateNew = () => {
    // Logic to start fresh flow (Tinder Mode)
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      {/* 1. Minimalist Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              MenuCentric
            </span>
          </div>

          {/* Search Bar - Desktop Centered */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Buscar recetas, planes, ingredientes..."
              className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-sm text-slate-900 rounded-full py-2.5 pl-10 pr-4 outline-none ring-2 ring-transparent focus:ring-emerald-500/20 transition-all placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 text-slate-600">
              <Search size={20} />
            </button>
            <button
              onClick={handleCreateNew}
              className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
            >
              <Zap size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="hidden sm:inline">Crear Menú</span>
              <span className="sm:hidden">Crear</span>
            </button>
          </div>
        </div>

        {/* Categories Nav - Sticky under header */}
        <div className="border-t border-slate-50 bg-white">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1 py-3 min-w-max">
              <button
                className="p-2 mr-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
                aria-label="Filtros"
              >
                <SlidersHorizontal size={16} />
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    px-4 py-1.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap border
                    ${activeCategory === cat.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-8">

        {/* Hero / Promo Section (Optional, keep it small or remove for pure 'Airbnb' grid feel. Let's do a small banner) */}
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}} 
            className="mb-12 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 sm:p-12 text-white relative overflow-hidden"
        >
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="relative z-10 max-w-xl">
                 <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">Cocina mejor, <br/> vive mejor.</h1>
                 <p className="text-indigo-100 text-lg mb-8 font-medium">Descubre planes de comida diseñados por expertos o crea el tuyo propio en segundos con nuestra IA.</p>
                 <button 
                    onClick={handleCreateNew}
                    className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-xl"
                 >
                     Empezar Ahora
                 </button>
             </div>
        </motion.div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Planes Populares</h2>
          <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            Ver todos <ArrowRight size={16} />
          </button>
        </div>

        {/* Grid Layout - Responsive Masonry-ish */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {FEATURED_PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <PlanCard
                title={plan.title}
                description={plan.description}
                image={plan.image}
                tag={plan.tag}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional Section - "Quick Picks" or similar to break up the grid */}
        <div className="mt-20 mb-12">
             <div className="flex items-center gap-3 mb-8">
                 <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                     <Trophy size={24} />
                 </div>
                 <div>
                    <h2 className="text-2xl font-bold text-slate-900">Top Chefs de la Semana</h2>
                    <p className="text-slate-500">Recetas creadas por nuestra comunidad</p>
                 </div>
             </div>
             
             {/* Simple horizontal scroll for contrast */}
             <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4">
                 {/* Placeholders for chefs/users */}
                 {[1,2,3,4,5].map(i => (
                     <div key={i} className="min-w-[200px] bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center text-center hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                         <div className="w-20 h-20 rounded-full bg-slate-200 mb-3 overflow-hidden">
                            <img src={`https://i.pravatar.cc/150?u=${i+20}`} alt="User" />
                         </div>
                         <h3 className="font-bold text-slate-800">Chef Name</h3>
                         <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full mt-1">Superhost</span>
                     </div>
                 ))}
             </div>
        </div>

      </main>
    </div>
  );
};
