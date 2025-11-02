import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { IDashboard, IDashboardState } from '@/types/dashboard';



const initialState: IDashboardState = {
  dashboard: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboard: (state, action: PayloadAction<IDashboard>) => {
      state.dashboard = action.payload;
    }
  },
});

export const { setDashboard } = dashboardSlice.actions;

// selector
export const selectDashboard = (state: RootState) => state.dashboard.dashboard;

export default dashboardSlice.reducer;
