"use client";

import { Button, Image, Chip } from "@heroui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

export const HeroSection = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Dynamic Content
    const [content, setContent] = useState({
        headline: "สัมผัสที่สุดแห่ง<br/><span class='text-gold-400'>ยนตรกรรมไฟฟ้า</span>",
        subheadline: "เปิดประสบการณ์การขับขี่ที่เหนือระดับ พร้อมดีไซน์ที่ล้ำสมัยและเทคโนโลยีอัจฉริยะ",
        bgImage: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2000"
    });

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                setContent({
                    headline: data.hero_headline || "สัมผัสที่สุดแห่ง<br/><span class='text-gold-400'>ยนตรกรรมไฟฟ้า</span>",
                    subheadline: data.hero_subheadline || "เปิดประสบการณ์การขับขี่ที่เหนือระดับ พร้อมดีไซน์ที่ล้ำสมัยและเทคโนโลยีอัจฉริยะ",
                    bgImage: data.hero_background_image_url || "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2000"
                });
            })
            .catch(err => console.error("Failed to fetch settings", err));
    }, []);

    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
            {/* Background with Parallax */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
                    style={{ backgroundImage: `url('${content.bgImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-zinc-950" />
            </motion.div>

            <div className="container mx-auto px-4 z-10 relative mt-20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Chip variant="bordered" className="text-gold-400 border-gold-400/50 mb-6 backdrop-blur-sm">
                            PREMIUM SHOWROOM
                        </Chip>
                        <h1
                            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
                            dangerouslySetInnerHTML={{ __html: content.headline }}
                        />
                        <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-2xl mx-auto">
                            {content.subheadline}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-gold-400 to-gold-600 text-black font-bold px-8 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-105 transition-all"
                            radius="full"
                            endContent={<ChevronRight />}
                        >
                            ดูรุ่นรถ
                        </Button>
                        <Button
                            size="lg"
                            variant="bordered"
                            className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 backdrop-blur-sm"
                            radius="full"
                        >
                            จองทดลองขับ
                        </Button>
                    </motion.div>
                </div>

                {/* Hero Image */}
                <motion.div
                    style={{ y, opacity }}
                    className="relative lg:h-full flex items-center justify-center pointer-events-none"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, duration: 1, type: "spring" }}
                        className="relative z-10 w-full max-w-[600px]"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
                            alt="Luxury Car"
                            className="w-full h-auto object-contain drop-shadow-2xl"
                            classNames={{
                                wrapper: "drop-shadow-[0_20px_50px_rgba(255,215,0,0.15)]",
                                img: "hover:scale-105 transition-transform duration-700"
                            }}
                        />
                    </motion.div>
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
