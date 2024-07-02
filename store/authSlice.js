import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userData: null,
    didTryAutoLogin: false,
  },
  reducers: {
    authenticate: (state, action) => {
      const {payload} = action;
      state.token = payload.token;
      state.userData = payload.userData;
      state.didTryAutoLogin = true;    
    },
    setDidTryAutoLogin: (state, action) => {
      didTryAutoLogin = true;
    }
  }
})

export const authenticate = authslice.actions.authenticate;
export default authslice.reducer;

