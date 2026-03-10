import { useState } from 'react';
import { Menu, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useNavigate, NavLink } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 h-14 md:h-16 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 z-50 transition-colors duration-300">
            {/* Logo Section */}
            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate('/')}
            >
                <div className="w-8 h-8 bg-slate-900 dark:bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold transition-colors">
                    M
                </div>
                <span className="text-slate-900 dark:text-white font-bold text-lg tracking-tight transition-colors">
                    Menu Semanal
                </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-900/50 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50 transition-colors">
                <NavLink to="/" className={({ isActive }) => `px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                    Explorar
                </NavLink>
                <NavLink to="/lists" className={({ isActive }) => `px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                    Mis Listas
                </NavLink>
                <NavLink to="/home" className={({ isActive }) => `px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                    Mi Menú
                </NavLink>
                <NavLink to="/shopping-list" className={({ isActive }) => `px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                    Lista
                </NavLink>
            </div>

            {/* Menu Icon & Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-700 dark:text-slate-200"
                >
                    <Menu size={24} />
                </button>

                {isMenuOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Configuración</p>
                            </div>

                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    navigate('/account');
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group mb-1"
                            >
                                <div className="p-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
                                    <User size={18} />
                                </div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                    Mi Cuenta
                                </span>
                            </button>

                            <button
                                onClick={toggleTheme}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    {theme === 'dark' ? (
                                        <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-md">
                                            <Moon size={18} />
                                        </div>
                                    ) : (
                                        <div className="p-1.5 bg-amber-500/10 text-amber-500 rounded-md">
                                            <Sun size={18} />
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                        {theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}
                                    </span>
                                </div>

                                <div className={`w-9 h-5 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${theme === 'dark' ? 'translate-x-4' : 'translate-x-0'}`} />
                                </div>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};
