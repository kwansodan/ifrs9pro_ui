import { createSlice } from "@reduxjs/toolkit";
import { getUserSession } from "../../utility";
import { IUser, IUserState } from "../../interfaces";

const initialState: IUserState = {
  user: <IUser>getUserSession(),
};

const userSlice: any = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = undefined;
      localStorage.removeItem("u_token");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
