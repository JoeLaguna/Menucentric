import { useState } from 'react';
import { useMenuStore } from '../store/useMenuStore';
import { Check, Image as ImageIcon, Palette, Ban } from 'lucide-react';
import clsx from 'clsx';

const PREDEFINED_COLORS = [
    { id: 'slate', class: 'bg-slate-900', name: 'Pizarra Oscura' },
    { id: 'emerald', class: 'bg-emerald-800', name: 'Esmeralda Profundo' },
    { id: 'blue', class: 'bg-blue-900', name: 'Azul Noche' },
    { id: 'indigo', class: 'bg-indigo-900', name: 'Índigo' },
    { id: 'rose', class: 'bg-rose-900', name: 'Rojo Vino' },
    { id: 'amber', class: 'bg-amber-800', name: 'Ámbar Cálido' },
];

const PREDEFINED_IMAGES = [
    { id: 'img_beach', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop', name: 'Playa Amanecer' },
    { id: 'img1', url: 'https://images.unsplash.com/photo-1495195134817-a1a18bc0ca5c?q=80&w=600&auto=format&fit=crop', name: 'Cocina Madera' },
    { id: 'img2', url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop', name: 'Mesa Rústica' },
    { id: 'img3', url: 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=600&auto=format&fit=crop', name: 'Cocina Moderna' },
    { id: 'img4', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop', name: 'Mármol Oscuro' },
    { id: 'img5', url: 'https://images.unsplash.com/photo-1490818387583-1b5f2b820fb2?q=80&w=600&auto=format&fit=crop', name: 'Bodegón Fresco' },
];

export const BackgroundPicker = () => {
    const background = useMenuStore((state) => state.background);
    const setBackground = useMenuStore((state) => state.setBackground);

    const [tab, setTab] = useState<'colors' | 'images'>('colors');

    const handleSelectColor = (colorClass: string) => {
        setBackground({ type: 'color', value: colorClass });
    };

    const handleSelectImage = (url: string) => {
        setBackground({ type: 'image', value: url });
    };

    const handleReset = () => {
        setBackground(null);
    };

    return (
        <div className="w-full flex flex-col gap-4">

            {/* Tabs */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button
                    onClick={() => setTab('colors')}
                    className={clsx(
                        "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-bold rounded-md transition-all",
                        tab === 'colors' ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    )}
                >
                    <Palette size={14} /> Colores
                </button>
                <button
                    onClick={() => setTab('images')}
                    className={clsx(
                        "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-bold rounded-md transition-all",
                        tab === 'images' ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    )}
                >
                    <ImageIcon size={14} /> Fotos
                </button>
            </div>

            {/* Content Area */}
            <div className="max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {tab === 'colors' ? (
                    <div className="grid grid-cols-2 gap-2">
                        {PREDEFINED_COLORS.map(color => {
                            const isSelected = background?.type === 'color' && background.value === color.class;

                            return (
                                <button
                                    key={color.id}
                                    onClick={() => handleSelectColor(color.class)}
                                    className={clsx(
                                        "h-16 rounded-lg relative overflow-hidden flex items-center justify-center border-2 transition-all",
                                        color.class,
                                        isSelected ? "border-emerald-500 shadow-emerald-500/20 shadow-lg scale-105 z-10" : "border-transparent hover:scale-105"
                                    )}
                                >
                                    {isSelected && (
                                        <div className="bg-black/20 absolute inset-0 flex items-center justify-center backdrop-blur-sm">
                                            <Check className="text-white drop-shadow-md" size={24} />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-2">
                        {PREDEFINED_IMAGES.map(img => {
                            const isSelected = background?.type === 'image' && background.value === img.url;

                            return (
                                <button
                                    key={img.id}
                                    onClick={() => handleSelectImage(img.url)}
                                    className={clsx(
                                        "h-16 rounded-lg relative overflow-hidden flex items-center justify-center border-2 transition-all group",
                                        isSelected ? "border-emerald-500 shadow-emerald-500/20 shadow-lg scale-105 z-10" : "border-transparent hover:scale-105"
                                    )}
                                >
                                    <img src={img.url} alt={img.name} className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

                                    {isSelected && (
                                        <div className="bg-black/30 absolute inset-0 flex items-center justify-center backdrop-blur-sm">
                                            <Check className="text-white drop-shadow-md" size={24} />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                    onClick={handleReset}
                    className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-red-100 dark:border-red-900/30"
                >
                    <Ban size={14} />
                    Sin Fondo (Por Defecto)
                </button>
            </div>
        </div>
    );
};
