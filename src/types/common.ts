export type Msg = {
  sender: string;
  text: string;
};

export type Chat = {
  id: string;
  name: string;
  messages: Msg[];
  timestamp?: string;
};

export type LoadingState = {
  isLoading: boolean;
  currentChatId?: string;
};
