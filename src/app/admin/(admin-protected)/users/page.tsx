"use client";
import { useEffect, useState } from "react";

import DataTable, { Column } from "@/components/DataTable/Datatable";
// types/user.ts
export type UserRow = {
  id: string;
  email: string;
  role: "user" | "admin" | "superadmin";
  status: "active" | "disabled";
  createdAt: string;
};

export const userColumns: Column<UserRow>[] = [
  {
    key: "email",
    label: "Email",
    sortable: true,
  },
  {
    key: "role",
    label: "Role",
    sortable: true,
    render: (row) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          row.role === "superadmin"
            ? "bg-purple-100 text-purple-700"
            : row.role === "admin"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {row.role}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (row) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          row.status === "active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "createdAt",
    label: "Created At",
    format: "date",
    sortable: true,
  },
];
// app/dashboard/users/page.tsx
export default function UsersPage() {
  const [userRows, setRows] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/auth/admin/users");
      const json = await res.json();

      if (json.success) {
        setRows(
          json.data.map((user: any) => ({
            id: user._id,
            email: user.email,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt,
          }))
        );
        setLoading(false)
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Users Management</h1>
      <p>This is where you'll manage user accounts, roles, and permissions.</p>
      {/* Example: A data table component for users goes here */}
      <DataTable<UserRow>
        columns={userColumns}
        rows={userRows}
        loading={loading}
      />
    </div>
  );
}
