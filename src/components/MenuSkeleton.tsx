import { motion } from 'framer-motion';

// Helper for the individual card skeleton
const SkeletonCard = () => (
    <div className="flex items-center gap-2 md:gap-3 p-2 2xl:p-3 rounded-xl border border-slate-100 bg-white">
        <div className="w-10 h-10 md:w-12 md:h-12 2xl:w-14 2xl:h-14 bg-slate-200 rounded-lg flex-shrink-0"></div>
        <div className="flex-1 space-y-1.5">
            <div className="h-3 2xl:h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-2 2xl:h-3 bg-slate-200 rounded w-1/2"></div>
        </div>
    </div>
);

export const MenuSkeleton = () => {
    return (
        <motion.div
            className="min-w-[1400px] h-full grid grid-cols-7 gap-3 2xl:gap-6 pb-20 lg:pb-0"
        >
            {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-3 2xl:p-4 flex flex-col gap-3 2xl:gap-6 border border-slate-100 animate-pulse h-full">
                    {/* Column Header */}
                    <div className="mb-1 2xl:mb-2 text-center border-b border-dashed border-slate-200/20 pb-2 flex justify-center">
                        <div className="h-3 2xl:h-4 bg-slate-200 rounded w-3/4"></div>
                    </div>

                    {/* Meal Slots */}
                    <div className="flex-1 flex flex-col gap-3 2xl:gap-5">
                        {/* Desayuno + Café */}
                        <div className="flex flex-col gap-1 2xl:gap-2">
                            <div className="h-2 w-12 bg-slate-200 rounded mb-0.5"></div>
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>

                        {/* Media Mañana */}
                        <div className="flex flex-col gap-1 2xl:gap-2">
                            <div className="h-2 w-12 bg-slate-200 rounded mb-0.5"></div>
                            <SkeletonCard />
                        </div>

                        {/* Comida + Fruta */}
                        <div className="flex flex-col gap-1 2xl:gap-2">
                            <div className="h-2 w-12 bg-slate-200 rounded mb-0.5"></div>
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>

                        {/* Cena + Yogur */}
                        <div className="flex flex-col gap-1 2xl:gap-2">
                            <div className="h-2 w-12 bg-slate-200 rounded mb-0.5"></div>
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    );
};
