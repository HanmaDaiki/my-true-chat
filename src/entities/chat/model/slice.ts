import { createSlice } from '@reduxjs/toolkit';
import { ChatState } from './types';

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    updateMessage: (state, action) => {
      if (action.payload.text) {
        state.messages[state.messages.length - 1] = {
          owner: action.payload.owner,
          text: `${state.messages[state.messages.length - 1].text}${action.payload.text}`,
        };
      }
    },
  },
});

export const { addMessage, updateMessage } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
export const selectMessages = (state: RootState) => state.chat.messages;
