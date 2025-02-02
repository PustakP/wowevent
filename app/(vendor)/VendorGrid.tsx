import React from 'react';
import VendorCard from './VendorCard';

const vendors = [
  {
    id: '1',
    name: 'Flowers By Honey',
    image: '/placeholder.svg?height=200&width=250',
    date: 'April 2, 2025',
    duration: '2 Day Fest',
    type: 'Wedding'
  },
  {
    id: '2',
    name: 'Café LAmour Catering',
    image: '/placeholder.svg?height=200&width=250',
    date: 'January 12, 2025',
    type: 'Conference'
  },
  {
    id: '3',
    name: 'Live Band – The Yellow Diary',
    image: '/placeholder.svg?height=200&width=250',
    date: 'May 12, 2019',
    type: 'Wedding'
  },
  // Duplicate the first 3 vendors twice more to fill the grid
  {
    id: '4',
    name: 'Flowers By Honey',
    image: '/placeholder.svg?height=200&width=250',
    date: 'April 2, 2025',
    duration: '2 Day Fest',
    type: 'Wedding'
  },
  {
    id: '5',
    name: 'Café LAmour Catering',
    image: '/placeholder.svg?height=200&width=250',
    date: 'January 12, 2025',
    type: 'Conference'
  },
  {
    id: '6',
    name: 'Live Band – The Yellow Diary',
    image: '/placeholder.svg?height=200&width=250',
    date: 'May 12, 2019',
    type: 'Wedding'
  },
  {
    id: '7',
    name: 'Flowers By Honey',
    image: '/placeholder.svg?height=200&width=250',
    date: 'April 2, 2025',
    duration: '2 Day Fest',
    type: 'Wedding'
  },
  {
    id: '8',
    name: 'Café LAmour Catering',
    image: '/placeholder.svg?height=200&width=250',
    date: 'January 12, 2025',
    type: 'Conference'
  },
  {
    id: '9',
    name: 'Live Band – The Yellow Diary',
    image: '/placeholder.svg?height=200&width=250',
    date: 'May 12, 2019',
    type: 'Wedding'
  }
];

const VendorGrid: React.FC = () => {
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
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
};

export default VendorGrid;