import { Card, CardContent, Typography } from "@mui/material";

interface Props {
    messages: { sender: string; text: string }[];
}

const SummaryCard: React.FC<Props> = ({ messages }) => {
    if (messages.length === 0) return null;

    const summary = `Conversation so far: ${messages
        .map((m) => `${m.sender}: ${m.text}`)
        .join(" | ")}`;

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                    AI Summary
                </Typography>
                <Typography variant="body2">{summary}</Typography>
            </CardContent>
        </Card>
    );
};

export default SummaryCard;
