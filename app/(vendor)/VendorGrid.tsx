// import React, { useEffect, useState } from 'react';
// import VendorCard from './VendorCard';
// import { createClient } from '../utils/supabase/clients';

// // Define the type for an event
// interface Event {
//   id: string;
//   name: string;
//   images: string[]; // Array of image URLs
//   date: string; // Assuming date is stored as a string (e.g., ISO format)
//   type: string;
//   requirements?: string; // Optional field
// }

// const VendorGrid: React.FC = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       const supabase = createClient(); // Initialize Supabase client
//       try {
//         const { data, error } = await supabase
//           .from('events') // Replace 'events' with your table name
//           .select('*'); // Fetch all columns or specify the ones you need

//         if (error) {
//           throw error;
//         }

//         // Map the data to the Event type
//         const formattedEvents = data.map((event: any) => ({
//           id: event.id,
//           name: event.name,
//           images: event.images || [], // Default to an empty array if images is null
//           date: event.date,
//           type: event.type,
//           requirements: event.requirements,
//         }));

//         setEvents(formattedEvents); // Set the fetched events in state
//       } catch (err) {
//         setError(err.message); // Handle errors
//       } finally {
//         setLoading(false); // Set loading to false after fetching
//       }
//     };

//     fetchEvents();
//   }, []);

//   if (loading) {
//     return <div>Loading events...</div>;
//   }

//   if (error) {
//     return <div>Error fetching events: {error}</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="space-y-2 mb-8">
//         <p className="text-gray-600 dark:text-gray-400">
//           Find Your Dream Organiser
//         </p>
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
//           Looking For A Vendor?
//         </h1>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {events.map((event) => (
//           <VendorCard
//             key={event.id}
//             vendor={{
//               id: event.id,
//               name: event.name,
//               image: event.images[0] || '/placeholder.svg?height=200&width=250', // Use the first image or a placeholder
//               date: event.date,
//               type: event.type,
//               requirements: event.requirements,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VendorGrid;