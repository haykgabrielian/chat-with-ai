export type Msg = {
  sender: string;
  text: string;
  id: string;
};

export type Chat = {
  id: string;
  name: string;
  messages: Msg[];
  timestamp?: string;
  pinned: boolean;
};

export type LoadingState = {
  isLoading: boolean;
  currentChatId?: string;
  isStreaming?: boolean;
};
