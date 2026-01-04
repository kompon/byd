"use client";

import { Link } from "@heroui/react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

export const Footer = () => {
    const { t } = useLanguage();
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
        <footer className="bg-slate-50 border-t border-slate-200/60 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-12 rounded-[2.5rem] mb-12 shadow-xl shadow-slate-200/50">
                    <div className="mb-8 md:mb-0 text-center md:text-left">
                        <h2 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">PRIDE<span className="text-brand-primary">AUTO</span></h2>
                        <p className="text-slate-500 font-light tracking-wide">{t("สัมผัสประสบการณ์เหนือระดับ ผู้นำแห่งยนตรกรรมไฟฟ้า", "Experience superior driving. Leader in electric mobility.")}</p>
                    </div>
                    <div className="flex gap-6">
                        {settings.contact_facebook && (
                            <Link href={settings.contact_facebook} isExternal className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-brand-primary hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-brand-primary/30 transition-all duration-300">
                                <Facebook size={24} />
                            </Link>
                        )}
                        {settings.contact_instagram && (
                            <Link href={settings.contact_instagram} isExternal className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-pink-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300">
                                <Instagram size={24} />
                            </Link>
                        )}
                        {settings.contact_twitter && (
                            <Link href={settings.contact_twitter} isExternal className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-500 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                                <Twitter size={24} />
                            </Link>
                        )}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 font-light pt-8 border-t border-slate-200/60">
                    <p>&copy; 2024 Premium Auto Showroom. All rights reserved.</p>
                    <div className="flex gap-8 mt-6 md:mt-0">
                        <Link href="#" className="text-slate-500 hover:text-brand-primary transition-colors">{t("นโยบายความเป็นส่วนตัว", "Privacy Policy")}</Link>
                        <Link href="#" className="text-slate-500 hover:text-brand-primary transition-colors">{t("เงื่อนไขการใช้บริการ", "Terms of Service")}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
