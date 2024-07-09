import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    // nhận vào stay hien tai va update bang payload
    login: (state, actions) => {
      // console.log("oke")
      state = actions.payload;
      console.log("login", actions.payload);
      return state;
    },
    logout: () => {
      localStorage.removeItem("token");
      return null;
    },
    refreshBalance: (state, actions) => {
      state.wallet.balance = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, refreshBalance } = counterSlice.actions;
export const selectUser = (store) => store.user;
export default counterSlice.reducer;
