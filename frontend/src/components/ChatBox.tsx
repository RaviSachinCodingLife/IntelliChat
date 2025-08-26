import { useEffect, useRef, useState } from "react";
import { Paper, Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { addMessage, setNeedsHuman } from "../redux/chatSlice";
import MessageBubble from "./MessageBubble";
import QuickReplies from "./QuickReplies";

export default function ChatBox() {
    const dispatch = useAppDispatch();
    const token = useAppSelector(s => s.auth.token)!;
    const user = useAppSelector(s => s.auth.user)!;
    const conversationId = useAppSelector(s => s.chat.conversationId)!;
    const messages = useAppSelector(s => s.chat.messages);
    const needsHuman = useAppSelector(s => s.chat.needsHuman);
    const [input, setInput] = useState("");
    const wsRef = useRef<WebSocket | null>(null);

    console.log({ user });


    useEffect(() => {
        if (!conversationId || !token) return;
        const ws = new WebSocket(`ws://localhost:5000?token=${encodeURIComponent(token)}&conversationId=${conversationId}`);
        wsRef.current = ws;

        ws.onopen = () => console.log("WS connected");
        ws.onclose = () => console.log("WS closed");
        ws.onmessage = (e) => {
            const msg = JSON.parse(e.data);
            if (msg.type === "message") {
                if (msg.text) dispatch(addMessage({ sender: "customer", text: msg.text, sentiment: msg.sentiment }));
                if (msg.aiReply) dispatch(addMessage({ sender: "ai", text: msg.aiReply }));
                if (typeof msg.needsHuman === "boolean") dispatch(setNeedsHuman(msg.needsHuman));
            }
        };
        return () => ws.close();
    }, [conversationId, token, dispatch]);

    function send(text: string) {
        if (!text.trim() || !wsRef.current) return;
        wsRef.current.send(JSON.stringify({ type: "user_message", text }));
        dispatch(addMessage({ sender: "customer", text }));
        setInput("");
    }

    return (
        <Paper sx={{ m: 2, p: 2 }}>
            <Typography variant="h6" mb={1}>Chat with Support</Typography>
            {needsHuman && (
                <Alert severity="info" sx={{ mb: 1 }}>
                    This looks complex. A human agent will assist you shortly.
                </Alert>
            )}
            <QuickReplies onPick={(t) => setInput(t)} />
            <Box sx={{ height: "55vh", overflowY: "auto", p: 1, bgcolor: "grey.50", borderRadius: 2, mb: 2 }}>
                {messages.map((m, i) => <MessageBubble key={i} {...m} />)}
            </Box>
            <Box display="flex" gap={1}>
                <TextField fullWidth placeholder="Type your message…" value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && send(input)} />
                <Button variant="contained" onClick={() => send(input)}>Send</Button>
            </Box>
        </Paper>
    );
}
