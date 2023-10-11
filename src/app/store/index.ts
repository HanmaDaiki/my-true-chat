import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from '@entities/theme';
import { sessionReducer } from '@entities/session';
import { chatReducer } from '@entities/chat';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    session: sessionReducer,
    chat: chatReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
