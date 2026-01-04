"use client";

import { Button, Input, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";

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
            alert("Settings saved successfully!");
        } catch (error) {
            console.error("Error saving settings:", error);
            alert("Failed to save settings.");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    if (loading) return <div className="p-8 text-white">Loading...</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">System Settings</h1>
                <Button
                    className="bg-gold-500 text-black font-bold"
                    startContent={<Save size={18} />}
                    isLoading={saving}
                    onPress={handleSave}
                >
                    Save Changes
                </Button>
            </div>

            <div className="space-y-6">
                <Card className="bg-zinc-900 border border-white/10">
                    <CardHeader className="text-xl font-bold text-white px-6 pt-6">General Settings</CardHeader>
                    <Divider className="my-2 bg-white/10" />
                    <CardBody className="gap-6 px-6 pb-6">
                        <Input
                            label="Site Title"
                            variant="bordered"
                            value={settings.site_title || ""}
                            onValueChange={(v) => handleChange('site_title', v)}
                        />
                    </CardBody>
                </Card>

                <Card className="bg-zinc-900 border border-white/10">
                    <CardHeader className="text-xl font-bold text-white px-6 pt-6">Hero Section</CardHeader>
                    <Divider className="my-2 bg-white/10" />
                    <CardBody className="gap-6 px-6 pb-6">
                        <Input
                            label="Headline (HTML allowed)"
                            variant="bordered"
                            value={settings.hero_headline || ""}
                            onValueChange={(v) => handleChange('hero_headline', v)}
                        />
                        <Input
                            label="Subheadline"
                            variant="bordered"
                            value={settings.hero_subheadline || ""}
                            onValueChange={(v) => handleChange('hero_subheadline', v)}
                        />
                        <Input
                            label="Background Image URL"
                            variant="bordered"
                            value={settings.hero_background_image_url || ""} // Assuming key exists, if not need to add to DB or handle undefined
                            onValueChange={(v) => handleChange('hero_background_image_url', v)}
                            description="Use a high-quality image URL."
                        />
                    </CardBody>
                </Card>

                <Card className="bg-zinc-900 border border-white/10">
                    <CardHeader className="text-xl font-bold text-white px-6 pt-6">Theme Colors</CardHeader>
                    <Divider className="my-2 bg-white/10" />
                    <CardBody className="gap-6 px-6 pb-6 grid grid-cols-2">
                        <Input
                            label="Primary Color"
                            variant="bordered"
                            value={settings.primary_color || ""}
                            onValueChange={(v) => handleChange('primary_color', v)}
                        />
                        <Input
                            label="Navbar Background"
                            variant="bordered"
                            value={settings.navbar_bg_color || ""}
                            onValueChange={(v) => handleChange('navbar_bg_color', v)}
                        />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
