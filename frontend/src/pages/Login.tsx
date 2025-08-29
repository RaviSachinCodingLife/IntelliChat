import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography, Divider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { setAuth, loadAuth } from "../redux/authSlice";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const nav = useNavigate();

    useEffect(() => {
        dispatch(loadAuth());
    }, [dispatch]);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            dispatch(setAuth(data));
            nav("/home");
        } catch (err: any) {
            alert(err.response?.data?.error || "Login failed");
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100dvh"
            bgcolor="#fff2f0"
            px={2}
        >
            <Card
                sx={{
                    width: { xs: "100%", sm: 400 },
                    borderRadius: 4,
                    p: 3,
                    bgcolor: "#fff0f0",
                    mx: "auto",
                    border: "1px solid rgba(255,192,173,0.5)",
                    boxShadow: "0 16px 32px rgba(255,192,173,0.4), 0 4px 12px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease-in-out",
                }}
            >
                <CardContent>
                    {/* Header */}
                    <Typography
                        variant="h4"
                        sx={{ mb: 1.5, fontWeight: 700, color: "#ff8c70", textAlign: "center" }}
                    >
                        IntelliChat
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{ mb: 3, textAlign: "center", color: "#555" }}
                    >
                        Welcome back! Please login to your account
                    </Typography>

                    {/* Form */}
                    <form onSubmit={onSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            sx={{
                                mb: 2,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 3,
                                    bgcolor: "#fff",
                                    transition: "0.3s",
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            sx={{
                                mb: 3,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 3,
                                    bgcolor: "#fff",
                                    transition: "0.3s",
                                },
                            }}
                        />

                        {/* Login Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                bgcolor: "#ff8c70",
                                color: "#fff",
                                py: 1.5,
                                borderRadius: 3,
                                fontWeight: 600,
                                fontSize: 16,
                                "&:hover": { bgcolor: "#ffb09a" },
                                mb: 2,
                            }}
                        >
                            Login
                        </Button>
                    </form>

                    {/* Divider */}
                    <Divider sx={{ my: 2 }}>OR</Divider>

                    {/* Register Link */}
                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                        Don’t have an account?
                        <Box
                            component="span"
                            onClick={() => nav("/register")}
                            sx={{
                                color: "#ff8c70",
                                fontWeight: 600,
                                cursor: "pointer",
                                pl: 1,
                                "&:hover": { textDecoration: "underline" },
                            }}
                        >
                            Register
                        </Box>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
