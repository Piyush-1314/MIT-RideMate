import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { type Ride, type User } from './types';
import { MapPinIcon, CalendarIcon, UsersIcon, ShieldCheckIcon, ChatIcon } from './icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
    const [localRide, setLocalRide] = useState<Ride>(ride);
    if (!ride) {
        return <div className="text-center p-10"><h2>Ride not found!</h2></div>;
    }

    const { driver, origin, destination, departureTime, availableSeats, totalSeats, price, description, vehicleType, isGirlsOnly, passengers } = localRide;

    // Chat UI state & helpers
    type Message = { id: string; from: 'me' | 'driver'; text: string; time: Date };
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const [originPos, setOriginPos] = useState<[number, number] | null>(null);
const [destPos, setDestPos] = useState<[number, number] | null>(null);
const [mapCenter, setMapCenter] = useState<[number, number]>([18.5196, 73.8490]); // fallback center (MIT-WPU approx)


useEffect(() => {
  const controller = new AbortController();

  async function geocode(q: string) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1`;
      const res = await fetch(url, { 
        signal: controller.signal, 
        headers: { 'Accept': 'application/json' } 
      });

      if (!res.ok) return null;
      const data = await res.json();

      if (data && data[0]) {
        return [
          parseFloat(data[0].lat),
          parseFloat(data[0].lon)
        ] as [number, number];
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  let mounted = true;
  
  (async () => {
    const o = origin ? await geocode(origin) : null;
    const d = destination ? await geocode(destination) : null;

    if (!mounted) return;

    if (o) setOriginPos(o);
    if (d) setDestPos(d);

    if (o && d) {
      // FIXED: added missing '+' operators
      setMapCenter([
        (o[0] + d[0]) / 2,
        (o[1] + d[1]) / 2
      ]);
    } else if (o) {
      setMapCenter(o);
    } else if (d) {
      setMapCenter(d);
    }
  })();

  return () => {
    mounted = false;
    controller.abort();
  };
}, [origin, destination]);

    

    const mockCurrentUser: User = { id: 'u-current', name: 'You', email: 'you@mitwpu.edu.in', avatarUrl: 'https://picsum.photos/seed/you/100', rating: 0, department: '', year: 0, rollNo: '', isVerified: false };
const [bookingLoading, setBookingLoading] = useState(false);
const [bookingSuccess, setBookingSuccess] = useState(false);
const [bookingError, setBookingError] = useState<string | null>(null);

const handleRequestToBook = async () => {
  setBookingError(null);
  // basic guards
  if (driver.id === mockCurrentUser.id) {
    setBookingError("You can't book your own ride.");
    return;
  }
  if (localRide.availableSeats <= 0) {
    setBookingError('No seats available.');
    return;
  }
  if (localRide.passengers.some(p => p.id === mockCurrentUser.id)) {
    setBookingSuccess(true);
    return;
  }

  setBookingLoading(true);
  try {
    // simulate API call
    await new Promise(res => setTimeout(res, 1000));
    const updatedPassengers = [...localRide.passengers, mockCurrentUser];
    setLocalRide({ ...localRide, passengers: updatedPassengers, availableSeats: Math.max(0, localRide.availableSeats - 1) });
    setBookingSuccess(true);
  } catch (err) {
    setBookingError('Failed to send request. Try again.');
  } finally {
    setBookingLoading(false);
  }
};

    useEffect(() => {
        if (showChat && messages.length === 0) {
            setMessages([{ id: `m-${Date.now()}`, from: 'driver', text: `Hi, I'm ${driver.name}. How can I help?`, time: new Date() }]);
        }
    }, [showChat]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!input.trim()) return;
        const msg: Message = { id: `m-${Date.now()}`, from: 'me', text: input.trim(), time: new Date() };
        setMessages(prev => [...prev, msg]);
        setInput('');
        setTimeout(() => {
            setMessages(prev => [...prev, { id: `m-${Date.now()}`, from: 'driver', text: `Thanks — I'll get back to you soon.`, time: new Date() }]);
        }, 800  + Math.random() * 700);
    };
    

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
                            <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false} className="h-64 rounded-md">
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {originPos && (
    <Marker position={originPos}>
      <Popup>{origin}</Popup>
    </Marker>
  )}
  {destPos && (
    <Marker position={destPos}>
      <Popup>{destination}</Popup>
    </Marker>
  )}
</MapContainer>
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
                            <button
                                onClick={() => setShowChat(prev => !prev)}
                                className="mt-4 w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                                aria-expanded={showChat}
                                aria-controls="chat-panel"
                            >
                                <ChatIcon className="w-5 h-5 mr-2" />
                                {showChat ? 'Close Chat' : 'Chat with Driver'}
                            </button>

                            {showChat && (
                                <div id="chat-panel" className="mt-4 border border-gray-200 rounded-md p-3 bg-white">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                            <img src={driver.avatarUrl} alt={driver.name} className="w-8 h-8 rounded-full mr-2" />
                                            <div>
                                                <div className="font-semibold text-sm">{driver.name}</div>
                                                <div className="text-xs text-gray-500">Typically replies within a few minutes</div>
                                            </div>
                                        </div>
                                        <button onClick={() => setShowChat(false)} className="text-xs text-gray-500 hover:text-gray-700">Close</button>
                                    </div>

                                    <div className="h-48 overflow-y-auto mb-2 space-y-2 px-1">
                                        {messages.length === 0 ? (
                                            <div className="text-sm text-gray-500">No messages yet. Say hi 👋</div>
                                        ) : messages.map(m => (
                                            <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${m.from === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                                                    <div>{m.text}</div>
                                                    <div className="text-[10px] text-gray-400 mt-1 text-right">{m.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    <form onSubmit={handleSend} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={e => setInput(e.target.value)}
                                            placeholder="Write a message..."
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                        <button type="submit" className="px-3 py-2 bg-blue-500 text-white rounded-md text-sm">Send</button>
                                    </form>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                            <p className="text-3xl font-bold text-center text-blue-600">₹{price} <span className="text-lg font-normal text-gray-500">/ seat</span></p>
                             <div className="mt-4">
                              <button
                                onClick={handleRequestToBook}
                                disabled={bookingLoading || localRide.availableSeats <= 0}
                                className="w-full flex items-center justify-center bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                {bookingLoading ? 'Sending request...' : bookingSuccess ? 'Request Sent' : 'Request to Book'}
                              </button>
                              {bookingError && <p className="mt-2 text-sm text-red-600">{bookingError}</p>}
                              {!bookingError && bookingSuccess && <p className="mt-2 text-sm text-green-600">Your booking request was sent. Wait for driver confirmation.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RideDetailsPage;