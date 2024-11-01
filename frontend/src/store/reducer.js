import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  orderId: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeTotalPrice: (state, action) => {
      const { subtotal, operation } = action.payload;
      state.totalPrice += subtotal * operation;
    },

    resetTotalPrice: (state) => {
      state.totalPrice = 0;
    },

    storeOrderID: (state, action) => {
      state.orderId = action.payload;
    },
  },
});

export const { changeTotalPrice, storeOrderID, resetTotalPrice } =
  cartSlice.actions;
export default cartSlice.reducer;
