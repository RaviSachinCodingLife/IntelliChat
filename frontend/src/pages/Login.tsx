import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { setAuth, loadAuth } from "../redux/authSlice";

export default function Login() {
    const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
    const dispatch = useAppDispatch(); const nav = useNavigate();

    useEffect(() => { dispatch(loadAuth()); }, [dispatch]);

    async function onSubmit() {
        const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
        dispatch(setAuth(data)); nav("/home");
    }

    return (
        <Box display="grid" justifyContent={"center"} height="100dvh">
            <Card sx={{ width: 420 }}>
                <CardContent>
                    <Typography variant="h5" mb={2}>Login</Typography>
                    <TextField fullWidth label="Email" value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} sx={{ mb: 2 }} />
                    <Button variant="contained" onClick={onSubmit} fullWidth>Login</Button>
                </CardContent>
            </Card>
        </Box>
    );
}
