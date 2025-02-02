"use client"
import React from 'react';
import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react';

const EventsPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200 
      dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 
      bg-gradient-to-b from-blue-50 to-blue-100">
      
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <img 
          src="/api/placeholder/1920/600" 
          alt="Event Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tech Innovation Summit 2025</h1>
            <p className="text-xl md:text-2xl">Where Innovation Meets Opportunity</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        
        {/* Event Details Card */}
        <div className="rounded-2xl shadow-2xl p-8 space-y-6 transition-colors duration-200
          bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          
          {/* Event Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                <p className="font-semibold">March 15-17, 2025</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                <p className="font-semibold">Tech Convention Center, Silicon Valley</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</p>
                <p className="font-semibold">9:00 AM - 6:00 PM PST</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">About the Event</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join us for three days of innovative talks, workshops, and networking opportunities with industry leaders in technology. 
              Experience the latest developments in AI, blockchain, and sustainable tech solutions.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <ChevronRight className="w-5 h-5 text-blue-600" />
                <span>50+ Expert Speakers</span>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="w-5 h-5 text-blue-600" />
                <span>Interactive Workshops</span>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="w-5 h-5 text-blue-600" />
                <span>Networking Sessions</span>
              </li>
            </ul>
          </div>

          {/* Price Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Ticket Options</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="font-bold">Early Bird Pass</p>
                <p className="text-2xl font-bold text-blue-600">$399</p>
                <p className="text-gray-600 dark:text-gray-400">Available until Feb 15, 2025</p>
              </div>
              <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="font-bold">Regular Pass</p>
                <p className="text-2xl font-bold text-blue-600">$599</p>
                <p className="text-gray-600 dark:text-gray-400">Regular pricing</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg
            transition-colors duration-200 flex items-center justify-center space-x-2 focus:ring-2 focus:ring-blue-500">
            <span>Register Now</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;