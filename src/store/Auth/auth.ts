import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState, TUser } from './types';
import { updateUserThunk } from './thunks/updateUserThunk';

const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('c_b_token');
    },
  },
  extraReducers: builder => {
    builder.addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
