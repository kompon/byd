"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

export const ContactSection = () => {
    const { t } = useLanguage();
    const [settings, setSettings] = useState({
        // Branch 1
        contact_name_1: "",
        contact_address_1: "123 คลองเตย...",
        contact_phone_1: "02-123-4567",
        contact_line_1: "@prideauto",
        contact_map_url_1: "",
        // Branch 2
        contact_name_2: "",
        contact_address_2: "456 สาทร...",
        contact_phone_2: "02-789-0123",
        contact_line_2: "@prideauto2",
        contact_map_url_2: "",
    });

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                setSettings(prev => ({
                    ...prev,
                    ...data
                }));
            })
            .catch(err => console.error("Failed to load contact info", err));
    }, []);

    const extractMapUrl = (input: string) => {
        if (!input) return "";
        // If it's already a URL (starts with http), return it
        if (input.trim().startsWith("http")) return input;

        // If it's an iframe tag, try to extract the src
        const srcMatch = input.match(/src="([^"]*)"/);
        if (srcMatch && srcMatch[1]) return srcMatch[1];

        return input;
    };

    const branches = [
        {
            name: settings.contact_name_1 || t("สาขาที่ 1", "Branch 1"),
            address: settings.contact_address_1,
            phone: settings.contact_phone_1,
            line: settings.contact_line_1,
            mapUrl: extractMapUrl(settings.contact_map_url_1),
        },
        {
            name: settings.contact_name_2 || t("สาขาที่ 2", "Branch 2"),
            address: settings.contact_address_2,
            phone: settings.contact_phone_2,
            line: settings.contact_line_2,
            mapUrl: extractMapUrl(settings.contact_map_url_2),
        }
    ];

    return (
        <section id="contact" className="py-32 bg-slate-50 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[100px] rounded-full mix-blend-multiply" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                        {t("ติดต่อ", "Contact")} <span className="text-brand-accent">{t("เรา", "Us")}</span>
                    </h2>
                    <p className="text-slate-500 text-lg">{t("เรามี 2 สาขาให้บริการ", "We have 2 branches available")}</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                    {branches.map((branch, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50"
                        >
                            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">{branch.name}</h3>

                            <div className="space-y-6 mb-8">
                                {/* Address */}
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-brand-primary/5 rounded-xl flex items-center justify-center text-brand-primary shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 mb-1">{t("ที่อยู่", "Address")}</h4>
                                        <p className="text-slate-500 text-sm whitespace-pre-line">{branch.address}</p>
                                    </div>
                                </div>

                                {/* Phone & LINE */}
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-brand-primary/5 rounded-xl flex items-center justify-center text-brand-primary shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 mb-1">{t("ติดต่อ", "Contact")}</h4>
                                        <p className="text-slate-500 text-sm">{t("โทร", "Tel")}: {branch.phone}</p>
                                        <p className="text-slate-500 text-sm">LINE: {branch.line}</p>
                                    </div>
                                </div>

                                {/* Opening Hours */}
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-brand-primary/5 rounded-xl flex items-center justify-center text-brand-primary shrink-0">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 mb-1">{t("เวลาทำการ", "Opening Hours")}</h4>
                                        <p className="text-slate-500 text-sm">{t("จันทร์ - เสาร์", "Monday - Saturday")}</p>
                                        <p className="text-slate-500 text-sm">08:00 - 17:00 {t("น.", "")}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="h-[300px] w-full bg-slate-100 rounded-2xl overflow-hidden shadow-lg relative group">
                                {branch.mapUrl ? (
                                    <iframe
                                        src={branch.mapUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="w-full h-full object-cover transition-all duration-700"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-400">
                                        <span className="flex items-center gap-2"><MapPin size={16} /> Google Map Area</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
