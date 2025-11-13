export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  rating: number;
  department: string;
  year: number;
  rollNo: string;
  isVerified: boolean;
  contactNumber?: string; // Optional, revealed on booking
}

export type RideStatus = 'Pending' | 'Accepted' | 'Completed' | 'Cancelled';
export type VehicleType = 'car' | 'bike';

export interface Ride {
  id: string;
  driver: User;
  origin: string;
  destination: string;
  departureTime: Date;
  availableSeats: number;
  totalSeats: number;
  price: number;
  description: string;
  vehicleType: VehicleType;
  notes?: string;
  isGirlsOnly: boolean;
  passengers: User[];
  status: RideStatus;
}