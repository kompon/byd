"use client";

import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
    useDisclosure, Switch
} from "@heroui/react";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";

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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editingItem, setEditingItem] = useState<Partial<NavbarItem> | null>(null);
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
                fetchItems();
                onClose();
            }
        } catch (error) {
            console.error("Error saving item:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this menu item?")) return;
        try {
            await fetch(`/api/navbar-items/${id}`, { method: "DELETE" });
            fetchItems();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const openModal = (item?: NavbarItem) => {
        setEditingItem(item || null);
        setFormData(item || { sort_order: 0, is_visible: 1 });
        onOpen();
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Navbar Configuration</h1>
                <Button
                    className="bg-gold-500 text-black font-bold"
                    endContent={<Plus />}
                    onPress={() => openModal()}
                >
                    Add Item
                </Button>
            </div>

            <Table
                aria-label="Navbar Items Table"
                classNames={{
                    wrapper: "bg-zinc-900 border border-white/10",
                    th: "bg-zinc-800 text-white",
                    td: "text-gray-300"
                }}
            >
                <TableHeader>
                    <TableColumn>LABEL</TableColumn>
                    <TableColumn>LINK (HREF)</TableColumn>
                    <TableColumn>ORDER</TableColumn>
                    <TableColumn>VISIBLE</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No items found"} items={items} isLoading={loading}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.label}</TableCell>
                            <TableCell><code className="bg-white/10 px-1 rounded">{item.href}</code></TableCell>
                            <TableCell>{item.sort_order}</TableCell>
                            <TableCell>
                                <Switch
                                    size="sm"
                                    isSelected={!!item.is_visible}
                                    isDisabled
                                    classNames={{ wrapper: "group-data-[selected=true]:bg-gold-500" }}
                                />
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => openModal(item)}>
                                        <Edit size={18} />
                                    </span>
                                    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleDelete(item.id)}>
                                        <Trash size={18} />
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <Modal isOpen={isOpen} onClose={onClose} className="bg-zinc-900 border border-white/10">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-white">
                                {editingItem?.id ? "Edit Menu Item" : "New Menu Item"}
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Label"
                                    placeholder="e.g. Home"
                                    variant="bordered"
                                    value={formData.label || ""}
                                    onValueChange={(v) => setFormData({ ...formData, label: v })}
                                />
                                <Input
                                    label="Href / Link"
                                    placeholder="e.g. #home or /about"
                                    variant="bordered"
                                    value={formData.href || ""}
                                    onValueChange={(v) => setFormData({ ...formData, href: v })}
                                />
                                <div className="flex gap-4">
                                    <Input
                                        label="Sort Order"
                                        type="number"
                                        variant="bordered"
                                        value={formData.sort_order?.toString() || "0"}
                                        onValueChange={(v) => setFormData({ ...formData, sort_order: parseInt(v) })}
                                    />
                                    <div className="flex items-center">
                                        <Switch
                                            isSelected={!!formData.is_visible}
                                            onValueChange={(v) => setFormData({ ...formData, is_visible: v ? 1 : 0 })}
                                            classNames={{ wrapper: "group-data-[selected=true]:bg-gold-500" }}
                                        >
                                            Visible
                                        </Switch>
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
        </div>
    );
}
