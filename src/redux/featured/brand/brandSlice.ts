import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TBrand = {
  name: string;
  icon: {
    name: string;
    url: string;
  };
  images: {
    layout: "grid" | "slider";
    image: string;
  }[];
};

type TBrandState = {
  brands: TBrand[];
};

const initialState: TBrandState = {
  brands: [],
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    clearBrands: (state) => {
      state.brands = [];
    },
  },
});

export const { setBrands, clearBrands } = brandSlice.actions;

export const selectBrands = (state: RootState) => state.brand.brands;

export default brandSlice.reducer;
