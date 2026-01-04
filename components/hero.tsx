"use client";

import { Button, Image, Chip } from "@heroui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronRight, Zap, Shield, Leaf } from "lucide-react";
import Link from 'next/link';
import { useLanguage } from "@/app/context/LanguageContext";

export const HeroSection = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Dynamic Content
    const { t } = useLanguage();
    const [content, setContent] = useState({
        headline: t("สัมผัสที่สุดแห่ง<br/><span class='text-brand-primary'>ยนตรกรรมแห่งอนาคต</span>", "Experience the Ultimate<br/><span class='text-brand-primary'>Future of Automotive</span>"),
        subheadline: t("เปิดประสบการณ์การขับขี่ที่เหนือระดับ พร้อมดีไซน์ที่ล้ำสมัยและเทคโนโลยีอัจฉริยะ", "Unlock a superior driving experience with cutting-edge design and intelligent technology."),
        bgImage: ""
    });

    // Check if background is video
    const isVideo = (url: string) => {
        return /\.(mp4|webm|ogg)$/i.test(url);
    };

    // Check if URL is YouTube
    const isYouTube = (url: string) => {
        return /(?:youtube\.com|youtu\.be)/.test(url);
    };

    // Extract YouTube video ID
    const getYouTubeId = (url: string) => {
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : null;
    };

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                setContent({
                    headline: data.hero_headline || t("สัมผัสที่สุดแห่ง<br/><span class='text-brand-primary'>ยนตรกรรมแห่งอนาคต</span>", "Experience the Ultimate<br/><span class='text-brand-primary'>Future of Automotive</span>"),
                    subheadline: data.hero_subheadline || t("เปิดประสบการณ์การขับขี่ที่เหนือระดับ พร้อมดีไซน์ที่ล้ำสมัยและเทคโนโลยีอัจฉริยะ", "Unlock a superior driving experience with cutting-edge design and intelligent technology."),
                    bgImage: data.hero_background_image_url || ""
                });
            })
            .catch(err => console.error("Failed to fetch settings", err));
    }, []);

    // Scroll to section
    const handleScroll = (e: any, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
            {/* Background with Parallax */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                {isYouTube(content.bgImage) ? (
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <iframe
                            src={`https://www.youtube.com/embed/${getYouTubeId(content.bgImage)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeId(content.bgImage)}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            style={{
                                width: '100vw',
                                height: '56.25vw', // 16:9 aspect ratio
                                minHeight: '100vh',
                                minWidth: '177.77vh', // 16:9 aspect ratio
                                border: 'none'
                            }}
                            allow="autoplay; encrypted-media"
                        />
                    </div>
                ) : isVideo(content.bgImage) ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover transform scale-105"
                    >
                        <source src={content.bgImage} type="video/mp4" />
                    </video>
                ) : (
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
                        style={{ backgroundImage: `url('${content.bgImage}')` }}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
            </motion.div>

            <div className="container mx-auto px-4 z-10 relative mt-32">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        {content.headline && (content.headline.startsWith('http') || content.headline.startsWith('/')) && (
                            <div className="flex justify-center mb-8">
                                <img
                                    src={content.headline}
                                    alt="Logo"
                                    className="h-32 md:h-48 w-auto object-contain drop-shadow-2xl"
                                />
                            </div>
                        )}
                        <p className="text-lg md:text-2xl text-white/90 mb-12 font-normal max-w-2xl mx-auto tracking-wide leading-relaxed drop-shadow-md">
                            {content.subheadline}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    >
                        <Button
                            as={Link}
                            href="#models"
                            size="lg"
                            className="bg-brand-primary text-white font-medium px-12 py-8 text-lg rounded-full shadow-2xl shadow-brand-primary/20 hover:shadow-brand-primary/40 hover:-translate-y-1 transition-all tracking-wide"
                            onClick={(e) => handleScroll(e, "models")}
                        >
                            {t("เลือกรุ่นรถของคุณ", "Choose Your Model")}
                        </Button>
                        <Button
                            as={Link}
                            href="#contact"
                            size="lg"
                            variant="bordered"
                            className="border-slate-300 text-text-heading font-medium px-12 py-8 text-lg rounded-full bg-surface-card/50 backdrop-blur-sm hover:bg-surface-card hover:border-slate-400 transition-all tracking-wide"
                            onClick={(e) => handleScroll(e, "contact")}
                        >
                            {t("สอบถามข้อมูล", "Contact Us")}
                        </Button>
                    </motion.div>

                    {/* Feature Highlights */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="flex flex-wrap justify-center gap-6 mt-12"
                    >
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                            <Zap className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-medium">{t("ประหยัดพลังงาน", "Energy Efficient")}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                            <Shield className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-medium">{t("ปลอดภัยสูงสุด", "Maximum Safety")}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                            <Leaf className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-medium">{t("เป็นมิตรกับสิ่งแวดล้อม", "Eco Friendly")}</span>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Icons */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-[10%] hidden lg:block"
                >
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                        <Zap className="w-8 h-8 text-white" />
                    </div>
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        rotate: [0, -5, 0]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                    className="absolute top-1/3 right-[10%] hidden lg:block"
                >
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, -15, 0],
                        rotate: [0, 3, 0]
                    }}
                    transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-1/4 left-[15%] hidden lg:block"
                >
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                        <Leaf className="w-8 h-8 text-white" />
                    </div>
                </motion.div>


            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce"
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-3 bg-white/50 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};
