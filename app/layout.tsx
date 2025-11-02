import type { Metadata, Viewport } from 'next'
import { Providers } from './components/Providers'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0052ff',
}

export const metadata: Metadata = {
  title: 'LinguaFrame - Social & Onchain Language Utility',
  description: 'Context-specific translations and collaborative language learning for Farcaster',
  keywords: ['translation', 'language learning', 'Farcaster', 'Base', 'onchain', 'Web3'],
  authors: [{ name: 'LinguaFrame Team' }],
  metadataBase: new URL('https://app-5e2a84e7-s961.vercel.app'),
  openGraph: {
    title: 'LinguaFrame - Social & Onchain Language Utility',
    description: 'Context-specific translations and collaborative language learning for Farcaster',
    type: 'website',
    images: ['/icon-512x512.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinguaFrame - Social & Onchain Language Utility',
    description: 'Context-specific translations and collaborative language learning for Farcaster',
    images: ['/icon-512x512.png'],
  },
  icons: {
    icon: '/icon-256x256.png',
    apple: '/icon-512x512.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="gradient-bg min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
