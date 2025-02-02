"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, FileText, Send, DollarSign } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import { Input } from '../../../components/ui/input';

import { createClient } from '../../../utils/supabase/clients';

// Define the type for the event
interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  status: string;
  requirements: string[];
  images: string[];
}
// const supabaseUrl = 'https://umxywgspfpvkgdamhxtb.supabase.co'
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVteHl3Z3NwZnB2a2dkYW1oeHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNTM0ODYsImV4cCI6MjA1MzgyOTQ4Nn0.vMrcHgRAzn0PuWCU8vb7dunjnR_K5gDmxfwaazwnfDI"

// const supabase=createClient(supabaseUrl,supabaseKey)
const EventBiddingPage = ({ eventId }: { eventId: string }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [proposal, setProposal] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      const supabase=createClient()
      console.log(supabase)
      try {
        const { data, error } = await supabase
          .from('events')
          .select(`
            id,
            name,
            date,
            location,
            status,
            requirements,
            images
          `)
          .eq('id', eventId)
          .single();

        if (error) throw error;

        if (data) {
          setEvent(data);
        }
      } catch (error: any) {
        console.error('Error fetching event:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);
  const handleSubmitBid = async () => {
    try {
      setSubmitting(true);
      
      if (!event) {
        throw new Error('Event not found');
      }
  
      if (!bidAmount || !proposal) {
        throw new Error('Please fill in all fields');
      }
  
      const bidData = {
        event_id: event.id,
        amount: parseFloat(bidAmount),
        proposal: proposal,
        status: 'pending',
        created_at: new Date().toISOString(), // Use created_at instead of submitted_at
      };
  
      // Insert the bid data into the 'bid' table
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('bids')
        .insert([bidData])
        .single();
  
      if (error) {
        throw error;
      }
  
      console.log('Bid submitted:', data);
  
      // Update the UI state
      setSubmitStatus("success");
      setBidAmount('');
      setProposal('');
  
    } catch (error) {
      console.error('Error submitting bid:', error);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading event details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert className="bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100">
          <AlertDescription>
            Error loading event details: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Event not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative h-80 w-full overflow-hidden">
        <img 
          src={event.images?.[0] || "/api/placeholder/1920/600"}
          alt="Event Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.name}</h1>
            <p className="text-xl md:text-2xl">Event Bidding Portal</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Card className="shadow-2xl">
          <CardContent className="p-8 space-y-8">
            {/* Event Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                  <p className="font-semibold">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                  <p className="font-semibold">{event.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                  <p className="font-semibold capitalize">{event.status}</p>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Event Requirements</h2>
              <div className="grid gap-4">
                {event.requirements.map((requirement, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  >
                    <p className="font-medium">{requirement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bidding Form */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Submit Your Bid</h2>
              
              {submitStatus === 'success' && (
                <Alert className="bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-100">
                  <AlertDescription>
                    Your bid has been successfully submitted!
                  </AlertDescription>
                </Alert>
              )}
              
              {submitStatus === 'error' && (
                <Alert className="bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100">
                  <AlertDescription>
                    There was an error submitting your bid. Please try again.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Bid Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="pl-10"
                      placeholder="Enter your bid amount"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Proposal Details</label>
                  <Textarea
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                    rows={6}
                    placeholder="Describe your proposal and how you'll meet the event requirements..."
                    className="resize-none"
                  />
                </div>

                <Button
                  onClick={handleSubmitBid}
                  disabled={submitting || !bidAmount || !proposal}
                  className="w-full md:w-auto"
                >
                  {submitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <span>Submit Bid</span>
                      <Send className="w-4 h-4 ml-2" />
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventBiddingPage;