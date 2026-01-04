"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Star, Medal } from "lucide-react";
import { Image } from "@heroui/react";
import { useState, useEffect } from "react";
import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { fadeInUp, staggerContainer } from "./utils/animations";

// Icon mapping
const iconMap: Record<string, any> = {
    Trophy,
    Star,
    Award,
    Medal,
};

type AwardData = {
    id: number;
    title: string;
    description: string;
    year: string;
    icon: string;
    image_url: string;
    display_order: number;
};

const AwardCard = ({ award }: { award: AwardData }) => (
    <div className="group relative bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 aspect-[5/4] flex flex-col">
        {/* Image Section */}
        <div className="relative flex-grow overflow-hidden">
            <Image
                src={award.image_url}
                alt={award.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                radius="none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Year Badge */}
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full z-10">
                <span className="text-brand-primary font-bold text-sm">{award.year}</span>
            </div>

            {/* Icon */}
            <div className="absolute bottom-6 left-6 z-10">
                <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    {iconMap[award.icon] && React.createElement(iconMap[award.icon], { className: "w-8 h-8 text-brand-primary" })}
                </div>
            </div>
        </div>

        {/* Content Section */}
        <div className="p-8 shrink-0">
            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-primary transition-colors line-clamp-1">
                {award.title}
            </h3>
            <p className="text-slate-500 leading-relaxed line-clamp-2">
                {award.description}
            </p>
        </div>

        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
);

export const AboutSection = () => {
    const [awards, setAwards] = useState<AwardData[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchAwards = async () => {
            try {
                const res = await fetch("/api/homepage/awards");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setAwards(data);
                }
            } catch (error) {
                console.error("Error fetching awards:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAwards();
    }, []);

    if (loading) {
        return (
            <section className="py-32 bg-slate-50">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-slate-500">{t("กำลังโหลด...", "Loading...")}</p>
                </div>
            </section>
        );
    }
    return (
        <section id="about" className="py-32 bg-slate-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-900/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200 blur-[100px] rounded-full" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                        {t("รู้จักกับ", "About")} <span className="text-brand-primary">{t("เรา", "Us")}</span>
                    </h2>
                    <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
                        {t("ผู้นำด้านยานยนต์ไฟฟ้าที่ได้รับการยอมรับในระดับสากล พร้อมมอบประสบการณ์ที่เหนือระดับให้กับลูกค้าทุกท่าน", "Recognized global leader in electric vehicles, ready to deliver superior experiences to all customers.")}
                    </p>
                </motion.div>

                {/* Responsive Carousel */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={24}
                        slidesPerView={1.1}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                centeredSlides: false,
                                spaceBetween: 32,
                            },
                        }}
                        className="pb-16 px-4 !overflow-visible max-w-6xl mx-auto"
                    >
                        {awards.map((award) => (
                            <SwiperSlide key={award.id} className="h-auto">
                                <AwardCard award={award} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
        </section>
    );
};
