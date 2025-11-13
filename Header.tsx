import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { BellIcon, LoginIcon } from './icons';

const logoUrl = "https://mitwpu.edu.in/uploads/notificationfile/logo.webp";

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center text-blue-600">
              <img src={logoUrl} alt="MITWPU RideMate Logo" className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold">
                MITWPU RideMate
              </span>
            </NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/find" className={({ isActive }) => `text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium ${isActive ? 'text-blue-600' : ''}`}>Find a Ride</NavLink>
            <NavLink to="/offer" className={({ isActive }) => `text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium ${isActive ? 'text-blue-600' : ''}`}>Offer a Ride</NavLink>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button className="relative text-gray-500 hover:text-blue-600">
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                </button>
                <NavLink to="/profile">
                  <img className="h-10 w-10 rounded-full border-2 border-blue-500 hover:opacity-80 transition" src={user.avatarUrl} alt="User profile" />
                </NavLink>
              </>
            ) : (
              <NavLink to="/login" className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors">
                <LoginIcon className="h-5 w-5 mr-2"/>
                Log In
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;