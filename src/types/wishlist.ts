export interface WishlistItem {
  _id: string;
  productId?: string;
}

export interface Product {
  _id: string;
  featuredImg?: string;
  description?: {
    name?: string;
  };
  productInfo?: {
    price?: number;
    salePrice?: number;
  };
}