import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    options: Option[];
    placeholder?: string;
    onChange: (value: string) => void;
    className?: string;
    defaultValue?: string;
    value?: string;
    label?: string;
}

const Select: React.FC<SelectProps> = ({
    options,
    placeholder = "Select an option",
    onChange,
    className = "",
    defaultValue = "",
    value,
    label,
}) => {
    const [selectedValue, setSelectedValue] = useState<string>(value || defaultValue);

    useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value);
        } else {
            setSelectedValue(defaultValue);
        }
    }, [value, defaultValue]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedValue(value);
        onChange(value);
    };

    return (
        <div className="relative w-full">
            {label && <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
            <div className="relative">
                <select
                    className={`h-12 w-full appearance-none rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pr-12 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-500 dark:focus:border-brand-primary [&::-ms-expand]:hidden ${selectedValue
                        ? "text-gray-800 dark:text-white"
                        : "text-gray-400 dark:text-gray-500"
                        } ${className}`}
                    style={{
                        backgroundImage: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none'
                    }}
                    value={selectedValue}
                    onChange={handleChange}
                >
                    <option value="" disabled className="text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                        {placeholder}
                    </option>
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            className="text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 py-2"
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
            </div>
        </div>
    );
};

export default Select;
