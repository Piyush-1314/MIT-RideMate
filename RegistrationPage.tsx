import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const RegistrationPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [department, setDepartment] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        const prnRegex = /^\d{10}@mitwpu\.edu\.in$/;
        if (!prnRegex.test(email)) {
            setError("Please use a valid PRN-based email (e.g., 1234567890@mitwpu.edu.in).");
            return;
        }

        if (!name || !department || !year) {
            setError("Please fill out all fields.");
            return;
        }
        
        const rollNo = email.split('@')[0];

        const result = register({
            name,
            email,
            password,
            department,
            year: parseInt(year, 10),
            rollNo
        });

        if (result.success) {
            navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <img className="mx-auto h-16 w-auto" src="https://mitwpu.edu.in/uploads/notificationfile/logo.webp" alt="MITWPU Logo" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create an account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                          Sign in
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Full Name"
                        />
                         <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="PRN@mitwpu.edu.in"
                        />
                        <div className="flex space-x-4">
                            <select value={department} onChange={e => setDepartment(e.target.value)} required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                <option value="" disabled>Department</option>
                                <option>Computer Science</option>
                                <option>IT Engineering</option>
                                <option>Mechanical Engineering</option>
                                <option>E&TC Engineering</option>
                                <option>Civil Engineering</option>
                            </select>
                            <select value={year} onChange={e => setYear(e.target.value)} required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                <option value="" disabled>Year</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Password"
                        />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Confirm Password"
                        />
                    </div>
                    
                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;