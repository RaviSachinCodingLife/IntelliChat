import React from "react";
import {
    Typography,
    Box,
    Grid,
    Card,
    Button,
    Container,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { Link, useNavigate } from "react-router-dom";
import supportImg from "../assets/images/premium_photo-1661582120130-03b9bdc47a75.avif";
import StyledCard from "../utils/StyledCard";
import SupportCard from "../utils/SupportCard";
import Navbar from "../components/NavBar";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { logout } from "../redux/authSlice";
import Footer from "../components/Footer";


const LandingPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const user = useAppSelector(s => s.auth.user);


    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "#f9f9fb",
                fontFamily:
                    "Amazon Ember Display, Helvetica Neue, Helvetica, Arial, sans-serif !important",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Navbar user={user} onLogout={() => { dispatch(logout()); nav("/login"); }} />


            <Box
                sx={{
                    position: "relative",
                    minHeight: "85vh",
                    py: 12,
                    px: 4,
                    backgroundImage: `
                    linear-gradient(to bottom, #161d26 0%, rgba(22,29,38,0.95) 20%, rgba(255,255,255,0.1) 65%, #ffffff 100%),
                    linear-gradient(96deg, #ffccf8 0%, #ffc0ad 26.85%, #ffd78a 59.66%, #fef571 100%)
                    `,
                    backgroundBlendMode: "overlay",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Container>
                    <Grid container alignItems="center" spacing={4}>
                        <Grid size={{ xs: 12, sm: 6, md: 8, xl: 8 }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: { xs: "2.8rem", md: "4.8rem" },
                                    lineHeight: { xs: "3.4rem", md: "5.6rem" },
                                }}
                                gutterBottom
                            >
                                Contact IntelliChat Support
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ color: "text.secondary", maxWidth: "650px" }}
                                gutterBottom
                            >
                                Get AI-powered assistance or connect directly with our human support agents
                                for technical, compliance, or billing concerns.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Container sx={{ py: 6 }}>
                <Typography variant="h4" sx={{
                    fontSize: "3.6rem",
                    lineHeight: "4.4rem"
                }} gutterBottom>
                    Want to speak with an IntelliChat <br /> specialist?
                </Typography>

                <Grid container spacing={3} sx={{ mt: 3 }}>
                    <Grid size={{ xs: 12, sm: 3, md: 6, xl: 6 }}>
                        <StyledCard
                            title="Get in touch"
                            description="Connect with support directly Monday through Friday"
                            bgImage={supportImg}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3, md: 6, xl: 6 }}>
                        <StyledCard
                            title="Request form"
                            description="Submit a sales support form"
                            bgImage={""}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ mt: 10 }}>
                    <Grid size={{ xs: 12, sm: 3, md: 6, xl: 6 }}>
                        <Typography variant="h4" sx={{
                            fontSize: "3.6rem",
                            lineHeight: "1.6rem"
                        }} gutterBottom>
                            Compliance Support
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{
                            fontSize: "1.6rem",
                            lineHeight: " 2.8rem"
                        }} gutterBottom>
                            Request support related to IntelliChat compliance
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3, md: 6, xl: 6 }}>
                        <Card
                            sx={{
                                mt: 3,
                                borderRadius: 3,
                                p: 4,
                                background: "linear-gradient(135deg, #e1f5fe, #ede7f6)",
                                boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                                display: "flex",
                                flexDirection: "column",
                                gap: 2
                            }}
                        >
                            <Typography variant="h6">
                                Need compliance-related assistance?
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Our specialists can help you with regulations, certifications, and
                                audit-related concerns regarding IntelliChat services.
                            </Typography>
                            <Button
                                component={Link}
                                to="/chat"
                                startIcon={<SecurityOutlinedIcon />}
                                size="large"
                                sx={{
                                    background: "#161d26",
                                    color: "white",
                                    borderRadius: "25px",
                                    px: 4,
                                    py: 1.2,
                                    "&:hover": { background: "#333" },
                                }}
                            >
                                Connect with Compliance Support
                            </Button>
                        </Card>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 6 }}>
                    <Typography variant="h4" sx={{
                        fontSize: "3.2rem",
                        lineHeight: "4.4rem"
                    }} gutterBottom>
                        Subscriber support services
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 2, md: 4, xl: 4 }}>
                            <SupportCard
                                icon={<SupportAgentOutlinedIcon fontSize="inherit" />}
                                title="Technical Support"
                                description="Get help with technical issues related to IntelliChat services."
                                buttonText="Get Support"
                                glowColor="#2196f3"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 2, md: 4, xl: 4 }}>
                            <SupportCard
                                icon={<ReceiptLongOutlinedIcon fontSize="inherit" />}
                                title="Billing Support"
                                description="Resolve account or billing related queries quickly."
                                buttonText="Request Help"
                                glowColor="#ff9800"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 2, md: 4, xl: 4 }}>
                            <SupportCard
                                icon={<ErrorOutlineOutlinedIcon fontSize="inherit" />}
                                title="Wrongful Charges"
                                description="Dispute charges if you received a bill without an account."
                                buttonText="Learn More"
                                glowColor="#f44336"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 2, md: 4, xl: 4 }}>
                            <SupportCard
                                icon={<WorkspacePremiumOutlinedIcon fontSize="inherit" />}
                                title="Support Plans"
                                description="Explore premium IntelliChat support plans for enterprises."
                                buttonText="View Plans"
                                glowColor="#4caf50"
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Grid container spacing={3} sx={{ mt: 10 }}>
                    <Grid size={{ xs: 12, sm: 3, md: 6, xl: 6 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: { xs: "2.4rem", md: "3.6rem" },
                                lineHeight: { xs: "3rem", md: "3.6rem" },
                                mb: 2,
                            }}
                            gutterBottom
                        >
                            IntelliChat Sign-in Resources
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            sx={{
                                fontSize: { xs: "1.2rem", md: "1.6rem" },
                                lineHeight: "2.4rem",
                            }}
                            gutterBottom
                        >
                            See additional resources for issues related to logging into the console
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 3, md: 6, xl: 6 }}>
                        {[
                            "Help signing in to the console",
                            "Troubleshoot your sign-in issue",
                            "Help with multi-factor authentication (MFA) issues",
                            "Still unable to sign in to your IntelliChat account?",
                        ].map((item, i) => (
                            <Accordion
                                key={i}
                                sx={{
                                    mb: 2,
                                    borderRadius: "12px",
                                    background: "linear-gradient(145deg, #ffffff, #f9f9fb)",
                                    boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
                                    overflow: "hidden",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        boxShadow: "0px 10px 24px rgba(0,0,0,0.12)",
                                        transform: "translateY(-2px)",
                                    },
                                    "&:before": { display: "none" },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ color: "#161d26" }} />}
                                    sx={{
                                        backgroundColor: "rgba(22,29,38,0.04)",
                                        "& .MuiTypography-root": {
                                            fontWeight: 600,
                                            fontSize: "1.2rem",
                                        },
                                    }}
                                >
                                    <Typography>{item}</Typography>
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{
                                        backgroundColor: "rgba(22,29,38,0.02)",
                                        borderTop: "1px solid rgba(0,0,0,0.05)",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontSize: "1rem", lineHeight: "1.6rem" }}
                                    >
                                        Detailed guidance for <b>{item}</b>. Follow step-by-step instructions and troubleshooting tips
                                        provided by our IntelliChat support team.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Grid>
                </Grid>

                <Box
                    sx={{
                        mt: 8,
                        p: 4,
                        borderRadius: 3,
                        backgroundImage:
                            "linear-gradient(120deg, #f8c7ff 20.08%, #d2ccff 75.81%)",
                        height: 290
                    }}
                >
                    <Grid container spacing={3} p={5}>
                        <Grid size={{ xs: 12, sm: 3, md: 6, xl: 6 }}>
                            <Typography variant="h6" sx={{
                                fontSize: "2.4rem",
                                lineHeight: "3.2rem"
                            }}>
                                Did you find what you were looking for today?
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{
                                fontSize: "1.2rem",
                                lineHeight: "1.6rem",
                                mt: 1
                            }}>
                                Let us know so we can improve the quality of the content on our pages
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 3, md: 6, xl: 6 }} display={"flex"} gap={2} margin={"auto"}>
                            <Button
                                startIcon={<ThumbUpOffAltIcon />}
                                sx={{
                                    background: "#161d26",
                                    color: "white",
                                    borderRadius: "30px",
                                    width: "100%",
                                    height: "35%",
                                    p: "15px",
                                    "&:hover": { background: "#333" },
                                }}
                            >
                                Yes
                            </Button>
                            <Button
                                startIcon={<ThumbDownOffAltIcon />}
                                sx={{
                                    background: "#161d26",
                                    color: "white",
                                    borderRadius: "30px",
                                    width: "100%",
                                    height: "35%",
                                    p: "15px",
                                    "&:hover": { background: "#333" },
                                }}
                            >
                                No
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container >

            <Footer />
        </Box >
    );
};

export default LandingPage;
