"use client";
import React, { useState, useEffect } from "react";

interface SwitchProps {
    label: string;
    checked?: boolean; // Controlled state
    defaultChecked?: boolean; // Uncontrolled state
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    color?: "brand" | "gray"; // Changed blue to brand to match other components
}

const Switch: React.FC<SwitchProps> = ({
    label,
    checked,
    defaultChecked = false,
    disabled = false,
    onChange,
    color = "brand",
}) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);

    const isChecked = checked !== undefined ? checked : internalChecked;

    useEffect(() => {
        if (checked !== undefined) {
            setInternalChecked(checked);
        }
    }, [checked]);

    const handleToggle = () => {
        if (disabled) return;
        const newCheckedState = !isChecked;
        if (checked === undefined) {
            setInternalChecked(newCheckedState);
        }
        if (onChange) {
            onChange(newCheckedState);
        }
    };

    const switchColors =
        color === "brand"
            ? {
                background: isChecked
                    ? "bg-blue-600 dark:bg-blue-500"
                    : "bg-gray-300 dark:bg-gray-600",
                knob: isChecked
                    ? "translate-x-full bg-white shadow-lg"
                    : "translate-x-0 bg-white shadow-md",
            }
            : {
                background: isChecked
                    ? "bg-gray-800 dark:bg-gray-500"
                    : "bg-gray-300 dark:bg-gray-600",
                knob: isChecked
                    ? "translate-x-full bg-white shadow-lg"
                    : "translate-x-0 bg-white shadow-md",
            };

    return (
        <label
            className={`flex cursor-pointer select-none items-center gap-3 text-sm font-medium ${disabled ? "text-gray-400 dark:text-gray-500" : "text-gray-700 dark:text-gray-200"
                }`}
            onClick={(e) => {
                e.preventDefault(); // Prevent default label behavior to handle custom logic
                handleToggle();
            }}
        >
            <div className="relative">
                <div
                    className={`block transition duration-150 ease-linear h-6 w-11 rounded-full ${disabled
                        ? "bg-gray-100 pointer-events-none dark:bg-gray-700"
                        : switchColors.background
                        }`}
                ></div>
                <div
                    className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full duration-150 ease-linear transform ${switchColors.knob}`}
                ></div>
            </div>
            {label}
        </label>
    );
};

export default Switch;
