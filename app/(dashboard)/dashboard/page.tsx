'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Calendar, Users, DollarSign, TrendingUp } from 'lucide-react';

const stats = [
  {
    name: 'Total Events',
    value: '12',
    icon: Calendar,
    trend: '+2.5%',
    description: 'vs. last month',
  },
  {
    name: 'Active Vendors',
    value: '48',
    icon: Users,
    trend: '+12.5%',
    description: 'vs. last month',
  },
  {
    name: 'Revenue',
    value: '$24,500',
    icon: DollarSign,
    trend: '+4.3%',
    description: 'vs. last month',
  },
  {
    name: 'Attendees',
    value: '2,450',
    icon: TrendingUp,
    trend: '+8.2%',
    description: 'vs. last month',
  },
];

const recentEvents = [
  {
    name: 'Tech Conference 2024',
    date: 'Mar 15, 2024',
    status: 'Active',
    attendees: 450,
  },
  {
    name: 'Product Launch',
    date: 'Mar 20, 2024',
    status: 'Planning',
    attendees: 200,
  },
  {
    name: 'Annual Gala',
    date: 'Apr 5, 2024',
    status: 'Active',
    attendees: 300,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>Create New Event</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">{stat.trend}</span> {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
          <CardDescription>Overview of your latest events</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEvents.map((event) => (
                <TableRow key={event.name}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {event.status}
                    </span>
                  </TableCell>
                  <TableCell>{event.attendees}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}