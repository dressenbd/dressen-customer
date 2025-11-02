import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISettings } from "./settingsApi";

interface SettingsState {
  settings: ISettings | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  settings: null,
  isLoading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<ISettings>) => {
      state.settings = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearSettings: (state) => {
      state.settings = null;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const { setSettings, setLoading, setError, clearSettings } = settingsSlice.actions;
export default settingsSlice.reducer;