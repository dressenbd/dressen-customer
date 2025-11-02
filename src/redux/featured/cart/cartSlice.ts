// redux/featured/cart/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

export interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  color?: string;
  size?: string;
  totalAmount: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.totalAmount, 0);
  return { totalItems, totalAmount };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'totalAmount'>>) => {
      const { productId, quantity, unitPrice, ...rest } = action.payload;
      const existingItem = state.items.find(item => item.productId === productId);

      if (existingItem) {
        // Update existing item
        existingItem.quantity += quantity;
        existingItem.totalAmount = existingItem.quantity * existingItem.unitPrice;
      } else {
        // Add new item
        state.items.push({
          productId,
          quantity,
          unitPrice,
          ...rest,
          totalAmount: quantity * unitPrice,
        });
      }

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
      
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.productId === productId);

      if (item && quantity > 0) {
        item.quantity = quantity;
        item.totalAmount = item.quantity * item.unitPrice;

        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalAmount = totals.totalAmount;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },

    // Sync cart from persisted storage on hydration
    hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalItems = (state: RootState) => state.cart.totalItems;
export const selectCartTotalAmount = (state: RootState) => state.cart.totalAmount;
export const selectCartItemByProductId = (productId: string) => (state: RootState) =>
  state.cart.items.find(item => item.productId === productId);

export default cartSlice.reducer;