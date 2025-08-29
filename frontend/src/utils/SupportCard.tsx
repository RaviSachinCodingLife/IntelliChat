import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

interface SupportCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
  glowColor?: string;
}

const SupportCard: React.FC<SupportCardProps> = ({
  icon,
  title,
  description,
  buttonText,
  onClick,
  glowColor = "#7c4dff",
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        borderRadius: 3,
        p: 3,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        background: "linear-gradient(145deg, #ffffff, #f9f9fb)",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: `0 0 25px ${glowColor}`,
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Box sx={{ fontSize: 50, color: glowColor, mb: 2 }}>{icon}</Box>
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ flexGrow: 1 }}
        >
          {description}
        </Typography>
      </CardContent>

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Button
          variant="contained"
          onClick={onClick}
          sx={{
            borderRadius: "20px",
            px: 3,
            py: 1,
            background: glowColor,
            "&:hover": {
              background: glowColor,
              boxShadow: `0 0 15px ${glowColor}`,
            },
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Card>
  );
};

export default SupportCard;
