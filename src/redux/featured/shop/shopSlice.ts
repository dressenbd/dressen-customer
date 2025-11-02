import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { IShop, IShopsState } from '@/types/shop';


const initialState: IShopsState = {
  shops: [],
  singleShop: null,
};

const shopSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {
    setShops: (state, action: PayloadAction<IShop[]>) => {
      state.shops = action.payload;
    },
    setSingleShop: (state, action: PayloadAction<IShop>) => {
      state.singleShop = action.payload;
    }
  },
});

export const { setShops, setSingleShop } = shopSlice.actions;


export const selectAllShops = (state: RootState) => state.shops.shops;
export const selectSingleShop = (state: RootState) => state.shops.singleShop;

export default shopSlice.reducer;
