import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { ICustomer, ICartProductInfo } from "@/types/customer";

// ---- ICartProductInfo কে extend করে শুধু productId ফ্লেক্সিবল করি ----
type WithFlexIds = ICartProductInfo & {
  productId?: Array<string | { _id?: string }>;
};

type CartBucket = { productInfo: WithFlexIds[] };

type TCustomerState = {
  customer: ICustomer | null;
};

const initialState: TCustomerState = {
  customer: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<ICustomer>) => {
      state.customer = action.payload;
    },
    clearCustomer: (state) => {
      state.customer = null;
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ productId: string; type: "inc" | "dec" }>
    ) => {
      // customer.cartItem[0].productInfo কে WithFlexIds[] হিসেবে ট্রিট করছি
      const c = state.customer as (ICustomer & { cartItem?: CartBucket[] }) | null;
      const bucket = c?.cartItem?.[0];
      const list = bucket?.productInfo;

      if (!c || !bucket || !Array.isArray(list)) return;

      const { productId, type } = action.payload;

      bucket.productInfo = list.map((item) => {
        const ids = (item.productId ?? []).map((p) =>
          typeof p === "string" ? p : p?._id
        );

        if (ids.includes(productId)) {
          const q = typeof item.quantity === "number" ? item.quantity : 0;
          const newQuantity = type === "inc" ? q + 1 : Math.max(q - 1, 1);

          // totalAmount যদি থাকে থাকবে—আমরা কেবল quantity আপডেট করছি
          // (যদি তোমার লজিকে totalAmount পুনঃগণনা দরকার হয়, নিচে কমেন্ট দেখো)
          const updated: WithFlexIds = { ...item, quantity: newQuantity };
          return updated;
        }
        return item;
      });
    },
  },
});

export const { setCustomer, clearCustomer, updateCartItemQuantity } =
  customerSlice.actions;

/** পুরো কাস্টমার (null হলে null) */
export const selectCustomer = (state: RootState) =>
  state.customer?.customer ?? null;

/** কার্ট কাউন্ট — implicit any ছাড়াই */
export const selectCartCount = (state: RootState): number => {
  const bucket = (state.customer?.customer as (ICustomer & { cartItem?: CartBucket[] }) | null)
    ?.cartItem?.[0];

  const items: WithFlexIds[] = Array.isArray(bucket?.productInfo)
    ? bucket!.productInfo
    : [];

  return items.reduce<number>(
    (sum, it) => sum + (typeof it.quantity === "number" ? it.quantity : 0),
    0
  );
};

export default customerSlice.reducer;
