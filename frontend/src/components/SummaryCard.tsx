import { Card, CardContent, Typography } from "@mui/material";

interface Props {
    messages: { sender: string; text: string }[];
}

const SummaryCard: React.FC<Props> = ({ messages }) => {
    if (messages.length === 0) return null;

    const summary = messages.map((m) => `${m.sender}: ${m.text}`).join(" | ");

    return (
        <Card
            sx={{
                mb: 2,
                borderRadius: 3,
                bgcolor: "#fff0f0", 
                border: "1px solid rgba(255,192,173,0.5)", 
                boxShadow: "0 6px 20px rgba(255,192,173,0.2)", 
            }}
        >
            <CardContent sx={{ p: 2 }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: "#ff8c70",
                        fontWeight: 600,
                        mb: 1,
                    }}
                >
                    AI Summary
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "#333",
                        lineHeight: 1.5,
                        fontSize: 14,
                        wordBreak: "break-word",
                    }}
                >
                    {summary}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default SummaryCard;
