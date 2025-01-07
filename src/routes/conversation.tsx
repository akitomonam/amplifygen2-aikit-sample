import { createFileRoute } from '@tanstack/react-router'
import { AIConversation } from '@aws-amplify/ui-react-ai';
import { useAIConversation } from '../utils/amplifyClient';

export const Route = createFileRoute('/conversation')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Conversation />
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
        messages={messages}
        isLoading={isLoading}
        handleSendMessage={handleSendMessage}
      />
  );
}