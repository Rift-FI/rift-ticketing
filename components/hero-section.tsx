'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { Calendar, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center" style={{ pointerEvents: 'auto' }}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/africa4.jpeg"
          alt="Africa"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 pointer-events-none" />
        {/* Warm earth tone overlay to enhance African theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#5C3A21]/30 via-[#A0522D]/20 to-[#C85D2E]/25 pointer-events-none" />
      </div>
      {/* Animated earth tone orbs */}
      <motion.div
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#C85D2E]/25 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#D4A574]/25 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32" style={{ pointerEvents: 'auto' }}>
        <div className="max-w-4xl mx-auto">
          {/* Content - Centered */}
          <motion.div
            className="text-center space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 backdrop-blur-md px-5 py-2.5 text-sm font-medium text-white shadow-lg"
              variants={itemVariants}
            >
              <Calendar className="w-4 h-4" />
              <span>Your trusted event discovery platform</span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-2xl"
              variants={itemVariants}
            >
              Discover events that
              <span className="block bg-gradient-to-r from-[#C85D2E] via-[#D4A574] to-[#D97706] bg-clip-text text-transparent mt-2">
                matter to you
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light drop-shadow-lg"
              variants={itemVariants}
            >
              Connect with your community through curated events. Discover experiences that inspire, engage, and bring people together.
            </motion.p>
          </motion.div>

          {/* Button outside motion.div to ensure clickability */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 relative z-[100]">
            <Button
              onClick={() => router.push('/events')}
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-[#C85D2E] to-[#D4A574] hover:from-[#B84A1F] hover:to-[#C8965A] text-white shadow-xl hover:shadow-2xl transition-all px-8 py-4 sm:py-6 text-base font-semibold border-0 backdrop-blur-sm cursor-pointer group"
              style={{ position: 'relative', zIndex: 100 }}
            >
              <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Browse Events
            </Button>
          </div>

          {/* Features highlight */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-2 shadow-md border border-white/30">
              <Zap className="w-4 h-4 text-[#C85D2E]" />
              <span className="text-sm font-medium text-white">Instant booking</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-2 shadow-md border border-white/30">
              <Calendar className="w-4 h-4 text-[#D4A574]" />
              <span className="text-sm font-medium text-white">Real-time confirmations</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
