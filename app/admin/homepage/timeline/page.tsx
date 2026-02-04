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
import { Plus, UploadCloud, Clock } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

type Milestone = {
    id: number;
    year: string;
    title: string;
    description: string;
    image_url: string;
    display_order: number;
    is_active: number;
};

export default function TimelinePage() {
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingMilestone, setEditingMilestone] = useState<Partial<Milestone> | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Milestone>>({});

    const fetchMilestones = async () => {
        try {
            const res = await fetch("/api/homepage/timeline");
            const data = await res.json();
            if (Array.isArray(data)) setMilestones(data);
        } catch (error) {
            console.error("Error fetching milestones:", error);
        } finally {
            setLoading(false);
        }
    };

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        fetchMilestones();
    }, []);

    if (!mounted) return null;

    const handleSave = async () => {
        try {
            const method = editingMilestone?.id ? "PUT" : "POST";
            const url = editingMilestone?.id ? `/api/homepage/timeline/${editingMilestone.id}` : "/api/homepage/timeline";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success(editingMilestone?.id ? "อัพเดทไทม์ไลน์แล้ว!" : "สร้างไทม์ไลน์ใหม่แล้ว!");
                fetchMilestones();
                closeModal();
            } else {
                toast.error("ไม่สามารถบันทึกไทม์ไลน์ได้");
            }
        } catch (error) {
            console.error("Error saving milestone:", error);
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
            await fetch(`/api/homepage/timeline/${deleteId}`, { method: "DELETE" });
            toast.success("ลบไทม์ไลน์สำเร็จ");
            fetchMilestones();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting milestone:", error);
            toast.error("ไม่สามารถลบไทม์ไลน์ได้");
        }
    };

    const openModal = (milestone?: Milestone) => {
        if (milestone) {
            setEditingMilestone(milestone);
            setFormData(milestone);
        } else {
            setEditingMilestone(null);
            setFormData({ is_active: 1, display_order: milestones.length + 1 });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingMilestone(null);
        setFormData({});
    };

    return (
        <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <Clock className="w-8 h-8 text-brand-primary" />
                        จัดการไทม์ไลน์
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        จัดการประวัติและเหตุการณ์สำคัญของบริษัท
                    </p>
                </div>
                <Button onClick={() => openModal()} variant="primary">
                    <Plus className="w-4 h-4 mr-2" />
                    เพิ่มไทม์ไลน์
                </Button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">กำลังโหลด...</div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>รูปภาพ</TableCell>
                                <TableCell>ปี</TableCell>
                                <TableCell>หัวข้อ</TableCell>
                                <TableCell>รายละเอียด</TableCell>
                                <TableCell>ลำดับ</TableCell>
                                <TableCell>สถานะ</TableCell>
                                <TableCell>จัดการ</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {milestones.map((milestone) => (
                                <TableRow key={milestone.id}>
                                    <TableCell>
                                        {milestone.image_url && (
                                            <Image
                                                src={milestone.image_url}
                                                alt={milestone.title}
                                                width={80}
                                                height={60}
                                                className="rounded object-cover"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge color="primary">{milestone.year}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium max-w-[200px] truncate" title={milestone.title}>{milestone.title}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="max-w-[250px] truncate" title={milestone.description}>{milestone.description}</div>
                                    </TableCell>
                                    <TableCell>{milestone.display_order}</TableCell>
                                    <TableCell>
                                        <StatusBadge isActive={milestone.is_active} />
                                    </TableCell>
                                    <TableCell>
                                        <ActionButtons
                                            onEdit={() => openModal(milestone)}
                                            onDelete={() => confirmDelete(milestone.id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Create/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingMilestone?.id ? "แก้ไขไทม์ไลน์" : "เพิ่มไทม์ไลน์ใหม่"}
            >
                <div className="space-y-4">
                    <Input
                        label="ปี"
                        value={formData.year || ""}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        placeholder="เช่น 2018, 2020"
                    />

                    <Input
                        label="หัวข้อ"
                        value={formData.title || ""}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="เช่น ก่อตั้งบริษัท"
                    />

                    <TextArea
                        label="รายละเอียด"
                        value={formData.description || ""}
                        onChange={(value) => setFormData({ ...formData, description: value })}
                        placeholder="รายละเอียดของเหตุการณ์"
                        rows={3}
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-400">รูปภาพ</label>
                        <div className="flex gap-4 items-start">
                            <div className="flex-1">
                                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">คลิกเพื่ออัพโหลด</span>
                                        </p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PNG, JPG, WEBP (MAX. 5MB)</p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            const formDataUpload = new FormData();
                                            formDataUpload.append("file", file);

                                            try {
                                                const res = await fetch("/api/upload", {
                                                    method: "POST",
                                                    body: formDataUpload
                                                });
                                                const data = await res.json();
                                                if (data.success) {
                                                    setFormData(prev => ({ ...prev, image_url: data.url }));
                                                    toast.success("อัพโหลดรูปภาพสำเร็จ!");
                                                } else {
                                                    toast.error("อัพโหลดรูปภาพล้มเหลว");
                                                }
                                            } catch (error) {
                                                console.error("Upload failed", error);
                                                toast.error("เกิดข้อผิดพลาดในการอัพโหลด");
                                            }
                                        }}
                                    />
                                </label>
                            </div>
                            {formData.image_url && (
                                <div className="relative w-48 h-48 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 shrink-0">
                                    <Image
                                        src={formData.image_url}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <Input
                        label="ลำดับการแสดง"
                        type="number"
                        value={formData.display_order || 0}
                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                    />

                    <Select
                        label="สถานะ"
                        value={formData.is_active?.toString() || "1"}
                        onChange={(value) => setFormData({ ...formData, is_active: parseInt(value) })}
                        options={[
                            { value: "1", label: "เปิดใช้งาน" },
                            { value: "0", label: "ปิดใช้งาน" }
                        ]}
                    />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={closeModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        บันทึก
                    </Button>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="ยืนยันการลบ"
            >
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    คุณแน่ใจหรือไม่ว่าต้องการลบไทม์ไลน์นี้?
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
