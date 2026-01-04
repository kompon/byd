"use client";

import Button from "@/app/components/ui/button/Button";
import Input from "@/app/components/form/input/InputField";
import { Card, CardBody, CardHeader } from "@/app/components/ui/card/Card";
import { useEffect, useState } from "react";
import { Save, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function SettingsPage() {
    type SettingMap = Record<string, string>;
    const [settings, setSettings] = useState<SettingMap>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/settings");
            const data = await res.json();
            setSettings(data);
        } catch (error) {
            console.error("Error fetching settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            toast.success("Settings saved successfully!");
        } catch (error) {
            console.error("Error saving settings:", error);
            toast.error("Failed to save settings.");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    if (loading) return <div className="p-8 text-slate-900 dark:text-white">Loading...</div>;

    return (
        <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6 mb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    System Settings
                </h1>
                <Button
                    variant="primary"
                    startIcon={<Save size={18} />}
                    disabled={saving}
                    onClick={handleSave}
                >
                    {saving ? "Saving..." : "Save Changes"}
                </Button>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">General Settings</h4>
                    </CardHeader>
                    <CardBody className="p-4 sm:p-6 pt-0">
                        <div className="space-y-4">
                            <Input
                                label="Site Title"
                                value={settings.site_title || ""}
                                onChange={(e) => handleChange('site_title', e.target.value)}
                            />

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-400">Site Logo</label>
                                <div className="flex gap-4 items-start">
                                    <div className="flex-1">
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Logo URL"
                                                value={settings.site_logo_url || ""}
                                                onChange={(e) => handleChange('site_logo_url', e.target.value)}
                                                className="flex-1"
                                            />
                                            <label className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Upload</span>
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
                                                            const res = await fetch("/api/upload", { method: "POST", body: formData });
                                                            const data = await res.json();
                                                            if (data.success) {
                                                                handleChange('site_logo_url', data.url);
                                                            }
                                                        } catch (error) {
                                                            console.error("Upload failed", error);
                                                            alert("Upload failed!");
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    {settings.site_logo_url && (
                                        <div className="relative w-12 h-12 bg-gray-900 rounded border border-gray-700 shrink-0 flex items-center justify-center p-1">
                                            <img
                                                src={settings.site_logo_url}
                                                alt="Logo Preview"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">Hero Section</h4>
                    </CardHeader>
                    <CardBody className="p-4 sm:p-6 pt-0">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Headline Logo</label>
                                <div className="flex gap-4 items-start">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700 dark:border-gray-600 transition-colors">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadCloud className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                                            <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload logo</span></p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG, SVG (recommended)</p>
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
                                                        handleChange('hero_headline', data.url);
                                                        toast.success("Logo uploaded successfully!");
                                                    }
                                                } catch (error) {
                                                    console.error("Upload failed", error);
                                                    toast.error("Upload failed!");
                                                }
                                            }}
                                        />
                                    </label>
                                    {settings.hero_headline && (settings.hero_headline.startsWith('http') || settings.hero_headline.startsWith('/')) && (
                                        <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600 shrink-0 bg-white dark:bg-gray-800 flex items-center justify-center p-2">
                                            <img
                                                src={settings.hero_headline}
                                                alt="Headline Logo"
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Input
                                label="Subheadline"
                                value={settings.hero_subheadline || ""}
                                onChange={(e) => handleChange('hero_subheadline', e.target.value)}
                            />
                            <Input
                                label="Background Image URL"
                                value={settings.hero_background_image_url || ""}
                                onChange={(e) => handleChange('hero_background_image_url', e.target.value)}
                                hint="รองรับรูปภาพ, วิดีโอ (mp4, webm, ogg) และ YouTube URL"
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
