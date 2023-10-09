import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from '@entities/theme';
import { sessionReducer } from '@entities/session';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    session: sessionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
