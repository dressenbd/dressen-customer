import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TCoupon = {
  _id: string;
  code: string;
  description: string;
  type: "free-shipping" | "percentage" | "fixed";
  discountAmount: number;
  minimumPurchaseAmount: number;
  isVerifiedCustomer?: boolean;
  isApproved?: boolean;
  expireDate: string;
  createdAt?: string;
  updatedAt?: string;
};

type TCouponState = {
  coupons: TCoupon[];
};

const initialState: TCouponState = {
  coupons: [],
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCoupons: (state, action: PayloadAction<TCoupon[]>) => {
      state.coupons = action.payload;
    },
    clearCoupons: (state) => {
      state.coupons = [];
    },
  },
});

export const { setCoupons, clearCoupons } = couponSlice.actions;

// TYPE-SAFE SELECTOR
export const selectCoupons = (state: RootState) => {
  return state.coupon && 'coupons' in state.coupon ? state.coupon.coupons : [];
};

export default couponSlice.reducer;