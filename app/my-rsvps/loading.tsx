
'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] selection:bg-orange-100 flex flex-col relative">
      {/* Skeleton for the Floating Navigation */}
      <div className="fixed top-0 left-0 right-0 z-[100] w-full flex justify-center pt-4 px-4 pointer-events-none">
        <div className="w-full max-w-7xl h-14 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/[0.03] dark:border-white/[0.03] backdrop-blur-md animate-pulse" />
      </div>

      <main className="flex-1 max-w-[1000px] mx-auto px-6 pt-40 pb-32 w-full">
        {/* Header Skeleton */}
        <header className="mb-16 space-y-4">
          <div className="h-12 md:h-16 w-1/2 md:w-1/3 bg-neutral-200/60 dark:bg-neutral-900/60 rounded-2xl animate-pulse" />
          <div className="h-6 w-1/4 bg-neutral-100 dark:bg-neutral-900/30 rounded-full animate-pulse" />
        </header>

        {/* List Skeletons - Staggered wave effect */}
        <div className="space-y-12">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="flex flex-col md:flex-row gap-8 items-start pb-12 border-b border-black/[0.03] dark:border-white/[0.03]"
            >
              {/* Event Thumbnail Skeleton */}
              <div 
                className="relative w-full md:w-48 aspect-[4/5] rounded-[32px] bg-neutral-200/40 dark:bg-neutral-900/40 animate-pulse" 
                style={{ animationDelay: `${i * 0.15}s` }}
              />

              {/* Details Skeleton */}
              <div className="flex-grow space-y-6 w-full pt-2">
                <div className="space-y-3">
                  <div className="h-4 w-20 bg-orange-100/50 dark:bg-orange-900/20 rounded-full animate-pulse" />
                  <div className="h-8 w-3/4 bg-neutral-200/60 dark:bg-neutral-900/60 rounded-xl animate-pulse" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="h-5 w-32 bg-neutral-100 dark:bg-neutral-900/30 rounded-full animate-pulse" />
                  <div className="h-5 w-40 bg-neutral-100 dark:bg-neutral-900/30 rounded-full animate-pulse" />
                </div>

                <div className="flex gap-4 pt-4">
                  <div className="h-10 w-24 bg-neutral-100 dark:bg-neutral-900/30 rounded-full animate-pulse" />
                  <div className="h-10 w-32 bg-neutral-100 dark:bg-neutral-900/30 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Decorative Luma Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-50/50 dark:bg-orange-950/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}