"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { ExternalLink, Play } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

type Activity = {
    id: number;
    url: string;
    platform: "tiktok" | "facebook" | "instagram" | "youtube";
    description: string;
    thumbnail_url: string;
};

// Platform badge styles
const platformConfig: Record<string, { label: string; bg: string; icon: string }> = {
    tiktok: { label: "TikTok", bg: "bg-black", icon: "♪" },
    facebook: { label: "Facebook", bg: "bg-blue-600", icon: "f" },
    instagram: { label: "Instagram", bg: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400", icon: "📷" },
    youtube: { label: "YouTube", bg: "bg-red-600", icon: "▶" },
};

// Extract video ID from URL
const extractVideoInfo = (url: string) => {
    // TikTok
    if (url.includes("tiktok.com")) {
        const match = url.match(/video\/(\d+)/);
        return { platform: "tiktok", videoId: match ? match[1] : null };
    }
    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const match = url.match(/(?:v=|youtu\.be\/|shorts\/)([A-Za-z0-9_-]+)/);
        return { platform: "youtube", videoId: match ? match[1] : null };
    }
    // Instagram
    if (url.includes("instagram.com")) {
        const match = url.match(/\/(reel|p)\/([A-Za-z0-9_-]+)/);
        return { platform: "instagram", videoId: match ? match[2] : null };
    }
    // Facebook
    if (url.includes("facebook.com") || url.includes("fb.watch")) {
        return { platform: "facebook", videoId: url };
    }
    return { platform: null, videoId: null };
};

const ActivityCard = ({ activity, index }: { activity: Activity; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const config = platformConfig[activity.platform] || platformConfig.tiktok;
    const { videoId } = extractVideoInfo(activity.url);

    // Get embed iframe
    const getEmbed = () => {
        if (activity.platform === "tiktok" && videoId) {
            return (
                <iframe
                    src={`https://www.tiktok.com/embed/v2/${videoId}`}
                    className="w-full h-full"
                    allowFullScreen
                    allow="encrypted-media"
                />
            );
        }

        if (activity.platform === "youtube" && videoId) {
            return (
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                    className="w-full h-full"
                    allowFullScreen
                />
            );
        }

        if (activity.platform === "instagram" && videoId) {
            return (
                <iframe
                    src={`https://www.instagram.com/reel/${videoId}/embed`}
                    className="w-full h-full"
                    allowFullScreen
                />
            );
        }

        // Facebook embed using their video plugin
        if (activity.platform === "facebook") {
            const encodedUrl = encodeURIComponent(activity.url);
            return (
                <iframe
                    src={`https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false&width=267&height=476`}
                    className="w-full h-full"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
            );
        }

        // Fallback - clickable placeholder that links to original
        return (
            <a
                href={activity.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 transition-colors cursor-pointer"
            >
                <div className={`w-16 h-16 rounded-full ${config.bg} flex items-center justify-center text-white text-2xl mb-4 shadow-lg`}>
                    {config.icon}
                </div>
                <p className="text-white/70 text-sm font-medium">{config.label}</p>
                <p className="text-white/50 text-xs mt-1">คลิกเพื่อดูเนื้อหา</p>
            </a>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Card Container */}
            <div className="relative bg-white rounded-[32px] overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-[#002D72]/10 transition-all duration-500 hover:-translate-y-2">
                {/* Video Frame - 9:16 Aspect Ratio */}
                <div className="relative aspect-[9/16] bg-slate-100 overflow-hidden rounded-t-[32px]">
                    {getEmbed()}

                    {/* Platform Badge */}
                    <div className="absolute top-4 left-4 z-10">
                        <div className={`${config.bg} px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg`}>
                            <span className="text-white text-xs">{config.icon}</span>
                            <span className="text-white text-xs font-semibold tracking-wide">
                                {config.label}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Button - Outside video frame */}
                <div className="p-4 bg-white">
                    <a
                        href={activity.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <Button
                            className="w-full bg-[#002D72] text-white font-semibold shadow-lg hover:bg-[#001a45]"
                            endContent={<ExternalLink size={16} />}
                        >
                            ดูโพสต์ต้นฉบับ
                        </Button>
                    </a>
                </div>

                {/* Description */}
                {activity.description && (
                    <div className="px-4 pb-4">
                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                            {activity.description}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export const ActivitiesSection = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await fetch("/api/homepage/activities");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setActivities(data);
                }
            } catch (error) {
                console.error("Error fetching activities:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    if (loading) {
        return (
            <section className="py-24 bg-[#F8FAFC]">
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

    if (activities.length === 0) {
        return null;
    }

    return (
        <section id="activities" className="py-24 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#002D72]/[0.03] blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />

            {/* Dot Pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `radial-gradient(#002D72 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-20"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#002D72]/5 border border-[#002D72]/10 rounded-full px-5 py-2 mb-6">
                        <Play className="w-4 h-4 text-[#002D72]" />
                        <span className="text-[#002D72] text-sm font-medium tracking-wide">
                            {t("ติดตามเราได้ที่", "Follow Us On")}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5 tracking-tight">
                        {t("กิจกรรม", "Latest")}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002D72] to-[#0052cc]">
                            {t("ล่าสุด", "Activities")}
                        </span>
                    </h2>

                    <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
                        {t(
                            "ติดตามความเคลื่อนไหวและกิจกรรมต่างๆ ของเราผ่านช่องทางโซเชียลมีเดีย",
                            "Stay updated with our latest activities and events on social media"
                        )}
                    </p>
                </motion.div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {activities.map((activity, index) => (
                        <ActivityCard key={activity.id} activity={activity} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
