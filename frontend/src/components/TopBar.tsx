import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
    const user = useAppSelector(s => s.auth.user);
    const dispatch = useAppDispatch();
    const nav = useNavigate();

    return (
        <AppBar position="sticky" elevation={0}>
            <Toolbar sx={{ gap: 2 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>IntelliChat Support</Typography>
                <Typography variant="body2">{user?.email}</Typography>
                <Button color="inherit" onClick={() => { dispatch(logout()); nav("/login"); }}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}
