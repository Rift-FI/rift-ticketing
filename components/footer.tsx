'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Twitter, Instagram, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-[#E9F1F4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1.2fr,1.2fr] gap-10">
          {/* Brand Section */}
          <div>
            <Link href="/" className="flex items-center gap-3 sm:gap-4 mb-4">
              <Image
                src="/logo.png"
                alt="Hafla"
                width={160}
                height={160}
                className="h-32 w-32 sm:h-40 sm:w-40 object-contain"
              />
              <span className="font-bold text-xl tracking-tight text-[#1F2D3A]">Hafla</span>
            </Link>
            <p className="text-sm text-[#4A5568] max-w-md">
              Your trusted platform for discovering and booking events. Connect with your community through curated experiences with secure, instant payments.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-[0.18em] text-[#4A5568]">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/events" className="text-[#4A5568] hover:text-[#C85D2E] transition-colors">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link href="/events/create" className="text-[#4A5568] hover:text-[#C85D2E] transition-colors">
                  Create Event
                </Link>
              </li>
              <li>
                <Link href="/my-rsvps" className="text-[#4A5568] hover:text-[#C85D2E] transition-colors">
                  My RSVPs
                </Link>
              </li>
              <li>
                <Link href="/wallet" className="text-[#4A5568] hover:text-[#C85D2E] transition-colors">
                  Wallet
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-[0.18em] text-[#4A5568]">
              Stay in touch
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:admin@riftfi.xyz"
                className="inline-flex items-center gap-2 text-[#4A5568] hover:text-[#C85D2E] transition-colors"
              >
                <Mail className="w-4 h-4" />
                admin@riftfi.xyz
              </a>
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E9F1F4] bg-[#F8F9FA] hover:border-[#C85D2E] hover:bg-[#C85D2E]/10 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-[#4A5568]" />
                </button>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E9F1F4] bg-[#F8F9FA] hover:border-[#C85D2E] hover:bg-[#C85D2E]/10 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#4A5568]" />
                </button>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E9F1F4] bg-[#F8F9FA] hover:border-[#C85D2E] hover:bg-[#C85D2E]/10 transition-colors"
                >
                  <Github className="w-4 h-4 text-[#4A5568]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#E9F1F4] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#4A5568]">
          <p>&copy; {new Date().getFullYear()} Hafla. All rights reserved.</p>
          <p>
            Powered by{' '}
            <span className="font-medium text-[#1F2D3A]">
              blockchain technology • secure payments • instant confirmations
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
