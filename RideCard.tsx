import React from 'react';
import { Link } from 'react-router-dom';
import { type Ride } from '../types';
import { MapPinIcon, CalendarIcon, UsersIcon } from './icons';

interface RideCardProps {
  ride: Ride;
}

const RideCard: React.FC<RideCardProps> = ({ ride }) => {
  const { id, driver, origin, destination, departureTime, availableSeats, totalSeats, price, isGirlsOnly } = ride;

  const departureDate = departureTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const departureClock = departureTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <Link to={`/ride/${id}`} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full">
      <div className="p-5">
        <div className="flex items-center mb-4">
          <img src={driver.avatarUrl} alt={driver.name} className="w-12 h-12 rounded-full mr-4 border-2 border-blue-200" />
          <div>
            <p className="font-bold text-gray-800">{driver.name}</p>
            <div className="flex items-center text-sm text-gray-500">
                <span>{'⭐'.repeat(Math.round(driver.rating))}</span>
                <span className="ml-1">{driver.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xl font-bold text-blue-600">₹{price}</p>
            <p className="text-xs text-gray-500">per seat</p>
          </div>
        </div>
        
        {isGirlsOnly && (
            <div className="mb-3">
                <span className="inline-block bg-pink-100 text-pink-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Women Only
                </span>
            </div>
        )}

        <div className="space-y-3 text-gray-700">
            <div className="flex items-start">
                <MapPinIcon className="w-5 h-5 mr-3 mt-1 text-indigo-500 flex-shrink-0" />
                <p><span className="font-semibold">From:</span> {origin}</p>
            </div>
            <div className="flex items-start">
                <MapPinIcon className="w-5 h-5 mr-3 mt-1 text-blue-500 flex-shrink-0" />
                <p><span className="font-semibold">To:</span> {destination}</p>
            </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-sm">
            <div className="flex items-center text-gray-600">
                <CalendarIcon className="w-5 h-5 mr-2 text-gray-400" />
                <span>{departureDate} at {departureClock}</span>
            </div>
            <div className="flex items-center text-gray-600">
                <UsersIcon className="w-5 h-5 mr-2 text-gray-400" />
                <span className="font-semibold text-blue-600">{availableSeats}</span>
                <span className="mx-1">/</span>
                <span>{totalSeats} seats left</span>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default RideCard;