"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/button/Button";
import Input from "@/app/components/form/input/InputField";
import { Card, CardBody, CardHeader } from "@/app/components/ui/card/Card";
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="w-full max-w-sm">
                <Card className="shadow-theme-xl">
                    <CardHeader className="flex flex-col gap-3 justify-center text-center pb-2 pt-6">
                        <div className="bg-brand-50 p-3 rounded-full dark:bg-brand-500/10 mb-2">
                            <Lock className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xl font-bold text-gray-800 dark:text-white">Admin Login</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">PRIDE AUTO Management</p>
                        </div>
                    </CardHeader>
                    <CardBody className="py-6 px-4">
                        <form onSubmit={handleLogin} className="flex flex-col gap-5">
                            <Input
                                type="text"
                                label="Username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && <p className="text-error-500 text-sm text-center">{error}</p>}
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                            >
                                Login
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
