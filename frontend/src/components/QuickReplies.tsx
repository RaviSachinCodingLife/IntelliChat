import { Box, Button } from "@mui/material";

const quickReplies = ["Hello", "Need help", "Thanks", "Goodbye"];

const QuickReplies: React.FC<{ onSelect: (msg: string) => void }> = ({ onSelect }) => {
    return (
        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            {quickReplies.map((reply, idx) => (
                <Button key={idx} variant="outlined" size="small" onClick={() => onSelect(reply)}>
                    {reply}
                </Button>
            ))}
        </Box>
    );
};

export default QuickReplies;
