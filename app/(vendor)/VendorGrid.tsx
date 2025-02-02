"use client"
import React, { useEffect, useState } from 'react';
import VendorCard from './VendorCard';

// Assuming supabase client is imported from another file
import { createClient } from '../utils/supabase/clients';
const VendorGrid: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await createClient()
        .from('events')
        .select('*'); // Adjust columns as per your table structure

      if (error) {
        console.error('Error fetching events:', error.message);
      } else {
        setEvents(data || []);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-2 mb-8">
        <p className="text-gray-600 dark:text-gray-400">
          Find Your Dream Organiser
        </p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Looking For A Vendor?
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <VendorCard
            key={event.id}
            vendor={{
              id: event.id,
              name: event.name,
              image: event.image[0] || '/placeholder.svg?height=200&width=250',
              date: event.date,
              requirements: event.requirements,
              type: event.type,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default VendorGrid;
