import { Box, Typography } from "@mui/material";
import { type Msg } from "../redux/chatSlice";

export default function MessageBubble({ sender, text, createdAt }: Msg) {
    const mine = sender === "customer";

    const time = new Date(createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });

    return (
        <Box display="flex" flexDirection="column" alignItems={mine ? "flex-end" : "flex-start"} mb={1}>
            <Box
                sx={{
                    bgcolor: mine ? "primary.main" : "grey.200",
                    color: mine ? "white" : "black",
                    px: 2,
                    py: 1.2,
                    borderRadius: 3,
                    maxWidth: "75%",
                }}
            >
                <Typography variant="body1">{text}</Typography>
            </Box>

            {mine && (
                <Typography
                    variant="caption"
                    textAlign={"end"}
                    sx={{ mt: 0.3, color: "text.secondary", fontSize: 12 }}
                >
                    {time}
                </Typography>
            )}
        </Box>
    );
}
