import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  id: 0,
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  isShown: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingCartItem = state.items.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity += newItem.amount;
      state.totalAmount += newItem.price * newItem.amount;
      if (!existingCartItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          name: newItem.name,
          amount: newItem.amount,
          totalAmount: newItem.price * newItem.amount,
        });
      } else {
        existingCartItem.amount += newItem.amount;
        existingCartItem.totalAmount += newItem.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingCartItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.totalAmount -= existingCartItem.price;
      if (existingCartItem.amount === 1) {
        state.items = state.items.filter((item) => item.id !== id);
        existingCartItem.totalAmount -= existingCartItem.price;
      } else {
        existingCartItem.amount--;
        existingCartItem.totalAmount -= existingCartItem.price;
      }
    },
    clearCart() {
      return initialCartState;
    },
    showCart(state) {
      return {
        ...state,
        isShown: true,
      };
    },
    hideCart(state) {
      return {
        ...state,
        isShown: false,
      };
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
