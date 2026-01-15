import { Plus } from 'lucide-react';
import { useMenuStore, type MealList } from '../store/useMenuStore';
import { motion } from 'framer-motion';
import { EmptyState } from '../components/EmptyState';
import { BookHeart, Play, MoreHorizontal } from 'lucide-react';

export const MealListsPage = () => {
    const { mealLists, createMealList } = useMenuStore();

    const handleCreate = () => {
        // For MVP, simplest "create" flow: alert prompt
        const name = prompt('Nombre de la nueva lista:');
        if (name) {
            createMealList(name, 'Lista personalizada');
        }
    };

    if (mealLists.length === 0) {
        return (
            <div className="h-full">
                <EmptyState
                    icon={BookHeart}
                    title="No tienes listas guardadas"
                    description="Crea listas para organizar tus recetas favoritas, ideas para cenas o menús especiales."
                    actionLabel="Crear mi primera lista"
                    onAction={handleCreate}
                />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
            <header className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Mis Listas</h1>
                    <p className="text-slate-500 mt-1">Colecciones de tus recetas favoritas</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-slate-200 transition-all active:scale-95"
                >
                    <Plus size={20} />
                    Nueva Lista
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mealLists.map((list) => (
                    <ListCard key={list.id} list={list} />
                ))}

                {/* Create New Card Placeholder */}
                <button
                    onClick={handleCreate}
                    className="group border-2 border-dashed border-slate-300 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all min-h-[200px]"
                >
                    <div className="w-16 h-16 rounded-full bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-colors">
                        <Plus size={32} />
                    </div>
                    <span className="font-bold text-slate-500 group-hover:text-emerald-700">Crear nueva lista</span>
                </button>
            </div>
        </div>
    );
};

const ListCard = ({ list }: { list: MealList }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-slate-100 flex flex-col h-full min-h-[240px]"
        >
            {/* Header / Cover */}
            <div className={`h-24 bg-gradient-to-r ${list.gradient || 'from-slate-400 to-slate-500'} relative p-4 flex justify-end`}>
                <button className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Content offset overlapping header */}
            <div className="px-6 flex-1 flex flex-col -mt-8">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl mb-3 border border-slate-50">
                    {/* Emoji based on name guess? Or just icon */}
                    {list.isSystem ? '⭐' : '🍲'}
                </div>

                <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1">{list.name}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                    {list.description || 'Sin descripción'}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between pb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                        {list.recipeIds.length} Recetas
                    </span>

                    <button className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                        <Play size={18} className="ml-1" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
