import { Box, Typography } from "@mui/material";

interface MessageProps {
    sender: string;
    text: string;
    sentiment?: string;
}

const Message: React.FC<MessageProps> = ({ sender, text, sentiment }) => {
    return (
        <Box
            sx={{
                p: 1.5,
                mb: 1,
                borderRadius: 2,
                bgcolor: sender === "You" ? "primary.main" : "grey.200",
                color: sender === "You" ? "white" : "black",
                maxWidth: "75%",
                alignSelf: sender === "You" ? "flex-end" : "flex-start",
            }}
        >
            <Typography variant="body1">{text}</Typography>
            {sentiment && sender !== "You" && (
                <Typography variant="caption" color="text.secondary">
                    Sentiment: {sentiment}
                </Typography>
            )}
        </Box>
    );
};

export default Message;
