import { createSlice } from '@reduxjs/toolkit';
import { SessionState } from './types';

const initialState: SessionState = {
  isAuthenticated: false,
  sessionId: -1,
  username: '',
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login: (state, action: { payload: SessionState }) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.sessionId = action.payload.sessionId;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.sessionId = -1;
      state.username = '';
    },
  },
});

export const { login, logout } = sessionSlice.actions;
export const selectSession = (state: RootState) => state.session;
export const sessionReducer = sessionSlice.reducer;
