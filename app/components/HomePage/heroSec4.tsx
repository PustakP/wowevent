import { ArrowUpRight } from 'lucide-react';

const EventDashboard = () => {
  return (
    <div className="bg-white dark:bg-black min-h-screen transition-all duration-300 overflow-hidden">
      <div className="max-w-6xl mx-auto p-8 relative">
        {/* Background gradient effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl dark:bg-blue-500/10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl dark:bg-purple-500/10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          {/* Left side - Text content */}
          <div className="space-y-8 relative z-10">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Simplify
              </span> Event Management.
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Amplify
              </span> Your Impact.
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Transform your events into unforgettable experiences with our powerful management platform.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium 
              hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10 
              transform transition-all duration-300 hover:scale-105">
              Get started now
            </button>
          </div>

          {/* Right side - Stats and Event Card */}
          <div className="relative h-[500px]">
            {/* Circular Progress Card */}
            <div className="absolute top-0 z-30 left-0 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl 
              dark:shadow-gray-900/50 z-10 transition-all duration-300 hover:shadow-2xl 
              hover:scale-105 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
              <div className="relative w-36 h-36">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    className="text-gray-100 dark:text-gray-700 transition-colors duration-300"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset="70"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="50%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    $28,580
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Sales</span>
                </div>
              </div>
            </div>

            {/* Event Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-6 ml-20 mt-20 
              transition-all duration-300 hover:shadow-2xl hover:scale-105 backdrop-blur-sm bg-opacity-80 
              dark:bg-opacity-80 relative z-20">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 shadow-lg">
                <img
                  src="https://catalystiq.fun/image.png"
                  alt="Event stage"
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">
                Duolingo Conference 2025
              </h3>
              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Exclusive Event
              </p>
            </div>

            {/* Revenue Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-6 
              absolute bottom-0 right-0 transition-all duration-300 hover:shadow-2xl hover:scale-105 
              backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 z-30">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-2">
                Total revenue this month
              </p>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  $148,058
                </span>
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <ArrowUpRight className="text-green-500" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;