"use client";

import {
    Table, TableHeader, TableBody, TableRow, TableCell
} from "@/app/components/ui/table/Table";
import Button from "@/app/components/ui/button/Button";
import { ActionButtons } from "@/app/components/ui/button/ActionButtons";
import { StatusBadge } from "@/app/components/ui/badge/StatusBadge";
import Input from "@/app/components/form/input/InputField";
import TextArea from "@/app/components/form/input/TextArea";
import { Modal } from "@/app/components/ui/modal/Modal";
import Badge from "@/app/components/ui/badge/Badge";
import Select from "@/app/components/form/Select";
import { useEffect, useState } from "react";
import { Plus, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

type Promotion = {
    id: number;
    title: string;
    slug: string;
    type: "news" | "promotion";
    short_description: string;
    content: string;
    banner_image_url: string;
    start_date: string;
    end_date: string;
    is_active: number;
};

export default function PromotionsPage() {
    const [promos, setPromos] = useState<Promotion[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingPromo, setEditingPromo] = useState<Partial<Promotion> | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Promotion>>({});

    const fetchPromos = async () => {
        try {
            const res = await fetch("/api/promotions");
            const data = await res.json();
            if (Array.isArray(data)) setPromos(data);
        } catch (error) {
            console.error("Error fetching promos:", error);
        } finally {
            setLoading(false);
        }
    };

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        fetchPromos();
    }, []);

    if (!mounted) return null;

    const handleSave = async () => {
        try {
            const method = editingPromo?.id ? "PUT" : "POST";
            const url = editingPromo?.id ? `/api/promotions/${editingPromo.id}` : "/api/promotions";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success(editingPromo?.id ? "อัปเดตโปรโมชั่นสำเร็จ!" : "สร้างโปรโมชั่นใหม่สำเร็จ!");
                fetchPromos();
                closeModal();
            } else {
                toast.error("ไม่สามารถบันทึกโปรโมชั่นได้");
            }
        } catch (error) {
            console.error("Error saving promo:", error);
            toast.error("เกิดข้อผิดพลาดในการบันทึก");
        }
    };

    const confirmDelete = (id: number) => {
        setDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await fetch(`/api/promotions/${deleteId}`, { method: "DELETE" });
            toast.success("ลบโปรโมชั่นสำเร็จ");
            fetchPromos();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting promo:", error);
            toast.error("ไม่สามารถลบโปรโมชั่นได้");
        }
    };

    const openModal = (promo?: Promotion) => {
        setEditingPromo(promo || null);
        setFormData(promo || { type: "promotion", is_active: 1 });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPromo(null);
    };

    return (
        <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6 mb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">ข่าวสารและโปรโมชั่น</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">จัดการเนื้อหาการตลาด</p>
                </div>
                <Button
                    variant="primary"
                    startIcon={<Plus size={20} />}
                    onClick={() => openModal()}
                >
                    เพิ่มเนื้อหาใหม่
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell isHeader>หัวข้อ</TableCell>
                        <TableCell isHeader>ประเภท</TableCell>
                        <TableCell isHeader>วันที่</TableCell>
                        <TableCell isHeader>สถานะ</TableCell>
                        <TableCell isHeader>จัดการ</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8">กำลังโหลด...</TableCell>
                        </TableRow>
                    ) : promos.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8">ไม่พบโปรโมชั่น</TableCell>
                        </TableRow>
                    ) : (
                        promos.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <span className="font-semibold text-gray-800 dark:text-white/90 block truncate max-w-[350px]" title={item.title}>
                                        {item.title}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="capitalize">{item.type}</span>
                                </TableCell>
                                <TableCell>{new Date(item.start_date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <StatusBadge isActive={item.is_active} />
                                </TableCell>
                                <TableCell>
                                    <ActionButtons
                                        onEdit={() => openModal(item)}
                                        onDelete={() => confirmDelete(item.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <Modal isOpen={isModalOpen} onClose={closeModal} className="max-w-3xl">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {editingPromo?.id ? "แก้ไขเนื้อหา" : "เพิ่มเนื้อหาใหม่"}
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                        label="ประเภท"
                        options={[
                            { value: "news", label: "ข่าวสาร" },
                            { value: "promotion", label: "โปรโมชั่น" }
                        ]}
                        onChange={(value) => setFormData({ ...formData, type: value as any })}
                        defaultValue={formData.type}
                    />
                    <Select
                        label="สถานะ"
                        options={[
                            { value: "1", label: "เปิดใช้งาน" },
                            { value: "0", label: "ปิดใช้งาน" }
                        ]}
                        onChange={(value) => setFormData({ ...formData, is_active: parseInt(value) })}
                        defaultValue={String(formData.is_active !== undefined ? formData.is_active : "1")}
                    />

                    <div className="col-span-1 md:col-span-2">
                        <Input
                            label="หัวข้อ"
                            value={formData.title || ""}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <Input
                            label="Slug"
                            value={formData.slug || ""}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-400">รูปภาพแบนเนอร์</label>
                        <div className="flex gap-4 items-start">
                            <div className="flex-1">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700 dark:border-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                                        <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">คลิกเพื่ออัพโหลด</span></p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            const uploadFormData = new FormData();
                                            uploadFormData.append("file", file);

                                            try {
                                                const res = await fetch("/api/upload", {
                                                    method: "POST",
                                                    body: uploadFormData
                                                });
                                                const data = await res.json();
                                                if (data.success) {
                                                    setFormData(prev => ({ ...prev, banner_image_url: data.url }));
                                                }
                                            } catch (error) {
                                                console.error("Upload failed", error);
                                                toast.error("อัพโหลดล้มเหลว!");
                                            }
                                        }}
                                    />
                                </label>
                            </div>
                            {formData.banner_image_url && (
                                <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                                    <Image
                                        src={formData.banner_image_url}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <Input
                        label="วันที่เริ่มต้น"
                        type="date"
                        value={formData.start_date ? formData.start_date.split('T')[0] : ""}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    />
                    <Input
                        label="วันที่สิ้นสุด"
                        type="date"
                        value={formData.end_date ? formData.end_date.split('T')[0] : ""}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    />
                    <div className="col-span-1 md:col-span-2">
                        <TextArea
                            label="คำอธิบายสั้น"
                            rows={2}
                            value={formData.short_description || ""}
                            onChange={(value) => setFormData({ ...formData, short_description: value })}
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <TextArea
                            label="เนื้อหา"
                            rows={4}
                            value={formData.content || ""}
                            onChange={(value) => setFormData({ ...formData, content: value })}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={closeModal}>ปิด</Button>
                    <Button variant="primary" onClick={handleSave}>บันทึก</Button>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">ยืนยันการลบ</h3>
                </div>
                <p className="text-gray-500 mb-6">
                    คุณแน่ใจหรือไม่ว่าต้องการลบโปรโมชั่นนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้
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
