// src/utils/order.ts
import type {
  CustomerInfo,
  IOrder,
  OrderInfo,
  OrderLine,
  LineTotals,
} from "@/types/order";

export const toOrderLines = (oi?: OrderInfo): OrderLine[] => {
  if (!oi) return [];
  return Array.isArray(oi) ? oi : [oi];
};

export const displayCustomer = (order: IOrder): string => {
  const raw = order.customerInfo;
  if (typeof raw === "string" && raw.trim()) return raw.trim();
  const c = raw as CustomerInfo | undefined;
  if (!c) return "Customer";
  const name = `${c.firstName ?? ""} ${c.lastName ?? ""}`.trim();
  return name || c.email || "Customer";
};

export const statusLabel = (order: IOrder): string => {
  // Check if order has top-level status (new API structure)
  const orderWithStatus = order as unknown as Record<string, unknown>;
  if (orderWithStatus.status) {
    const status = orderWithStatus.status as string;
    if (status === "completed") return "Delivered";
    if (status === "cancelled") return "Cancelled";
    if (status === "out-for-delivery") return "Out for delivery";
    if (status === "processing") return "Processing";
    if (status === "at-local-facility") return "At local facility";
    if (status === "pending") return "Pending";
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
  
  // Fallback to old structure
  const lines = toOrderLines(order.orderInfo);
  const statuses = lines.map((l) => l.status).filter(Boolean);

  if (!statuses.length) return "Pending";
  if (statuses.every((s) => s === "completed")) return "Delivered";
  if (statuses.some((s) => s === "cancelled")) return "Cancelled";
  if (statuses.some((s) => s === "out-for-delivery")) return "Out for delivery";
  if (statuses.some((s) => s === "processing")) return "Processing";
  if (statuses.some((s) => s === "at-local-facility"))
    return "At local facility";
  return "Pending";
};

export const itemsCount = (order: IOrder): number => {
  // Check if order has totalQuantity (new API structure)
  const orderWithQuantity = order as unknown as Record<string, unknown>;
  if (orderWithQuantity.totalQuantity) {
    return Number(orderWithQuantity.totalQuantity);
  }
  
  // Check if orderInfo is array with items (new API structure)
  if (Array.isArray(order.orderInfo)) {
    return order.orderInfo.reduce((sum: number, item: unknown) => {
      const itemData = item as Record<string, unknown>;
      return sum + Number(itemData.quantity || 1);
    }, 0);
  }
  
  // Fallback to old structure
  return toOrderLines(order.orderInfo).length;
};

export const orderTotal = (order: IOrder): string => {
  let total = 0;
  if (typeof order.totalAmount === "number") {
    total = order.totalAmount;
  } else {
    const t = order.totalAmount as LineTotals | undefined;
    total = t?.total ?? 0;
  }
  return `৳${total.toFixed(2)}`;
};

export const trackingNumber = (order: IOrder): string | undefined => {
  // Check if order has top-level trackingNumber (new API structure)
  const orderWithTracking = order as unknown as Record<string, unknown>;
  if (orderWithTracking.trackingNumber) {
    return String(orderWithTracking.trackingNumber);
  }
  
  // Fallback to old structure
  return toOrderLines(order.orderInfo)[0]?.trackingNumber;
};

export const ymd = (iso?: string): string => {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isFinite(d.getTime())
    ? d.toISOString().slice(0, 10)
    : iso.slice(0, 10);
};

export const statusBadgeClass = (label: string): string => {
  switch (label.toLowerCase()) {
    case "delivered":
    case "completed":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "processing":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "out for delivery":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100";
    case "at local facility":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};
