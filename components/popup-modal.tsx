"use client";

import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalBody, Button, Image } from "@heroui/react";
import { X } from "lucide-react";

export const PopupModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState({
        image: "",
        link: "",
    });

    useEffect(() => {
        const checkPopup = async () => {
            try {
                const res = await fetch("/api/popup");
                const data = await res.json();

                if (data.is_active) {
                    // Check session storage if "show once" is enabled
                    if (data.show_once_per_session) {
                        const hasSeen = sessionStorage.getItem("hasSeenPopup");
                        if (hasSeen) return;
                        sessionStorage.setItem("hasSeenPopup", "true");
                    }

                    setContent({
                        image: data.image_url || "",
                        link: data.link_url || "",
                    });

                    // Only open if there is an image to show
                    if (data.image_url) {
                        // Small delay for smooth entrance
                        setTimeout(() => setIsOpen(true), 1000);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch popup settings", err);
            }
        };

        checkPopup();
    }, []);

    const handleImageClick = () => {
        if (content.link) {
            window.open(content.link, "_blank");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            backdrop="opaque"
            size="2xl"
            placement="center"
            classNames={{
                base: "bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden",
                closeButton: "hidden",
                wrapper: "z-[9999]",
                backdrop: "bg-black/60 backdrop-blur-sm"
            }}
            motionProps={{
                variants: {
                    enter: {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1], // Custom spring-like ease
                        },
                    },
                    exit: {
                        scale: 0.95,
                        opacity: 0,
                        y: 20,
                        transition: {
                            duration: 0.2,
                            ease: "easeIn",
                        },
                    },
                },
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <div className="flex flex-col relative w-full">
                        {/* Header Section */}
                        <div className="relative px-6 py-4 bg-gradient-to-r from-[#002D72] to-[#0052cc] flex items-center justify-between shadow-md z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-white/20 rounded-full" />
                                <div>
                                    <h3 className="text-white font-bold text-lg leading-tight tracking-wide">
                                        ข่าวสารและโปรโมชั่น
                                    </h3>
                                    <p className="text-blue-100 text-xs font-medium tracking-wider opacity-80">
                                        LATEST UPDATE
                                    </p>
                                </div>
                            </div>

                            {/* Stylish Close Button in Header */}
                            <button
                                onClick={onClose}
                                className="group p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 border border-white/10"
                            >
                                <X size={18} className="text-white group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Content Body */}
                        <ModalBody className="p-0 bg-slate-50 relative min-h-[300px] flex items-center justify-center">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                style={{
                                    backgroundImage: 'radial-gradient(#002D72 1px, transparent 1px)',
                                    backgroundSize: '20px 20px'
                                }}
                            />

                            {/* Image Container */}
                            <div
                                className={`relative w-full h-full p-4 flex items-center justify-center ${content.link ? 'cursor-pointer' : ''}`}
                                onClick={handleImageClick}
                            >
                                <div className="relative shadow-lg rounded-lg overflow-hidden border border-slate-100 bg-white">
                                    <Image
                                        src={content.image}
                                        alt="Popup Content"
                                        classNames={{
                                            wrapper: "w-full h-auto max-h-[70vh] object-contain mx-auto block",
                                            img: "w-full h-auto max-h-[70vh] object-contain"
                                        }}
                                    />

                                    {content.link && (
                                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center group">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white/95 backdrop-blur-md text-[#002D72] px-6 py-2.5 rounded-full font-bold shadow-2xl flex items-center gap-2 border border-blue-100">
                                                <span>ดูรายละเอียดเพิ่มเติม</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ModalBody>
                    </div>
                )}
            </ModalContent>
        </Modal>
    );
};
