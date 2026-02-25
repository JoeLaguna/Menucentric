import { Wand2, Leaf, Zap, PiggyBank } from 'lucide-react';
import clsx from 'clsx';

export type AIPreset = 'none' | 'healthy' | 'express' | 'savings';

interface StickyHeaderProps {
    activePreset: AIPreset;
    onPresetChange: (preset: AIPreset) => void;
    totalSelected: number;
}

export const StickyHeader = ({ activePreset, onPresetChange, totalSelected }: StickyHeaderProps) => {

    const presets = [
        { id: 'healthy', label: 'Modo Saludable', icon: Leaf, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
        { id: 'express', label: 'Menú Express', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
        { id: 'savings', label: 'Ahorro Inteligente', icon: PiggyBank, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    ];

    return (
        <div className="sticky top-0 z-40 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all pb-4 pt-4 px-4 md:px-8">
            <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">

                {/* Title & Count */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center">
                        <Wand2 size={20} className="text-purple-400" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-none">Selecciona tus platos</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                            {totalSelected} recetas seleccionadas
                        </p>
                    </div>
                </div>

                {/* AI Pills Scrollable Area */}
                <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {presets.map((preset) => (
                        <button
                            key={preset.id}
                            onClick={() => onPresetChange(activePreset === preset.id ? 'none' : preset.id as AIPreset)}
                            className={clsx(
                                "flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all whitespace-nowrap",
                                activePreset === preset.id
                                    ? `ring-2 ring-offset-2 ${preset.bg} ${preset.border} ring-slate-400 shadow-md scale-105 dark:ring-offset-slate-900`
                                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                            )}
                        >
                            <preset.icon size={16} className={clsx(activePreset === preset.id ? preset.color : "text-slate-400")} />
                            <span className={clsx("text-sm font-bold", activePreset === preset.id ? "text-slate-900" : "")}>{preset.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
