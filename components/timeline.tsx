"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Image } from "@heroui/react";
import { useLanguage } from "@/app/context/LanguageContext";
import AOS from "aos";
import "aos/dist/aos.css";

type Milestone = {
    id: number;
    year: string;
    title: string;
    description: string;
    image_url: string;
    display_order: number;
};

const TimelineCard = ({
    milestone,
    index,
    isLeft,
}: {
    milestone: Milestone;
    index: number;
    isLeft: boolean;
}) => {
    return (
        <div
            className={`relative flex items-center w-full ${isLeft ? "justify-start" : "justify-end"
                } mb-12 md:mb-20`}
            data-aos={isLeft ? "fade-right" : "fade-left"}
            data-aos-delay={index * 150}
            data-aos-duration="1000"
        >
            {/* Year Typography Overlay - Desktop */}
            <div
                className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${isLeft ? "left-[52%]" : "right-[52%]"
                    } pointer-events-none select-none`}
            >
                <span
                    className="text-[140px] lg:text-[200px] font-black leading-none"
                    style={{
                        background: 'linear-gradient(180deg, rgba(0,45,114,0.08) 0%, rgba(0,45,114,0.02) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    {milestone.year}
                </span>
            </div>

            {/* Card Container */}
            <div
                className={`relative w-full md:w-[45%] ${isLeft ? "md:pr-12" : "md:pl-12"
                    }`}
            >
                {/* Connector Line to Center with Glow */}
                <div
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${isLeft ? "right-0" : "left-0"
                        }`}
                >
                    {/* Glow Effect */}
                    <div
                        className={`absolute top-1/2 -translate-y-1/2 w-12 h-8 blur-xl ${isLeft ? "right-0" : "left-0"}`}
                        style={{ background: 'linear-gradient(90deg, rgba(0,45,114,0.3), transparent)' }}
                    />
                    {/* Line */}
                    <div
                        className={`relative w-12 h-[3px] rounded-full`}
                        style={{
                            background: isLeft
                                ? 'linear-gradient(90deg, #002D72 0%, rgba(0,45,114,0.3) 100%)'
                                : 'linear-gradient(90deg, rgba(0,45,114,0.3) 0%, #002D72 100%)'
                        }}
                    />
                </div>

                {/* Card */}
                <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#002D72]/20 transition-all duration-700 border border-slate-100/80 hover:border-[#002D72]/20 hover:-translate-y-2">
                    {/* Shine Effect on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#002D72]/5 via-transparent to-transparent" />
                    </div>

                    {/* Mobile Year Badge */}
                    <div className="md:hidden absolute top-4 right-4 z-10">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#002D72] blur-lg opacity-40" />
                            <div className="relative bg-gradient-to-br from-[#002D72] to-[#001a44] text-white px-5 py-2.5 rounded-2xl shadow-lg">
                                <span className="font-bold text-sm tracking-wider">{milestone.year}</span>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    {milestone.image_url && (
                        <div className="relative h-52 md:h-64 overflow-hidden">
                            <Image
                                src={milestone.image_url}
                                alt={milestone.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                radius="none"
                            />
                            {/* Gradient Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-br from-[#002D72]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Year on Image - Desktop */}
                            <div className="hidden md:flex absolute bottom-4 left-6 z-10">
                                <div className="bg-white/95 backdrop-blur-md text-[#002D72] px-5 py-2 rounded-xl shadow-lg border border-white/50">
                                    <span className="font-bold text-lg tracking-wide">{milestone.year}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content Section */}
                    <div className="relative p-6 md:p-8">
                        {/* Decorative Line */}
                        <div className="absolute top-0 left-6 md:left-8 right-6 md:right-8 h-px bg-gradient-to-r from-transparent via-[#002D72]/10 to-transparent" />

                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#002D72] transition-colors duration-500 leading-tight">
                            {milestone.title}
                        </h3>
                        <p className="text-slate-500 leading-relaxed text-sm md:text-base font-light">
                            {milestone.description}
                        </p>

                        {/* Bottom Accent */}
                        <div className="mt-5 flex items-center gap-2">
                            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#002D72] to-[#002D72]/30" />
                            <div className="w-2 h-1 rounded-full bg-[#002D72]/20" />
                        </div>
                    </div>

                    {/* Corner Decoration */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#002D72]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
            </div>
        </div>
    );
};

export const TimelineSection = () => {
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        // Initialize AOS
        AOS.init({
            once: true,
            easing: "ease-out-cubic",
        });

        const fetchMilestones = async () => {
            try {
                const res = await fetch("/api/homepage/timeline");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setMilestones(data);
                }
            } catch (error) {
                console.error("Error fetching milestones:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMilestones();
    }, []);

    if (loading) {
        return (
            <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#002D72] animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-[#002D72] animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-[#002D72] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
            </section>
        );
    }

    if (milestones.length === 0) {
        return null;
    }

    return (
        <section id="timeline" className="py-24 md:py-36 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#002D72]/[0.03] blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-slate-200/50 blur-[150px] rounded-full translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#002D72]/[0.02] blur-[200px] rounded-full" />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `radial-gradient(#002D72 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center mb-20 md:mb-28"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#002D72]/5 border border-[#002D72]/10 rounded-full px-5 py-2 mb-8">
                        <div className="w-2 h-2 rounded-full bg-[#002D72] animate-pulse" />
                        <span className="text-[#002D72] text-sm font-medium tracking-wide">
                            {t("ประวัติของเรา", "Our History")}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
                        {t("เส้นทาง", "Our")}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002D72] via-[#0045a8] to-[#002D72]">
                            {t("ของเรา", "Journey")}
                        </span>
                    </h2>
                    <p className="text-slate-500 text-lg md:text-xl font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
                        {t(
                            "ก้าวย่างที่สำคัญในการเป็นผู้นำด้านยานยนต์ไฟฟ้าของประเทศไทย",
                            "Key milestones in becoming Thailand's leading EV provider"
                        )}
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Center Tree Line - Desktop Only */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
                        {/* Main Tree Trunk with Gradient */}
                        <div className="absolute inset-0 w-1 left-1/2 -translate-x-1/2">
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: 'linear-gradient(180deg, rgba(0,45,114,0.1) 0%, #002D72 10%, #002D72 90%, rgba(0,45,114,0.1) 100%)'
                                }}
                            />
                            {/* Glow Effect */}
                            <div
                                className="absolute inset-0 w-6 left-1/2 -translate-x-1/2 blur-xl opacity-30"
                                style={{
                                    background: 'linear-gradient(180deg, transparent 0%, #002D72 50%, transparent 100%)'
                                }}
                            />
                        </div>

                        {/* Top Decoration */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#002D72] blur-xl opacity-40 scale-150" />
                                <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-[#002D72] to-[#0045a8] shadow-lg shadow-[#002D72]/40 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white/80" />
                                </div>
                            </div>
                        </div>

                        {/* Bottom Decoration */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#002D72] blur-xl opacity-40 scale-150" />
                                <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-[#002D72] to-[#0045a8] shadow-lg shadow-[#002D72]/40 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white/80" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Nodes - Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
                        {milestones.map((_, index) => (
                            <div
                                key={index}
                                className="absolute left-1/2 -translate-x-1/2"
                                style={{
                                    top: `${((index + 0.5) / milestones.length) * 100}%`,
                                }}
                                data-aos="zoom-in"
                                data-aos-delay={index * 150}
                            >
                                {/* Outer Glow */}
                                <div className="absolute inset-0 bg-[#002D72] blur-lg opacity-30 scale-[2]" />
                                {/* Outer Ring */}
                                <div className="relative w-6 h-6 rounded-full bg-white shadow-xl shadow-[#002D72]/30 flex items-center justify-center border-[3px] border-[#002D72]">
                                    {/* Inner Dot */}
                                    <div className="w-2 h-2 rounded-full bg-[#002D72]" />
                                </div>
                                {/* Pulse Ring */}
                                <div className="absolute inset-0 w-6 h-6 rounded-full border-2 border-[#002D72]/30 animate-ping" style={{ animationDuration: '2s' }} />
                            </div>
                        ))}
                    </div>

                    {/* Mobile Center Line */}
                    <div className="md:hidden absolute left-6 top-0 bottom-0">
                        <div
                            className="absolute inset-0 w-0.5 rounded-full"
                            style={{
                                background: 'linear-gradient(180deg, rgba(0,45,114,0.1) 0%, #002D72 10%, #002D72 90%, rgba(0,45,114,0.1) 100%)'
                            }}
                        />
                    </div>

                    {/* Timeline Cards */}
                    <div className="relative pl-16 md:pl-0">
                        {milestones.map((milestone, index) => (
                            <div key={milestone.id} className="relative">
                                {/* Mobile Node */}
                                <div className="md:hidden absolute left-[-40px] top-10">
                                    <div className="relative w-5 h-5 rounded-full bg-white shadow-lg border-[3px] border-[#002D72] flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#002D72]" />
                                    </div>
                                </div>

                                <TimelineCard
                                    milestone={milestone}
                                    index={index}
                                    isLeft={index % 2 === 0}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
