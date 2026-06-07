import Link from 'next/link'
import Image from 'next/image'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Heart, ShoppingCart, User, Search } from 'lucide-react'
import MobileNav from './MobileNav'

export default async function Navbar() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 max-w-7xl mx-auto">
        <div className="flex items-center space-x-6 md:space-x-8">
          <Link href="/">
            <Image 
              src="/bowatz.png" 
              alt="bowatz" 
              width={120}  
              height={36}  
              className="object-contain h-8 md:h-9 w-auto"
            />
          </Link>
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <Link href="/" className="hover:text-gray-600 transition-colors text-gray-900">Catalog</Link>
            {user && (
              <Link href="/admin" className="hover:text-gray-600 transition-colors text-gray-900">Admin</Link>
            )}
          </nav>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <form action="/" method="GET" className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              name="q"
              placeholder="Search items..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-sm text-sm focus:bg-white focus:border-gray-300 focus:ring-0 outline-none transition-all text-gray-900 placeholder:text-gray-400"
            />
          </form>
        </div>

        <div className="flex items-center space-x-5 text-sm font-medium">
          {user ? (
            <Link href="/admin" className="hidden md:block text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors">
              Admin
            </Link>
          ) : (
            <Link href="/login" className="hidden md:block text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              Login
            </Link>
          )}
          <button className="hover:text-gray-600 transition-colors text-gray-900"><Heart className="h-5 w-5" /></button>
          <button className="hover:text-gray-600 transition-colors text-gray-900"><ShoppingCart className="h-5 w-5" /></button>
          <button className="hover:text-gray-600 transition-colors text-gray-900"><User className="h-5 w-5" /></button>
          <MobileNav isLoggedIn={!!user} />
        </div>
      </div>
    </header>
  )
}
