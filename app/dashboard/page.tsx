'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/navigation';
import { Session } from 'next-auth';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TicketX as Tickets, TrendingUp, Calendar } from 'lucide-react';

interface UserTicket {
  id: string;
  eventTitle: string;
  price: number;
  status: string;
  date: string;
}

export default function DashboardPage() {
  const { user, bearerToken } = useAuth();
  const router = useRouter();
  const [tickets, setTickets] = useState<UserTicket[]>([]);
  const [stats, setStats] = useState({
    totalTickets: 0,
    totalSpent: 0,
    upcomingEvents: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    loadDashboard();
  }, [user, router]);

  const loadDashboard = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/rsvps', {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch RSVPs');
      
      const userRsvps = await response.json();
      
      const formattedTickets: UserTicket[] = userRsvps.map((rsvp: any) => ({
        id: rsvp.id,
        eventTitle: rsvp.event?.title || 'Event',
        price: rsvp.event?.price || 0,
        status: 'confirmed',
        date: rsvp.event?.date ? new Date(rsvp.event.date).toLocaleDateString() : '',
      }));

      setTickets(formattedTickets);

      const totalSpent = formattedTickets.reduce((sum, t) => sum + t.price, 0);

      setStats({
        totalTickets: formattedTickets.length,
        totalSpent,
        upcomingEvents: formattedTickets.length,
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = [
    { name: 'Jan', tickets: 2 },
    { name: 'Feb', tickets: 1 },
    { name: 'Mar', tickets: 0 },
    { name: 'Apr', tickets: 3 },
    { name: 'May', tickets: 2 },
    { name: 'Jun', tickets: 1 },
  ];

  if (isLoading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-[#E9F1F4] px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-4 md:grid-cols-3 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 rounded-lg bg-gray-200 animate-pulse" />
              ))}
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#E9F1F4]">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1F2D3A]">Welcome, {user?.externalId}!</h1>
            <p className="text-[#4A5568]">
              Here's your event booking overview
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#1F2D3A]">
                  Total Tickets
                </CardTitle>
                <Tickets className="h-4 w-4 text-[#C85D2E]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#1F2D3A]">{stats.totalTickets}</div>
                <p className="text-xs text-[#4A5568]">
                  Bookings made
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#1F2D3A]">
                  Total Spent
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-[#C85D2E]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#1F2D3A]">
                  {stats.totalSpent} USD
                </div>
                <p className="text-xs text-[#4A5568]">
                  Across all events
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#1F2D3A]">
                  RSVPs
                </CardTitle>
                <Calendar className="h-4 w-4 text-[#C85D2E]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#1F2D3A]">
                  {stats.upcomingEvents}
                </div>
                <p className="text-xs text-[#4A5568]">
                  Active RSVPs
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 mb-8">
            {/* Chart */}
            <Card className="lg:col-span-2 bg-white">
              <CardHeader>
                <CardTitle className="text-[#1F2D3A]">RSVP Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tickets" fill="#C85D2E" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-[#1F2D3A]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/events" className="block">
                  <Button className="w-full bg-transparent" variant="outline">
                    Browse Events
                  </Button>
                </Link>
                <Link href="/my-rsvps" className="block">
                  <Button className="w-full bg-transparent" variant="outline">
                    My RSVPs
                  </Button>
                </Link>
                <Link href="/events/create" className="block">
                  <Button className="w-full bg-[#C85D2E] text-white hover:bg-[#B84A1F]">
                    Create Event
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recent RSVPs */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-[#1F2D3A]">Your RSVPs</CardTitle>
            </CardHeader>
            <CardContent>
              {tickets.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    No RSVPs yet
                  </p>
                  <Link href="/events">
                    <Button>Browse Events</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {tickets.slice(0, 5).map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-[#1F2D3A]">
                          {ticket.eventTitle}
                        </div>
                        <div className="text-sm text-[#4A5568]">
                          {ticket.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-[#1F2D3A]">{ticket.price} USD</div>
                        <div className="text-xs text-[#30a46c] capitalize">
                          {ticket.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
