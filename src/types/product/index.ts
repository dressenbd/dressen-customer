// src/types/product.ts
export type BrandShape = {
  _id?: string;
  name?: string;
  images?: Array<{ layout: string; image: string }>;
  icon?: { name: string; url: string };
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type CategoryShape = {
  _id?: string;
  name?: string;
  slug?: string;
  details?: string;
  icon?: { name: string; url: string };
  image?: string;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type TagShape = {
  _id?: string;
  name?: string;
  slug?: string;
  details?: string;
  icon?: { name: string; url: string };
  image?: string;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export interface IProduct {
  _id: string;
  name?: string;
  image?: string;
  price?: number;
  shopId: string;
  featuredImg: string;
  gallery: string[];
  brandAndCategories: {
    brand: string | { name: string }; // Both string and object supported
    categories: Array<{ name: string }>;
    tags: Array<{ name: string }>;
    subcategory?: string;
  };
  description: {
    name: string;
    slug: string; // Required
    unit: string;
    description: string;
    status: string;
  };
  productType: string;
  productInfo: {
    price: number;
    salePrice: number;
    quantity: number;
    sku: string;
    width: string;
    height: string;
    length: string;
  };
  specifications?: Array<{ key: string; value: string; _id?: string }>;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface RemoteProduct {
  _id: string;
  description?: {
    name?: string;
    slug?: string;
    unit?: string;
    description?: string;
    status?: string;
  };
  productType?: string;
  productInfo?: {
    price?: number;
    salePrice?: number;
    quantity?: number;
    sku?: string;
    width?: string;
    height?: string;
    length?: string;
  };
  shopId?: string;
  featuredImg?: string;
  gallery?: string[];
  brandAndCategories?: {
    brand?: string | { name: string };
    categories?: Array<{ name: string }>;
    tags?: Array<{ name: string }>;
    subcategory?: string;
  };
  specifications?: Array<{ key: string; value: string; _id?: string }>;
}

export interface ProductData {
  _id: string;
  id?: number;
  name: string;
  price: number;
  subtitle?: string;
  image: string;
  slug?: string;
  description?: string;
  category?: string;
  inStock?: boolean;
  rating?: number;
  discount?: number;
}

export interface ProductsResponse {
  data: ProductData[];
  success: boolean;
  message?: string;
}

export interface IProductsState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  singleProduct: IProduct | null;
}