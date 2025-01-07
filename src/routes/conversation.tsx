import { AIConversation } from '@aws-amplify/ui-react-ai';
import { createFileRoute } from '@tanstack/react-router';
import { useAIConversation } from '../utils/amplifyClient';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { Card, CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { CardHeader } from '@mui/material';
import { SmartToy } from '@mui/icons-material';
import { convertBufferToBase64 } from '../utils/convertBufferToBase64';
import { DisplayWeather } from '../components/weather/DisplayWeather';
import { MemberListUI } from '../components/member/MemberList';

export const Route = createFileRoute('/conversation')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Conversation />;
}

export default function Conversation() {
  const [
    {
      data: { messages },
      isLoading,
    },
    handleSendMessage,
  ] = useAIConversation('chat');

  return (
    <AIConversation
      welcomeMessage={
        <Card
          elevation={3}
          sx={{
            maxWidth: 600,
            margin: '20px auto',
            borderRadius: 2,
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          }}
        >
          <CardHeader
            avatar={<SmartToy sx={{ color: '#2196f3' }} />}
            title="AIアシスタントへようこそ"
            sx={{
              '& .MuiCardHeader-title': {
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#1a237e',
              },
            }}
          />
          <CardContent>
            <Typography variant="body1" sx={{ color: '#424242' }}>
              何でもお気軽にご質問ください。マークダウン記法にも対応しています。
            </Typography>
          </CardContent>
        </Card>
      }
      messageRenderer={{
        text: ({ text }) => (
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {text}
          </ReactMarkdown>
        ),
        image: ({ image }) => (
          <img
            className="testing"
            width={200}
            height={200}
            src={convertBufferToBase64(image.source.bytes, image.format)}
            alt=""
          />
        ),
      }}
      responseComponents={{
        MemberList: {
          description: 'メンバーの一覧をユーザーに伝えるためのカード',
          component: MemberListUI,
          props: {
            members: {
              type: 'array',
              required: true,
              description: 'メンバーの一覧',
            },
          },
        },
        WeatherCard: {
          description: '天気をユーザーに伝えるためのカード',
          component: DisplayWeather,
          props: {
            data: {
              type: 'object',
              required: true,
              description: '天気データ',
            },
          },
        },
      }}
      FallbackResponseComponent={(props) => {
        return <>{JSON.stringify(props)}</>;
      }}
      messages={messages}
      isLoading={isLoading}
      handleSendMessage={handleSendMessage}
    />
  );
}
