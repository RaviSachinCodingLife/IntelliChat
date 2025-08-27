import { useEffect } from "react";
import { Box, Button } from "@mui/material";
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
    const user = useAppSelector(s => s.auth.user);
    const token = useAppSelector(s => s.auth.token);
    const conversationId = useAppSelector(s => s.chat.conversationId);


    useEffect(() => {
        (async () => {
            if (!conversationId && token) {
                const { data } = await axios.post("http://localhost:5000/api/conversations", {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                dispatch(setConversation(data.conversation._id));
            }
        })();
    }, [token, conversationId, dispatch]);

    async function submitConversation() {
        if (!conversationId || !token) return;
        await axios.post(`http://localhost:5000/api/conversations/${conversationId}/submit`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert("Conversation submitted. A summary has been emailed to you.");
    }

    return (
        <Box>
            <Navbar user={user} onLogout={() => { dispatch(logout()); nav("/login"); }} />
            <ChatBox />
            <Box display="flex" justifyContent="flex-end" p={2}>
                <Button variant="contained" onClick={submitConversation}>Submit & Email Summary</Button>
            </Box>
        </Box>
    );
}
