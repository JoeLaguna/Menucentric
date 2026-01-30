import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Flame, Info, Wand2 } from 'lucide-react';

interface PlanContextPanelProps {
    title: string;
    image: string;
    onBack?: () => void;
    onPersonalize?: () => void;
    className?: string;
}

export const PlanContextPanel = ({
    title,
    image,
    onBack,
    onPersonalize,
    className
}: PlanContextPanelProps) => {
    return (
        <div className={`relative h-full flex flex-col ${className}`}>
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                {/* Gradient Overlays for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-slate-900/90" />
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 flex-1 flex flex-col p-8 text-white">

                {/* Header / Nav */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all border border-white/10 group"
                    >
                        <ArrowLeft size={20} className="text-white group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-xs font-bold tracking-wider uppercase">
                        Premium Plan
                    </div>
                </div>

                <div className="flex-1" /> {/* Spacer */}

                {/* Main Text Content */}
                <div className="space-y-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4">
                            {title}
                        </h1>
                        <p className="text-lg text-slate-200 leading-relaxed max-w-md">
                            Una selección curada de recetas diseñadas para maximizar tu energía y sabor. Perfecto para esta semana.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-3 gap-4 py-6 border-t border-white/10 border-b"
                    >
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                <Clock size={14} /> Tiempo
                            </div>
                            <span className="text-xl font-bold">20 min</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                <Flame size={14} /> Kcal
                            </div>
                            <span className="text-xl font-bold">~1800</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                <Info size={14} /> Dificultad
                            </div>
                            <span className="text-xl font-bold">Media</span>
                        </div>
                    </motion.div>
                </div>

                {/* Primary Action */}
                <motion.button
                    onClick={onPersonalize}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-white/10 hover:shadow-white/20 transition-all"
                >
                    <Wand2 size={20} className="text-purple-600" />
                    Personalizar Menú
                </motion.button>
            </div>
        </div>
    );
};
