import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './assets/styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './router';

const queryClient = new QueryClient();

function App() {
  return (
  <ThemeProvider theme={theme}>
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </BrowserRouter>
  </ThemeProvider>
  );
}

export default App;
