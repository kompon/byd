import React, { ReactNode } from "react";

// Props for Table
interface TableProps {
    children: ReactNode; // Table content (thead, tbody, etc.)
    className?: string; // Optional className for styling
}

// Props for TableHeader
interface TableHeaderProps {
    children: ReactNode; // Header row(s)
    className?: string; // Optional className for styling
}

// Props for TableBody
interface TableBodyProps {
    children: ReactNode; // Body row(s)
    className?: string; // Optional className for styling
}

// Props for TableRow
interface TableRowProps {
    children: ReactNode; // Cells (th or td)
    className?: string; // Optional className for styling
}

// Props for TableCell
interface TableCellProps {
    children: ReactNode; // Cell content
    isHeader?: boolean; // If true, renders as <th>, otherwise <td>
    className?: string; // Optional className for styling
    colSpan?: number;
}

// Table Component
const Table: React.FC<TableProps> = ({ children, className }) => {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <table className={`min-w-full w-full ${className || ""}`}>{children}</table>
            </div>
        </div>
    );
};

// TableHeader Component
const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
    return <thead className={`border-b border-gray-100 dark:border-gray-800 ${className || ""}`}>{children}</thead>;
};

// TableBody Component
const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
    return <tbody className={className}>{children}</tbody>;
};

// TableRow Component
const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
    return <tr className={className}>{children}</tr>;
};

// TableCell Component
const TableCell: React.FC<TableCellProps> = ({
    children,
    isHeader = false,
    className,
    colSpan
}) => {
    const CellTag = isHeader ? "th" : "td";
    const baseClasses = isHeader
        ? "px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500 dark:text-gray-400"
        : "px-6 py-4 border-b border-gray-100 last:border-b-0 whitespace-nowrap text-gray-700 dark:text-gray-400 dark:border-gray-800";

    return <CellTag colSpan={colSpan} className={`${baseClasses} ${className || ""}`}>{children}</CellTag>;
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
