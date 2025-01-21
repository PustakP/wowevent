'use client';

import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Calendar, Search, Plus } from 'lucide-react';

const events = [
  {
    id: 1,
    name: 'Tech Conference 2024',
    date: 'March 15-17, 2024',
    location: 'San Francisco, CA',
    attendees: 500,
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Product Launch Event',
    date: 'April 5, 2024',
    location: 'New York, NY',
    attendees: 200,
    status: 'Planning',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Annual Company Gala',
    date: 'May 20, 2024',
    location: 'Chicago, IL',
    attendees: 300,
    status: 'Planning',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&auto=format&fit=crop',
  },
];

export default function Events() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Events</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Create New Event
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Management</CardTitle>
          <CardDescription>View and manage all your events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search events..."
                className="pl-9"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="past">Past</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <img
                  src={event.image}
                  alt={event.name}
                  className="h-48 w-full object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{event.name}</h3>
                  <div className="mt-2 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </div>
                    <div>{event.location}</div>
                    <div className="flex items-center justify-between">
                      <span>{event.attendees} Attendees</span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.status === 'Upcoming'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="flex-1">Edit</Button>
                    <Button variant="outline" className="flex-1">View</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}