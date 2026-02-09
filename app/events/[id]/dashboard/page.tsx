'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, Download, ReceiptText, Hash, 
  ExternalLink, Users, CheckCircle2, Clock 
} from 'lucide-react';

interface EventRSVPs {
  event: { id: string; title: string; };
  rsvps: any[];
  total: number;
  confirmed: number;
}

export default function EventDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const { user, bearerToken } = useAuth();
  const eventId = params.id as string;

  const [data, setData] = useState<EventRSVPs | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !bearerToken) { router.push('/auth/login'); return; }
    fetchRSVPs();
  }, [eventId, user, bearerToken]);

  const fetchRSVPs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/events/${eventId}/rsvps`, {
        headers: { 'Authorization': `Bearer ${bearerToken}` },
      });
      if (!response.ok) throw new Error('Unauthorized or failed to fetch');
      const rsvpData = await response.json();
      setData(rsvpData);
    } catch (err: any) { setError(err.message); }
    finally { setIsLoading(false); }
  };

  if (isLoading) return <div className="min-h-screen bg-white flex items-center justify-center font-medium text-neutral-400">Loading guests...</div>;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] selection:bg-orange-100 pb-20">
      <main className="max-w-[1200px] mx-auto px-6 pt-12">
        
        {/* Luma Header: Minimalist Navigation & Export */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.push(`/events/${eventId}`)}
              className="w-10 h-10 rounded-full border border-black/[0.05] dark:border-white/[0.05] flex items-center justify-center hover:bg-white dark:hover:bg-white/5 transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-500" />
            </button>
            <div className="space-y-1">
              <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">Guest List</h1>
              <p className="text-sm text-neutral-500 font-medium">{data?.event.title}</p>
            </div>
          </div>

          <Button 
            onClick={() => {/* export logic */}}
            variant="outline" 
            className="rounded-full h-11 px-6 border-black/[0.08] dark:border-white/[0.08] font-bold text-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Stats: Clean "Floating" Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { label: 'Total RSVPs', value: data?.total, icon: Users, color: 'text-neutral-900' },
            { label: 'Confirmed', value: data?.confirmed, icon: CheckCircle2, color: 'text-emerald-500' },
            { label: 'Pending', value: (data?.total || 0) - (data?.confirmed || 0), icon: Clock, color: 'text-orange-500' }
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-[#0c0c0c] border border-black/[0.05] dark:border-white/[0.05] rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">{stat.label}</span>
              </div>
              <div className={`text-4xl font-semibold tracking-tighter ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* RSVP List: Clean Horizontal Rows */}
        <div className="bg-white dark:bg-[#0c0c0c] border border-black/[0.05] dark:border-white/[0.05] rounded-[32px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/[0.03] dark:border-white/[0.03]">
                  {['Guest', 'Status', 'Payment', 'Transaction', 'Date'].map((h) => (
                    <th key={h} className="px-8 py-5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.03] dark:divide-white/[0.03]">
                {data?.rsvps.map((rsvp) => (
                  <motion.tr 
                    key={rsvp.id} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-500">
                          {(rsvp.user.name || rsvp.user.externalId)[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                            {rsvp.user.name || rsvp.user.externalId}
                          </div>
                          <div className="text-xs text-neutral-400">{rsvp.user.email || 'No email provided'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                        rsvp.status === 'CONFIRMED' 
                        ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30' 
                        : 'bg-orange-100 text-orange-600 dark:bg-orange-950/30'
                      }`}>
                        {rsvp.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      {rsvp.payment ? `${rsvp.payment.amount} ${rsvp.payment.currency}` : '—'}
                    </td>
                    <td className="px-8 py-6">
                      {rsvp.payment?.receiptNumber ? (
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                          <ReceiptText className="w-3.5 h-3.5" /> {rsvp.payment.receiptNumber}
                        </div>
                      ) : '—'}
                    </td>
                    <td className="px-8 py-6 text-xs text-neutral-400 font-medium">
                      {new Date(rsvp.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}