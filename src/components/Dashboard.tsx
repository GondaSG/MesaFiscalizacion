import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

interface DashboardProps {
  onLogout: () => void;
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout,user }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('bandeja-ingresantes');

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onLogout={onLogout} user={user} />
      <div className="flex">
        <Sidebar 
          selectedItem={selectedMenuItem} 
          onItemSelect={setSelectedMenuItem} 
        />
        <MainContent selectedMenuItem={selectedMenuItem} />
      </div>
    </div>
  );
};

export default Dashboard;
