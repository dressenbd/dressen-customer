/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from "../product";

export interface IShop {
  _id: string;
  vendorId: string | null;
  staffs: string[];
  logo: string;
  coverImage: string;

  basicInfo: {
    name: string;
    slug: string;
    description: string;
  };

  paymentInfo: {
    accountHolderName: string;
    accountHolderEmail: string;
    bankName: string;
    accountNumber: string;
  };

  shopAddress: {
    country: string;
    city: string;
    state: string;
    zip: string;
    streetAddress: string;
  };

  notificationEmail: {
    notificationEmail: string;
    isEnabled: boolean;
  };

  shopSetting: {
    contactNo: string;
    websiteUrl: string;
  };

  shopMaintenanceSetting: {
    image: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
  };

  products: IProduct[];

  orders: any[];
  commissionRate: number;
  currentBalance: number;
  transactions: any[];
  withdrawals: any[];
  attributes: any[];
  status: "active" | "inactive";
  isApproved: boolean;
  coupons: any[];
}

export interface IShopsState {
  shops: IShop[];
  singleShop: IShop | null;
}
