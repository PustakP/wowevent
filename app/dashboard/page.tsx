"use client"
import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Tag, 
  Settings, 
  Plus,
  Moon,
  Sun,
  Search,
  Filter
} from 'lucide-react';
import { IconType } from 'react-icons';

const EventDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('events');
  
  // Placeholder data
  const events = [
    { id: 1, name: "Tech Conference 2025", date: "2025-06-15", status: "upcoming" },
    { id: 2, name: "Summer Music Festival", date: "2025-07-01", status: "planning" }
  ];
  
  const attendees = [
    { id: 1, name: "John Doe", event: "Tech Conference 2025", ticket: "VIP" },
    { id: 2, name: "Jane Smith", event: "Summer Music Festival", ticket: "Regular" }
  ];
  
  const bids = [
    { id: 1, vendor: "Sound Systems Co.", event: "Summer Music Festival", amount: "$5,000" },
    { id: 2, vendor: "Catering Excellence", event: "Tech Conference 2025", amount: "$3,500" }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-gray-900 text-gray-100' : 'bg-blue-50 text-gray-900'
    }`}>
      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className={`w-64 min-h-screen p-4 transition-colors duration-200 ${
          darkMode ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-gray-200'
        }`}>
          <div className="flex justify-between items-center mb-8">
            <h1 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Event Manager
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                darkMode 
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          
          <div className="space-y-2">
            {['events', 'attendees', 'bids', 'manage'].map((section) => {
              const Icon: IconType = {
                events: Calendar,
                attendees: Users,
                bids: Tag,
                manage: Settings
              }[section] || Calendar;

              return (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                    ${activeSection === section 
                      ? (darkMode 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-100 text-blue-800')
                      : (darkMode 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-600 hover:bg-gray-100')
                    }`}
                >
                  <Icon size={20} />
                  <span className="capitalize">{section}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          {activeSection === 'events' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Events</h2>
                <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200
                  ${darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}>
                  <Plus size={20} />
                  <span>Add Event</span>
                </button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map(event => (
                  <div
                    key={event.id}
                    className={`p-6 rounded-2xl transition-colors duration-200 ${
                      darkMode 
                        ? 'bg-gray-800 shadow-lg shadow-gray-900/50' 
                        : 'bg-white shadow-lg shadow-gray-200/50'
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Date: {event.date}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Status: {event.status}
                    </p>
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
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} size={20} />
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
                  <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                      : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}>
                    <Filter size={20} />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
              
              <div className={`rounded-xl overflow-hidden transition-colors duration-200 ${
                darkMode 
                  ? 'bg-gray-800 shadow-lg shadow-gray-900/50' 
                  : 'bg-white shadow-lg shadow-gray-200/50'
              }`}>
                <table className="w-full">
                  <thead className={`transition-colors duration-200 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>Name</th>
                      <th className={`px-6 py-3 text-left text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>Event</th>
                      <th className={`px-6 py-3 text-left text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>Ticket</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    {attendees.map(attendee => (
                      <tr key={attendee.id} className={`transition-colors duration-200 ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}>
                        <td className="px-6 py-4 text-sm">{attendee.name}</td>
                        <td className="px-6 py-4 text-sm">{attendee.event}</td>
                        <td className="px-6 py-4 text-sm">{attendee.ticket}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'bids' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Vendor Bids</h2>
              
              <div className={`rounded-xl overflow-hidden transition-colors duration-200 ${
                darkMode 
                  ? 'bg-gray-800 shadow-lg shadow-gray-900/50' 
                  : 'bg-white shadow-lg shadow-gray-200/50'
              }`}>
                <table className="w-full">
                  <thead className={`transition-colors duration-200 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>Vendor</th>
                      <th className={`px-6 py-3 text-left text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>Event</th>
                      <th className={`px-6 py-3 text-left text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>Amount</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    {bids.map(bid => (
                      <tr key={bid.id} className={`transition-colors duration-200 ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}>
                        <td className="px-6 py-4 text-sm">{bid.vendor}</td>
                        <td className="px-6 py-4 text-sm">{bid.event}</td>
                        <td className="px-6 py-4 text-sm">{bid.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'manage' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Manage Events</h2>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map(event => (
                  <div
                    key={event.id}
                    className={`p-6 rounded-2xl transition-colors duration-200 ${
                      darkMode 
                        ? 'bg-gray-800 shadow-lg shadow-gray-900/50' 
                        : 'bg-white shadow-lg shadow-gray-200/50'
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-4">{event.name}</h3>
                    <div className="space-y-4">
                      <button className={`w-full px-4 py-2 text-sm rounded-lg transition-colors duration-200
                        ${darkMode 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}>
                        Edit Details
                      </button>
                      <button className={`w-full px-4 py-2 text-sm rounded-lg transition-colors duration-200
                        ${darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-gray-600 hover:bg-gray-700 text-white'
                        }`}>
                        Manage Permissions
                      </button>
                      <button className={`w-full px-4 py-2 text-sm rounded-lg border transition-colors duration-200
                        ${darkMode 
                          ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white' 
                          : 'border-red-500 text-red-500 hover:bg-red-50'
                        }`}>
                        Cancel Event
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EventDashboard;