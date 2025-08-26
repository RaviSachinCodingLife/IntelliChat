import { useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { setAuth } from "../redux/authSlice";

export default function Register() {
    const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
    const nav = useNavigate(); const dispatch = useAppDispatch();

    async function onSubmit() {
        const { data } = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
        dispatch(setAuth(data)); nav("/home");
    }

    return (
        <Box display="grid" justifyContent={"center"} height="100dvh">
            <Card sx={{ width: 420 }}>
                <CardContent>
                    <Typography variant="h5" mb={2}>Create account</Typography>
                    <TextField fullWidth label="Name" value={name} onChange={e => setName(e.target.value)} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Email" value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} sx={{ mb: 2 }} />
                    <Button variant="contained" onClick={onSubmit} fullWidth>Register</Button>
                </CardContent>
            </Card>
        </Box>
    );
}
