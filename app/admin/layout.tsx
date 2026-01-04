import AdminLayoutContent from "@/app/components/layout/AdminLayout";
import AdminProviders from "@/app/components/layout/AdminProviders";
import React from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminProviders>
            <AdminLayoutContent>
                {children}
            </AdminLayoutContent>
        </AdminProviders>
    );
}
