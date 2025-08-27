import { Box, Typography, Grid, Link, IconButton, Divider } from "@mui/material";
import { Facebook, Twitter, LinkedIn, GitHub } from "@mui/icons-material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                background: "#161d26",
                color: "white",
                mt: 8,
                pt: 6,
                pb: 3,
            }}
        >
            <Grid
                container
                spacing={4}
                justifyContent="center"
                sx={{ px: { xs: 3, md: 12 } }}
            >
                <Grid size={{ xs: 12, sm: 6, md: 3, xl: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                        IntelliChat
                    </Typography>
                    <Typography variant="body2" sx={{ color: "gray.400" }}>
                        AI-powered customer support platform for modern businesses.
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3, xl: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                        Resources
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Link href="/docs" underline="hover" color="inherit">
                            Documentation
                        </Link>
                        <Link href="/pricing" underline="hover" color="inherit">
                            Pricing
                        </Link>
                        <Link href="/blog" underline="hover" color="inherit">
                            Blog
                        </Link>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3, xl: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                        Support
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Link href="/contact" underline="hover" color="inherit">
                            Contact Us
                        </Link>
                        <Link href="/faq" underline="hover" color="inherit">
                            FAQs
                        </Link>
                        <Link href="/status" underline="hover" color="inherit">
                            System Status
                        </Link>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3, xl: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                        Follow Us
                    </Typography>
                    <Box>
                        <IconButton href="https://facebook.com" target="_blank" sx={{ color: "white" }}>
                            <Facebook />
                        </IconButton>
                        <IconButton href="https://twitter.com" target="_blank" sx={{ color: "white" }}>
                            <Twitter />
                        </IconButton>
                        <IconButton href="https://linkedin.com" target="_blank" sx={{ color: "white" }}>
                            <LinkedIn />
                        </IconButton>
                        <IconButton href="https://github.com" target="_blank" sx={{ color: "white" }}>
                            <GitHub />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>

            {/* Divider */}
            <Divider sx={{ background: "rgba(255,255,255,0.2)", my: 3 }} />

            {/* Bottom bar */}
            <Box textAlign="center">
                <Typography variant="body2" sx={{ color: "gray.400" }}>
                    © {new Date().getFullYear()} IntelliChat Support. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
