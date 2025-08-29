import { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  addMessage,
  removeLoader,
  setLoadingAi,
  setMessages,
  setNeedsHuman,
} from "../redux/chatSlice";
import MessageBubble from "./MessageBubble";
import QuickReplies from "./QuickReplies";
import SendIcon from "@mui/icons-material/Send";
import "../assets/css/loader.css";

export default function ChatBox() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token)!;
  const conversationId = useAppSelector((s) => s.chat.conversationId)!;
  const messages = useAppSelector((s) => s.chat.messages);
  const needsHuman = useAppSelector((s) => s.chat.needsHuman);
  const loadingAi = useAppSelector((s) => s.chat.loadingAi);
  const [input, setInput] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const WS_URL = import.meta.env.VITE_WS_URL;
  const API_URL = import.meta.env.VITE_API_URL;

  // 🟢 Fetch old messages from DB
  useEffect(() => {
    if (!conversationId) return;

    (async () => {
      try {
        const res = await fetch(
          `${API_URL}/conversations/${conversationId}/messages`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          console.error("Fetch error:", res.status, res.statusText);
          return;
        }

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          console.log({ data });

          console.log("Fetched history:", data);
          if (data.messages) {
            dispatch(
              setMessages(
                data.messages.map((m: any) => ({
                  sender: m.senderRole,
                  text: m.text,
                  sentiment: m.sentiment,
                  createdAt: m.createdAt,
                }))
              )
            );
          }
        } else {
          console.error("Expected JSON, got:", await res.text());
        }
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    })();
  }, [conversationId, token, dispatch]);

  // 🟡 WebSocket connection
  useEffect(() => {
    if (!conversationId || !token) return;
    const ws = new WebSocket(
      `${WS_URL}?token=${encodeURIComponent(
        token
      )}&conversationId=${conversationId}`
    );

    wsRef.current = ws;

    ws.onopen = () => console.log("WS connected");
    ws.onclose = () => console.log("WS closed");
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === "message") {
        if (msg.aiReply) {
          dispatch(removeLoader());
          dispatch(
            addMessage({
              sender: "ai",
              text: msg.aiReply,
              createdAt: new Date().toString(),
            })
          );
        }
        if (typeof msg.needsHuman === "boolean")
          dispatch(setNeedsHuman(msg.needsHuman));
      }
    };
    return () => ws.close();
  }, [conversationId, token, dispatch]);

  function send(text: string) {
    if (!text.trim() || !wsRef.current) return;
    dispatch(
      addMessage({ sender: "customer", text, createdAt: new Date().toString() })
    );
    dispatch(removeLoader());
    dispatch(setLoadingAi(true));
    wsRef.current.send(JSON.stringify({ type: "user_message", text }));
    setInput("");
  }

  console.log({ messages });

  return (
    <Box sx={{ m: 2, p: 2 }}>
      {needsHuman && (
        <Alert severity="info" sx={{ mb: 1 }}>
          This looks complex. A human agent will assist you shortly.
        </Alert>
      )}
      <Box
        sx={{
          height: "37vh",
          overflowY: "auto",
          p: 1,
          bgcolor: "grey.50",
          borderRadius: 2,
          mb: 2,
        }}
      >
        {messages.map((m, i) => (
          <MessageBubble key={i} {...m} />
        ))}
        {loadingAi && (
          <Box sx={{ display: "flex", justifyContent: "flex-start", p: 1 }}>
            <span className="dot-loader">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </Box>
        )}
      </Box>

      <Box
        display="flex"
        flexDirection={"column"}
        alignItems={"flex-end"}
        gap={1}
        mt={5}
      >
        <QuickReplies onPick={(t) => setInput(t)} />

        <TextField
          fullWidth
          placeholder="Type your message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          sx={{
            borderRadius: 2,
            "& .MuiOutlinedInput-root": { borderRadius: 2 },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Send icon"
                  onClick={() => send(input)}
                  edge="end"
                >
                  <SendIcon sx={{ color: "#ffc0ad", fontSize: "30px" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}
