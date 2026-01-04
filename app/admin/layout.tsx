"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    Car,
    Megaphone,
    LogOut,
    MessageSquare,
    Phone
} from 'lucide-react';
import { Button } from "@heroui/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Hide sidebar on login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const menuItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Car Models', href: '/admin/car-models', icon: Car },
        { name: 'Promotions', href: '/admin/promotions', icon: Megaphone },
        { name: 'Popup Manager', href: '/admin/popup', icon: MessageSquare },
        { name: 'Contact Settings', href: '/admin/contact', icon: Phone },
        // Removed Settings and Navbar as requested
    ];

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/admin/login';
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-950 text-white selection:bg-gold-500/30">
            {/* Sidebar */}
            <aside className="w-72 border-r border-white/5 bg-black/20 backdrop-blur-xl p-6 flex flex-col relative z-20">
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/20">
                        <span className="text-black font-extrabold text-xl">A</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg tracking-wide text-white">PRIDE AUTO</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Admin Panel</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${isActive
                                    ? 'bg-white/10 text-white font-medium border-l-2 border-gold-500 shadow-lg shadow-black/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
                                    }`}
                            >
                                <Icon size={20} className={isActive ? "text-gold-400" : "text-gray-500 group-hover:text-white transition-colors"} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="pt-6 border-t border-white/5">
                    <Button
                        variant="light"
                        color="danger"
                        className="w-full justify-start gap-3 px-4 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                        onPress={handleLogout}
                    >
                        <LogOut size={20} />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto relative p-8">
                {/* Decorative background glow */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-blue-500/5 blur-[120px] pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
