import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'bowatzzz',
  description: 'Katalog produk bowatzzz',
  icons: {
    icon: '/BOWATZ.jpeg', 
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans bg-brand-bg min-h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}