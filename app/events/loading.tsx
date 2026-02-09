'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] px-6 pt-28">
      <div className="max-w-[1200px] mx-auto">
        {/* Luma-style Header Skeleton */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="w-full md:max-w-md h-12 bg-neutral-200/50 dark:bg-neutral-900/50 rounded-2xl animate-pulse" />
          <div className="w-full md:w-32 h-11 bg-neutral-200/50 dark:bg-neutral-900/50 rounded-full animate-pulse" />
        </div>

        {/* Categories Skeleton */}
        <div className="flex items-center gap-2 pb-10 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-20 h-8 bg-neutral-100 dark:bg-neutral-900/30 rounded-full animate-pulse" 
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Gallery Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-5">
              {/* The Postcard Frame */}
              <div 
                className="aspect-[4/5] rounded-[32px] bg-neutral-200/40 dark:bg-neutral-900/40 animate-pulse" 
                style={{ animationDelay: `${i * 0.15}s` }}
              />
              
              {/* Meta Info Skeletons */}
              <div className="space-y-3 px-1">
                <div className="w-1/2 h-3 bg-neutral-100 dark:bg-neutral-900/30 rounded-full animate-pulse" />
                <div className="w-full h-5 bg-neutral-200/60 dark:bg-neutral-900/60 rounded-full animate-pulse" />
                <div className="flex justify-between items-center pt-1">
                  <div className="w-1/3 h-3 bg-neutral-100 dark:bg-neutral-900/30 rounded-full animate-pulse" />
                  <div className="w-1/4 h-3 bg-neutral-100 dark:bg-neutral-900/30 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle background glow to match the Hero theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-50/50 dark:bg-orange-950/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}