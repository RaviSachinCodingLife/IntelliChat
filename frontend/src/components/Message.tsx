import { Box, Typography } from '@mui/material';

interface MessageProps {
    sender: 'You' | 'AI';
    text: string;
}

const Message: React.FC<MessageProps> = ({ sender, text }) => {
    return (
        <Box sx={{ mb: 1, textAlign: sender === 'You' ? 'right' : 'left' }}>
            <Typography
                variant="body1"
                sx={{
                    display: 'inline-block',
                    p: 1,
                    bgcolor: sender === 'You' ? '#1976d2' : '#e0e0e0',
                    color: sender === 'You' ? 'white' : 'black',
                    borderRadius: 1
                }}
            >
                {text}
            </Typography>
        </Box>
    );
};

export default Message;
