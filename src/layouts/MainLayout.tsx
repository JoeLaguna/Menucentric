import { Outlet, NavLink } from 'react-router-dom'
import { Home, ShoppingCart, Compass, BookHeart } from 'lucide-react'
import clsx from 'clsx'
import { Sidebar } from '../components/Sidebar'

export
    const MainLayout = () => {
        return (
            <div className="flex min-h-screen bg-slate-50">
                {/* Desktop Sidebar (Visible on md+) */}
                <div className="hidden md:block h-screen sticky top-0">
                    <Sidebar />
                </div>

                {/* Mobile Bottom Bar (Visible on < md) */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 flex justify-around items-center h-16 px-4">
                    <MobileNavItem to="/" icon={<Compass size={24} />} label="Explorar" />
                    <MobileNavItem to="/lists" icon={<BookHeart size={24} />} label="Mis Listas" />
                    <MobileNavItem to="/home" icon={<Home size={24} />} label="Mi Menú" />
                    <MobileNavItem to="/shopping-list" icon={<ShoppingCart size={24} />} label="Lista" />
                </nav>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0 h-screen overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        )
    }

const MobileNavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            clsx(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
                isActive ? "text-emerald-600" : "text-slate-400"
            )
        }
    >
        {icon}
        <span className="text-[10px] mt-1 font-medium">{label}</span>
    </NavLink>
);
