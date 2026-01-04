"use client";

import { Button, Input, Textarea, Switch, Card, CardBody } from "@heroui/react";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import { toast } from "sonner";

export default function PopupManagerPage() {
    const [settings, setSettings] = useState({
        popup_enabled: "0",
        popup_text: "",
        popup_image_url: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                setSettings({
                    popup_enabled: data.popup_enabled || "0",
                    popup_text: data.popup_text || "",
                    popup_image_url: data.popup_image_url || ""
                });
            })
            .catch(err => console.error("Failed to load settings", err));
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            if (res.ok) {
                toast.success("Settings saved successfully!");
            }
        } catch (error) {
            console.error("Error saving settings:", error);
            toast.error("Failed to save settings.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                Popup Manager
            </h1>

            <Card className="bg-white border border-gray-200 shadow-sm p-6">
                <CardBody className="flex flex-col gap-6">

                    {/* Enable Toggle */}
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex flex-col">
                            <span className="text-slate-900 font-bold">Enable Popup</span>
                            <span className="text-gray-500 text-sm">Show this popup on the homepage</span>
                        </div>
                        <Switch
                            isSelected={settings.popup_enabled === "1"}
                            onValueChange={(val) => setSettings({ ...settings, popup_enabled: val ? "1" : "0" })}
                            color="success"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="flex flex-col gap-2">
                        <label className="text-slate-900 font-medium">Popup Image</label>
                        <div className="flex gap-4 items-start">
                            <div className="flex-1">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-500 file:text-black hover:file:bg-gold-600 mb-2"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        const formData = new FormData();
                                        formData.append("file", file);

                                        try {
                                            const res = await fetch("/api/upload", { method: "POST", body: formData });
                                            const data = await res.json();
                                            if (data.success) {
                                                setSettings(prev => ({ ...prev, popup_image_url: data.url }));
                                            }
                                        } catch (error) {
                                            console.error("Upload failed", error);
                                        }
                                    }}
                                />
                                <span className="text-xs text-gray-500">Recommended size: 600x400px</span>
                            </div>

                            {settings.popup_image_url && (
                                <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                                    <img
                                        src={settings.popup_image_url}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Text Message */}
                    <Textarea
                        label="Popup Message"
                        placeholder="Enter your promotional message..."
                        variant="bordered"
                        minRows={3}
                        value={settings.popup_text}
                        onValueChange={(v) => setSettings({ ...settings, popup_text: v })}
                        classNames={{
                            label: "text-slate-900",
                            input: "text-slate-900"
                        }}
                    />

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <Button
                            className="bg-gold-500 text-black font-bold px-8"
                            startContent={<Save size={20} />}
                            isLoading={loading}
                            onPress={handleSave}
                        >
                            Save Changes
                        </Button>
                    </div>

                </CardBody>
            </Card>
        </div>
    );
}
