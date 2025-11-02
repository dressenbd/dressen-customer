"use client"
import React from "react";

type OrderStatus = "Delivered" | "Cancelled" | "Processing";

interface Order {
  id: string;
  items: number;
  status: OrderStatus;
  date: string;
  total: string;
}

const ORDERS: Order[] = [
  { id: "#ORD-12345", items: 34, status: "Delivered", date: "2023-09-28", total: "$249.97" },
  { id: "#ORD-12346", items: 26, status: "Cancelled", date: "2023-09-28", total: "$249.97" },
  { id: "#ORD-12345", items: 45, status: "Processing", date: "2023-09-28", total: "$249.97" },
  { id: "#ORD-12345", items: 87, status: "Processing", date: "2023-09-28", total: "$249.97" },
  { id: "#ORD-12345", items: 22, status: "Delivered", date: "2023-09-28", total: "$249.97" },
];

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

function StatusPill({ status }: { status: OrderStatus }) {
  const base = "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium";
  const dot = "h-2 w-2 rounded-full";

  const map: Record<OrderStatus, { wrap: string; dot: string }> = {
    Delivered: { wrap: "bg-green-100 text-green-700", dot: "bg-green-500" },
    Cancelled: { wrap: "bg-red-100 text-red-600", dot: "bg-red-500" },
    Processing: { wrap: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
  };

  return (
    <span className={cx(base, map[status].wrap)}>
      <span className={cx(dot, map[status].dot)} />
      {status}
    </span>
  );
}

const OrdersTable: React.FC = () => {
  return (
    <div className="mt-6 overflow-hidden rounded-xl bg-white shadow">
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-6 py-3 text-sm font-medium">Order ID</th>
            <th className="px-6 py-3 text-sm font-medium">Items</th>
            <th className="px-6 py-3 text-sm font-medium">Status</th>
            <th className="px-6 py-3 text-sm font-medium">Date</th>
            <th className="px-6 py-3 text-sm font-medium">Total</th>
            <th className="px-6 py-3 text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ORDERS.map((order, i) => (
            <tr key={`${order.id}-${i}`} className="border-t">
              <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
              <td className="px-6 py-4 text-gray-700">{order.items}</td>
              <td className="px-6 py-4">
                <StatusPill status={order.status} />
              </td>
              <td className="px-6 py-4 text-gray-700">{order.date}</td>
              <td className="px-6 py-4 text-gray-700">{order.total}</td>
              <td className="px-6 py-4">
                <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-[#2e2e2e] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;