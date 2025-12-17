"use client";
import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, MoreVertical } from "lucide-react";

export type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  align?: "left" | "right" | "center";
  format?: "currency" | "date";
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T extends { id: string }> = {
  rows: T[];
  columns: Column<T>[];
  loading?: boolean;
};

export default function DataTable<T extends { id: string }>({
  rows,
  columns,
  loading = false,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return rows;

    return [...rows].sort((a, b) => {
      const aVal = a[sortConfig.key!];
      const bVal = b[sortConfig.key!];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, sortConfig]);

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const formatValue = (value: any, format?: string) => {
    if (format === "currency") {
      const num = Number(value);
      return isNaN(num) ? "-" : `₹${num.toLocaleString()}`;
    }
    if (format === "date") {
      const d = new Date(value);
      return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
    }
    return value;
  };

  if (loading) {
    return <div className="py-10 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="border rounded-md overflow-x-auto bg-white">
      <table className="w-full min-w-[640px]">
        <thead className="bg-gray-50 border-b">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`px-4 py-3 text-sm font-medium text-gray-700 ${
                  col.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {col.sortable ? (
                  <button
                    onClick={() => handleSort(col.key)}
                    className="flex items-center gap-2"
                  >
                    {col.label}
                    {sortConfig.key === col.key &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
            <th />
          </tr>
        </thead>

        <tbody>
          {sortedData.length ? (
            sortedData.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={`px-4 py-3 text-sm ${
                      col.align === "right" ? "text-right" : "text-left"
                    }`}
                  >
                    {col.render
                      ? col.render(row)
                      : formatValue(row[col.key], col.format)}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <MoreVertical className="w-4 h-4" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="py-10 text-center text-gray-500"
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
