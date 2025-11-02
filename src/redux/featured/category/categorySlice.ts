import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TCategory = {
  name: string;
  slug?: string;
  details: string;
  icon: {
    name: string;
    url: string;
  };
  image: string;
  bannerImg: string;
};

type TCategoryState = {
  categories: TCategory[];
};

const initialState: TCategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    clearCategories: (state) => {
      state.categories = [];
    },
  },
});

export const { setCategories, clearCategories } = categorySlice.actions;

export const selectCategories = (state: RootState) => state.category.categories;

export default categorySlice.reducer;
