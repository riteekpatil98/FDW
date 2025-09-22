import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: [],
  reducers: {
    AddItem: (state, action) => {
      const existItem = state.find((item) => item.id == action.payload.id);

      if (existItem) {
        return state.map((item) =>
          item.id == action.payload.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        state.push(action.payload);
      }
    },
    RemoveItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    IncrementQty: (state, action) => {
      return state.map((item) =>
        item.id == action.payload.id ? { ...item, qty: item.qty + 1 } : item
      );
    },
    DecrementQty: (state, action) => {
      return state.map((item) =>
        item.id == action.payload.id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      );
    },
  },
});

export const { AddItem, RemoveItem, IncrementQty, DecrementQty } =
  cardSlice.actions;
export default cardSlice.reducer;
