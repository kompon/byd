"use client";

import {
    Table, TableHeader, TableBody, TableRow, TableCell
} from "@/app/components/ui/table/Table";
import Button from "@/app/components/ui/button/Button";
import Input from "@/app/components/form/input/InputField";
import Switch from "@/app/components/form/switch/Switch";
import { Modal } from "@/app/components/ui/modal/Modal";
import Badge from "@/app/components/ui/badge/Badge";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";
import { toast } from "sonner";

type NavbarItem = {
    id: number;
    label: string;
    href: string;
    sort_order: number;
    is_visible: number;
};

export default function NavbarPage() {
    const [items, setItems] = useState<NavbarItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<NavbarItem> | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<NavbarItem>>({});

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch("/api/navbar-items");
            const data = await res.json();
            if (Array.isArray(data)) setItems(data);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const method = editingItem?.id ? "PUT" : "POST";
            const url = editingItem?.id ? `/api/navbar-items/${editingItem.id}` : "/api/navbar-items";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success(editingItem?.id ? "อัปเดตรายการสำเร็จ!" : "สร้างรายการใหม่สำเร็จ!");
                fetchItems();
                closeModal();
            } else {
                toast.error("ไม่สามารถบันทึกรายการได้");
            }
        } catch (error) {
            console.error("Error saving item:", error);
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
            await fetch(`/api/navbar-items/${deleteId}`, { method: "DELETE" });
            toast.success("ลบรายการสำเร็จ");
            fetchItems();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error("ไม่สามารถลบรายการได้");
        }
    };

    const openModal = (item?: NavbarItem) => {
        setEditingItem(item || null);
        setFormData(item || { sort_order: 0, is_visible: 1 });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    return (
        <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6 mb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">ตั้งค่าเมนูนำทาง</h1>
                <Button
                    variant="primary"
                    startIcon={<Plus size={18} />}
                    onClick={() => openModal()}
                >
                    เพิ่มรายการ
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell isHeader>ชื่อ</TableCell>
                        <TableCell isHeader>ลิงก์ (HREF)</TableCell>
                        <TableCell isHeader>ลำดับ</TableCell>
                        <TableCell isHeader>การแสดง</TableCell>
                        <TableCell isHeader>จัดการ</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8">กำลังโหลด...</TableCell>
                        </TableRow>
                    ) : items.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8">ไม่พบรายการ</TableCell>
                        </TableRow>
                    ) : (
                        items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <span className="font-medium text-gray-800 dark:text-white/90">{item.label}</span>
                                </TableCell>
                                <TableCell>
                                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">{item.href}</code>
                                </TableCell>
                                <TableCell>{item.sort_order}</TableCell>
                                <TableCell>
                                    <Badge
                                        color={item.is_visible ? "success" : "light"}
                                        size="sm"
                                        variant="light"
                                    >
                                        {item.is_visible ? "แสดง" : "ซ่อน"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <button
                                            className="text-gray-500 hover:text-brand-500 transition-colors"
                                            onClick={() => openModal(item)}
                                            title="แก้ไข"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            className="text-gray-500 hover:text-error-500 transition-colors"
                                            onClick={() => confirmDelete(item.id)}
                                            title="ลบ"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {editingItem?.id ? "แก้ไขรายการเมนู" : "เพิ่มรายการเมนูใหม่"}
                    </h3>
                </div>

                <div className="space-y-4">
                    <Input
                        label="ชื่อ"
                        placeholder="เช่น หน้าแรก"
                        value={formData.label || ""}
                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    />
                    <Input
                        label="ลิงก์ / Href"
                        placeholder="เช่น #home หรือ /about"
                        value={formData.href || ""}
                        onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                    />
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                label="ลำดับการแสดง"
                                type="number"
                                value={formData.sort_order?.toString() || "0"}
                                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="flex items-center pt-6">
                            <Switch
                                label="แสดง"
                                checked={!!formData.is_visible}
                                onChange={(v) => setFormData({ ...formData, is_visible: v ? 1 : 0 })}
                            />
                        </div>
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
                    คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้
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
