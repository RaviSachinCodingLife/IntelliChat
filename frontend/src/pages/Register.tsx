import { useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography, Divider, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { setAuth } from "../redux/authSlice";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();
    const dispatch = useAppDispatch();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password,
            });
            dispatch(setAuth(data));
            nav("/home");
        } catch (err: any) {
            alert(err.response?.data?.error || "Registration failed");
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
                        Create your account to get started
                    </Typography>

                    {/* Form */}
                    <form onSubmit={onSubmit}>
                        <TextField
                            fullWidth
                            label="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            sx={{
                                mb: 2,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 3,
                                    bgcolor: "#fff",
                                    border: "1px solid rgba(255,192,173,0.5)",
                                    transition: "0.3s",
                                    "&:hover": { borderColor: "#ff8c70" },
                                    "&.Mui-focused": { borderColor: "#ff8c70", boxShadow: "0 0 0 3px rgba(255,192,173,0.2)" },
                                },
                            }}
                        />
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
                                    border: "1px solid rgba(255,192,173,0.5)",
                                    transition: "0.3s",
                                    "&:hover": { borderColor: "#ff8c70" },
                                    "&.Mui-focused": { borderColor: "#ff8c70", boxShadow: "0 0 0 3px rgba(255,192,173,0.2)" },
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
                                    border: "1px solid rgba(255,192,173,0.5)",
                                    transition: "0.3s",
                                    "&:hover": { borderColor: "#ff8c70" },
                                    "&.Mui-focused": { borderColor: "#ff8c70", boxShadow: "0 0 0 3px rgba(255,192,173,0.2)" },
                                },
                            }}
                        />

                        {/* Register Button */}
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
                            Register
                        </Button>
                    </form>

                    {/* Divider */}
                    <Divider sx={{ my: 2 }}>OR</Divider>

                    {/* Login Link */}
                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                        Already have an account?
                        <Box
                            component="span"
                            onClick={() => nav("/login")}
                            sx={{
                                color: "#ff8c70",
                                fontWeight: 600,
                                cursor: "pointer",
                                pl: 1,
                                "&:hover": { textDecoration: "underline" },
                            }}
                        >
                            Login
                        </Box>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
