'use client';

import { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { Loader2 } from 'lucide-react';

export default function TransactionHandlerPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, bearerToken } = useAuth();
  const eventId = params.id as string;
  const transaction = params.transaction as string[];

  useEffect(() => {
    // Extract transaction code from the path
    const transactionCode = Array.isArray(transaction) ? transaction[0] : transaction;
    const orderId = searchParams.get('orderId');

    if (!transactionCode || !orderId || !user || !bearerToken) {
      router.replace(`/events/${eventId}`);
      return;
    }

    const handleTransaction = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}/transaction`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`,
          },
          body: JSON.stringify({ transactionCode, orderId }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to process transaction');
        }

        router.replace(`/events/${eventId}`);
      } catch (err: any) {
        console.error('Error handling transaction code:', err);
        router.replace(`/events/${eventId}?error=${encodeURIComponent(err.message)}`);
      }
    };

    handleTransaction();
  }, [eventId, transaction, searchParams, user, bearerToken, router]);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center space-y-6"
      >
        {/* Luma-style subtle loader */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-12 h-12 rounded-full border border-black/[0.05] dark:border-white/[0.05]" />
          <Loader2 className="w-6 h-6 text-orange-600 animate-spin stroke-[2.5]" />
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white tracking-tight">
            Confirming your spot
          </h2>
          <p className="text-sm text-neutral-500 font-medium">
            This will only take a moment.
          </p>
        </div>

        {/* Decorative Luma-style blurred orbs for the background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-100/30 dark:bg-orange-950/10 blur-[100px] rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}