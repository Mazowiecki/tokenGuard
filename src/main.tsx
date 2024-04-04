import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from '@/App';
import { Toaster } from '@ui/atoms/sonner';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App /> <Toaster />
    </QueryClientProvider>
  </React.StrictMode>,
);
