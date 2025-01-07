import { StrictMode } from 'react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import outputs from '../amplify_outputs.json';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createRouter,
} from '@tanstack/react-router';
import 'highlight.js/styles/github.css';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

Amplify.configure(outputs);

const rootElement =
  document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Authenticator>
        <RouterProvider router={router} />
      </Authenticator>
    </StrictMode>
  );
}
