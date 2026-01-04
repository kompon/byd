"use client";

import { Card, CardBody, CardFooter, Image, Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { ChevronRight, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

export const NewsPromo = () => {
    const [news, setNews] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/promotions")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setNews(data.filter((n: any) => n.is_active));
            })
            .catch(err => console.error("Failed to fetch news", err));
    }, []);

    return (
        <section id="news" className="py-20 bg-black relative overflow-hidden">
            {/* Background Details */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Chip variant="flat" className="bg-gold-500/10 text-gold-400 mb-4">UPDATES</Chip>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">ข่าวสารและ<span className="text-gold-400">โปรโมชั่น</span></h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        ติดตามข่าวสารล่าสุดและข้อเสนอพิเศษจาก BYD Pride Auto
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {news.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Card
                                className="bg-zinc-900 border border-white/5 hover:border-gold-500/30 transition-all group h-full"
                            >
                                <CardBody className="p-0 overflow-hidden relative aspect-video">
                                    <div className="absolute top-4 left-4 z-10">
                                        <Chip
                                            size="sm"
                                            color={item.type === 'promotion' ? "warning" : "primary"}
                                            variant="solid"
                                            classNames={{ content: "font-bold text-black" }}
                                        >
                                            {item.type === 'promotion' ? "PROMOTION" : "NEWS"}
                                        </Chip>
                                    </div>
                                    <Image
                                        width="100%"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        src={item.banner_image_url || "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800"}
                                        alt={item.title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80" />
                                </CardBody>
                                <CardFooter className="flex-col items-start p-6 gap-4">
                                    <div className="flex items-center gap-2 text-gold-500 text-xs font-medium">
                                        <Calendar size={14} />
                                        <span>{new Date(item.start_date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-white leading-tight group-hover:text-gold-400 transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-3">
                                            {item.short_description}
                                        </p>
                                    </div>
                                    <Button
                                        variant="light"
                                        className="text-white hover:text-gold-400 px-0 gap-2 group/btn"
                                        endContent={<ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />}
                                    >
                                        อ่านเพิ่มเติม
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
