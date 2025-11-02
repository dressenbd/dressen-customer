// redux/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { setupListeners } from "@reduxjs/toolkit/query";

// RTK Query APIs
import { baseApi } from "./api/baseApi"; // your older baseApi

// Reducers
import productReducer from "./featured/product/productSlice";
import categoryReducer from "./featured/category/categorySlice";
import customerReducer from "./featured/customer/customerSlice";
import authReducer from "./featured/auth/authSlice";
import brandReducer from "./featured/brand/brandSlice";
import dashboardReducer from "./featured/dashboard/dashboardSlice";
import faqReducer from "./featured/faq/faqSlice";
import orderReducer from "./featured/order/orderSlice";
import reviewsReducer from "./featured/reviews/reviewsSlice";
import shopReducer from "./featured/shop/shopSlice";
import termsReducer from "./featured/terms/termsSlice";
import usersReducer from "./featured/user/userSlice";
import couponReducer from "./featured/coupons/couponSlice";
import cartReducer from "./featured/cart/cartSlice";
import settingsReducer from "./featured/settings/settingsSlice";

// Persist configuration (only persist cart)
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["cart"],
};

// Combine all reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  category: categoryReducer,
  customer: customerReducer,
  auth: authReducer,
  brand: brandReducer,
  dashboard: dashboardReducer,
  faqs: faqReducer,
  orders: orderReducer,
  reviews: reviewsReducer,
  shops: shopReducer,
  terms: termsReducer,
  users: usersReducer,
  coupon: couponReducer,
  settings: settingsReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Persistor
export const persistor = persistStore(store);

// Setup listeners for RTK Query
setupListeners(store.dispatch);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
