import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { IProduct, IProductsState } from '@/types/product';

const initialState: IProductsState = {
  products: [],
  loading: false,
  error: null,
  singleProduct: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    setSingleProduct: (state, action: PayloadAction<IProduct>) => {
      state.singleProduct = action.payload;
    },
    clearProducts: (state) => { 
      state.products = []; 
    },
  },
});

export const { setProducts, setSingleProduct, clearProducts } = productSlice.actions;

// selectors
export const selectAllProducts = (state: RootState) => state.products.products;
export const selectSingleProduct = (state: RootState) => state.products.singleProduct;

export default productSlice.reducer;