"use client";

import { motion } from "framer-motion";
import { Battery, Zap, Leaf, Shield, Cpu, PlugZap } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { fadeInUp, staggerContainer } from "./utils/animations";
import { FloatingIcons } from "./floating-icons";

const FeaturesList = (t: any) => [
    {
        icon: Battery,
        title: t("แบตเตอรี่ชั้นนำ", "Leading Battery"),
        description: t("แบตเตอรี่ลิเธียมไอออนความจุสูง ใช้งานได้ยาวนาน", "High-capacity lithium-ion battery for long-lasting performance"),
        stat: "500+",
        unit: t("กม.", "km")
    },
    {
        icon: Zap,
        title: t("ความเร็วสูงสุด", "Top Speed"),
        description: t("เร่งความเร็ว 0-100 กม./ชม. ในเวลาเพียงไม่กี่วินาที", "Accelerate 0-100 km/h in just seconds"),
        stat: "180",
        unit: t("กม./ชม.", "km/h")
    },
    {
        icon: Leaf,
        title: t("เป็นมิตรกับสิ่งแวดล้อม", "Eco-Friendly"),
        description: t("ปล่อยมลพิษเป็นศูนย์ ช่วยลดโลกร้อน", "Zero emissions, helping reduce global warming"),
        stat: "0%",
        unit: "CO₂"
    },
    {
        icon: Shield,
        title: t("ระบบความปลอดภัย", "Safety System"),
        description: t("มาตรฐานความปลอดภัยระดับสากล พร้อมเทคโนโลยี ADAS", "International safety standards with ADAS technology"),
        stat: "5",
        unit: t("ดาว", "Stars")
    },
    {
        icon: Cpu,
        title: t("เทคโนโลยีอัจฉริยะ", "Smart Tech"),
        description: t("ระบบขับขี่อัตโนมัติ และจอแสดงผลดิจิทัล", "Autonomous driving system and digital display"),
        stat: "AI",
        unit: "Powered"
    },
    {
        icon: PlugZap,
        title: t("ชาร์จเร็ว", "Fast Charging"),
        description: t("ชาร์จไฟเต็มภายในเวลาอันรวดเร็ว", "Fully charged in rapid time"),
        stat: "30",
        unit: t("นาที", "Mins")
    }
];

const FeatureCard = ({ feature }: { feature: any }) => (
    <div className="group relative bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 border border-slate-100 h-full">
        {/* Icon Container */}
        <div className="relative mb-6">
            <div className="w-16 h-16 bg-blue-900/5 rounded-2xl flex items-center justify-center group-hover:bg-blue-900/10 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-brand-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            {/* Pulse Animation */}
            <div className="absolute inset-0 w-16 h-16 bg-blue-900/20 rounded-2xl animate-ping opacity-0 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-primary transition-colors">
            {feature.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
            {feature.description}
        </p>

        {/* Stat */}
        <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-brand-primary">
                {feature.stat}
            </span>
            <span className="text-sm text-slate-400 font-medium">
                {feature.unit}
            </span>
        </div>

        {/* Decorative Element */}
        <div className="absolute top-8 right-8 w-20 h-20 bg-blue-900/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
);

export const FeaturesSection = () => {
    const { t } = useLanguage();
    const features = FeaturesList(t);
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <FloatingIcons />
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-900/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-slate-100 blur-[100px] rounded-full" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                        {t("จุดเด่นของ", "Highlights of")} <span className="text-brand-primary">{t("รถยนต์ไฟฟ้า", "Electric Vehicles")}</span>
                    </h2>
                    <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto tracking-wide">
                        {t("สัมผัสประสบการณ์การขับขี่ที่เหนือระดับด้วยเทคโนโลยีล้ำสมัย", "Experience superior driving with state-of-the-art technology")}
                    </p>
                </motion.div>

                {/* Mobile Carousel */}
                <motion.div
                    className="md:hidden"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
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
                        className="pb-12 px-4"
                    >
                        {features.map((feature, index) => (
                            <SwiperSlide key={index} className="h-auto">
                                <FeatureCard feature={feature} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                {/* Desktop Grid */}
                <motion.div
                    className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            variants={fadeInUp}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        >
                            <FeatureCard feature={feature} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
