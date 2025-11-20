import React, { createContext, useState, ReactNode } from 'react';
import { User } from './types';

// Internal type to store user data including password, which should not be exposed.
type StoredUser = User & { passwordHash: string };

interface RegistrationData {
    name: string;
    email: string;
    password: string;
    department: string;
    year: number;
    rollNo: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (data: RegistrationData) => { success: boolean, message: string };
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
  register: () => ({ success: false, message: 'Registration function not ready.' }),
});

const mockUser: StoredUser = { 
  id: 'u-current', 
  name: 'Piyush K', 
  email: '1032210123@mitwpu.edu.in',
  avatarUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=200&h=200&q=80',
  rating: 4.9,
  department: 'Computer Science',
  year: 3,
  rollNo: '1032210123',
  isVerified: true,
  passwordHash: 'password123'
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<StoredUser[]>([mockUser]);

  const login = (email: string, password: string): boolean => {
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === password);
    if (foundUser) {
      const { passwordHash, ...publicUserData } = foundUser;
      setUser(publicUserData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (data: RegistrationData): { success: boolean, message: string } => {
    if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
        return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser: StoredUser = {
        id: `u-${Date.now()}`,
        name: data.name,
        email: data.email,
        avatarUrl: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(data.name)}`,
        rating: 0,
        department: data.department,
        year: data.year,
        rollNo: data.rollNo,
        isVerified: false,
        passwordHash: data.password
    };

    setUsers(prev => [...prev, newUser]);
    console.log("New user registered:", newUser);
    console.log("All users:", [...users, newUser]);
    return { success: true, message: 'Registration successful!' };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};