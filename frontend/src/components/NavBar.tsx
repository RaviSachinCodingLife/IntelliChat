import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Divider,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar: React.FC<{ user: { name: string; email: string } | null; onLogout: () => void }> = ({
    user,
    onLogout,
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => setAnchorEl(null);

    return (
        <AppBar
            position="sticky"
            sx={{
                background: "#161d26",
                boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Brand Title */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        letterSpacing: 0.5,
                    }}
                >
                    IntelliChat Support
                </Typography>

                {/* User Profile Section */}
                {user && (
                    <Box>
                        <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                            <Avatar sx={{ bgcolor: "#ffc0ad", color: "#000" }}>
                                {user.name ? user.name.charAt(0).toUpperCase() : <PersonOutlineIcon />}
                            </Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            PaperProps={{
                                elevation: 4,
                                sx: {
                                    mt: 1.5,
                                    borderRadius: 2,
                                    minWidth: 250,
                                    overflow: "hidden",
                                    p: 0,
                                },
                            }}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                            {user && (
                                <Box
                                    sx={{
                                        width: "100%",
                                        borderRadius: 2,
                                        overflow: "hidden",
                                        boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                                        mt: "-8px"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: "#ffc0ad",
                                            height: 70,
                                            position: "relative",
                                        }}
                                    >
                                        <Avatar
                                            src={""}
                                            sx={{
                                                bgcolor: "#fff",
                                                color: "#161d26",
                                                width: 64,
                                                height: 64,
                                                border: "3px solid white",
                                                position: "absolute",
                                                bottom: -32,
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                boxShadow: "0px 2px 2px #aaaaaa"
                                            }}
                                        >
                                            {user.name ? user.name.charAt(0).toUpperCase() : <PersonOutlineIcon />}
                                        </Avatar>
                                    </Box>

                                    <Box
                                        sx={{
                                            backgroundColor: "#fff",
                                            textAlign: "center",
                                            pt: 5,
                                            pb: 2,
                                        }}
                                    >
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {user.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {user.email}
                                        </Typography>
                                    </Box>
                                </Box>
                            )}

                            <Divider />
                            <MenuItem onClick={onLogout} sx={{ py: 1.5 }}>
                                <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                )
                }
            </Toolbar >
        </AppBar >
    );
};

export default Navbar;
