'use client';

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Shield, Mail, User as UserIcon, ChevronRight } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-neutral-400 font-medium uppercase tracking-widest text-xs">
        Syncing Profile...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] selection:bg-orange-100 flex flex-col">
      <Navigation />

      {/* Main Content: pt-32 ensures space for the floating Navigation */}
      <main className="flex-1 w-full max-w-[800px] mx-auto px-6 pt-32 pb-32">
        
        {/* Luma Header */}
        <motion.header 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 space-y-2 text-center sm:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-neutral-900 dark:text-white leading-none">
            Profile Settings
          </h1>
          <p className="text-xl text-neutral-500 font-medium italic font-serif">Manage your personal presence.</p>
        </motion.header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-12"
        >
          {/* Identity Section */}
          <section className="space-y-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 border-b border-black/[0.05] dark:border-white/[0.05] pb-4">
              Account Identity
            </h2>
            
            <div className="flex items-center gap-6 py-4 group">
              <div className="h-20 w-20 rounded-[32px] bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-black/[0.05] dark:border-white/[0.05] shadow-sm transition-transform group-hover:rotate-2">
                <span className="text-2xl font-bold text-neutral-400">
                  {(user.name || user.externalId || 'U').charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <UserIcon className="w-3 h-3" /> Display Name
                </div>
                <div className="text-2xl font-semibold text-neutral-900 dark:text-white leading-tight tracking-tight">
                  {user.name || user.externalId || 'User'}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="space-y-6 pt-6">
             <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 border-b border-black/[0.05] dark:border-white/[0.05] pb-4">
              Contact & Support
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Support Email
                </div>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">admin@riftfi.xyz</p>
              </div>
            </div>
          </section>

          {/* Security & Access Section */}
          <section className="space-y-6 pt-6">
             <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 border-b border-black/[0.05] dark:border-white/[0.05] pb-4">
              Security
            </h2>
            
            <div className="bg-white dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] rounded-[32px] p-8 flex items-center justify-between group cursor-default shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
                        <Shield className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-widest">Password Management</h4>
                        <p className="text-xs text-neutral-500 font-medium">Self-service updates coming soon.</p>
                    </div>
                </div>
                <div className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest italic">Locked</div>
            </div>
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}