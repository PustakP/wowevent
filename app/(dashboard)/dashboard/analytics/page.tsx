'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const attendanceData = [
  { month: 'Jan', attendees: 1200 },
  { month: 'Feb', attendees: 1900 },
  { month: 'Mar', attendees: 1600 },
  { month: 'Apr', attendees: 2200 },
  { month: 'May', attendees: 2800 },
  { month: 'Jun', attendees: 2400 },
];

const engagementData = [
  { session: 'Keynote', engagement: 85 },
  { session: 'Workshop A', engagement: 75 },
  { session: 'Panel', engagement: 90 },
  { session: 'Workshop B', engagement: 70 },
  { session: 'Networking', engagement: 95 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <Select defaultValue="last6months">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last6months">Last 6 Months</SelectItem>
            <SelectItem value="last12months">Last 12 Months</SelectItem>
            <SelectItem value="ytd">Year to Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
            <CardDescription>Monthly attendance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="attendees"
                    stroke="#1D4ED8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Engagement</CardTitle>
            <CardDescription>Engagement scores by session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="session" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="engagement" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
          <CardDescription>Overview of important performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Average Attendance Rate
              </h4>
              <p className="text-3xl font-bold">87%</p>
              <p className="text-sm text-muted-foreground">+2.5% from last period</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Satisfaction Score
              </h4>
              <p className="text-3xl font-bold">4.8/5</p>
              <p className="text-sm text-muted-foreground">Based on 2,450 reviews</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Revenue Growth
              </h4>
              <p className="text-3xl font-bold">+32%</p>
              <p className="text-sm text-muted-foreground">Compared to last year</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}