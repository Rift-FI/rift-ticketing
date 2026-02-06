'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar, MapPin, Users, Search, Share2 } from 'lucide-react';
import Image from 'next/image';
import { EmptyEventsIllustration } from '@/components/illustrations';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number; // Price is now in KES
  capacity: number;
  category: string;
  isOnline: boolean;
  shareableUrl: string;
  image?: string | null;
  organizer: { id: string; externalId: string };
  rsvps: { id: string; status: string }[]; // Added status to RSVP
}

export default function EventsPage() {
  const { user, bearerToken } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [sellingRate, setSellingRate] = useState<number | null>(null); // For displaying ticket prices in KES
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchEvents();
    fetchExchangeRate(); // Fetch exchange rate regardless of auth status
  }, []);

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch('/api/exchange-rate');
      if (response.ok) {
        const data = await response.json();
        setSellingRate(data.sellingRate || data.rate || null);
      } else {
        console.error('Failed to fetch exchange rate');
        setSellingRate(null);
      }
    } catch (err) {
      console.error('Error fetching exchange rate:', err);
      setSellingRate(null);
    }
  };

  useEffect(() => {
    let filtered = events;

    if (category !== 'ALL') {
      filtered = filtered.filter(e => e.category === category);
    }

    if (search) {
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
    setShowSearchDropdown(search.length > 0 && filtered.length > 0);
  }, [search, category, events]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#E9F1F4] flex flex-col">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-6 sm:py-8 flex-1">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 max-w-[1600px] mx-auto">
          <div className="w-full sm:w-auto sm:flex-1 max-w-2xl relative" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A5568]" />
              <Input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => search && setShowSearchDropdown(true)}
                className="w-full pl-12 pr-4 py-6 text-base border-2 border-[#E9F1F4] focus:border-[#C85D2E] rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
              />
            </div>
            {/* Search Dropdown */}
            {showSearchDropdown && filteredEvents.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-full max-w-md bg-white border border-[#E9F1F4] rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {filteredEvents.slice(0, 5).map((event) => {
                  return (
                    <Link
                      key={event.id}
                      href={`/events/${event.id}`}
                      onClick={() => {
                        setSearch('');
                        setShowSearchDropdown(false);
                      }}
                      className="block p-3 hover:bg-[#F8F9FA] border-b border-[#E9F1F4] last:border-b-0 transition-colors"
                    >
                      <h3 className="font-semibold text-[#1F2D3A] truncate">{event.title}</h3>
                    </Link>
                  );
                })}
                {filteredEvents.length > 5 && (
                  <div className="p-3 text-center border-t border-[#E9F1F4]">
                    <Link
                      href={`/events?search=${encodeURIComponent(search)}`}
                      onClick={() => setShowSearchDropdown(false)}
                      className="text-sm text-[#C85D2E] hover:underline"
                    >
                      View all {filteredEvents.length} results
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
          {user && (
            <Link href="/events/create">
              <Button className="bg-[#C85D2E] hover:bg-[#B84A1F] text-white px-6 py-6 rounded-xl shadow-sm">
                Create Event
              </Button>
            </Link>
          )}
        </div>

        <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap justify-center max-w-[1600px] mx-auto px-2">
          {['ALL', 'TECH', 'ENTERTAINMENT', 'SPORTS', 'ARTS', 'BUSINESS', 'EDUCATION'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full transition-colors font-medium ${
                category === cat
                  ? 'bg-[#C85D2E] text-white hover:bg-[#B84A1F]'
                  : 'bg-white text-[#1F2D3A] border border-[#E9F1F4] hover:border-[#C85D2E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading events...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12 space-y-6">
            <div className="max-w-md mx-auto h-64 flex items-center justify-center">
              <EmptyEventsIllustration />
            </div>
            <div>
              <p className="text-lg font-semibold text-[#1F2D3A] mb-2">No events found</p>
              <p className="text-sm text-[#4A5568] mb-4">Try adjusting your search or filters</p>
              {user && (
                <Link href="/events/create">
                  <Button className="bg-gradient-to-r from-[#C85D2E] to-[#D4A574] hover:from-[#B84A1F] hover:to-[#C8965A] text-white border-0">
                    Create Your First Event
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 max-w-[1600px] mx-auto">
            {filteredEvents.map(event => {
              const eventDate = new Date(event.date);
              const confirmedRsvpsCount = event.rsvps.filter(r => r.status === 'CONFIRMED').length;
              const spotsLeft = event.capacity - confirmedRsvpsCount;
              // Price is stored in USD, convert to KES for display using selling_rate
              const eventPriceInKES = sellingRate ? (event.price * sellingRate) : null;

              return (
                <Card
                  key={event.id}
                  className="flex h-full flex-col hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#E9F1F4] hover:border-[#C85D2E] group p-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] max-w-sm min-h-[580px] sm:min-h-[600px]"
                >
                  {event.image && (
                    <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-[#C85D2E] to-[#D4A574]">
                      <Image 
                        src={event.image} 
                        alt={event.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                        <span className="text-xs font-semibold text-white bg-[#C85D2E]/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          {event.category}
                        </span>
                        {event.isOnline && (
                          <span className="text-xs font-semibold text-white bg-[#D4A574]/90 backdrop-blur-sm px-3 py-1 rounded-full">
                            Online
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {!event.image && (
                    <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-[#2E8C96] to-[#2A7A84] flex items-center justify-center">
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                        <span className="text-xs font-semibold text-white bg-[#C85D2E]/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          {event.category}
                        </span>
                        {event.isOnline && (
                          <span className="text-xs font-semibold text-white bg-[#D4A574]/90 backdrop-blur-sm px-3 py-1 rounded-full">
                            Online
                          </span>
                        )}
                      </div>
                      <Calendar className="h-16 w-16 text-white/20" />
                    </div>
                  )}
                  <CardHeader className="pb-3 px-6 pt-6">
                    <CardTitle className="line-clamp-2 text-xl mb-2 group-hover:text-[#C85D2E] transition-colors">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm text-gray-600">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col pt-0 px-6 pb-6">
                    <div className="space-y-2.5 text-sm flex-grow">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-[#C85D2E]" />
                        <span>{eventDate.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                      {!event.isOnline && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-[#C85D2E]" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users className="w-4 h-4 text-[#C85D2E]" />
                        <span>{confirmedRsvpsCount} / {event.capacity} attendees</span>
                        <span className="text-xs text-gray-500">({spotsLeft} left)</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 font-semibold">
                        {(event.price === 0 || event.price <= 0) ? (
                          <span className="text-[#D4A574]">Free</span>
                        ) : eventPriceInKES !== null ? (
                          <>
                            <span className="text-[#C85D2E]">KES {eventPriceInKES.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            <span className="text-xs text-gray-500 font-normal">(≈ {event.price.toFixed(2)} USD)</span>
                          </>
                        ) : (
                          <span className="text-[#C85D2E]">{event.price.toFixed(2)} USD</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 mt-auto border-t border-[#E9F1F4]">
                      <Link href={`/events/${event.id}`} className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-[#C85D2E] to-[#D4A574] hover:from-[#B84A1F] hover:to-[#C8965A] text-white border-0">
                          View Details
                        </Button>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#C85D2E] text-[#C85D2E] hover:bg-[#C85D2E] hover:text-white"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => {
                              const url = `${window.location.origin}/events/${event.id}?url=${event.shareableUrl}`;
                              const text = `Check out this event: ${event.title}`;
                              window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank');
                            }}
                          >
                            <span className="mr-2">📱</span> WhatsApp
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              const url = `${window.location.origin}/events/${event.id}?url=${event.shareableUrl}`;
                              const text = `Check out this event: ${event.title}`;
                              window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
                            }}
                          >
                            <span className="mr-2">✈️</span> Telegram
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              const url = `${window.location.origin}/events/${event.id}?url=${event.shareableUrl}`;
                              const text = `Check out this event: ${event.title}`;
                              window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
                            }}
                          >
                            <span className="mr-2">🐦</span> Twitter/X
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              const url = `${window.location.origin}/events/${event.id}?url=${event.shareableUrl}`;
                              window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                            }}
                          >
                            <span className="mr-2">👤</span> Facebook
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              const url = `${window.location.origin}/events/${event.id}?url=${event.shareableUrl}`;
                              window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                            }}
                          >
                            <span className="mr-2">💼</span> LinkedIn
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `${window.location.origin}/events/${event.id}?url=${event.shareableUrl}`
                              );
                              alert('Event link copied to clipboard!');
                            }}
                          >
                            <span className="mr-2">🔗</span> Copy Link
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
    </>
  );
}
