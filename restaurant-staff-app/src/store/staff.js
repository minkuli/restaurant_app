import { createSlice } from "@reduxjs/toolkit";

const initialStaffPerson = {
  name: "",
  role: "",
  isLoggedIn: false,
};

const staffSlice = createSlice({
  name: "person",
  initialState: initialStaffPerson,
  reducers: {
    login(state, action) {
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.isLoggedIn = true;
    },
    logout(state, action) {
      state.isLoggedIn = false;
    },
  },
});

export const staffActions = staffSlice.actions;
export default staffSlice.reducer;
