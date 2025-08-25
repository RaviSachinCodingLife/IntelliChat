import { Container, Typography } from '@mui/material';
import ChatBox from './components/ChatBox';

const App: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        IntelliChat
      </Typography>
      <ChatBox />
    </Container>
  );
};

export default App;
