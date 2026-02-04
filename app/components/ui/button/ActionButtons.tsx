import React from "react";
import Button from "@/app/components/ui/button/Button";
import { Edit, Trash } from "lucide-react";

interface ActionButtonsProps {
    onEdit: () => void;
    onDelete: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => {
    return (
        <div className="flex gap-2">
            <Button
                onClick={onEdit}
                variant="outline"
                size="sm"
                title="แก้ไข"
            >
                <Edit className="w-4 h-4" />
            </Button>
            <Button
                onClick={onDelete}
                variant="danger"
                size="sm"
                title="ลบ"
            >
                <Trash className="w-4 h-4" />
            </Button>
        </div>
    );
};
