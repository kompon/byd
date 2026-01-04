"use client";

import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
    useDisclosure, Chip, Tooltip, Textarea
} from "@heroui/react";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash, Search } from "lucide-react";
import { toast } from "sonner";

type CarModel = {
    id: number;
    name: string;
    slug: string;
    base_price: string;
    status: "active" | "inactive";
    main_image_url: string;
    description: string;
};

export default function CarModelsPage() {
    const [cars, setCars] = useState<CarModel[]>([]);
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange } = useDisclosure();
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
                onClose();
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
        onDeleteOpen();
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await fetch(`/api/car-models/${deleteId}`, { method: "DELETE" });
            toast.success("Car model deleted successfully");
            fetchCars();
            onDeleteOpenChange(); // Close modal
        } catch (error) {
            console.error("Error deleting car:", error);
            toast.error("Failed to delete car");
        }
    };

    const openModal = (car?: CarModel) => {
        setEditingCar(car || null);
        setFormData(car || { status: "active", base_price: "0" });
        onOpen();
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Car Models</h1>
                    <p className="text-gray-500">Manage your showroom inventory</p>
                </div>
                <Button
                    className="bg-gold-500 text-white font-bold shadow-lg shadow-gold-500/20"
                    endContent={<Plus size={20} />}
                    onPress={() => openModal()}
                    size="lg"
                >
                    Add New Model
                </Button>
            </div>

            <Table
                aria-label="Car Models Table"
                classNames={{
                    wrapper: "bg-white border border-gray-200 shadow-sm",
                    th: "bg-gray-50 text-slate-700 border-b border-gray-200",
                    td: "text-slate-900 py-4"
                }}
            >
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>PRICE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No cars found"} items={cars} isLoading={loading}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="text-bold text-slate-900">{item.name}</span>
                                    <span className="text-tiny text-gray-500">{item.slug}</span>
                                </div>
                            </TableCell>
                            <TableCell>฿{parseInt(item.base_price).toLocaleString()}</TableCell>
                            <TableCell>
                                <Chip color={item.status === 'active' ? "success" : "default"} variant="flat" size="sm">
                                    {item.status.toUpperCase()}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Tooltip content="Edit">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => openModal(item)}>
                                            <Edit size={18} />
                                        </span>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Delete">
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => confirmDelete(item.id)}>
                                            <Trash size={18} />
                                        </span>
                                    </Tooltip>
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
                            <ModalHeader className="flex flex-col gap-1 text-slate-900">
                                {editingCar?.id ? "Edit Car Model" : "New Car Model"}
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Name"
                                        placeholder="e.g. SEAL 5"
                                        variant="bordered"
                                        value={formData.name || ""}
                                        onValueChange={(v) => setFormData({ ...formData, name: v, slug: v.toLowerCase().replace(/\s+/g, '-') })}
                                    />
                                    <Input
                                        label="Slug"
                                        placeholder="e.g. seal-5"
                                        variant="bordered"
                                        value={formData.slug || ""}
                                        onValueChange={(v) => setFormData({ ...formData, slug: v })}
                                    />
                                    <Input
                                        label="Price"
                                        type="number"
                                        placeholder="0.00"
                                        variant="bordered"
                                        value={formData.base_price?.toString() || ""}
                                        onValueChange={(v) => setFormData({ ...formData, base_price: v })}
                                    />
                                    <div className="flex flex-col gap-2">
                                        <label className="text-small">Main Image</label>
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
                                                            setFormData(prev => ({ ...prev, main_image_url: data.url }));
                                                        }
                                                    } catch (error) {
                                                        console.error("Upload failed", error);
                                                        toast.error("Upload failed!");
                                                    }
                                                }}
                                            />
                                        </div>
                                        {formData.main_image_url && (
                                            <div className="relative w-full h-32 rounded-lg overflow-hidden border border-white/20 mt-2">
                                                <img
                                                    src={formData.main_image_url}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-span-2">
                                        <Textarea
                                            label="Description"
                                            placeholder="Car description..."
                                            variant="bordered"
                                            value={formData.description || ""}
                                            onValueChange={(v) => setFormData({ ...formData, description: v })}
                                        />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button className="bg-gold-500 text-black font-bold" onPress={handleSave}>
                                    Save
                                </Button>
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
                                Are you sure you want to delete this car model? This action cannot be undone.
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
