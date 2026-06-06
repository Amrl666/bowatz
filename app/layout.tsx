import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast' // ← 1. Import Toaster

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'bowatz',
  description: 'Katalog produk bowatzzz',
  icons: { icon: '/BOWATZ.jpeg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans bg-brand-bg min-h-screen text-brand-text`}>
        <Navbar />
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#FFFFFF',
              borderRadius: '0px',
              fontSize: '13px'
            }
          }} 
        />
        {children}
      </body>
    </html>
  )
}