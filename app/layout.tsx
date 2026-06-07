import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'bowatz',
  description: 'Bowatz product catalog',
  icons: { icon: '/BOWATZ.jpeg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-white min-h-screen text-gray-900`}>
        <Navbar />
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            style: {
              background: '#111827',
              color: '#FFFFFF',
              borderRadius: '0px',
              fontSize: '13px'
            }
          }} 
        />
        {children}
        <Footer />
      </body>
    </html>
  )
}
