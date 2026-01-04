import React from "react";
import Badge from "@/app/components/ui/badge/Badge";

interface StatusBadgeProps {
    isActive: boolean | number;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ isActive }) => {
    const active = Boolean(isActive);

    return (
        <Badge color={active ? "success" : "light"}>
            {active ? "เปิดใช้งาน" : "ปิดใช้งาน"}
        </Badge>
    );
};
