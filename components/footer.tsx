'use client';

import Link from 'next/link';
import { Twitter, Instagram, Github, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#fafafa] dark:bg-[#050505] border-t border-black/[0.03] dark:border-white/[0.03] pt-24 pb-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4">
          
          {/* Brand & Mission - The Luma "Quiet" approach */}
          <div className="space-y-6 max-w-xs">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 bg-black dark:bg-white rounded-lg flex items-center justify-center transition-transform group-hover:rotate-3">
                <span className="text-white dark:text-black font-bold text-sm">H</span>
              </div>
              <span className="font-semibold text-lg tracking-tight text-neutral-900 dark:text-white">
                Hafla
              </span>
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed font-normal">
              The professional way to host and discover curated community experiences. Built for Africa.
            </p>
          </div>

          {/* Navigation Links - Small, clean columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Product</h4>
              <ul className="space-y-3">
                <li><FooterLink href="/events">Explore</FooterLink></li>
                <li><FooterLink href="/events/create">Host</FooterLink></li>
                <li><FooterLink href="/pricing">Pricing</FooterLink></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Connect</h4>
              <ul className="space-y-3">
                <li><FooterLink href="https://twitter.com">Twitter</FooterLink></li>
                <li><FooterLink href="https://instagram.com">Instagram</FooterLink></li>
                <li><FooterLink href="mailto:admin@riftfi.xyz">Support</FooterLink></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Legal</h4>
              <ul className="space-y-3">
                <li><FooterLink href="/privacy">Privacy</FooterLink></li>
                <li><FooterLink href="/terms">Terms</FooterLink></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Extremely Minimal */}
        <div className="mt-24 pt-8 border-t border-black/[0.03] dark:border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-medium text-neutral-400">
            &copy; {new Date().getFullYear()} Hafla Inc.
          </p>
          <div className="flex items-center gap-6">
            <SocialIcon icon={Twitter} href="#" />
            <SocialIcon icon={Instagram} href="#" />
            <SocialIcon icon={Github} href="#" />
            <SocialIcon icon={Mail} href="mailto:admin@riftfi.xyz" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-[13px] font-medium text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}

function SocialIcon({ icon: Icon, href }: { icon: any, href: string }) {
  return (
    <a 
      href={href} 
      className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
      target="_blank" 
      rel="noopener noreferrer"
    >
      <Icon className="w-4 h-4 stroke-[1.5]" />
    </a>
  );
}