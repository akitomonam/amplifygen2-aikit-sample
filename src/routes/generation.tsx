import { Box, Container, TextField, Typography, Button, Paper, Chip, CircularProgress } from '@mui/material';
import { useAIGeneration } from '../utils/amplifyClient';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from "react";

export const Route = createFileRoute('/generation')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Generation />
}

export function Generation() {
  const [description, setDescription] = useState("");
  const [{ data, isLoading }, generateRecipe] = useAIGeneration("generateAwsLtTitle");

  const handleClick = async () => {
    generateRecipe({ topicContent: description });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          LTタイトルアイデアジェネレーター
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="どんなAWSの勉強会を開催したいですか？"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button 
            variant="contained" 
            onClick={handleClick}
            disabled={isLoading}
            sx={{ 
              py: 1.5,
              px: 4,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem'
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
            ) : null}
            アイデアを生成
          </Button>
        </Box>

        {data && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom color="primary">
              {data.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.8 }}>
              {data.subtitle}
            </Typography>
            <Box sx={{ my: 2 }}>
              {data.keywords?.map((keyword) => (
                <Chip
                  key={keyword}
                  label={keyword}
                  sx={{ mr: 1, mb: 1 }}
                  variant="outlined"
                />
              ))}
            </Box>
            
          </Box>
        )}
      </Paper>
    </Container>
  );
}
