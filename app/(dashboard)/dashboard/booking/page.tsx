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
import { Calendar } from '../../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Search, Star, MapPin } from 'lucide-react';
import { useState } from 'react';

const hotels = [
  {
    id: 1,
    name: 'Grand Hotel Plaza',
    location: 'Downtown',
    price: 299,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant'],
  },
  {
    id: 2,
    name: 'Seaside Resort',
    location: 'Beachfront',
    price: 399,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop',
    amenities: ['Beach Access', 'Pool', 'Restaurant', 'Bar'],
  },
  {
    id: 3,
    name: 'Business Hotel',
    location: 'Financial District',
    price: 249,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800&auto=format&fit=crop',
    amenities: ['Business Center', 'Free WiFi', 'Restaurant'],
  },
];

export default function Booking() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hotel & Flights</h1>
        <p className="text-muted-foreground">Find and book accommodations for your event</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find the perfect stay for your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input className="pl-9" placeholder="Where are you going?" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Check-in</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Guests</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Number of guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{hotel.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm">{hotel.rating}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{hotel.location}</p>
              <div className="mt-2">
                <p className="text-sm">Amenities:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {hotel.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-bold">${hotel.price}/night</p>
                <Button>Book Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}