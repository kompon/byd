"use client";

import { Card, CardBody, CardFooter, Image, Button, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, Megaphone, Newspaper, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { fadeInUp, staggerContainer } from "./utils/animations";

const NewsCard = ({ item, t, lang, onPress }: { item: any, t: any, lang: any, onPress: () => void }) => (
    <div
        onClick={onPress}
        className="group relative bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 aspect-[4/3] flex flex-col cursor-pointer"
    >
        {/* Image Section */}
        <div className="relative flex-grow overflow-hidden">
            <div className="absolute top-6 left-6 z-10">
                <Chip
                    size="sm"
                    className={item.type === 'promotion' ? "bg-brand-accent/90 text-white font-bold backdrop-blur-md border border-white/20" : "bg-slate-900/90 text-white font-bold backdrop-blur-md border border-white/20"}
                    variant="flat"
                    startContent={item.type === 'promotion' ? <Megaphone size={14} /> : <Newspaper size={14} />}
                >
                    {item.type === 'promotion' ? "PROMOTION" : "NEWS"}
                </Chip>
            </div>
            <Image
                width="100%"
                radius="none"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                src={item.banner_image_url || "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800"}
                alt={item.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-8 shrink-0 bg-white relative">
            <div className="flex items-center gap-2 text-brand-primary text-xs font-bold tracking-widest uppercase mb-3">
                <Calendar size={14} />
                <span>{new Date(item.start_date).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US')}</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-brand-accent transition-colors line-clamp-1 mb-2">
                {item.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-light">
                {item.short_description}
            </p>

            {/* Read More Link (Minimal) */}
            <div className="flex items-center gap-1 text-slate-400 text-xs font-medium mt-4 group-hover:text-brand-accent transition-colors">
                <span>{t("อ่านเพิ่มเติม", "Read More")}</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
);

export const NewsPromo = () => {
    const [news, setNews] = useState<any[]>([]);
    const { t, lang } = useLanguage();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedItem, setSelectedItem] = useState<any>(null);

    useEffect(() => {
        fetch("/api/promotions")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setNews(data.filter((n: any) => n.is_active));
            })
            .catch(err => console.error("Failed to fetch news", err));
    }, []);

    const handleCardClick = (item: any) => {
        setSelectedItem(item);
        onOpen();
    };

    return (
        <section id="news" className="py-32 bg-white relative overflow-hidden">
            {/* Background Details */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/10 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-100 blur-[100px] rounded-full mix-blend-multiply pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-20"
                >
                    <Chip variant="flat" className="bg-orange-50 text-orange-600 mb-6 font-bold tracking-widest uppercase">{t("อัพเดทล่าสุด", "Latest Updates")}</Chip>
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">{t("ข่าวสารและ", "News &")} <span className="text-brand-accent">{t("โปรโมชั่น", "Promotions")}</span></h2>
                    <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto tracking-wide">
                        {t("ติดตามข่าวสารล่าสุดและข้อเสนอพิเศษจาก BYD Pride Auto", "Follow the latest news and special offers from BYD Pride Auto")}
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
                        slidesPerView={1.1}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        className="pb-12 px-4"
                    >
                        {news.map((item) => (
                            <SwiperSlide key={item.id} className="h-full py-4">
                                <NewsCard item={item} t={t} lang={lang} onPress={() => handleCardClick(item)} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                {/* Desktop Grid */}
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
                        slidesPerView={2}
                        centeredSlides={false}
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
                            1024: {
                                slidesPerView: 2.5,
                                spaceBetween: 32,
                            }
                        }}
                        className="pb-16 px-4 !overflow-visible max-w-[1400px] mx-auto"
                    >
                        {news.map((item) => (
                            <SwiperSlide key={item.id} className="h-auto">
                                <NewsCard item={item} t={t} lang={lang} onPress={() => handleCardClick(item)} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="4xl"
                scrollBehavior="inside"
                backdrop="blur"
                classNames={{
                    backdrop: "bg-slate-900/50 backdrop-blur-md",
                    base: "bg-white border border-slate-100 shadow-2xl rounded-[2rem]",
                    header: "border-b border-slate-100 p-6",
                    body: "p-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']",
                    footer: "border-t border-slate-100 p-4",
                    closeButton: "top-4 right-4 z-50 bg-white/50 hover:bg-white p-2 text-slate-500 rounded-full shadow-sm backdrop-blur-sm",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 pr-12">
                                <h3 className="text-2xl font-bold text-slate-900">{selectedItem?.title}</h3>
                                <span className="text-sm font-medium text-brand-primary flex items-center gap-2">
                                    <Calendar size={14} />
                                    {selectedItem?.start_date && new Date(selectedItem.start_date).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US')}
                                </span>
                            </ModalHeader>
                            <ModalBody>
                                {selectedItem?.banner_image_url && (
                                    <div className="w-full bg-slate-50 border-b border-slate-100 flex justify-center items-center p-4">
                                        <Image
                                            src={selectedItem.banner_image_url}
                                            alt={selectedItem.title}
                                            className="max-h-[300px] md:max-h-[400px] w-auto h-auto object-contain shadow-md rounded-lg"
                                            radius="none"
                                        />
                                    </div>
                                )}
                                <div className="p-8">
                                    <div
                                        className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-800"
                                        dangerouslySetInnerHTML={{ __html: selectedItem?.content || selectedItem?.short_description }}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose} className="font-medium">
                                    {t("ปิด", "Close")}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </section>
    );
};
