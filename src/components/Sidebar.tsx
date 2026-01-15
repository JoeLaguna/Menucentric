import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, Compass, ChevronLeft, ChevronRight, BookHeart } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useState } from 'react';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    return (
        <motion.div
            animate={{ width: isCollapsed ? 72 : 256 }}
            className={clsx(
                "h-screen bg-slate-900 text-white flex flex-col border-r border-slate-800 z-50 transition-all duration-300 ease-in-out relative sticky top-0",
                className
            )}
        >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-bold text-xl tracking-tight bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent whitespace-nowrap overflow-hidden"
                    >
                        MenuCentric
                    </motion.div>
                )}
                <button
                    onClick={toggleCollapse}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-2 space-y-2">
                <NavItem to="/" icon={<Compass size={22} />} label="Explorar" isCollapsed={isCollapsed} />
                <NavItem to="/lists" icon={<BookHeart size={22} />} label="Mis Listas" isCollapsed={isCollapsed} />
                <NavItem to="/home" icon={<Home size={22} />} label="Mi Menú" isCollapsed={isCollapsed} />
                <NavItem to="/shopping-list" icon={<ShoppingCart size={22} />} label="Lista" isCollapsed={isCollapsed} />
            </nav>

            {/* Footer / User Profile Mock */}
            <div className="p-4 border-t border-slate-800">
                <div className={clsx("flex items-center gap-3", isCollapsed && "justify-center")}>
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs ring-2 ring-emerald-500/10">
                        JO
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Jamie Oliver</p>
                            <p className="text-[10px] text-slate-400 truncate">Pro Member</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const NavItem = ({ to, icon, label, isCollapsed }: { to: string; icon: React.ReactNode; label: string; isCollapsed: boolean }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            clsx(
                "flex items-center px-3 py-3 rounded-xl transition-all group relative",
                isCollapsed ? "justify-center" : "justify-start gap-3",
                isActive
                    ? "bg-emerald-500/10 text-emerald-400 font-medium"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
            )
        }
        title={isCollapsed ? label : undefined}
    >
        <span className="flex-shrink-0 transition-colors">{icon}</span>

        {!isCollapsed ? (
            <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm whitespace-nowrap"
            >
                {label}
            </motion.span>
        ) : (
            // Tooltip helper for collapsed mode could go here, but using 'title' attr for simplicity now
            null
        )}

        {/* Active Indicator Bar */}
        <NavLink to={to} className={({ isActive }) => clsx("absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-lg transition-transform origin-left", isActive ? "scale-x-100" : "scale-x-0")} />
    </NavLink>
);
