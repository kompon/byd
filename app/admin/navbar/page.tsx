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
                toast.success(editingItem?.id ? "Item updated!" : "New item created!");
                fetchItems();
                closeModal();
            } else {
                toast.error("Failed to save item");
            }
        } catch (error) {
            console.error("Error saving item:", error);
            toast.error("An error occurred while saving");
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
            toast.success("Item deleted successfully");
            fetchItems();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error("Failed to delete item");
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
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Navbar Configuration</h1>
                <Button
                    variant="primary"
                    startIcon={<Plus size={18} />}
                    onClick={() => openModal()}
                >
                    Add Item
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell isHeader>LABEL</TableCell>
                        <TableCell isHeader>LINK (HREF)</TableCell>
                        <TableCell isHeader>ORDER</TableCell>
                        <TableCell isHeader>VISIBLE</TableCell>
                        <TableCell isHeader>ACTIONS</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8">Loading...</TableCell>
                        </TableRow>
                    ) : items.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8">No items found</TableCell>
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
                                        {item.is_visible ? "VISIBLE" : "HIDDEN"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <button
                                            className="text-gray-500 hover:text-brand-500 transition-colors"
                                            onClick={() => openModal(item)}
                                            title="Edit"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            className="text-gray-500 hover:text-error-500 transition-colors"
                                            onClick={() => confirmDelete(item.id)}
                                            title="Delete"
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
                        {editingItem?.id ? "Edit Menu Item" : "New Menu Item"}
                    </h3>
                </div>

                <div className="space-y-4">
                    <Input
                        label="Label"
                        placeholder="e.g. Home"
                        value={formData.label || ""}
                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    />
                    <Input
                        label="Href / Link"
                        placeholder="e.g. #home or /about"
                        value={formData.href || ""}
                        onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                    />
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                label="Sort Order"
                                type="number"
                                value={formData.sort_order?.toString() || "0"}
                                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="flex items-center pt-6">
                            <Switch
                                label="Visible"
                                checked={!!formData.is_visible}
                                onChange={(v) => setFormData({ ...formData, is_visible: v ? 1 : 0 })}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={closeModal}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Confirm Deletion</h3>
                </div>
                <p className="text-gray-500 mb-6">
                    Are you sure you want to delete this item? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
