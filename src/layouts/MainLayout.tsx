import { Outlet, useLocation } from 'react-router-dom'
import { useMenuStore } from '../store/useMenuStore';
import clsx from 'clsx'


export
    const MainLayout = () => {
        const location = useLocation();
        const background = useMenuStore((state) => state.background);
        const isFullScreenPage = location.pathname.startsWith('/plan-preview');

        return (
            <div className={clsx(
                "flex h-screen overflow-hidden transition-colors duration-300",
                !background ? "bg-slate-50 dark:bg-slate-950" : "bg-transparent"
            )}>
                {/* Main Content Area */}
                <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
                    <div className={clsx(
                        "absolute inset-0 top-14 md:top-16 pb-20 md:pb-0",
                        isFullScreenPage ? "overflow-hidden" : "overflow-y-auto"
                    )}>
                        <Outlet />
                    </div>
                </main>
            </div>
        )
    }


