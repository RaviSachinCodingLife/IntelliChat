import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Msg {
  sender: "customer" | "agent" | "ai";
  text: string;
  sentiment?: string;
}

interface ChatState {
  conversationId: string | null;
  messages: Msg[];
  needsHuman: boolean;
}

const initialState: ChatState = {
  conversationId: null,
  messages: [],
  needsHuman: false,
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
  },
});

export const { setConversation, addMessage, setNeedsHuman } = chatSlice.actions;
export default chatSlice.reducer;
