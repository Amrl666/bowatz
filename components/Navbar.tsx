import Link from 'next/link'
import Image from 'next/image'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import LogoutButton from './LogoutButton'
import MobileNav from './MobileNav'

export default async function Navbar() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="sticky top-0 z-50 bg-brand-surface/95 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-350 mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image 
            src="/bowatz.png" 
            alt="Logo bowatz" 
            width={160}  
            height={44}  
            className="object-contain h-10 md:h-11 w-auto" 
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-[12px]">
          <Link href="/" 
            className="relative text-brand-text font-medium tracking-wide
                       after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-brand-amber after:scale-x-0
                       hover:after:scale-x-100 after:transition-transform after:duration-300">
            Katalog
          </Link>
          {user ? (
            <div className="flex items-center gap-5">
              <Link href="/admin"
                className="text-brand-amber font-semibold tracking-wide hover:text-brand-amber/80 transition-colors">
                Admin
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <Link href="/login"
              className="text-brand-text-muted hover:text-brand-text border-2 border-brand-border
                         px-4 py-1.5 transition-all duration-200 hover:border-brand-text tracking-wide">
              Login
            </Link>
          )}
        </div>

        <MobileNav isLoggedIn={!!user} />
      </div>
    </nav>
  )
}
