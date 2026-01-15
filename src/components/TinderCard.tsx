import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { Info } from 'lucide-react';
import type { Recipe } from '../types';
import { forwardRef, useImperativeHandle } from 'react';

interface TinderCardProps {
    recipe: Recipe;
    onSwipe: (direction: 'left' | 'right') => void;
    onShowDetails?: () => void;
    style?: React.CSSProperties;
}

export interface TinderCardRef {
    swipe: (direction: 'left' | 'right') => Promise<void>;
}

export const TinderCard = forwardRef<TinderCardRef, TinderCardProps>(({ recipe, onSwipe, onShowDetails, style }, ref) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-12, 12]);
    const opacity = useTransform(x, [-250, -150, 0, 150, 250], [0, 1, 1, 1, 0]);

    // Subtle scale effect when dragging
    const scale = useTransform(x, [-200, 0, 200], [1.05, 1, 1.05]);

    const controls = useAnimation();

    const likeOpacity = useTransform(x, [20, 150], [0, 1]);
    const nopeOpacity = useTransform(x, [-20, -150], [0, 1]);

    const isQuick = recipe.time <= 5;
    const iconSrc = isQuick ? '/icons/hands.svg' : '/icons/Pot.svg';

    const renderCost = (level: number) => (
        <span className="flex tracking-[2px]">
            {[...Array(3)].map((_, i) => (
                <span key={i} className={i < level ? 'text-slate-800 font-bold' : 'text-slate-200'}>
                    €
                </span>
            ))}
        </span>
    );

    useImperativeHandle(ref, () => ({
        swipe: async (direction) => {
            const targetX = direction === 'right' ? 300 : -300;
            await controls.start({
                x: targetX,
                opacity: 0,
                transition: { duration: 0.35, ease: "easeOut" }
            });
            onSwipe(direction);
        }
    }));

    const handleDragEnd = (_: any, info: any) => {
        const threshold = 100;
        if (info.offset.x > threshold) {
            onSwipe('right');
        } else if (info.offset.x < -threshold) {
            onSwipe('left');
        }
    };

    return (
        <motion.div
            style={{ x, rotate, opacity, scale, ...style }}
            animate={controls}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: 'grabbing' }}
            className="absolute w-full max-w-[360px] h-[600px] bg-white rounded-[36px] shadow-2xl cursor-grab border-4 border-white overflow-hidden touch-none flex flex-col will-change-transform"
        >
            {/* Visual Feedback Overlays */}
            <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 z-30 pointer-events-none">
                <div className="border-4 border-emerald-500 rounded-xl px-4 py-2 -rotate-12 bg-white/30 backdrop-blur-md shadow-lg">
                    <span className="text-4xl font-black text-emerald-500 tracking-wider">LIKE</span>
                </div>
            </motion.div>
            <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 z-30 pointer-events-none">
                <div className="border-4 border-rose-500 rounded-xl px-4 py-2 rotate-12 bg-white/30 backdrop-blur-md shadow-lg">
                    <span className="text-4xl font-black text-rose-500 tracking-wider">NOPE</span>
                </div>
            </motion.div>

            {/* Image Section - Premium Look */}
            <div className="h-[62%] w-full relative bg-slate-100 group">
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable={false}
                />

                {/* Gradient Overlay for better integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                {/* Info Button - Elegant */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onShowDetails?.();
                    }}
                    className="absolute top-5 right-5 w-11 h-11 bg-white/90 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center text-slate-700 hover:scale-110 hover:bg-white transition-all z-20 group-hover:shadow-emerald-500/20"
                >
                    <Info size={22} strokeWidth={2.5} />
                </button>
            </div>

            {/* Content Section - Clean White */}
            <div className="flex-1 p-7 flex flex-col bg-white">
                <div className="flex-1">
                    <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-wide uppercase">
                            {recipe.tags[0]}
                        </span>
                        {isQuick && (
                            <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold tracking-wide uppercase flex items-center gap-1">
                                Rápido
                            </span>
                        )}
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-2 line-clamp-2">
                        {recipe.name}
                    </h2>

                    {recipe.description && (
                        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed font-medium">
                            {recipe.description}
                        </p>
                    )}
                </div>

                {/* Metadata Footer */}
                <div className="flex items-center justify-between pt-5 border-t border-slate-100/60 mt-auto">
                    {/* Time & Effort */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                            <img
                                src={iconSrc}
                                alt={isQuick ? "Hands" : "Pot"}
                                className="w-5 h-5 opacity-70"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-0.5">Tiempo</span>
                            <span className="text-sm font-bold text-slate-800 leading-none">{recipe.time} min</span>
                        </div>
                    </div>

                    {/* Cost */}
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-0.5">Coste</span>
                            <div className="flex items-center">
                                {renderCost(recipe.cost || 2)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
