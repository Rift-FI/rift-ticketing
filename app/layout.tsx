import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/providers'
import { ServiceWorkerRegistration } from '@/components/service-worker-registration'
import './globals.css'

const geist = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Hafla - Event Discovery & Ticketing Platform',
  description: 'Discover and book curated events in your community. Secure payments with M-Pesa and USDC. Instant confirmations and seamless event management.',
  generator: 'Next.js',
  applicationName: 'Hafla',
  referrer: 'origin-when-cross-origin',
  keywords: ['events', 'ticketing', 'RSVP', 'event management', 'tickets'],
  authors: [{ name: 'Hafla' }],
  creator: 'Hafla',
  publisher: 'Hafla',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://events.riftfi.xyz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://events.riftfi.xyz',
    siteName: 'Hafla',
    title: 'Hafla - Event Discovery & Ticketing Platform',
    description: 'Discover and book curated events in your community. Secure payments with M-Pesa and USDC. Instant confirmations and seamless event management.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Hafla Event Ticketing Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hafla - Event Discovery & Ticketing Platform',
    description: 'Discover and book curated events in your community. Secure payments with M-Pesa and USDC. Instant confirmations and seamless event management.',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: 'any' },
      { url: '/logo.png', type: 'image/png', sizes: '32x32' },
      { url: '/logo.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/logo.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Hafla',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#C85D2E" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Hafla" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
