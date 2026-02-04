"use client";

import { useEffect, useState } from "react";
import {
    Table, TableHeader, TableBody, TableRow, TableCell
} from "@/app/components/ui/table/Table";
import Button from "@/app/components/ui/button/Button";
import { ActionButtons } from "@/app/components/ui/button/ActionButtons";
import Input from "@/app/components/form/input/InputField";
import TextArea from "@/app/components/form/input/TextArea";
import { Modal } from "@/app/components/ui/modal/Modal";
import Select from "@/app/components/form/Select";
import { Plus, Video, ExternalLink, Trash2 } from "lucide-react";
import { toast, Toaster } from "sonner";

type Activity = {
    id: number;
    url: string;
    platform: "tiktok" | "facebook" | "instagram" | "youtube";
    description: string;
    thumbnail_url: string;
    display_order: number;
    is_active: number;
};

const platformOptions = [
    { value: "tiktok", label: "TikTok" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "youtube", label: "YouTube" },
];

const platformColors: Record<string, string> = {
    tiktok: "bg-black text-white",
    facebook: "bg-blue-600 text-white",
    instagram: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white",
    youtube: "bg-red-600 text-white",
};

// Extract video ID from URL
const extractVideoInfo = (url: string) => {
    // TikTok
    if (url.includes("tiktok.com")) {
        const match = url.match(/video\/(\d+)/);
        return { platform: "tiktok", videoId: match ? match[1] : null };
    }
    // Facebook
    if (url.includes("facebook.com") || url.includes("fb.watch")) {
        return { platform: "facebook", videoId: url };
    }
    // Instagram
    if (url.includes("instagram.com")) {
        const match = url.match(/\/(reel|p)\/([A-Za-z0-9_-]+)/);
        return { platform: "instagram", videoId: match ? match[2] : null };
    }
    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
        return { platform: "youtube", videoId: match ? match[1] : null };
    }
    return { platform: null, videoId: null };
};

