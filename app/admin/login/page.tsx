"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Card, CardHeader, CardBody } from "@heroui/react";
import { Lock } from "lucide-react";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh(); // Refresh middleware/server state
            } else {
                const data = await res.json();
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black/90 p-4">
            <Card className="w-full max-w-md bg-zinc-900 border border-white/10">
                <CardHeader className="flex gap-3 justify-center pb-0 pt-6">
                    <div className="bg-gold-500/20 p-2 rounded-full">
                        <Lock className="w-6 h-6 text-gold-400" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xl font-bold text-white">Admin Login</p>
                        <p className="text-sm text-gray-400">PRIDE AUTO Management</p>
                    </div>
                </CardHeader>
                <CardBody className="py-8 px-6">
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <Input
                            label="Username"
                            placeholder="Enter your username"
                            variant="bordered"
                            value={username}
                            onValueChange={setUsername}
                            classNames={{
                                inputWrapper: "border-white/20 group-data-[focus=true]:border-gold-400",
                                label: "text-gray-400",
                                input: "text-white",
                            }}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            variant="bordered"
                            value={password}
                            onValueChange={setPassword}
                            classNames={{
                                inputWrapper: "border-white/20 group-data-[focus=true]:border-gold-400",
                                label: "text-gray-400",
                                input: "text-white",
                            }}
                        />
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <Button
                            type="submit"
                            className="bg-gold-500 text-black font-bold shadow-lg shadow-gold-500/20"
                            fullWidth
                        >
                            Login
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}
