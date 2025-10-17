import React, { createContext, useState, useContext, ReactNode } from 'react';
import { logout as apiLogout } from '../api/authApi';

interface AuthContextType {
    user: any;
    login: (userData: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);

    const login = (userData: any) => {
        setUser(userData);
        // El token ya se guarda en localStorage dentro de la función de login de la API
    };

    const logout = () => {
        apiLogout(); // Llama a la función de la API para limpiar el token
        setUser(null);
    };

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
