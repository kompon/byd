import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode; // Button text or content
    size?: "sm" | "md" | "lg"; // Button size
    variant?: "primary" | "outline" | "danger" | "ghost" | "gradient"; // Button variant
    startIcon?: ReactNode; // Icon before the text
    endIcon?: ReactNode; // Icon after the text
}

const Button: React.FC<ButtonProps> = ({
    children,
    size = "md",
    variant = "primary",
    startIcon,
    endIcon,
    className = "",
    disabled = false,
    ...props
}) => {
    // Size Classes
    const sizeClasses = {
        sm: "px-4 py-3 text-sm",
        md: "px-5 py-3.5 text-sm",
        lg: "px-6 py-4 text-base",
    };

    // Variant Classes
    const variantClasses = {
        primary:
            "bg-blue-600 text-white shadow-lg hover:bg-blue-700 disabled:bg-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:shadow-blue-500/20",
        outline:
            "bg-white text-gray-700 ring-2 ring-inset ring-gray-300 hover:bg-gray-50 shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:ring-gray-500 dark:hover:bg-gray-600 dark:hover:ring-gray-400",
        danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg dark:bg-red-500 dark:hover:bg-red-600",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white",
        gradient: "bg-gradient-to-r from-brand-primary to-blue-600 text-white shadow-xl shadow-brand-primary/30 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300",
    };

    return (
        <button
            className={`inline-flex items-center justify-center font-medium gap-2 rounded-lg transition ${className} ${sizeClasses[size]
                } ${variantClasses[variant]} ${disabled ? "cursor-not-allowed opacity-50" : ""
                }`}
            disabled={disabled}
            {...props}
        >
            {startIcon && <span className="flex items-center">{startIcon}</span>}
            {children}
            {endIcon && <span className="flex items-center">{endIcon}</span>}
        </button>
    );
};

export default Button;
