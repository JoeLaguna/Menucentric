import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface PlanCardProps {
    title: string;
    description?: string;
    image: string;
    tag?: string;
    onClick?: () => void;
    className?: string;
}

export const PlanCard = ({
    title,
    description,
    image,
    tag,
    onClick,
    className = ""
}: PlanCardProps) => {
    return (
        <div
            onClick={onClick}
            className={`group flex flex-col gap-2 cursor-pointer ${className}`}
        >
            {/* Image Container with rounded feel similar to Airbnb */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-200">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Overlay gradient for tag readability if needed, but keeping it clean */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Top Actions */}
                <div className="absolute top-3 right-3">
                    <button className="p-2 rounded-full hover:bg-white/10 hover:backdrop-blur-sm transition-all text-white/90 hover:scale-110 active:scale-95">
                        <Heart size={24} className="drop-shadow-sm" strokeWidth={2.5} />
                    </button>
                </div>

                {tag && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900">
                            {tag}
                        </span>
                    </div>
                )}
            </div>

            {/* Content Below - Clean Text */}
            <div className="flex flex-col px-1">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-slate-900 text-base leading-tight group-hover:text-emerald-600 transition-colors">
                        {title}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0">
                        <span className="text-xs font-bold text-slate-900">★ 4.9</span>
                    </div>
                </div>

                {description && (
                    <p className="text-slate-500 text-sm leading-snug line-clamp-1 mt-0.5">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};
