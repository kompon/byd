"use client";

import { Button, Input, Textarea, Card, CardBody } from "@heroui/react";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";

export default function ContactSettingsPage() {
    const [settings, setSettings] = useState({
        contact_address: "",
        contact_phone: "",
        contact_email: "",
        contact_line: "",
        contact_facebook: "",
        contact_twitter: "",
        contact_instagram: "",
        contact_map_url: ""
    });
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                setSettings({
                    contact_address: data.contact_address || "",
                    contact_phone: data.contact_phone || "",
                    contact_email: data.contact_email || "",
                    contact_line: data.contact_line || "",
                    contact_facebook: data.contact_facebook || "",
                    contact_twitter: data.contact_twitter || "",
                    contact_instagram: data.contact_instagram || "",
                    contact_map_url: data.contact_map_url || ""
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
                toast.success("Contact settings saved!");
            }
        } catch (error) {
            console.error("Error saving settings:", error);
            toast.error("Failed to save settings.");
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                Contact Settings
            </h1>

            <Card className="bg-white border border-gray-200 shadow-sm p-6">
                <CardBody className="flex flex-col gap-6">

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-gray-100 pb-2">General Information</h3>
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <Textarea
                                label="Address"
                                placeholder="Enter full address"
                                variant="bordered"
                                value={settings.contact_address}
                                onValueChange={(v) => setSettings({ ...settings, contact_address: v })}
                            />
                        </div>

                        <Input
                            label="Phone Number"
                            placeholder="e.g. 02-123-4567"
                            variant="bordered"
                            value={settings.contact_phone}
                            onValueChange={(v) => setSettings({ ...settings, contact_phone: v })}
                        />
                        <Input
                            label="Email"
                            placeholder="e.g. contact@example.com"
                            variant="bordered"
                            value={settings.contact_email}
                            onValueChange={(v) => setSettings({ ...settings, contact_email: v })}
                        />
                        <Input
                            label="LINE ID"
                            placeholder="e.g. @prideauto"
                            variant="bordered"
                            value={settings.contact_line}
                            onValueChange={(v) => setSettings({ ...settings, contact_line: v })}
                        />
                    </div>

                    {/* Social Media */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-gray-100 pb-2">Social Media & Map</h3>
                        </div>

                        <Input
                            label="Facebook URL"
                            placeholder="https://facebook.com/..."
                            variant="bordered"
                            value={settings.contact_facebook}
                            onValueChange={(v) => setSettings({ ...settings, contact_facebook: v })}
                        />
                        <Input
                            label="Instagram URL"
                            placeholder="https://instagram.com/..."
                            variant="bordered"
                            value={settings.contact_instagram}
                            onValueChange={(v) => setSettings({ ...settings, contact_instagram: v })}
                        />
                        <Input
                            label="Twitter/X URL"
                            placeholder="https://twitter.com/..."
                            variant="bordered"
                            value={settings.contact_twitter}
                            onValueChange={(v) => setSettings({ ...settings, contact_twitter: v })}
                        />
                        <Input
                            label="Google Maps Embed URL"
                            placeholder="https://www.google.com/maps/embed?..."
                            variant="bordered"
                            value={settings.contact_map_url}
                            onValueChange={(v) => setSettings({ ...settings, contact_map_url: v })}
                        />
                        <div className="col-span-1 md:col-span-2">
                            <p className="text-xs text-gray-500">For Google Maps, go to Google Maps {'>'} Share {'>'} Embed a map {'>'} Copy HTML {'>'} Paste only the src URL here.</p>
                        </div>
                    </div>


                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <Button
                            className="bg-gold-500 text-black font-bold px-8"
                            startContent={<Save size={20} />}
                            isLoading={loading}
                            onPress={handleSave}
                        >
                            Save Settings
                        </Button>
                    </div>

                </CardBody>
            </Card>
        </div>
    );
}
