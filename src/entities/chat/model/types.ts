export interface Message {
  name: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
}

export interface ChatState {
  messages: Message[];
}
