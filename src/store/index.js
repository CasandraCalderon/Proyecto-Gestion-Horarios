import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin(state) {
      state.isAuth = true;
    },

    setLogout(state) {
      state.isAuth = false;
    },

    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

const store = configureStore({ reducer: authSlice.reducer });

export const authActions = authSlice.actions;

export default store;
