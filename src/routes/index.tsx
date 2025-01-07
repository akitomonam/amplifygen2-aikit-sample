import {
  createFileRoute,
  Link,
} from '@tanstack/react-router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box sx={{ p: 4 }}>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
      >
        <Button
          component={Link}
          to="/generation"
          variant="contained"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
          }}
        >
          Generation
        </Button>
        <Button
          component={Link}
          to="/conversation"
          variant="contained"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
          }}
        >
          Conversation
        </Button>
        <Button
          component={Link}
          to="/conversationMarkdown"
          variant="contained"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
          }}
        >
          ConversationMarkdown
        </Button>
        <Button
          component={Link}
          to="/member"
          variant="contained"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
          }}
        >
          Member
        </Button>
      </Stack>
    </Box>
  );
}
