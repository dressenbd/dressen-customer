/* eslint-disable @typescript-eslint/no-explicit-any */
// redux/featured/reviews/reviewsSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface ReviewState {
  reviews: any[];
}

const initialState: ReviewState = {
  reviews: [],
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
});

export const { setReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
