import React, { useContext, useState } from 'react';
import { type User, type Ride } from './types';
import RideCard from './RideCard';
import { AuthContext } from './AuthContext';
import { ShieldCheckIcon, LogoutIcon } from './icons';

const mockUserRides: Ride[] = [
    { id: 'r1', driver: null as any, origin: 'Kothrud, Pune', destination: 'MIT-WPU Campus, Paud Road', departureTime: new Date('2024-08-15T08:00:00'), availableSeats: 2, totalSeats: 4, price: 50, description: 'Daily commute to campus. Happy to share the ride!', vehicleType: 'car', isGirlsOnly: false, passengers: [], status: 'Completed' },
    { id: 'r3', driver: null as any, origin: 'Hinjewadi Phase 1', destination: 'MIT-WPU Campus, Paud Road', departureTime: new Date('2024-08-16T09:00:00'), availableSeats: 1, totalSeats: 4, price: 80, description: 'Leaving a bit later. One seat available.', vehicleType: 'car', isGirlsOnly: false, passengers: [], status: 'Accepted' },
];

const mockBookedRides: Ride[] = [
    { id: 'r2', driver: { id: 'u2', name: 'Priya Patel', email: 'priya.p@mitwpu.edu.in', avatarUrl: 'https://picsum.photos/id/1011/100/100', rating: 4.9, department: 'Mechanical Engineering', year: 4, rollNo: 'ME4005', isVerified: true }, origin: 'Wakad, Pune', destination: 'MIT-WPU Campus, Paud Road', departureTime: new Date('2024-08-15T08:30:00'), availableSeats: 1, totalSeats: 1, price: 70, description: 'Comfortable sedan with AC. Let\'s beat the traffic together.', vehicleType: 'bike', isGirlsOnly: true, passengers: [], status: 'Accepted' }
]

const ProfilePage: React.FC = () => {
    const { user, logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('offered');

    if (!user) {
        return <div className="text-center py-10">Please log in to view your profile.</div>;
    }

    // Assign the current user as the driver for their offered rides
    const myOfferedRides = mockUserRides.map(ride => ({ ...ride, driver: user }));
    
    const renderRides = (rides: Ride[]) => {
        return rides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rides.map(ride => <RideCard key={ride.id} ride={ride} />)}
            </div>
        ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700">No Rides Here</h3>
                <p className="text-gray-500 mt-2">This section is currently empty.</p>
            </div>
        );
    };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-400 h-32"></div>
                <div className="px-6 py-4 relative">
                    <img 
                        src={user.avatarUrl} 
                        alt={user.name} 
                        className="w-32 h-32 rounded-full border-4 border-white absolute -mt-24"
                    />
                    <div className="ml-36 mt-2">
                        <div className="flex justify-between items-start">
                             <div>
                                <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                                    {user.name}
                                    {user.isVerified && <ShieldCheckIcon className="w-7 h-7 ml-2 text-green-500" title="Verified User" />}
                                </h1>
                                <p className="text-gray-600">{user.department} - Year {user.year}</p>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <span>{'⭐'.repeat(Math.round(user.rating))}</span>
                                    <span className="ml-2 font-semibold">{user.rating.toFixed(1)} average rating</span>
                                </div>
                             </div>
                             <button onClick={logout} className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors">
                                <LogoutIcon className="w-5 h-5 mr-1"/>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button onClick={() => setActiveTab('offered')} className={`${activeTab === 'offered' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                            My Offered Rides
                        </button>
                        <button onClick={() => setActiveTab('booked')} className={`${activeTab === 'booked' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                            My Booked Rides
                        </button>
                    </nav>
                </div>
                {activeTab === 'offered' && renderRides(myOfferedRides)}
                {activeTab === 'booked' && renderRides(mockBookedRides)}
            </div>
        </div>
    </div>
  );
};

export default ProfilePage;