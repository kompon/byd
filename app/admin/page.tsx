"use client";

import { Card, CardBody, Spinner, Chip } from "@heroui/react";
import { useEffect, useState } from "react";
import { Car, Megaphone, Activity, ArrowUpRight } from "lucide-react";

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
        return <div className="p-8 flex justify-center"><Spinner size="lg" color="warning" /></div>;
    }

    return (
        <div className="p-8">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
                <p className="text-gray-500">Overview of your showroom performance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <CardBody className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-gold-50 transition-colors">
                                <Car className="w-6 h-6 text-slate-600 group-hover:text-gold-600" />
                            </div>
                            <Chip size="sm" classNames={{ base: "bg-slate-100", content: "text-slate-600 font-medium text-xs" }}>+2 New</Chip>
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">Total Car Models</p>
                            <h3 className="text-3xl font-bold text-slate-800">{stats.cars}</h3>
                        </div>
                    </CardBody>
                </Card>

                <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <CardBody className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-gold-50 transition-colors">
                                <Megaphone className="w-6 h-6 text-slate-600 group-hover:text-gold-600" />
                            </div>
                            <Chip size="sm" classNames={{ base: "bg-green-50", content: "text-green-600 font-medium text-xs" }}>Active</Chip>
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">Active Promotions</p>
                            <h3 className="text-3xl font-bold text-slate-800">{stats.promotions}</h3>
                        </div>
                    </CardBody>
                </Card>

                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardBody className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-slate-50 rounded-lg">
                                <Activity className="w-6 h-6 text-slate-600" />
                            </div>
                            <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-green-50 border border-green-100">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[10px] font-bold text-green-700 uppercase">Online</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">System Status</p>
                            <h3 className="text-3xl font-bold text-slate-800">Operational</h3>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
