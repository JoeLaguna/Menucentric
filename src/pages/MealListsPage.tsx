import { useMenuStore } from '../store/useMenuStore';
import { Plus } from 'lucide-react';
import { MealListCard } from '../components/MealListCard';

export const MealListsPage = () => {
    const mealLists = useMenuStore((state) => state.mealLists);
    const deleteMealList = useMenuStore((state) => state.deleteMealList);

    // Mock handler for creating new list (Phase 2: Use a real modal)
    const handleCreateList = () => {
        const createList = useMenuStore.getState().createMealList;
        const name = prompt("Nombre de la nueva lista:");
        if (name) createList(name, "Lista personalizada");
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors duration-300">
            {/* Header */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 py-8 sticky top-0 z-10 transition-colors">
                <div className="max-w-[1920px] mx-auto flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-2">Mis Listas</h1>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md">
                            Gestiona tus colecciones de recetas. Crea listas para ocasiones especiales, favoritos semanales o ideas para el futuro.
                        </p>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="p-6 md:p-8 max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {/* Create New Card (Visual alternative to floating button) */}
                    <button
                        onClick={handleCreateList}
                        className="group flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all min-h-[320px] h-full"
                    >
                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:shadow-lg transition-all group-hover:scale-110">
                            <Plus size={32} />
                        </div>
                        <span className="font-bold text-lg text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Crear Nueva Lista</span>
                        <span className="text-sm text-slate-400 dark:text-slate-600 mt-2">Personalizada</span>
                    </button>

                    {/* Meal Lists */}
                    {mealLists.map((list) => (
                        <MealListCard
                            key={list.id}
                            list={list}
                            onDelete={(id) => {
                                if (confirm('¿Borrar esta lista?')) deleteMealList(id);
                            }}
                            onPlay={() => console.log('Playing list', list.id)}
                            onClick={() => console.log('Opening list', list.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
