import { RootState } from "@/redux/store";
import { IUser } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IUsersState = {
  users: IUser[];
  singleUser: IUser | null;
};

const initialState: IUsersState = {
  users: [],
  singleUser: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    setSingleUser: (state, action: PayloadAction<IUser>) => {
      state.singleUser = action.payload;
    },
  },
});

export const { setUsers, setSingleUser } = usersSlice.actions;

// FIX: 'user' নয়, 'users' ব্যবহার করুন (slice name অনুযায়ী)
export const selectAllUsers = (state: RootState) => state.users.users;
export const selectSingleUsers = (state: RootState) => state.users.singleUser;

export default usersSlice.reducer;