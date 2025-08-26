import { Box, Button } from "@mui/material";
const options = ["Order Status", "Refund", "Change Address", "Cancel Order", "Talk to agent"];

export default function QuickReplies({ onPick }: { onPick: (t: string) => void }) {
    return (
        <Box display="flex" gap={1} flexWrap="wrap" p={1}>
            {options.map(o => (
                <Button key={o} size="small" variant="outlined" onClick={() => onPick(o)}>
                    {o}
                </Button>
            ))}
        </Box>
    );
}
