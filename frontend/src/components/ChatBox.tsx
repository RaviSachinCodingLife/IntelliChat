import { Box, TextField, Button, Paper } from '@mui/material';
import Message from './Message';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../redux/chatSlice';
import type { RootState } from '../redux/store';

const ChatBox: React.FC = () => {
    const [input, setInput] = useState('');
    const chat = useSelector((state: RootState) => state.chat.messages);
    const dispatch = useDispatch();
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:5000');

        socket.onopen = () => {
            console.log('✅ WebSocket connected');
        };

        socket.onmessage = (event) => {
            const { reply } = JSON.parse(event.data);
            console.log('AI Reply:', reply);

            if (reply) {
                dispatch(addMessage({ sender: 'AI', text: reply }));
            }
        };

        socket.onclose = () => {
            console.log('❌ WebSocket disconnected');
        };

        wsRef.current = socket;

        return () => {
            socket.close();
        };
    }, [dispatch]);

    const sendMessage = () => {
        if (!input) return;
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            // Send JSON instead of plain string
            wsRef.current.send(JSON.stringify({ input }));
            dispatch(addMessage({ sender: 'You', text: input }));
            setInput('');
        } else {
            console.error('WebSocket is not open.');
        }
    };

    return (
        <>
            <Paper sx={{ p: 2, height: '60vh', overflowY: 'scroll' }}>
                {chat.map((c, i) => (
                    <Message key={i} sender={c.sender} text={c.text} />
                ))}
            </Paper>
            <Box sx={{ display: 'flex', mt: 2 }}>
                <TextField
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button variant="contained" sx={{ ml: 1 }} onClick={sendMessage}>
                    Send
                </Button>
            </Box>
        </>
    );
};

export default ChatBox;
