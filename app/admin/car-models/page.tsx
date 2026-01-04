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
import { useEffect, useState } from "react";
import { Plus, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

type CarModel = {
    id: number;
    name: string;
    slug: string;
    base_price: string;
    status: "active" | "inactive";
    main_image_url: string;
    description: string;
    variants?: { name: string; price: number }[];
};



export default function CarModelsPage() {
    const [cars, setCars] = useState<CarModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingCar, setEditingCar] = useState<Partial<CarModel> | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    // Form State
    const [formData, setFormData] = useState<Partial<CarModel>>({});

    const fetchCars = async () => {
        try {
            const res = await fetch("/api/car-models");
            const data = await res.json();
            if (Array.isArray(data)) setCars(data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fix hydration mismatch by ensuring run on client
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        fetchCars();
    }, []);

    if (!mounted) return null; // Prevent SSR hydration mismatch

    const handleSave = async () => {
        try {
            const method = editingCar?.id ? "PUT" : "POST";
            const url = editingCar?.id
                ? `/api/car-models/${editingCar.id}`
                : "/api/car-models";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success(editingCar?.id ? "Car model updated!" : "New car model created!");
                fetchCars();
                closeModal();
            } else {
                toast.error("Failed to save car model");
            }
        } catch (error) {
            console.error("Error saving car:", error);
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
            await fetch(`/api/car-models/${deleteId}`, { method: "DELETE" });
            toast.success("Car model deleted successfully");
            fetchCars();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting car:", error);
            toast.error("Failed to delete car");
        }
    };

    const openModal = (car?: CarModel) => {
        setEditingCar(car || null);
        setFormData(car || { status: "active", base_price: "0" });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCar(null);
    };

    return (
        <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6 mb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">รุ่นรถยนต์</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">จัดการรุ่นรถในโชว์รูม</p>
                </div>
                <Button
                    variant="gradient"
                    startIcon={<Plus size={20} />}
                    onClick={() => openModal()}
                >
                    เพิ่มรุ่นใหม่
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell isHeader>ชื่อรุ่น</TableCell>
                        <TableCell isHeader>ราคา</TableCell>
                        <TableCell isHeader>สถานะ</TableCell>
                        <TableCell isHeader>จัดการ</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8">Loading...</TableCell>
                        </TableRow>
                    ) : cars.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8">No cars found</TableCell>
                        </TableRow>
                    ) : (
                        cars.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-800 dark:text-white/90">{item.name}</span>
                                        <span className="text-xs text-gray-500">{item.slug}</span>
                                    </div>
                                </TableCell>
                                <TableCell>฿{parseInt(item.base_price).toLocaleString()}</TableCell>
                                <TableCell>
                                    <StatusBadge isActive={item.status === 'active'} />
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

            {/* Edit/Add Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} className="max-w-3xl">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {editingCar?.id ? "Edit Car Model" : "New Car Model"}
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Name"
                        placeholder="e.g. SEAL 5"
                        value={formData.name || ""}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    />
                    <Input
                        label="Slug"
                        placeholder="e.g. seal-5"
                        value={formData.slug || ""}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    />


                    <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-400">Main Image</label>
                        <div className="flex gap-4 items-start">
                            <div className="flex-1">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700 dark:border-gray-600 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                                        <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
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
                                                    setFormData(prev => ({ ...prev, main_image_url: data.url }));
                                                }
                                            } catch (error) {
                                                console.error("Upload failed", error);
                                                toast.error("Upload failed!");
                                            }
                                        }}
                                    />
                                </label>
                            </div>
                            {formData.main_image_url && (
                                <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                                    <Image
                                        src={formData.main_image_url}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2 block">Variants</label>
                        <div className="space-y-3">
                            {formData.variants?.map((variant, index) => (
                                <div key={index} className="flex gap-3 items-center">
                                    <Input
                                        placeholder="Variant Name (e.g. Premium)"
                                        value={variant.name}
                                        onChange={(e) => {
                                            const newVariants = [...(formData.variants || [])];
                                            newVariants[index].name = e.target.value;
                                            setFormData({ ...formData, variants: newVariants });
                                        }}
                                    />
                                    <Input
                                        placeholder="Price"
                                        type="number"
                                        value={variant.price.toString()}
                                        onChange={(e) => {
                                            const newVariants = [...(formData.variants || [])];
                                            newVariants[index].price = parseFloat(e.target.value) || 0;
                                            setFormData({ ...formData, variants: newVariants });
                                        }}
                                    />
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            const newVariants = formData.variants?.filter((_, i) => i !== index);
                                            setFormData({ ...formData, variants: newVariants });
                                        }}
                                        className="px-3"
                                    >
                                        X
                                    </Button>
                                </div>
                            ))}
                            <Button
                                variant="outline"
                                onClick={() => setFormData({ ...formData, variants: [...(formData.variants || []), { name: "", price: 0 }] })}
                                startIcon={<Plus size={16} />}
                                className="w-full dashed border-2"
                            >
                                Add Variant
                            </Button>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <TextArea
                            label="Description"
                            placeholder="Car description..."
                            rows={4}
                            value={formData.description || ""}
                            onChange={(value) => setFormData({ ...formData, description: value })}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Confirm Deletion</h3>
                </div>
                <p className="text-gray-500 mb-6">
                    Are you sure you want to delete this car model? This action cannot be undone.
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
