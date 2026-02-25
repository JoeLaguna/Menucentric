import { ArrowRight, LayoutGrid } from 'lucide-react';

interface ActionFooterProps {
    selectedCount: number;
    targetCount: number;
    onGenerate: () => void;
}

export const ActionFooter = ({ selectedCount, targetCount, onGenerate }: ActionFooterProps) => {
    const progress = Math.min((selectedCount / targetCount) * 100, 100);
    const isComplete = selectedCount >= targetCount;

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50 transition-colors">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">

                {/* Progress Info */}
                <div className="w-full md:flex-1">
                    <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-slate-900 dark:text-slate-200">Tu Progreso Semanal</span>
                        <span className={isComplete ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}>
                            {selectedCount} de {targetCount} platos
                        </span>
                    </div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Main CTA */}
                <button
                    onClick={onGenerate}
                    className="w-full md:w-auto bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold py-4 px-8 rounded-xl shadow-lg shadow-slate-900/20 hover:bg-slate-800 dark:hover:bg-white hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3 whitespace-nowrap"
                >
                    <LayoutGrid size={20} className="text-emerald-400 dark:text-emerald-600" />
                    <span className="text-lg">GENERAR MI SEMANA</span>
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};
