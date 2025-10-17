import React from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import './styles/custom.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from './context/AuthContext';

const queryClient = new QueryClient();

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="App">
      {user ? <Dashboard /> : <LoginPage />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
