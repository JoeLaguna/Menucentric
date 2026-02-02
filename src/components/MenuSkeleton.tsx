import { motion } from 'framer-motion';

export const MenuSkeleton = () => {
    return (
        <motion.div
            className="min-w-[1400px] h-full grid grid-cols-7 gap-3 2xl:gap-6 pb-20 lg:pb-0"
        >
            {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="bg-slate-100 rounded-2xl p-3 2xl:p-5 flex flex-col gap-4 animate-pulse">
                    <div className="h-4 2xl:h-6 bg-slate-200 rounded w-2/3 mx-auto mb-2"></div>
                    {Array.from({ length: 4 }).map((_, j) => (
                        <div key={j} className="space-y-2">
                            <div className="flex gap-3">
                                <div className="w-12 h-12 2xl:w-20 2xl:h-20 bg-slate-200 rounded-lg flex-shrink-0"></div>
                                <div className="flex-1 space-y-2 py-1">
                                    <div className="h-3 2xl:h-4 bg-slate-200 rounded w-full"></div>
                                    <div className="h-2 2xl:h-3 bg-slate-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </motion.div>
    );
};
