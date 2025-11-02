/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from "./product";
import { IUser } from "./user";

export interface IAddress {
  type: 'billing' | 'shipping' | string;
  title: string;
  country: string;
  city: string;
  state: string;
  'zip-code': string;
  street: string;
}

export interface IProductInfo {
  price: number;
  salePrice: number;
  quantity: number;
  sku: string;
  width: string;
  height: string;
  length: string;
  isExternal: boolean;
  external: {
    productUrl: string;
    buttonLabel: string;
  };
  status: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProductDescription {
  name: string;
  slug: string;
  unit: string;
  description: string;
  status: string;
}


export interface ICartProductInfo {
  productId:[IProduct];
  quantity: number;
  totalAmount: number;
}

export interface ICartItem {
  userId: string;
  productInfo: ICartProductInfo[];
}

export interface IWishlist {
  userId: string;
  products: IProduct;
  _id: string;
}

export interface IOrderAmount {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  grandTotal: number;
}

export interface IOrderInfo {
  _id: string;
  orderInfo: {
    customerInfo: string;
    shopInfo: string;
    productInfo: string;
    trackingNumber: string;
    status: 'pending' | 'completed' | 'cancelled' | string;
    isCancelled: boolean;
    quantity: number;
    totalAmount: {
      subTotal: number;
      tax: number;
      shipping: {
        name: string;
        type: string;
      };
      discount: number;
      total: number;
    };
    streetAddress: string;
  };
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IOrder {
  totalAmount: IOrderAmount;
  orderInfo: IOrderInfo;
}

export interface ICustomer {
  _id: string;
  userId: IUser;
  address: IAddress[];
  cardInfo: any | null;
  cartItem: ICartItem[];
  wishlist: IWishlist[];
  orders: IOrder[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
