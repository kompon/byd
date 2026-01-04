"use client";

import { Link } from "@heroui/react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

export const Footer = () => {
    const [settings, setSettings] = useState({
        contact_facebook: "",
        contact_twitter: "",
        contact_instagram: ""
    });

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                setSettings(prev => ({ ...prev, ...data }));
            })
            .catch(err => console.error("Failed to load footer links", err));
    }, []);

    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center bg-zinc-900/50 p-8 rounded-2xl mb-12">
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-white mb-2">PRIDE<span className="text-gold-500">AUTO</span></h2>
                        <p className="text-gray-400">สัมผัสประสบการณ์เหนือระดับ</p>
                    </div>
                    <div className="flex gap-6">
                        {settings.contact_facebook && (
                            <Link href={settings.contact_facebook} isExternal className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-gold-500 hover:text-black transition-colors">
                                <Facebook size={20} />
                            </Link>
                        )}
                        {settings.contact_instagram && (
                            <Link href={settings.contact_instagram} isExternal className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-gold-500 hover:text-black transition-colors">
                                <Instagram size={20} />
                            </Link>
                        )}
                        {settings.contact_twitter && (
                            <Link href={settings.contact_twitter} isExternal className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-gold-500 hover:text-black transition-colors">
                                <Twitter size={20} />
                            </Link>
                        )}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 pt-8 border-t border-white/5">
                    <p>&copy; 2024 Premium Auto Showroom. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</Link>
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors">เงื่อนไขการใช้บริการ</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
