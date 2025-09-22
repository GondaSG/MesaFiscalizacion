import React from 'react';
import { FileText, User, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  user: any;
}

const Header: React.FC<HeaderProps> = ({ onLogout , user }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 p-2 rounded">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-xl font-bold text-black">
            SISTEMA DE GESTIÓN ADMINISTRATIVA DE LA FISCALIZACIÓN POSTERIOR
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="bg-green-500 w-3 h-3 rounded-full"></div>
            <span className="text-black font-medium">{user.user}</span>
            <User className="h-5 w-5 text-gray-600" />
            <span className="text-sm text-gray-600">{user.role}</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors"
            title="Cerrar Sesión"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
