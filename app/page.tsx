import Link from 'next/link';
import { ArrowRight, Users, MessageSquare, Globe, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Transform Your Event Management
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto">
              Streamline planning, connect with vendors, and create unforgettable experiences with our all-in-one platform.
            </p>
            <div className="mt-10 flex gap-4 justify-center">
              <Link 
                href="/signup" 
                className="inline-flex items-center px-6 py-3 rounded-lg bg-[#10B981] hover:bg-[#059669] transition-colors text-white font-semibold"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white font-semibold"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Everything You Need</h2>
            <p className="mt-4 text-xl text-gray-600">Powerful features to make your event planning seamless</p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Vendor Marketplace",
                description: "Connect with trusted vendors and manage bids efficiently"
              },
              {
                icon: MessageSquare,
                title: "Real-Time Communication",
                description: "Stay connected with your team and vendors throughout the planning process"
              },
              {
                icon: Globe,
                title: "Custom Event Websites",
                description: "Create branded event pages with custom domains instantly"
              }
            ].map((feature, index) => (
              <div key={index} className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="absolute top-0 -translate-y-1/2 left-8 w-12 h-12 bg-[#1D4ED8] rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Event Director",
                  content: "This platform has revolutionized how we manage our corporate events. The vendor marketplace alone has saved us countless hours.",
                  rating: 5
                },
                {
                  name: "Michael Chen",
                  role: "Wedding Planner",
                  content: "The custom event websites feature is a game-changer. My clients love how professional their event pages look.",
                  rating: 5
                },
                {
                  name: "Emily Rodriguez",
                  role: "Conference Organizer",
                  content: "The real-time communication tools have made coordinating with vendors and team members so much easier.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-[#F59E0B] fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">&quot;{testimonial.content}&quot;</p>
                  <div className="mt-6">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#1D4ED8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold">Join hundreds of organizers revolutionizing their events</h2>
          <p className="mt-4 text-xl text-blue-100">Start your journey today and experience the difference</p>
          <Link 
            href="/signup" 
            className="mt-8 inline-flex items-center px-8 py-3 rounded-lg bg-white text-[#1D4ED8] hover:bg-blue-50 transition-colors font-semibold"
          >
            Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}