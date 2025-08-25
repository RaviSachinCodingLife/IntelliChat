import { Container, Typography, Box } from "@mui/material";
import ChatBox from "./components/ChatBox";

function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          IntelliChat – Gen AI Support Platform
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          AI-powered customer support with real-time chat, quick replies, and summaries.
        </Typography>
      </Box>
      <ChatBox />
    </Container>
  );
}

export default App;
