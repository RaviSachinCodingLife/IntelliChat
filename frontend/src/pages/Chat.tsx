import { useEffect } from "react";
import { Box, Button, Paper } from "@mui/material";
import ChatBox from "../components/ChatBox";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setConversation } from "../redux/chatSlice";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

export default function Chat() {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const conversationId = useAppSelector((s) => s.chat.conversationId);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    (async () => {
      if (!conversationId && token) {
        const { data } = await axios.post(
          `${API_URL}/conversations`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(setConversation(data.conversation._id));
      }
    })();
  }, [token, conversationId, dispatch]);

  async function submitConversation() {
    if (!conversationId || !token) return;
    await axios.post(
      `${API_URL}/conversations/${conversationId}/submit`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Conversation submitted. A summary has been emailed to you.");
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="#fff2f0"
    >
      <Navbar
        user={user}
        onLogout={() => {
          dispatch(logout());
          nav("/login");
        }}
      />

      <Box flexGrow={1} display="flex" justifyContent="center" py={4} px={2}>
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: "1100px",
            borderRadius: 3,
            border: "1px solid rgba(255,192,173,0.6)",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#fff0f0",
            mx: "auto",
            boxShadow: "0 6px 20px rgba(255,192,173,0.25)",
          }}
        >
          <ChatBox />

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              onClick={submitConversation}
              sx={{
                bgcolor: "#ff8c70",
                color: "#fff",
                px: 3,
                py: 1.5,
                borderRadius: 3,
                display: "none",
                "&:hover": { bgcolor: "#ffb09a" },
              }}
            >
              Submit & Email Summary
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
