import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Msg {
  sender: "customer" | "agent" | "ai";
  text: string;
  sentiment?: string;
  createdAt: string;
}

interface ChatState {
  conversationId: string | null;
  messages: Msg[];
  needsHuman: boolean;
  loadingAi: boolean;
}

const initialState: ChatState = {
  conversationId: null,
  messages: [],
  needsHuman: false,
  loadingAi: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversation(state, action: PayloadAction<string>) {
      state.conversationId = action.payload;
      state.messages = [];
      state.needsHuman = false;
    },
    addMessage(state, action: PayloadAction<Msg>) {
      state.messages.push(action.payload);
    },
    setNeedsHuman(state, action: PayloadAction<boolean>) {
      state.needsHuman = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    clearMessages(state) {
      state.messages = [];
    },
    setLoadingAi(state, action: PayloadAction<boolean>) {
      state.loadingAi = action.payload;
    },
    removeLoader(state) {
      state.loadingAi = false;
    },
  },
});

export const {
  setConversation,
  clearMessages,
  addMessage,
  setNeedsHuman,
  setLoadingAi,
  removeLoader,
  setMessages,
} = chatSlice.actions;
export default chatSlice.reducer;
