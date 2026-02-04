import React, { InputHTMLAttributes, forwardRef } from "react";
import { AlertCircle } from "lucide-react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    fullWidth?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ label, error, hint, fullWidth = true, className = "", ...props }, ref) => {
        return (
            <div className={`${fullWidth ? "w-full" : "w-auto"} flex flex-col gap-1.5`}>
                {label && (
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}

                <div className="relative">
                    <input
                        ref={ref}
                        className={`
              w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-200
              placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed
              ${error
                                ? "border-red-500 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900/30"
                                : "border-slate-200 dark:border-slate-700 focus:border-brand-500 focus:ring-brand-100 dark:focus:ring-brand-900/30 hover:border-slate-300 dark:hover:border-slate-600"
                            }
              ${className}
            `}
                        {...props}
                    />
                </div>

                {hint && !error && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
                )}

                {error && (
                    <div className="flex items-center gap-1.5 text-red-500 text-xs mt-0.5 animate-in slide-in-from-top-1 fade-in duration-200">
                        <AlertCircle size={12} />
                        <span>{error}</span>
                    </div>
                )}
            </div>
        );
    }
);

InputField.displayName = "InputField";

export default InputField;
