// src/types/order.ts

export type OrderStatus =
  | "pending"
  | "processing"
  | "at-local-facility"
  | "out-for-delivery"
  | "cancelled"
  | "completed";

export type ShippingType = "amount" | "percentage" | "free";

export interface ShippingInfo {
  name: string;
  type: ShippingType;
}

export interface LineTotals {
  subTotal: number;
  tax: number;
  shipping: ShippingInfo;
  discount: number;
  total: number;
}

export interface OrderLine {
  orderBy: string; // user id
  shopInfo: string; // shop id
  productInfo: string; // product id
  trackingNumber: string; // required
  status: OrderStatus;
  isCancelled: boolean;
  quantity: number;
  totalAmount: LineTotals;
  streetAddress?: string;
}

// NOTE: API থেকে কখনও object, কখনও array আসতে পারে
export type OrderInfo = OrderLine | OrderLine[];

export interface CustomerInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

export type CashOn = "cash-on";

// optional structure for card payments
export interface PaymentInfo {
  method?: string;
  cardNumber?: string;
  cvc?: string;
  expireDate?: string;
  nameOnCard?: string;
}

export interface IOrder {
  _id: string;
  orderInfo: OrderInfo;
  customerInfo?: CustomerInfo | string; // কখনও string হতে পারে
  paymentInfo?: PaymentInfo | CashOn;
  // কখনও number (top-level total), কখনও full object আসে
  totalAmount: number | LineTotals;
  trackingNumber?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IOrdersState {
  orders: IOrder[];
  singleOrder: IOrder | null;
}

/** ---------- Client → create payload ---------- */
export interface CreateOrderInput {
  orderInfo: OrderLine[]; // client সবসময় array পাঠাবে
  customerInfo: CustomerInfo; // create করার সময় object দিন, string নয়
  paymentInfo?: PaymentInfo | CashOn; // "cash-on" বা কার্ড অবজেক্ট
  totalAmount: number; // client থেকে top-level number
}
