export interface Message {
  owner: 'user' | 'bot';
  text: string;
}

export interface ChatState {
  messages: Message[];
}
