"use client";
import DataTable from "@/components/DataTable/Datatable";
import { useEffect, useState } from "react";
export type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  align?: "left" | "right" | "center";
  format?: "currency" | "date";
  render?: (row: T) => React.ReactNode;
};

export type TicketRow = {
  id: string;
  userEmail: string;
  planName: string;
  date: string;
  timeSlot: string;
  numberOfPeople: number;
  pricePerPerson: number;
  totalPrice: number;
  ticketNumber: string;
  status: string;
  delivery: {
    email: { sent: boolean; attempts: number };
    whatsapp: { sent: boolean; attempts: number };
  };
  createdAt: string;
};

export const ticketColumns: Column<TicketRow>[] = [
  {
    key: "ticketNumber",
    label: "Ticket #",
    sortable: true,
  },
  {
    key: "userEmail",
    label: "User Email",
    sortable: true,
  },
  {
    key: "planName",
    label: "Plan",
  },
  {
    key: "date",
    label: "Date",
    format: "date",
  },
  {
    key: "timeSlot",
    label: "Time Slot",
  },
  {
    key: "numberOfPeople",
    label: "People",
    align: "center",
  },
  {
    key: "pricePerPerson",
    label: "Price / Person",
    align: "right",
    format: "currency",
  },
  {
    key: "totalPrice",
    label: "Total",
    align: "right",
    format: "currency",
  },
  {
    key: "status",
    label: "Status",
    render: (row: any) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          row.status === "confirmed"
            ? "bg-green-100 text-green-700"
            : row.status === "cancelled"
            ? "bg-red-100 text-red-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "delivery",
    label: "Delivery",
    render: (row: any) => (
      <div className="text-xs space-y-1">
        <div
          className={
            row.delivery.email.sent ? "text-green-600" : "text-red-500"
          }
        >
          📧 Email: {row.delivery.email.sent ? "Sent" : "Pending"}
        </div>
        <div
          className={
            row.delivery.whatsapp.sent ? "text-green-600" : "text-red-500"
          }
        >
          📱 WhatsApp: {row.delivery.whatsapp.sent ? "Sent" : "Pending"}
        </div>
      </div>
    ),
  },
  {
    key: "createdAt",
    label: "Booked At",
    format: "date",
  },
];

// app/dashboard/tickets/page.tsx
export default function TicketsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("/api/auth/admin/tickets");
        const json = await res.json();

        if (json.success) {
          const formatted = json.data.map((ticket: any) => ({
            id: ticket._id,

            // text fields
            ticketNumber: ticket.ticketNumber,
            userEmail: ticket.userEmail,
            planName: ticket.planName,
            timeSlot: ticket.timeSlot,
            status: ticket.status,

            // numbers
            numberOfPeople: ticket.numberOfPeople,
            pricePerPerson: ticket.pricePerPerson,
            totalPrice: ticket.totalPrice,

            // dates (ISO strings are OK)
            date: ticket.date,
            createdAt: ticket.createdAt,

            // nested
            delivery: ticket.delivery,
          }));

          setRows(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch tickets", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tickets Management</h1>
      <p>
        This is where you'll display the list of support tickets, filters, and
        actions (e.g., Open, Closed, Assigned).
      </p>
      {/* Example: A data table component for tickets goes here */}
      <DataTable rows={rows} loading={loading} columns={ticketColumns} />
    </div>
  );
}