export default function ActivitiesPage() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
    const [formData, setFormData] = useState({
        url: "",
        platform: "tiktok" as "tiktok" | "facebook" | "instagram" | "youtube",
        description: "",
        thumbnail_url: "",
        display_order: 0,
        is_active: 1,
    });

    const fetchActivities = async () => {
        try {
            const res = await fetch("/api/homepage/activities");
            const data = await res.json();
            if (Array.isArray(data)) {
                setActivities(data);
            }
        } catch (error) {
            console.error("Error fetching activities:", error);
            toast.error("ไม่สามารถโหลดข้อมูลได้");
        } finally {
            setLoading(false);
        }
    };

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        fetchActivities();
    }, []);

    if (!mounted) return null;

    // Auto-detect platform from URL
    const handleUrlChange = (url: string) => {
        setFormData((prev) => ({ ...prev, url }));
        const { platform } = extractVideoInfo(url);
        if (platform) {
            setFormData((prev) => ({ ...prev, platform: platform as any }));
        }
    };

    const openModal = (activity?: Activity) => {
        if (activity) {
            setEditingActivity(activity);
            setFormData({
                url: activity.url,
                platform: activity.platform,
                description: activity.description,
                thumbnail_url: activity.thumbnail_url || "",
                display_order: activity.display_order,
                is_active: activity.is_active,
            });
        } else {
            setEditingActivity(null);
            setFormData({
                url: "",
                platform: "tiktok",
                description: "",
                thumbnail_url: "",
                display_order: 0,
                is_active: 1,
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingActivity(null);
    };

    const handleSave = async () => {
        if (!formData.url) {
            toast.error("กรุณากรอก URL");
            return;
        }

        try {
            const method = editingActivity?.id ? "PUT" : "POST";
            const url = editingActivity?.id
                ? `/api/homepage/activities/${editingActivity.id}`
                : "/api/homepage/activities";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success(editingActivity ? "อัพเดทสำเร็จ" : "เพิ่มกิจกรรมสำเร็จ");
                fetchActivities();
                closeModal();
            } else {
                toast.error("เกิดข้อผิดพลาด");
            }
        } catch (error) {
            console.error("Error saving activity:", error);
            toast.error("เกิดข้อผิดพลาด");
        }
    };

    const confirmDelete = (id: number) => {
        setDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            const res = await fetch(`/api/homepage/activities/${deleteId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("ลบกิจกรรมสำเร็จ");
                fetchActivities();
            } else {
                toast.error("เกิดข้อผิดพลาด");
            }
        } catch (error) {
            console.error("Error deleting activity:", error);
            toast.error("เกิดข้อผิดพลาด");
        } finally {
            setIsDeleteModalOpen(false);
            setDeleteId(null);
        }
    };

    // Get embed preview
    const getEmbedPreview = (activity: Activity) => {
        const { platform, videoId } = extractVideoInfo(activity.url);

        // TikTok embed
        if (platform === "tiktok" && videoId) {
            return (
                <iframe
                    src={`https://www.tiktok.com/embed/v2/${videoId}`}
                    className="w-full h-full"
                    allowFullScreen
                    allow="encrypted-media"
                />
            );
        }

        // YouTube embed
        if (platform === "youtube" && videoId) {
            return (
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    className="w-full h-full"
                    allowFullScreen
                />
            );
        }

        // Instagram embed using their embed API
        if (platform === "instagram" && videoId) {
            return (
                <iframe
                    src={`https://www.instagram.com/reel/${videoId}/embed`}
                    className="w-full h-full"
                    allowFullScreen
                />
            );
        }

        // Facebook embed using their video plugin
        if (platform === "facebook") {
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

        // Fallback - clickable placeholder with link to original
        const platformIcons: Record<string, string> = {
            tiktok: "♪",
            facebook: "f",
            instagram: "📷",
            youtube: "▶",
        };

        return (
            <a
                href={activity.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 hover:from-slate-600 hover:to-slate-800 transition-colors cursor-pointer"
            >
                <div className={`w-16 h-16 rounded-full ${platformColors[activity.platform]} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                    {platformIcons[activity.platform] || "▶"}
                </div>
                <p className="text-white font-semibold">{activity.platform.charAt(0).toUpperCase() + activity.platform.slice(1)}</p>
                <p className="text-white/60 text-sm mt-1">คลิกเพื่อดูวิดีโอ</p>
            </a>
        );
    };

    return (
        <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6 mb-6">
            <Toaster richColors position="top-right" />

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                        กิจกรรมล่าสุด
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        จัดการวิดีโอและกิจกรรมจากโซเชียลมีเดีย
                    </p>
                </div>
                <Button
                    variant="primary"
                    startIcon={<Plus size={20} />}
                    onClick={() => openModal()}
                >
                    เพิ่มกิจกรรม
                </Button>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            ) : activities.length === 0 ? (
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-12 text-center">
                    <Video className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500 dark:text-gray-400 mb-4">ยังไม่มีกิจกรรม</p>
                    <Button
                        variant="primary"
                        startIcon={<Plus size={18} />}
                        onClick={() => openModal()}
                    >
                        เพิ่มกิจกรรมแรก
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden group"
                        >
                            {/* Video Preview - 9:16 Aspect Ratio */}
                            <div className="relative aspect-[9/16] bg-gray-100 dark:bg-gray-900 overflow-hidden">
                                {getEmbedPreview(activity)}

                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <a
                                        href={activity.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                    >
                                        <ExternalLink size={18} />
                                    </a>
                                    <button
                                        onClick={() => confirmDelete(activity.id)}
                                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                {/* Platform Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className={`${platformColors[activity.platform]} px-3 py-1 rounded-full text-xs font-semibold`}>
                                        {activity.platform.toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="p-4">
                                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                                    {activity.description || "ไม่มีคำอธิบาย"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} className="max-w-lg">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {editingActivity ? "แก้ไขกิจกรรม" : "เพิ่มกิจกรรมใหม่"}
                    </h3>
                </div>

                <div className="space-y-4">
                    <Input
                        label="URL วิดีโอ"
                        placeholder="วาง URL จาก TikTok, Facebook, Instagram หรือ YouTube"
                        value={formData.url}
                        onChange={(e) => handleUrlChange(e.target.value)}
                    />

                    <Select
                        label="ประเภท"
                        options={platformOptions}
                        value={formData.platform}
                        onChange={(value) => setFormData((prev) => ({ ...prev, platform: value as any }))}
                    />

                    <TextArea
                        label="คำบรรยาย"
                        placeholder="อธิบายเกี่ยวกับกิจกรรมนี้..."
                        rows={3}
                        value={formData.description}
                        onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
                    />

                    <Input
                        label="ลำดับการแสดงผล"
                        type="number"
                        value={formData.display_order.toString()}
                        onChange={(e) => setFormData((prev) => ({
                            ...prev,
                            display_order: parseInt(e.target.value) || 0,
                        }))}
                    />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={closeModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        {editingActivity ? "บันทึก" : "เพิ่ม"}
                    </Button>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">ยืนยันการลบ</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    คุณต้องการลบกิจกรรมนี้หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้
                </p>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                        ยกเลิก
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        ลบ
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
