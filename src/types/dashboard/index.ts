/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOrder } from '../order';
import { IProduct } from '../product';

export interface IDashboard {
  _id: string;
  summary: ISummary;
  orderStatus: IOrderStatus;
  recentOrders: IOrder[];
  salesHistory: ISalesHistory[];
  popularProducts: IProduct[];
  lowStockProducts: IProduct[];
  topCategoryWithProducts: ITopCategoryWithProducts[];
  withdrawals: IWithdrawal[];
  attributes: IAttribute[];
  taxes: ITax[];
  shippings: IShipping[];
  orders: IOrder[];
  transactions: any[];
  faqs: IFaq[];
  users: IUser[];
  vendors: IVendor[];
  customers: ICustomer[];
  coupons: ICoupon[];
  createdAt: string;
  updatedAt: string;
}

export interface IDashboardState {
  dashboard: IDashboard | null;
}

export interface ISummary {
  _id: string;
  totalRevenue: number;
  orders: number;
  vendors: number;
  shops: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderStatus {
  _id: string;
  statusOf: 'daily' | 'weekly' | 'monthly';
  pending: number;
  processing: number;
  completed: number;
  cancelled: number;
  createdAt: string;
  updatedAt: string;
}

export interface ISalesHistory {
  _id: string;
  history: {
    sales: number;
    month: string; // ISO date string
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface ITopCategoryWithProducts {
  categoryId: string;
  categoryName: string;
  shop: string;
  totalProducts: number;
}

export interface IWithdrawal {
  _id: string;
  shopId: string;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'approved' | 'rejected';
  description: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAttribute {
  _id: string;
  name: string;
  slug: string;
  attributes: {
    value: string;
    meta: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface ITax {
  _id: string;
  name: string;
  taxRate: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  createdAt: string;
  updatedAt: string;
}

export interface IShipping {
  _id: string;
  name: string;
  type: 'amount' | 'percentage';
  amount: number;
  global: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFaq {
  _id: string;
  title: string;
  description: string;
  type: 'global' | 'shop' | 'product';
  issuedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  socials: string[];
  cardInfo: null | any;
  name: string;
  email: string;
  password: string;
  role: 'super-admin' | 'admin' | 'vendor' | 'customer';
  gender: 'male' | 'female' | 'other';
  contactNo: string;
  bio: string;
  status: 'active' | 'inactive' | 'banned';
  walletPoint: number;
  createdAt: string;
  updatedAt: string;
}

export interface IVendor {
  _id: string;
  userId: string;
  shops: string;
  shopTransfer: string[];
  messages: string[];
  storeNotices: string[];
  summery: {
    totalRevenue: number;
    todaysRevenue: number;
    todaysRefund: number;
    totalShop: number;
  };
  orderStatus: {
    pending: number;
    processing: number;
    completed: number;
    cancelled: number;
  };
  salesHistory: {
    totalSales: number;
    months: string;
  };
  topCategoryByProducts: ITopCategoryWithProducts[];
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface ICustomer {
  _id: string;
  userId: string;
  address: {
    type: 'billing' | 'shipping';
    title: string;
    country: string;
    city: string;
    state: string;
    'zip-code': string;
    street: string;
  }[];
  cardInfo: null | any;
  cartItem: {
    userId: string;
    productId: string[];
  }[];
  wishlist: {
    userId: string;
    products: string;
    _id: string;
  }[];
  orders: {
    totalAmount: {
      subtotal: number;
      discount: number;
      tax: number;
      shipping: number;
      grandTotal: number;
    };
    orderInfo: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface ICoupon {
  _id: string;
  image: string;
  code: string;
  description: string;
  type: 'percentage' | 'amount';
  discountAmount: number;
  isVerifiedCustomer: boolean;
  isApproved: boolean;
  activeDate: string;
  expireDate: string;
  createdAt: string;
  updatedAt: string;
}
