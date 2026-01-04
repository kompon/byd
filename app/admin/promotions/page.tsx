"use client";

import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
    useDisclosure, Chip, Textarea, Select, SelectItem
} from "@heroui/react";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";
import { toast } from "sonner";

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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange } = useDisclosure();
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
                toast.success(editingPromo?.id ? "Promotion updated!" : "New promotion created!");
                fetchPromos();
                onClose();
            } else {
                toast.error("Failed to save promotion");
            }
        } catch (error) {
            console.error("Error saving promo:", error);
            toast.error("An error occurred while saving");
        }
    };

    const confirmDelete = (id: number) => {
        setDeleteId(id);
        onDeleteOpen();
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await fetch(`/api/promotions/${deleteId}`, { method: "DELETE" });
            toast.success("Promotion deleted successfully");
            fetchPromos();
            onDeleteOpenChange();
        } catch (error) {
            console.error("Error deleting promo:", error);
            toast.error("Failed to delete promotion");
        }
    };

    const openModal = (promo?: Promotion) => {
        setEditingPromo(promo || null);
        setFormData(promo || { type: "promotion", is_active: 1 });
        onOpen();
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">News & Promotions</h1>
                    <p className="text-gray-500">Manage your marketing content</p>
                </div>
                <Button
                    className="bg-gold-500 text-white font-bold shadow-lg shadow-gold-500/20"
                    endContent={<Plus size={20} />}
                    onPress={() => openModal()}
                    size="lg"
                >
                    Add New Content
                </Button>
            </div>

            <Table
                aria-label="Promotions Table"
                classNames={{
                    wrapper: "bg-white border border-gray-200 shadow-sm",
                    th: "bg-gray-50 text-slate-700 border-b border-gray-200",
                    td: "text-slate-900 py-4"
                }}
            >
                <TableHeader>
                    <TableColumn>TITLE</TableColumn>
                    <TableColumn>TYPE</TableColumn>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No promotions found"} items={promos} isLoading={loading}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.title}</TableCell>
                            <TableCell className="capitalize">{item.type}</TableCell>
                            <TableCell>{new Date(item.start_date).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Chip color={item.is_active ? "success" : "default"} variant="flat" size="sm">
                                    {item.is_active ? "ACTIVE" : "INACTIVE"}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => openModal(item)}>
                                        <Edit size={18} />
                                    </span>
                                    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => confirmDelete(item.id)}>
                                        <Trash size={18} />
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <Modal isOpen={isOpen} onClose={onClose} size="2xl" className="bg-white border border-gray-200">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-slate-900">
                                {editingPromo?.id ? "Edit Content" : "New Content"}
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-4">
                                    <Select
                                        label="Type"
                                        variant="bordered"
                                        selectedKeys={formData.type ? [formData.type] : []}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                    >
                                        <SelectItem key="news">News</SelectItem>
                                        <SelectItem key="promotion">Promotion</SelectItem>
                                    </Select>
                                    <Select
                                        label="Status"
                                        variant="bordered"
                                        selectedKeys={formData.is_active !== undefined ? [String(formData.is_active)] : ["1"]}
                                        onChange={(e) => setFormData({ ...formData, is_active: parseInt(e.target.value ?? "1") })}
                                    >
                                        <SelectItem key="1">Active</SelectItem>
                                        <SelectItem key="0">Inactive</SelectItem>
                                    </Select>

                                    <div className="col-span-2">
                                        <Input
                                            label="Title"
                                            variant="bordered"
                                            value={formData.title || ""}
                                            onValueChange={(v) => setFormData({ ...formData, title: v, slug: v.toLowerCase().replace(/\s+/g, '-') })}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <Input
                                            label="Slug"
                                            variant="bordered"
                                            value={formData.slug || ""}
                                            onValueChange={(v) => setFormData({ ...formData, slug: v })}
                                        />
                                    </div>
                                    <div className="col-span-2 flex flex-col gap-2">
                                        <label className="text-small">Banner Image</label>
                                        <div className="flex gap-2 items-center">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-500 file:text-black hover:file:bg-gold-600"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;

                                                    const formData = new FormData();
                                                    formData.append("file", file);

                                                    try {
                                                        const res = await fetch("/api/upload", {
                                                            method: "POST",
                                                            body: formData
                                                        });
                                                        const data = await res.json();
                                                        if (data.success) {
                                                            setFormData(prev => ({ ...prev, banner_image_url: data.url }));
                                                        }
                                                    } catch (error) {
                                                        console.error("Upload failed", error);
                                                        toast.error("Upload failed!");
                                                    }
                                                }}
                                            />
                                        </div>
                                        {formData.banner_image_url && (
                                            <div className="relative w-full h-32 rounded-lg overflow-hidden border border-white/20 mt-2">
                                                <img
                                                    src={formData.banner_image_url}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <Input
                                        label="Start Date"
                                        type="date"
                                        variant="bordered"
                                        value={formData.start_date ? formData.start_date.split('T')[0] : ""}
                                        onValueChange={(v) => setFormData({ ...formData, start_date: v })}
                                    />
                                    <Input
                                        label="End Date"
                                        type="date"
                                        variant="bordered"
                                        value={formData.end_date ? formData.end_date.split('T')[0] : ""}
                                        onValueChange={(v) => setFormData({ ...formData, end_date: v })}
                                    />
                                    <div className="col-span-2">
                                        <Textarea
                                            label="Short Description"
                                            variant="bordered"
                                            value={formData.short_description || ""}
                                            onValueChange={(v) => setFormData({ ...formData, short_description: v })}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <Textarea
                                            label="Content"
                                            variant="bordered"
                                            minRows={4}
                                            value={formData.content || ""}
                                            onValueChange={(v) => setFormData({ ...formData, content: v })}
                                        />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                                <Button className="bg-gold-500 text-black font-bold" onPress={handleSave}>Save</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Confirm Deletion</ModalHeader>
                            <ModalBody>
                                Are you sure you want to delete this promotion? This action cannot be undone.
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>Cancel</Button>
                                <Button color="danger" onPress={handleDelete}>Delete</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
