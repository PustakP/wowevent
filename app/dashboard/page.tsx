"use client";
import React, { useEffect, useState } from 'react';
import { 
  Calendar, 
  Users, 
  Tag, 
  Settings, 
  Plus,
  Moon,
  Sun,
  Search,
  Filter,
  Clock,
  MapPin,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { createClient } from '../utils/supabase/clients';

// Type definitions based on schema
interface Event {
  id: string;
  name: string;
  organizer_id: string;
  date: string;
  location: string;
  description: string;
  requirements: string[];
  status: string;
  subdomain: string;
  created_at: string;
  updated_at: string;
  images: string[];
}

interface Registration {
  id: string;
  attendee_id: string;
  event_id: string;
  status: string;
  created_at: string;
  attendeeName?: string;
  eventName?: string;
}

interface Bid {
  id: string;
  vendor_id: string;
  event_id: string;
  amount: number;
  proposal: string;
  status: string;
  created_at: string;
  eventName?: string;
}

interface UserProfile {
  user_id: string;
  name: string;
  occupation: string;
  location: string;
  role: string;
  completed_onboarding: boolean;
}

const EventDashboard = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('events');
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const supabase = createClient();
    
    try {
      // Get authenticated user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) throw new Error('Not authenticated');
      
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('user_profile')
        .select('*')
        .eq('user_id', userData.user.id)
        .single();
      if (profileError) throw profileError;
      setUserProfile(profileData);

      // Fetch events organized by user
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('organizer_id', userData.user.id);
      if (eventError) throw eventError;
      setEvents(eventData || []);

      // Only fetch registrations if there are events
      if (eventData && eventData.length > 0) {
        const eventIds = eventData.map(e => e.id);
        const { data: regData, error: regError } = await supabase
          .from('registrations')
          .select(`
            *,
            events (name),
            user_profile!attendee_id (name)
          `)
          .in('event_id', eventIds);
        
        if (regError) {
          console.warn('Error fetching registrations:', regError);
          setRegistrations([]);
        } else {
          const formattedRegistrations = (regData || []).map(reg => ({
            ...reg,
            attendeeName: reg.user_profile?.name || 'Unknown',
            eventName: reg.events?.name || 'Unknown Event'
          }));
          setRegistrations(formattedRegistrations);
        }
      } else {
        setRegistrations([]);
      }

    // Fetch event IDs first
    const { data: events, error: eventsError } = await supabase
.from('events')
.select('id')
.eq('organizer_id', userData.user.id);

if (eventsError) throw eventsError;

// Extract event IDs from the response
const eventIds = events?.map(event => event.id) || [];

if (eventIds.length === 0) {
setBids([]); // No events found, so no bids
return;
}

// Fetch bids with event names only for matching event IDs
const { data: bidData, error: bidError } = await supabase
.from('bids')
.select(`
  *,
  events!inner (
    name
  )
`)
.in('event_id', eventIds);

if (bidError) throw bidError;

// Format bids properly
const formattedBids = (bidData || []).map(bid => ({
...bid,
eventName: bid.events?.name || 'Unknown Event'
}));

setBids(formattedBids);


    } catch (error) {
      console.error('Error fetching data:', error);
      setRegistrations([]);
      setBids([]);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: 'pending' | 'approved' | 'rejected' | 'completed', isDark: boolean) => {
    const statusColors = {
      pending: isDark ? 'text-yellow-300' : 'text-yellow-600',
      approved: isDark ? 'text-green-300' : 'text-green-600',
      rejected: isDark ? 'text-red-300' : 'text-red-600',
      completed: isDark ? 'text-blue-300' : 'text-blue-600'
    };
    return statusColors[status] || (isDark ? 'text-gray-300' : 'text-gray-600');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  // Function to Update Bid Status
const handleStatusUpdate = async (bidId: string, newStatus: string) => {
    const supabase = createClient();

    const { error } = await supabase
      .from('bids')
      .update({ status: newStatus })
      .eq('id', bidId);
  
    if (error) {
      console.error("Failed to update bid status:", error);
      return;
    }
  
    // Update UI instantly
    setBids(prevBids => 
      prevBids.map(bid => bid.id === bidId ? { ...bid, status: newStatus } : bid)
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-blue-50 text-gray-900'}`}>
      <div className="flex">
        {/* Sidebar */}
        <nav className={`w-64 min-h-screen p-4 transition-colors duration-200 ${darkMode ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-gray-200'}`}>
          <div className="flex justify-between items-center mb-8">
            <h1 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              {userProfile?.name || 'Event Manager'}
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors duration-200 ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="space-y-2">
            {[
              { id: 'events', icon: Calendar, label: 'Events' },
              { id: 'attendees', icon: Users, label: 'Attendees' },
              { id: 'bids', icon: Tag, label: 'Bids' },
              { id: 'manage', icon: Settings, label: 'Settings' }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  activeSection === id
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-800'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeSection === 'events' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">My Events</h2>
                <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                  <Plus size={20} />
                  <span>Create Event</span>
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map(event => (
                  <div key={event.id} className={`p-6 rounded-2xl transition-colors duration-200 ${darkMode ? 'bg-gray-800 shadow-lg shadow-gray-900/50' : 'bg-white shadow-lg shadow-gray-200/50'}`}>
                    {event.images?.[0] && (
                      <div className="h-48 mb-4 rounded-lg overflow-hidden">
                        <img src={event.images[0]} alt={event.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Clock size={16} className="mr-2" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin size={16} className="mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className={`text-sm ${getStatusColor(event.status as 'pending' | 'approved' | 'rejected' | 'completed', darkMode)}`}>
                        {event.status === 'approved' ? <CheckCircle size={16} className="inline mr-2" /> : 
                         event.status === 'rejected' ? <XCircle size={16} className="inline mr-2" /> : null}
                        {event.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'attendees' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Attendees</h2>
                <div className="flex space-x-4">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
                    <input 
                      type="text" 
                      placeholder="Search attendees..." 
                      className={`pl-10 pr-4 py-2 rounded-lg transition-colors duration-200 ${
                        darkMode 
                          ? 'bg-gray-800 text-white border-gray-600 focus:border-blue-500 placeholder-gray-500' 
                          : 'bg-white text-gray-800 border-gray-300 focus:border-blue-500 placeholder-gray-400'
                      } border focus:ring-2 focus:ring-blue-500 outline-none`}
                    />
                  </div>
                  <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}>
                    <Filter size={20} />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              <div className={`rounded-xl overflow-hidden transition-colors duration-200 ${darkMode ? 'bg-gray-800 shadow-lg shadow-gray-900/50' : 'bg-white shadow-lg shadow-gray-200/50'}`}>
                <table className="w-full">
                  <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Attendee</th>
                      <th className={`px-6 py-3 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Event</th>
                      <th className={`px-6 py-3 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Registration Date</th>
                      <th className={`px-6 py-3 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {registrations.map((registration) => (
                      <tr key={registration.id} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          {registration.attendeeName}
                        </td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          {registration.eventName}
                        </td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          {formatDate(registration.created_at)}
                        </td>
                        <td className={`px-6 py-4 text-sm ${getStatusColor(registration.status as 'pending' | 'approved' | 'rejected' | 'completed', darkMode)}`}>
                          {registration.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

{activeSection === 'bids' && (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold">Bids</h2>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bids.map(bid => (
        <div 
          key={bid.id} 
          className={`p-6 rounded-2xl transition-colors duration-200 ${darkMode ? 'bg-gray-800 shadow-lg shadow-gray-900/50' : 'bg-white shadow-lg shadow-gray-200/50'}`}
        >
          <h3 className="text-xl font-semibold mb-4">{bid.eventName}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Amount:</span>
              <span className="text-lg font-medium">{formatCurrency(bid.amount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Submitted:</span>
              <span className="text-sm">{formatDate(bid.created_at)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status:</span>
              <span className={`text-sm font-medium ${getStatusColor(bid.status as 'pending' | 'approved' | 'rejected' | 'completed', darkMode)}`}>
                {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <h4 className="text-sm font-medium mb-2">Proposal</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {bid.proposal.length > 100 
                  ? `${bid.proposal.substring(0, 100)}...` 
                  : bid.proposal}
              </p>
            </div>

            {/* Approve & Reject Buttons */}
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => handleStatusUpdate(bid.id, 'accepted')} 
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
              >
                Approve
              </button>
              <button 
                onClick={() => handleStatusUpdate(bid.id, 'rejected')} 
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
              >
                Reject
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  </div>
)}



       {activeSection === 'manage' && (
         <div className="space-y-6">
           <h2 className="text-3xl font-bold">Settings</h2>
           <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
             {userProfile && (
               <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                       Name
                     </label>
                     <input
                       type="text"
                       value={userProfile.name}
                       readOnly
                       className={`w-full px-4 py-2 rounded-lg border ${
                         darkMode 
                           ? 'bg-gray-700 border-gray-600 text-gray-200' 
                           : 'bg-gray-50 border-gray-300 text-gray-900'
                       }`}
                     />
                   </div>
                   <div className="space-y-2">
                     <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                       Occupation
                     </label>
                     <input
                       type="text"
                       value={userProfile.occupation}
                       readOnly
                       className={`w-full px-4 py-2 rounded-lg border ${
                         darkMode 
                           ? 'bg-gray-700 border-gray-600 text-gray-200' 
                           : 'bg-gray-50 border-gray-300 text-gray-900'
                       }`}
                     />
                   </div>
                   <div className="space-y-2">
                     <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                       Location
                     </label>
                     <input
                       type="text"
                       value={userProfile.location}
                       readOnly
                       className={`w-full px-4 py-2 rounded-lg border ${
                         darkMode 
                           ? 'bg-gray-700 border-gray-600 text-gray-200' 
                           : 'bg-gray-50 border-gray-300 text-gray-900'
                       }`}
                     />
                   </div>
                   <div className="space-y-2">
                     <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                       Role
                     </label>
                     <input
                       type="text"
                       value={userProfile.role}
                       readOnly
                       className={`w-full px-4 py-2 rounded-lg border ${
                         darkMode 
                           ? 'bg-gray-700 border-gray-600 text-gray-200' 
                           : 'bg-gray-50 border-gray-300 text-gray-900'
                       }`}
                     />
                   </div>
                 </div>
                 <div className="flex justify-end space-x-4">
                   <button
                     className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                       darkMode
                         ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                         : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                     }`}
                   >
                     Cancel
                   </button>
                   <button
                     className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                   >
                     Edit Profile
                   </button>
                 </div>
               </div>
             )}
           </div>
         </div>
       )}
     </main>
   </div>
 </div>
);
};

export default EventDashboard;