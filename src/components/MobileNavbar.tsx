import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, Compass, BookHeart } from 'lucide-react';
import clsx from 'clsx';

export const MobileNavbar = () => {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50 flex justify-around items-center h-16 px-4 transition-colors">
            <MobileNavItem to="/" icon={<Compass size={24} />} label="Explorar" />
            <MobileNavItem to="/lists" icon={<BookHeart size={24} />} label="Mis Listas" />
            <MobileNavItem to="/home" icon={<Home size={24} />} label="Mi Menú" />
            <MobileNavItem to="/shopping-list" icon={<ShoppingCart size={24} />} label="Lista" />
        </nav>
    );
};

const MobileNavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            clsx(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
                isActive ? "text-emerald-600 dark:text-emerald-500" : "text-slate-400 dark:text-slate-500"
            )
        }
    >
        {icon}
        <span className="text-[10px] mt-1 font-medium">{label}</span>
    </NavLink>
);
