"use client";

import { Card, CardBody, CardFooter, Image, Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Battery, Gauge, Users, Zap } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FloatingIcons } from "./floating-icons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { fadeInUp, staggerContainer } from "./utils/animations";

const CarCard = ({ car, t }: { car: any, t: any }) => (
    <Card
        className="relative border-0 transition-all duration-500 group h-full rounded-[2rem] overflow-visible mt-12 mb-4 bg-gradient-to-br from-blue-50/80 via-white/60 to-indigo-50/80 backdrop-blur-xl hover:from-blue-100/90 hover:via-white/70 hover:to-indigo-100/90"
    >
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-400/20 via-transparent to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

        {/* Border Glow */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500" style={{ padding: '2px', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>

        {/* Inner Shadow */}
        <div className="absolute inset-0 rounded-[2rem] shadow-inner shadow-blue-200/50 group-hover:shadow-blue-300/70 transition-shadow duration-500"></div>

        <CardBody className="overflow-visible p-0 relative h-48 w-full flex items-center justify-center z-10">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-full max-w-[340px] h-auto z-20 transition-transform duration-500 group-hover:-translate-y-6 group-hover:scale-[1.1] drop-shadow-2xl group-hover:drop-shadow-[0_25px_50px_rgba(59,130,246,0.3)]">
                <Image
                    radius="none"
                    width="100%"
                    alt={car.name}
                    className="w-full h-full object-contain"
                    src={car.main_image_url}
                />
            </div>
        </CardBody>
        <CardFooter className="flex flex-col items-start gap-2 p-5 relative z-10">
            <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-indigo-600 group-hover:to-purple-600 transition-all duration-500 uppercase tracking-tight">{car.name}</h3>
                </div>
                <p className="text-slate-500 text-xs tracking-wider uppercase font-medium">{car.slug}</p>
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mt-1">{car.description}</p>
            </div>

            <div className="w-full pt-3 border-t border-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 mt-1 relative">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
                {car.variants && car.variants.length > 0 ? (
                    <div className={`grid ${car.variants.length > 2 ? 'grid-cols-3 gap-1' : 'grid-cols-2 gap-2'} divide-x divide-blue-200/50`}>
                        {car.variants.map((variant: any, index: number) => (
                            <div key={index} className={`flex flex-col ${index > 0 ? (car.variants.length > 2 ? 'pl-1' : 'pl-2') : ''}`}>
                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-0.5 truncate" title={variant.name}>{variant.name}</p>
                                <p className={`${car.variants.length > 2 ? 'text-xs' : 'text-sm'} font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tighter`}>฿{parseInt(variant.price).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col justify-center h-full">
                        <p className="text-slate-500 text-xs mb-1">{t("สอบถามรายละเอียดเพิ่มเติม", "Contact for details")}</p>
                    </div>
                )}
            </div>

        </CardFooter>
    </Card>
);

export const CarModels = () => {
    const [cars, setCars] = useState<any[]>([]);
    const [mounted, setMounted] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        setMounted(true);
        fetch("/api/car-models")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setCars(data.filter((c: any) => c.status === 'active'));
            })
            .catch(err => console.error("Failed to fetch cars", err));
    }, []);

    if (!mounted) return null;

    return (
        <section id="models" className="py-32 bg-slate-50 relative overflow-hidden">
            <FloatingIcons />
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                        {t("รถยนต์แห่งอนาคต", "Future Cars")} <span className="text-brand-accent">{t("ที่ก้าวไปไกลกว่าที่เคย", "Going Further Than Ever")}</span>
                    </h2>
                    <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto tracking-wide">
                        {t("สัมผัสประสบการณ์การขับขี่ที่เหนือระดับ ผสานเทคโนโลยีล้ำสมัยและการออกแบบที่ไร้กาลเวลา", "Experience superior driving combined with cutting-edge technology and timeless design.")}
                    </p>
                </motion.div>

                {/* Mobile Carousel */}
                <div className="md:hidden">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1.2}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        className="pb-12 px-4 !overflow-visible"
                    >
                        {cars.map((car) => (
                            <SwiperSlide key={car.id} className="pt-8">
                                <CarCard car={car} t={t} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Desktop Carousel (Replaces Grid) */}
                <motion.div
                    className="hidden md:block"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                >
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={24}
                        slidesPerView={2.2}
                        centeredSlides={false}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        breakpoints={{
                            1024: {
                                slidesPerView: 2.8,
                                spaceBetween: 32,
                            },
                            1280: {
                                slidesPerView: 3,
                                spaceBetween: 32,
                            },
                        }}
                        className="pb-16 px-4 !overflow-visible"
                    >
                        {cars.map((car) => (
                            <SwiperSlide key={car.id} className="h-auto pt-8">
                                <CarCard car={car} t={t} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
        </section>
    );
};
