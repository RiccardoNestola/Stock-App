import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
