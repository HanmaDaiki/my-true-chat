import { createSlice } from '@reduxjs/toolkit';
import { ChatState, Message } from './types';

const initialState: ChatState = {
  messages: [],
};

// #TODO: mb rename to 'messagesSlice'
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: { payload: Message }) => {
      state.messages.push(action.payload);
    },
    updateMessage: (state, action: { payload: Message }) => {
      if (action.payload.text) {
        state.messages[state.messages.length - 1] = {
          role: action.payload.role,
          text: `${state.messages[state.messages.length - 1].text}${action.payload.text}`,
          name: action.payload.name,
        };
      }
    },

    clearChat: (state) => {
      state.messages = [];
    }
  },
});

export const { addMessage, updateMessage, clearChat } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
export const selectMessages = (state: RootState) => state.chat.messages;
