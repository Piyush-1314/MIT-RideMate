import React, { useState } from 'react';
import { type Ride, type User } from './types';
import RideCard from './RideCard';
import { MapPinIcon, CalendarIcon } from './icons';

const mockUser1: User = { id: 'u1', name: 'Rohan Sharma', email: 'rohan.s@mitwpu.edu.in', avatarUrl: 'https://picsum.photos/id/1005/100/100', rating: 4.8, department: 'Computer Science', year: 3, rollNo: 'CS3021', isVerified: true };
const mockUser2: User = { id: 'u2', name: 'Priya Patel', email: 'priya.p@mitwpu.edu.in', avatarUrl: 'https://picsum.photos/id/1011/100/100', rating: 4.9, department: 'Mechanical Engineering', year: 4, rollNo: 'ME4005', isVerified: true };

const mockRides: Ride[] = [
  { id: 'r1', driver: mockUser1, origin: 'Kothrud, Pune', destination: 'MIT-WPU Campus, Paud Road', departureTime: new Date('2024-08-15T08:00:00'), availableSeats: 2, totalSeats: 4, price: 50, description: 'Daily commute to campus. Happy to share the ride!', vehicleType: 'car', isGirlsOnly: false, passengers: [], status: 'Accepted' },
  { id: 'r2', driver: mockUser2, origin: 'Wakad, Pune', destination: 'MIT-WPU Campus, Paud Road', departureTime: new Date('2024-08-15T08:30:00'), availableSeats: 1, totalSeats: 1, price: 70, description: 'Comfortable sedan with AC. Let\'s beat the traffic together.', vehicleType: 'bike', isGirlsOnly: true, passengers: [], status: 'Accepted' },
  { id: 'r3', driver: mockUser1, origin: 'Hinjewadi Phase 1', destination: 'MIT-WPU Campus, Paud Road', departureTime: new Date('2024-08-16T09:00:00'), availableSeats: 1, totalSeats: 4, price: 80, description: 'Leaving a bit later. One seat available.', vehicleType: 'car', isGirlsOnly: false, passengers: [], status: 'Accepted' },
];


const FindRidePage: React.FC = () => {
    const [rides, setRides] = useState<Ride[]>(mockRides);
    const [loading, setLoading] = useState(false);
    const [womenOnly, setWomenOnly] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            let filteredRides = mockRides;
            if (womenOnly) {
                filteredRides = filteredRides.filter(ride => ride.isGirlsOnly);
            }
            setRides(filteredRides.sort(() => Math.random() - 0.5)); // shuffle for effect
            setLoading(false);
        }, 1000);
    }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Your Perfect Ride</h2>
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="relative">
                <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <MapPinIcon className="absolute left-3 top-9 h-5 w-5 text-gray-400"/>
                <input type="text" id="origin" defaultValue="Kothrud" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Kothrud" />
              </div>
              <div className="relative">
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <MapPinIcon className="absolute left-3 top-9 h-5 w-5 text-gray-400"/>
                <input type="text" id="destination" defaultValue="MIT-WPU Campus" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., MIT-WPU Campus" />
              </div>
              <div className="relative">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <CalendarIcon className="absolute left-3 top-9 h-5 w-5 text-gray-400"/>
                <input type="date" id="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 h-10">Search</button>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center">
                  <input
                      id="women-only"
                      name="women-only"
                      type="checkbox"
                      checked={womenOnly}
                      onChange={e => setWomenOnly(e.target.checked)}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="women-only" className="ml-2 block text-sm font-medium text-gray-700">
                      Women Only Ride
                  </label>
              </div>
          </div>
        </form>
      </div>
      
      {loading ? (
        <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Finding rides...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rides.length > 0 ? (
                rides.map(ride => <RideCard key={ride.id} ride={ride} />)
            ) : (
                <div className="md:col-span-2 text-center py-10 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700">No Rides Found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search criteria or check back later.</p>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default FindRidePage;