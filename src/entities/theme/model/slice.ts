import { createSlice } from '@reduxjs/toolkit';

import { Theme, ThemeState } from './types';

const initialState: ThemeState = {
  currentTheme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: { payload: Theme }) => {
      state.currentTheme = action.payload;
    },
  },
});

export const selectCurrentTheme = (state: RootState) => state.theme.currentTheme;
export const { changeTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
