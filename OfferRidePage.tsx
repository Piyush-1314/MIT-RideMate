import React, { useState } from 'react';
import { generateDescription } from './Service';
import { MapPinIcon, SparklesIcon } from './icons';
import LoadingSpinner from './LoadingSpinner';

const OfferRidePage: React.FC = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [description, setDescription] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleGenerateDescription = async () => {
        if (!origin || !destination) {
            alert("Please enter an origin and destination first.");
            return;
        }
        setIsGenerating(true);
        try {
            const generatedDesc = await generateDescription(origin, destination);
            setDescription(generatedDesc);
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitSuccess(false);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            e.currentTarget.dispatchEvent(new Event('reset'));
            setOrigin('');
            setDestination('');
            setDescription('');
        }, 1500);
    }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Offer a Ride</h1>
          <p className="text-gray-600 mb-8">Share your upcoming trip with the MIT-WPU community.</p>
          
          {submitSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md" role="alert">
              <p className="font-bold">Success!</p>
              <p>Your ride has been listed. Thank you for sharing!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="origin" className="block text-sm font-medium text-gray-700">Origin</label>
                <div className="mt-1 relative">
                    <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                    <input type="text" id="origin" value={origin} onChange={e => setOrigin(e.target.value)} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Deccan Gymkhana" required />
                </div>
              </div>
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination</label>
                <div className="mt-1 relative">
                    <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                    <input type="text" id="destination" value={destination} onChange={e => setDestination(e.target.value)} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="MIT-WPU Campus" required />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date & Time</label>
                    <input type="datetime-local" id="date" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                 <div>
                    <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                    <select id="vehicle" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" required>
                        <option>Car</option>
                        <option>Bike</option>
                    </select>
                </div>
            </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="seats" className="block text-sm font-medium text-gray-700">Available Seats</label>
                    <input type="number" id="seats" min="1" max="6" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 3" required />
                </div>
                 <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price per Seat (₹)</label>
                    <input type="number" id="price" min="0" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 50" required />
                </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Ride Description</label>
              <div className="mt-1">
                <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Morning commute, music on, good vibes only!"></textarea>
              </div>
              <div className="flex justify-between items-center mt-2">
                <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isGenerating ? <LoadingSpinner/> : <SparklesIcon className="w-4 h-4 mr-2" />}
                  {isGenerating ? 'Generating...' : 'Generate with AI ✨'}
                </button>
                <div className="flex items-center">
                    <input id="girls-only" type="checkbox" className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded" />
                    <label htmlFor="girls-only" className="ml-2 block text-sm text-gray-900">Women Only Ride</label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-wait">
                {isSubmitting ? 'Posting Ride...' : 'Offer My Ride'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfferRidePage;