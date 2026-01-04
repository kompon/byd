"use client";

import { Input, Textarea, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Send } from "lucide-react";
import { useEffect, useState } from "react";

export const ContactSection = () => {
    const [settings, setSettings] = useState({
        contact_address: "123 คลองเตย...",
        contact_phone: "02-123-4567",
        contact_email: "contact@example.com",
        contact_line: "@prideauto",
        contact_map_url: ""
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

    return (
        <section id="contact" className="py-24 bg-black relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[100px] rounded-full" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-bold text-white mb-8">ติดต่อ<span className="text-gold-500">เรา</span></h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-gold-500 shrink-0">
                                    <MapPin />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Showroom Location</h3>
                                    <p className="text-gray-400 whitespace-pre-line">{settings.contact_address}</p>
                                    <div className="mt-4 h-48 w-full bg-zinc-900 rounded-xl overflow-hidden border border-white/10 relative group">
                                        {settings.contact_map_url ? (
                                            <iframe
                                                src={settings.contact_map_url}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-gray-500 group-hover:bg-zinc-700 transition-colors">
                                                <span className="flex items-center gap-2"><MapPin size={16} /> Google Map Area</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-gold-500 shrink-0">
                                    <Phone />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">ข้อมูลติดต่อ</h3>
                                    <p className="text-gray-400">โทร: {settings.contact_phone}</p>
                                    <p className="text-gray-400">LINE: {settings.contact_line}</p>
                                    <p className="text-gray-400">Email: {settings.contact_email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-gold-500 shrink-0">
                                    <Clock />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">เวลาทำการ</h3>
                                    <p className="text-gray-400">จันทร์ - อาทิตย์: 09:00 - 19:00 น.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">ส่งข้อความถึงเรา</h3>
                        <form className="space-y-6">
                            <Input
                                label="ชื่อ-นามสกุล"
                                placeholder="กรอกชื่อของคุณ"
                                variant="bordered"
                                classNames={{
                                    inputWrapper: "border-white/20 hover:border-gold-500/50 focus-within:!border-gold-500"
                                }}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="เบอร์โทรศัพท์"
                                    placeholder="099-xxx-xxxx"
                                    variant="bordered"
                                    classNames={{
                                        inputWrapper: "border-white/20 hover:border-gold-500/50 focus-within:!border-gold-500"
                                    }}
                                />
                                <Input
                                    label="อีเมล"
                                    placeholder="example@mail.com"
                                    variant="bordered"
                                    classNames={{
                                        inputWrapper: "border-white/20 hover:border-gold-500/50 focus-within:!border-gold-500"
                                    }}
                                />
                            </div>
                            <Textarea
                                label="ข้อความ"
                                placeholder="รายละเอียดที่ต้องการสอบถาม..."
                                minRows={4}
                                variant="bordered"
                                classNames={{
                                    inputWrapper: "border-white/20 hover:border-gold-500/50 focus-within:!border-gold-500"
                                }}
                            />
                            <Button
                                className="w-full bg-gradient-to-r from-gold-400 to-gold-600 text-black font-bold shadow-lg shadow-gold-500/20"
                                size="lg"
                                endContent={<Send size={18} />}
                            >
                                ส่งข้อความ
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
