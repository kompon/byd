"use client";

import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";

import { Toaster } from "sonner";
import { LanguageProvider } from "@/app/context/LanguageContext";

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <LanguageProvider>
            <HeroUIProvider navigate={router.push}>
                <Toaster richColors position="top-right" theme="dark" />
                {children}
            </HeroUIProvider>
        </LanguageProvider>
    );
}
