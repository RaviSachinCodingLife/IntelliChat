import { Box, Typography, Chip } from "@mui/material";
import { type Msg } from "../redux/chatSlice";

export default function MessageBubble({ sender, text, sentiment }: Msg) {
    const mine = sender === "customer";
    return (
        <Box display="flex" justifyContent={mine ? "flex-end" : "flex-start"} mb={1}>
            <Box
                sx={{
                    bgcolor: mine ? "primary.main" : "grey.200",
                    color: mine ? "white" : "black",
                    px: 2, py: 1.2, borderRadius: 3, maxWidth: "75%"
                }}
            >
                <Typography variant="body1">{text}</Typography>
                {!mine && sentiment && (
                    <Chip size="small" label={`Sentiment: ${sentiment}`} sx={{ mt: 0.5 }} />
                )}
            </Box>
        </Box>
    );
}
