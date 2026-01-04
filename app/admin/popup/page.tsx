"use client";

import Button from "@/app/components/ui/button/Button";
import Input from "@/app/components/form/input/InputField";
import Switch from "@/app/components/form/switch/Switch";
import { Card, CardBody, CardHeader } from "@/app/components/ui/card/Card";
import { useEffect, useState } from "react";
import { Save, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

type PopupSettings = {
    is_active: number;
    image_url: string;
    link_url: string;
    show_once_per_session: number;
};

export default function PopupManagerPage() {
    const [settings, setSettings] = useState<PopupSettings>({
        is_active: 0,
        image_url: "",
        link_url: "",
        show_once_per_session: 1
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/popup");
            const data = await res.json();
            // Ensure boolean-like values are handled if API returns them differently
            setSettings(data);
        } catch (error) {
            console.error("Error fetching popup settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch("/api/popup", {
                method: "POST", // API might be PUT or POST, assuming POST for upsert/update here based on previous context, or sticking to existing pattern
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            toast.success("Popup settings saved successfully!");
        } catch (error) {
            console.error("Error saving popup settings:", error);
            toast.error("Failed to save settings.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-slate-900 dark:text-white">Loading...</div>;

    return (
        <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6 mb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">จัดการป๊อปอัพ</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">ตั้งค่าป๊อปอัพหน้าแรก</p>
                </div>
                <Button
                    variant="primary"
                    startIcon={<Save size={18} />}
                    disabled={saving}
                    onClick={handleSave}
                >
                    {saving ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">เนื้อหาป๊อปอัพ</h4>
                </CardHeader>
                <CardBody className="p-4 sm:p-6 pt-0 space-y-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-8">
                            <Switch
                                label="เปิดใช้งานป๊อปอัพ"
                                checked={settings.is_active === 1}
                                onChange={(checked) => setSettings({ ...settings, is_active: checked ? 1 : 0 })}
                            />
                            <Switch
                                label="แสดงครั้งเดียวต่อเซสชั่น"
                                checked={settings.show_once_per_session === 1}
                                onChange={(checked) => setSettings({ ...settings, show_once_per_session: checked ? 1 : 0 })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-400">Popup Image</label>
                            <div className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700 dark:border-gray-600">
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

                                                const formData = new FormData();
                                                formData.append("file", file);

                                                try {
                                                    const res = await fetch("/api/upload", {
                                                        method: "POST",
                                                        body: formData
                                                    });
                                                    const data = await res.json();
                                                    if (data.success) {
                                                        setSettings(prev => ({ ...prev, image_url: data.url }));
                                                    }
                                                } catch (error) {
                                                    console.error("Upload failed", error);
                                                    toast.error("Upload failed!");
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                                {settings.image_url && (
                                    <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                                        <Image
                                            src={settings.image_url}
                                            alt="Preview"
                                            fill
                                            className="object-contain bg-black/5"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <Input
                            label="Link URL (Optional)"
                            placeholder="https://..."
                            value={settings.link_url || ""}
                            onChange={(e) => setSettings({ ...settings, link_url: e.target.value })}
                            hint="Redirect users when they click the popup"
                        />
                    </div>
                </CardBody>
            </Card>
        </div >
    );
}
