import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import './styles/custom.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
