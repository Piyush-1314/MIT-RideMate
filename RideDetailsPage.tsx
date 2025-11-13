import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { type Ride, type User } from '../types';
import { MapPinIcon, CalendarIcon, UsersIcon, ShieldCheckIcon, ChatIcon } from '../components/icons';

const mockUser1: User = { id: 'u1', name: 'Rohan Sharma', email: 'rohan.s@mitwpu.edu.in', avatarUrl: 'https://picsum.photos/id/1005/100/100', rating: 4.8, department: 'Computer Science', year: 3, rollNo: 'CS3021', isVerified: true };
const mockUser2: User = { id: 'u2', name: 'Priya Patel', email: 'priya.p@mitwpu.edu.in', avatarUrl: 'https://picsum.photos/id/1011/100/100', rating: 4.9, department: 'Mechanical Engineering', year: 4, rollNo: 'ME4005', isVerified: true };

const mockRides: Ride[] = [
  { id: 'r1', driver: mockUser1, origin: 'Kothrud, Pune', destination: 'MIT-WPU Campus, Paud Road', departureTime: new Date('2024-08-15T08:00:00'), availableSeats: 2, totalSeats: 4, price: 50, description: 'Daily commute to campus. Happy to share the ride!', vehicleType: 'car', isGirlsOnly: false, passengers: [mockUser2], status: 'Accepted' },
  { id: 'r2', driver: mockUser2, origin: 'Wakad, Pune', destination: 'MIT-WPU Campus, Paud Road', departureTime: new Date('2024-08-15T08:30:00'), availableSeats: 1, totalSeats: 1, price: 70, description: 'Comfortable scooter ride. Let\'s beat the traffic together.', vehicleType: 'bike', isGirlsOnly: true, passengers: [], status: 'Accepted' },
  { id: 'r3', driver: mockUser1, origin: 'Hinjewadi Phase 1', destination: 'MIT-WPU Campus, Paud Road', departureTime: new Date('2024-08-16T09:00:00'), availableSeats: 1, totalSeats: 4, price: 80, description: 'Leaving a bit later. One seat available.', vehicleType: 'car', isGirlsOnly: false, passengers: [], status: 'Accepted' },
];

const RideDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // In a real app, you would fetch this data from an API
    const ride = mockRides.find(r => r.id === id);

    if (!ride) {
        return <div className="text-center p-10"><h2>Ride not found!</h2></div>;
    }

    const { driver, origin, destination, departureTime, availableSeats, totalSeats, price, description, vehicleType, isGirlsOnly, passengers } = ride;

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main ride info */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 space-y-6">
                        <div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800">{origin} to {destination}</h1>
                                    <p className="text-gray-500 mt-1">Ride offered by <span className="font-semibold text-blue-600">{driver.name}</span></p>
                                </div>
                                <span className={`capitalize px-3 py-1 text-sm font-semibold rounded-full ${vehicleType === 'car' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{vehicleType}</span>
                            </div>
                            {isGirlsOnly && <div className="mt-2"><span className="inline-block bg-pink-100 text-pink-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">Women Only Ride</span></div>}
                        </div>

                        <div className="border-t border-b border-gray-200 py-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-sm text-gray-500">Departs On</p>
                                <p className="font-semibold text-gray-800">{departureTime.toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">At</p>
                                <p className="font-semibold text-gray-800">{departureTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Seats Left</p>
                                <p className="font-semibold text-gray-800">{availableSeats} / {totalSeats}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <p className="text-gray-600">{description}</p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Passengers ({passengers.length})</h3>
                            {passengers.length > 0 ? (
                                <div className="flex space-x-2">
                                    {passengers.map(p => (
                                        <img key={p.id} src={p.avatarUrl} alt={p.name} title={p.name} className="w-10 h-10 rounded-full border-2 border-gray-300" />
                                    ))}
                                </div>
                            ) : <p className="text-sm text-gray-500">No passengers yet. Be the first to join!</p>}
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Route</h3>
                            {/* In a real app, this would be an embedded Google Map or OpenStreetMap */}
                            <div className="bg-gray-200 rounded-md h-64 flex items-center justify-center">
                                <p className="text-gray-500">Map visualization would appear here.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Sidebar with driver info and booking */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="text-center">
                                <img src={driver.avatarUrl} alt={driver.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-200" />
                                <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center">
                                    {driver.name}
                                    {driver.isVerified && <ShieldCheckIcon className="w-6 h-6 ml-2 text-green-500" title="Verified User" />}
                                </h3>
                                <div className="flex items-center justify-center text-sm text-gray-500 mt-1">
                                    <span>{'⭐'.repeat(Math.round(driver.rating))}</span>
                                    <span className="ml-2 font-semibold">{driver.rating.toFixed(1)} rating</span>
                                </div>
                            </div>
                            <button className="mt-4 w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <ChatIcon className="w-5 h-5 mr-2" />
                                Chat with Driver
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                            <p className="text-3xl font-bold text-center text-blue-600">₹{price} <span className="text-lg font-normal text-gray-500">/ seat</span></p>
                            <button className="mt-4 w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                                Request to Book
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RideDetailsPage;