import React from 'react';
import { Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';

interface Vendor {
  id: string;
  name: string;
  images: string;
  date: string;
  requirements: string[];
  duration?: string;
  type: string;
}

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  return (
    <Link href={`/event/${vendor.id}`}>
      <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
        <div className="relative aspect-[5/4] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 group-hover:from-blue-600/10 group-hover:to-purple-600/10" />
          <img
            src={vendor.images[0] || '/placeholder.svg?height=200&width=250'}
            alt={`${vendor.name} preview`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{vendor.date}</span>
            </div>
            
            {vendor.duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{vendor.duration}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1.5">
              <Tag className="w-4 h-4" />
              <span>{vendor.type}</span>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {vendor.name}
          </h3>

          <p className="text-gray-600">{vendor.requirements || 'No requirements specified'}</p>
        </div>
      </div>
    </Link>
  );
};

export default VendorCard;