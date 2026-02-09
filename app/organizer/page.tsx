'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Users, TrendingUp, Calendar, MapPin, LayoutDashboard } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  capacity: number;
  category: string;
  image?: string;
  rsvps: { id: string }[];
}

export default function OrganizerPage() {
  const { user, bearerToken, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) router.push('/auth/login');
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user || !bearerToken) return;

    const loadEvents = async () => {
      try {
        const response = await fetch('/api/events', {
          headers: { 'Authorization': `Bearer ${bearerToken}` },
        });
        const allEvents = await response.json();
        const organizerEvents = allEvents.filter((e: any) => e.organizer?.id === user.id);
        setEvents(organizerEvents);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadEvents();
  }, [user, bearerToken]);

  const totalRevenue = events.reduce((sum, e) => sum + e.rsvps.length * e.price, 0);
  const totalAttendees = events.reduce((sum, e) => sum + e.rsvps.length, 0);

  if (authLoading || isLoading) return (
    <div className="min-h-screen bg-white flex items-center justify-center text-neutral-400 font-medium tracking-widest uppercase text-xs">
      Syncing Dashboard...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] selection:bg-orange-100 flex flex-col">
      <Navigation />

      {/* Main Content: pt-32 ensures space for the floating Navigation */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 pt-32 pb-32">
        
        {/* Luma Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-neutral-900 dark:text-white leading-none">
              Manage Events
            </h1>
            <p className="text-lg text-neutral-500 font-medium italic font-serif">Track your community growth.</p>
          </div>
          <Link href="/organizer/create">
            <Button className="rounded-full bg-black dark:bg-white text-white dark:text-black font-bold px-8 h-12 shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
              <Plus className="w-5 h-5 mr-2 stroke-[3]" />
              New Event
            </Button>
          </Link>
        </div>

        {/* Stats: Borderless Luma Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 border-y border-black/[0.05] dark:border-white/[0.05] py-12">
          {[
            { label: 'Events Organized', value: events.length, icon: LayoutDashboard },
            { label: 'Total Attendees', value: totalAttendees, icon: Users },
            { label: 'Estimated Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: TrendingUp }
          ].map((stat, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                <stat.icon className="w-3 h-3" /> {stat.label}
              </div>
              <div className="text-4xl font-semibold tracking-tighter text-neutral-900 dark:text-white">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Events Grid: Postcard Style */}
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <p className="text-neutral-500 font-medium">You haven&apos;t organized any events yet.</p>
            <Link href="/organizer/create">
              <Button variant="outline" className="rounded-full border-black/[0.1] px-8 font-bold">Start Hosting</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {events.map((event) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group flex flex-col"
              >
                {/* Event Image: Smaller, padded frame */}
                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-neutral-100 dark:bg-neutral-900/40 mb-6 p-6 flex items-center justify-center transition-all group-hover:bg-neutral-200/50">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-sm">
                    <Image 
                      src={event.image || '/placeholder.jpeg'} 
                      alt={event.title} 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                  {/* Floating Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/organizer/edit/${event.id}`}>
                      <button className="w-10 h-10 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <Edit className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Details Section */}
                <div className="space-y-2 px-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white truncate">
                    {event.title}
                  </h3>
                  
                  {/* Dashboard-specific Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-black/[0.03] dark:border-white/[0.03]">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Sold</span>
                      <span className="text-sm font-bold text-neutral-900 dark:text-white">{event.rsvps.length} / {event.capacity}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Revenue</span>
                      <span className="text-sm font-bold text-emerald-600">${event.rsvps.length * event.price}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}