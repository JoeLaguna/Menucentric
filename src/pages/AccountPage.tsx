import { useState } from 'react';
import { User, Mail, Lock, CreditCard, LogOut, Camera } from 'lucide-react';

export const AccountPage = () => {
    const [name, setName] = useState('Jose');
    const [email, setEmail] = useState('jose@gmail.com');
    const [password, setPassword] = useState('********');

    return (
        <div className="min-h-full bg-slate-50 dark:bg-slate-950 p-4 md:p-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-8 pb-12">

                {/* My Account Section */}
                <section>
                    <h2 className="text-2xl font-light text-slate-800 dark:text-slate-100 mb-4 px-1">Mi Cuenta</h2>
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col md:flex-row gap-8">

                        {/* Form Fields */}
                        <div className="flex-1 space-y-6">
                            {/* Name Input */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nombre</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <User size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <Mail size={16} />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="relative">
                                <div className="flex justify-between items-end mb-1.5">
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Contraseña</label>
                                    <button className="text-xs text-slate-400 hover:text-emerald-500 transition-colors">Cambiar</button>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <Lock size={16} />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md text-sm text-slate-500 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                        disabled
                                    />
                                </div>
                            </div>

                            <button className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-medium py-2 px-6 rounded-md transition-colors text-sm shadow-sm md:w-auto w-full">
                                Guardar
                            </button>
                        </div>

                        {/* Avatar */}
                        <div className="flex flex-col items-center justify-center gap-2 md:w-48 order-first md:order-last border-b md:border-b-0 md:border-l border-slate-100 dark:border-slate-800 pb-6 md:pb-0 md:pl-6">
                            <div className="w-24 h-24 rounded-full bg-teal-400 flex items-center justify-center text-white text-4xl shadow-md relative group cursor-pointer overflow-hidden">
                                <span>{name.charAt(0).toUpperCase()}</span>
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera size={24} />
                                </div>
                            </div>
                            <button className="text-xs text-slate-400 hover:text-emerald-500 transition-colors mt-2">
                                Cambiar Avatar
                            </button>
                        </div>
                    </div>
                </section>

                {/* Billing Section */}
                <section>
                    <h2 className="text-2xl font-light text-slate-800 dark:text-slate-100 mb-4 px-1">Facturación</h2>
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6 space-y-6">

                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">Resumen</h3>
                            <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                <p><strong className="text-slate-800 dark:text-slate-300 font-medium">Tu Plan:</strong> Premium - Suscripción Anual de pago único.</p>
                                <p>Para prevenir la interrupción del servicio, se te enviará la factura de renovación de forma automática.</p>
                                <p>Tu próximo pago de <strong>39.99€</strong> será cobrado el <strong>4 de Junio de 2026</strong>.</p>
                                <p>Puedes <button className="text-emerald-500 hover:text-emerald-600 hover:underline">desactivar la renovación automática</button> para que tu plan termine en la próxima fecha de finalización.</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">Tarjeta de Crédito</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded text-slate-500">
                                    <CreditCard size={20} />
                                </div>
                                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    **** **** **** 4242
                                </div>
                            </div>
                            <button className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm shadow-sm md:w-auto w-full">
                                Actualizar datos de tarjeta
                            </button>
                        </div>
                    </div>
                </section>

                {/* Logout Section */}
                <section>
                    <h2 className="text-2xl font-light text-slate-800 dark:text-slate-100 mb-4 px-1">Cerrar Sesión</h2>
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">Te echaremos de menos</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Si cierras sesión tendrás que volver a introducir tus credenciales la próxima vez que utilices la aplicación.</p>
                        <button className="flex items-center justify-center md:justify-start gap-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition-colors text-sm shadow-sm md:w-auto w-full">
                            <LogOut size={16} /> Cerrar Sesión
                        </button>
                    </div>
                </section>

            </div>
        </div>
    );
};
