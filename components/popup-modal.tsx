"use client";

import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalBody, Button, Image } from "@heroui/react";
import { X } from "lucide-react";

export const PopupModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState({
        image: "",
        text: "",
    });

    useEffect(() => {
        // Fetch settings
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                if (data.popup_enabled === "1") {
                    setContent({
                        image: data.popup_image_url || "",
                        text: data.popup_text || "",
                    });

                    // Simple session check to show only once per session (optional)
                    // Remove sessionStorage check if client wants it EVERY time.
                    // For now, let's show it every time per refresh for verifying compliance.
                    setIsOpen(true);
                }
            })
            .catch(err => console.error("Failed to fetch popup settings", err));
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            backdrop="blur"
            size="2xl"
            placement="center"
            classNames={{
                base: "bg-transparent shadow-none",
                closeButton: "hidden" // Custom close button
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <div className="relative bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <ModalBody className="p-0 flex flex-col md:flex-row">
                            {/* Image Section */}
                            {content.image && (
                                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                                    <Image
                                        src={content.image}
                                        alt="Promotion"
                                        classNames={{
                                            wrapper: "w-full h-full",
                                            img: "w-full h-full object-cover rounded-none"
                                        }}
                                    />
                                </div>
                            )}

                            {/* Text Section */}
                            <div className={`${content.image ? 'w-full md:w-1/2' : 'w-full'} p-8 flex flex-col justify-center items-center text-center bg-zinc-900`}>
                                <h2 className="text-2xl font-bold text-brand-accent mb-4 tracking-wide">SPECIAL OFFER</h2>
                                <p className="text-white text-lg mb-8 leading-relaxed whitespace-pre-wrap">
                                    {content.text || "Welcome to PRIDE AUTO!"}
                                </p>
                                <Button
                                    className="bg-gold-500 text-black font-bold px-8 w-full shadow-lg shadow-gold-500/20"
                                    onPress={onClose}
                                >
                                    รายละเอียดเพิ่มเติม
                                </Button>
                            </div>
                        </ModalBody>
                    </div>
                )}
            </ModalContent>
        </Modal>
    );
};
