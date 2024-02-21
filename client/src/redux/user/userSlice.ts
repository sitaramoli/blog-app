import {createSlice} from "@reduxjs/toolkit";

interface UserSlice {
  currentUser?: string;
  loading: boolean;
  error?: string;
}

const initialState: UserSlice = {
  currentUser: "",
  loading: false,
  error: ""
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.currentUser = "";
      state.loading = true;
      state.error = "";
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.currentUser = action.payload;
    },
    signInFailure: (state, action) => {
      state.currentUser = "";
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;
export default userSlice.reducer;