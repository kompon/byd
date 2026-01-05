"use client";

import Button from "@/app/components/ui/button/Button";
import Input from "@/app/components/form/input/InputField";
import TextArea from "@/app/components/form/input/TextArea";
import { Card, CardBody, CardHeader } from "@/app/components/ui/card/Card";
import { useEffect, useState } from "react";
import { Save, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function ContactSettingsPage() {
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
            toast.success("Contact settings saved successfully!");
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
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Contact Settings</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">จัดการข้อมูลติดต่อ 2 สาขา</p>
                </div>
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
                {/* Branch 1 */}
                <Card>
                    <CardHeader>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 flex items-center gap-2">
                            <MapPin size={20} className="text-blue-600" />
                            สาขาที่ 1
                        </h4>
                    </CardHeader>
                    <CardBody className="p-4 sm:p-6 pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-1 md:col-span-2">
                                <Input
                                    label="ชื่อสาขา"
                                    placeholder="เช่น สาขาที่ 1 (คลองเตย)"
                                    value={settings.contact_name_1 || ""}
                                    onChange={(e) => handleChange('contact_name_1', e.target.value)}
                                />
                            </div>
                            <Input
                                label="เบอร์โทรศัพท์"
                                placeholder="02-XXX-XXXX"
                                value={settings.contact_phone_1 || ""}
                                onChange={(e) => handleChange('contact_phone_1', e.target.value)}
                            />
                            <Input
                                label="LINE ID"
                                placeholder="@yourlineid"
                                value={settings.contact_line_1 || ""}
                                onChange={(e) => handleChange('contact_line_1', e.target.value)}
                            />
                            <div className="col-span-1 md:col-span-2">
                                <TextArea
                                    label="ที่อยู่"
                                    placeholder="123 ถนน..."
                                    rows={3}
                                    value={settings.contact_address_1 || ""}
                                    onChange={(value) => handleChange('contact_address_1', value)}
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <TextArea
                                    label="Google Maps Embed URL"
                                    placeholder="https://www.google.com/maps/embed?pb=..."
                                    rows={2}
                                    value={settings.contact_map_url_1 || ""}
                                    onChange={(value) => handleChange('contact_map_url_1', value)}
                                    hint="วาง URL embed จาก Google Maps"
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Branch 2 */}
                <Card>
                    <CardHeader>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 flex items-center gap-2">
                            <MapPin size={20} className="text-blue-600" />
                            สาขาที่ 2
                        </h4>
                    </CardHeader>
                    <CardBody className="p-4 sm:p-6 pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-1 md:col-span-2">
                                <Input
                                    label="ชื่อสาขา"
                                    placeholder="เช่น สาขาที่ 2 (สาทร)"
                                    value={settings.contact_name_2 || ""}
                                    onChange={(e) => handleChange('contact_name_2', e.target.value)}
                                />
                            </div>
                            <Input
                                label="เบอร์โทรศัพท์"
                                placeholder="02-XXX-XXXX"
                                value={settings.contact_phone_2 || ""}
                                onChange={(e) => handleChange('contact_phone_2', e.target.value)}
                            />
                            <Input
                                label="LINE ID"
                                placeholder="@yourlineid"
                                value={settings.contact_line_2 || ""}
                                onChange={(e) => handleChange('contact_line_2', e.target.value)}
                            />
                            <div className="col-span-1 md:col-span-2">
                                <TextArea
                                    label="ที่อยู่"
                                    placeholder="456 ถนน..."
                                    rows={3}
                                    value={settings.contact_address_2 || ""}
                                    onChange={(value) => handleChange('contact_address_2', value)}
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <TextArea
                                    label="Google Maps Embed URL"
                                    placeholder="https://www.google.com/maps/embed?pb=..."
                                    rows={2}
                                    value={settings.contact_map_url_2 || ""}
                                    onChange={(value) => handleChange('contact_map_url_2', value)}
                                    hint="วาง URL embed จาก Google Maps"
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
