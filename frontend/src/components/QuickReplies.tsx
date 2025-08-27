import { Box, Button } from "@mui/material";

const options = ["Order Status", "Refund", "Change Address", "Cancel Order", "Talk to agent"];

export default function QuickReplies({ onPick }: { onPick: (t: string) => void }) {
    return (
        <Box display="flex" gap={1} flexWrap="wrap" p={1} mb={1}>
            {options.map((o) => (
                <Button
                    key={o}
                    size="small"
                    onClick={() => onPick(o)}
                    sx={{
                        textTransform: "none", 
                        borderRadius: 3,
                        px: 2,
                        py: 0.8,
                        bgcolor: "#ffc0ad", 
                        color: "#fff", 
                        fontWeight: 500,
                        fontSize: 14,
                        "&:hover": {
                            bgcolor: "#ffb09a", 
                            boxShadow: "0 4px 12px rgba(255,192,173,0.3)", 
                        },
                        transition: "all 0.3s ease",
                    }}
                >
                    {o}
                </Button>
            ))}
        </Box>
    );
}
