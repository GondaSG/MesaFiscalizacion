import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const Dashboard: React.FC = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('bandeja-ingresantes');

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
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
