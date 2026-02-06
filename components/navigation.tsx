'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User } from 'lucide-react';

export function Navigation() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Only apply scroll logic on homepage
      if (isHomePage) {
        // Hero section is 90vh, so switch theme after scrolling past it
        const heroHeight = window.innerHeight * 0.9;
        setIsScrolled(window.scrollY > heroHeight);
      } else {
        // On other pages, always use dark theme
        setIsScrolled(true);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <motion.nav
      className="sticky top-0 z-50 w-full border-b border-transparent transition-all"
      style={{ 
        backgroundColor: 'transparent',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
            <Link href="/" className="flex items-center gap-3 sm:gap-4">
              <Image
                src="/logo.png"
                alt="Hafla"
                width={160}
                height={160}
                className="h-32 w-32 sm:h-40 sm:w-40 object-contain"
              />
              <span className={`font-bold text-lg sm:text-xl tracking-tight transition-colors ${
                isScrolled 
                  ? 'text-black drop-shadow-lg' 
                  : 'text-white drop-shadow-lg'
              }`}>
                Hafla
              </span>
            </Link>

            <div className="hidden gap-6 md:flex">
              <Link
                href="/events"
                className={`text-sm font-medium transition-colors drop-shadow-md ${
                  isScrolled 
                    ? 'text-black/90 hover:text-black' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                Browse Events
              </Link>
              {user && (
                <Link
                  href="/my-rsvps"
                  className={`text-sm font-medium transition-colors drop-shadow-md ${
                    isScrolled 
                      ? 'text-black/90 hover:text-black' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  My RSVPs
                </Link>
              )}
            </div>
          </div>

          <div className="hidden gap-4 md:flex items-center">
            {user ? (
              <>
                <Link href="/events/create">
                  <Button
                    size="sm"
                    className={`hidden lg:inline-flex shadow-sm border-0 transition-colors ${
                      isScrolled 
                        ? 'bg-[#1F2D3A] hover:bg-[#2A3A4A] text-white' 
                        : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                    }`}
                  >
                    Create Event
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`flex items-center gap-2 transition-colors ${
                        isScrolled 
                          ? 'border-[#1F2D3A]/30 bg-[#1F2D3A]/10 hover:border-[#1F2D3A]/50 hover:bg-[#1F2D3A]/20 text-black' 
                          : 'border-white/30 bg-white/10 hover:border-white/50 hover:bg-white/20 text-white backdrop-blur-sm'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline max-w-[120px] truncate">
                        {user.name || user.externalId}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wallet">Wallet</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/my-rsvps">My RSVPs</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/events/create">Create Event</Link>
                    </DropdownMenuItem>
                    {user?.role === 'ORGANIZER' && (
                      <DropdownMenuItem asChild>
                        <Link href="/organizer">Organizer Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        logout();
                      }}
                      className="text-[#e54d2e]"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`transition-colors ${
                      isScrolled 
                        ? 'text-black/90 hover:bg-[#1F2D3A]/10' 
                        : 'text-white/90 hover:bg-white/10'
                    }`}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button
                    size="sm"
                    className={`shadow-sm border-0 transition-colors ${
                      isScrolled 
                        ? 'bg-[#1F2D3A] hover:bg-[#2A3A4A] text-white' 
                        : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                    }`}
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg border transition-colors ${
              isScrolled 
                ? 'border-[#1F2D3A]/30 bg-[#1F2D3A]/10 hover:border-[#1F2D3A]/50 hover:bg-[#1F2D3A]/20 text-black' 
                : 'border-white/30 bg-white/10 hover:border-white/50 hover:bg-white/20 text-white backdrop-blur-md'
            }`}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isOpen && (
          <div className={`md:hidden pb-4 pt-4 space-y-4 border-t backdrop-blur-md transition-colors ${
            isScrolled 
              ? 'border-[#1F2D3A]/20 bg-white/90' 
              : 'border-white/20 bg-black/20'
          }`}>
            <Link 
              href="/events" 
              className={`block text-sm font-medium transition-colors ${
                isScrolled 
                  ? 'text-black/90 hover:text-black' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Browse Events
            </Link>
            {user && (
              <Link 
                href="/my-rsvps" 
                className={`block text-sm font-medium transition-colors ${
                  isScrolled 
                    ? 'text-black/90 hover:text-black' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                My RSVPs
              </Link>
            )}
            {user ? (
              <>
                <Link 
                  href="/profile" 
                  className={`block text-sm font-medium transition-colors ${
                    isScrolled 
                      ? 'text-black/90 hover:text-black' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  Profile
                </Link>
                <Link 
                  href="/wallet" 
                  className={`block text-sm font-medium transition-colors ${
                    isScrolled 
                      ? 'text-black/90 hover:text-black' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  Wallet
                </Link>
                <Link 
                  href="/events/create" 
                  className={`block text-sm font-medium transition-colors ${
                    isScrolled 
                      ? 'text-black/90 hover:text-black' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  Create Event
                </Link>
                {user.role === 'ORGANIZER' && (
                  <Link 
                    href="/organizer" 
                    className={`block text-sm font-medium transition-colors ${
                      isScrolled 
                        ? 'text-black/90 hover:text-black' 
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    Organizer Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left text-sm font-medium text-[#e54d2e]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/login" 
                  className={`block text-sm font-medium transition-colors ${
                    isScrolled 
                      ? 'text-black/90 hover:text-black' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  href="/auth/signup" 
                  className={`block text-sm font-medium transition-colors ${
                    isScrolled 
                      ? 'text-black/90 hover:text-black' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </motion.nav>
  );
}
