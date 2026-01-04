"use client";

import { Card, CardBody } from "@/app/components/ui/card/Card";
import { useEffect, useState } from "react";
import { Car, Megaphone, Activity } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ cars: 0, promotions: 0, loading: true });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [carsRes, promoRes] = await Promise.all([
                    fetch("/api/car-models"),
                    fetch("/api/promotions")
                ]);
                const cars = await carsRes.json();
                const promos = await promoRes.json();
                setStats({
                    cars: Array.isArray(cars) ? cars.length : 0,
                    promotions: Array.isArray(promos) ? promos.length : 0,
                    loading: false
                });
            } catch (error) {
                console.error("Failed to fetch stats");
                setStats((prev) => ({ ...prev, loading: false }));
            }
        };
        fetchStats();
    }, []);

    if (stats.loading) {
        return <div className="p-8 flex justify-center text-gray-500 dark:text-gray-400">Loading...</div>;
    }

    return (
        <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6 mb-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Overview of your showroom performance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-brand-primary/5 dark:from-blue-500/10 dark:to-brand-primary/10"></div>
                    <CardBody className="p-6 relative">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-gradient-to-br from-brand-primary to-blue-600 rounded-2xl shadow-lg shadow-brand-primary/30">
                                <Car className="w-7 h-7 text-white" />
                            </div>
                            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200 dark:from-emerald-500/10 dark:to-green-500/10 dark:text-emerald-400 dark:border-emerald-500/20">+2 New</span>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm font-semibold mb-2 dark:text-gray-400 uppercase tracking-wider">Total Car Models</p>
                            <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{stats.cars}</h3>
                        </div>
                    </CardBody>
                </Card>

                <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 dark:from-emerald-500/10 dark:to-green-500/10"></div>
                    <CardBody className="p-6 relative">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg shadow-emerald-500/30">
                                <Megaphone className="w-7 h-7 text-white" />
                            </div>
                            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200 dark:from-emerald-500/10 dark:to-green-500/10 dark:text-emerald-400 dark:border-emerald-500/20">Active</span>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm font-semibold mb-2 dark:text-gray-400 uppercase tracking-wider">Active Promotions</p>
                            <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{stats.promotions}</h3>
                        </div>
                    </CardBody>
                </Card>

                <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 dark:from-blue-500/10 dark:to-indigo-500/10"></div>
                    <CardBody className="p-6 relative">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30">
                                <Activity className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 dark:from-emerald-500/10 dark:to-green-500/10 dark:border-emerald-500/20">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50"></div>
                                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">Online</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm font-semibold mb-2 dark:text-gray-400 uppercase tracking-wider">System Status</p>
                            <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Operational</h3>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
