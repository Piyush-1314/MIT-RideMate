import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import FindRidePage from './pages/FindRidePage';
import OfferRidePage from './pages/OfferRidePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RideDetailsPage from './pages/RideDetailsPage';
import { AuthProvider, AuthContext } from './auth/AuthContext';
import { ChatIcon } from './components/icons';
import RegistrationPage from './pages/RegistrationPage';

const AppContent = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find" element={<FindRidePage />} />
          <Route path="/ride/:id" element={<RideDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          
          {/* FIX: Pass children as an explicit prop to work around potential TypeScript parsing issues causing "Property 'children' is missing" errors. */}
          <Route path="/offer" element={<ProtectedRoute children={<OfferRidePage />} />} />
          {/* FIX: Pass children as an explicit prop to work around potential TypeScript parsing issues causing "Property 'children' is missing" errors. */}
          <Route path="/profile" element={<ProtectedRoute children={<ProfilePage />} />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <div className="container mx-auto flex justify-between items-center">
          <p>&copy; {new Date().getFullYear()} MIT WPU RideMate. All rights reserved.</p>
          <button className="text-gray-400 hover:text-white transition-colors">
            <ChatIcon className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
};

// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <HashRouter>
      {/* FIX: Pass children as an explicit prop to work around potential TypeScript parsing issues causing "Property 'children' is missing" errors. */}
      <AuthProvider children={<AppContent />} />
    </HashRouter>
  );
}

export default App;