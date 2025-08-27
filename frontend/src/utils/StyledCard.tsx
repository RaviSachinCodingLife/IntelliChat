import { Card, Typography, Box } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface StyledCardProps {
    title: string;
    description: string;
    bgImage?: string;
    overlayOpacity?: number;
}

const StyledCard = ({
    title,
    description,
    bgImage,
    overlayOpacity = 0.25,
}: StyledCardProps) => {
    return (
        <Card
            sx={{
                position: "relative",
                height: 400,
                borderRadius: 3,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 5,
                background: bgImage
                    ? `url(${bgImage}) no-repeat center/cover`
                    : "linear-gradient(135deg, #f8c7ff 20%, #d2ccff 80%)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                transition: "all 0.4s ease",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
                "& .hoverIcon": {
                    fontSize: 38,
                    position: "relative",
                    zIndex: 1,
                    opacity: 1,
                    color: "#161D26",
                    transform: "translateX(0)",
                    transition: "all 0.4s ease",
                },
                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background: `rgba(255,255,255,${overlayOpacity})`,
                    zIndex: 0,
                    transition: "background 0.4s ease",
                },
                "&:hover": {
                    boxShadow: "0 0 30px rgba(0, 200, 255, 0.6)",
                    transform: "translateY(-6px) scale(1.02)",
                    "&::before": {
                        background: `rgba(255,255,255,${overlayOpacity + 0.15})`,
                    },
                    "& .hoverIcon": {
                        opacity: 0,
                        transform: "translateX(20px)",
                    },
                    "& .hoverText": {
                        opacity: 1,
                        transform: "translateY(0)",
                    },
                },
            }}
        >

            <Typography
                variant="h4"
                sx={{
                    position: "relative",
                    zIndex: 1,
                    letterSpacing: "0.5px",
                    color: "#161D26"
                }}
            >
                {title}
            </Typography>

            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    gap: 1,
                }}
            >
                <KeyboardArrowRightIcon
                    className="hoverIcon"
                />
                <Typography
                    className="hoverText"
                    variant="body1"
                    sx={{
                        opacity: 0,
                        transform: "translateY(10px)",
                        transition: "all 0.5s ease 0.2s",
                        color: "#161D26",
                        fontSize: "1rem",
                    }}
                >
                    {description}
                </Typography>
            </Box>
        </Card>
    );
};

export default StyledCard;
