
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../components/icons';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50 text-center p-4">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop')" }}>
      </div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800">
          Share Your Ride, <span className="text-blue-600">Share Your Journey</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          The official carpooling platform for MIT World Peace University. Save money, reduce traffic, and connect with fellow students and staff.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/find"
            className="group inline-flex items-center justify-center px-8 py-4 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transform hover:-translate-y-1 transition-all duration-300"
          >
            Find a Ride
            <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/offer"
            className="group inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg border border-blue-200 hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300"
          >
            Offer a Ride
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;