import Link from 'next/link'
import Image from 'next/image'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import LogoutButton from './LogoutButton'

export default async function Navbar() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="sticky top-0 z-50 bg-brand-surface border-b border-brand-border">
      <div className="max-w-350 mx-auto px-6 h-12 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="/BOWATZ.jpeg" 
            alt="Logo bowatzzz" 
            width={110}  
            height={32}  
            className="object-contain h-8 w-auto" 
          />
        </Link>

        <div className="flex items-center gap-6 text-[12px]">
          <Link href="/" className="text-brand-text-muted hover:text-brand-text transition-colors">
            Katalog
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              {/* Amber muncul di sini sebagai sinyal "sedang login sebagai admin" */}
              <Link href="/admin"
                className="text-brand-amber font-semibold tracking-wide hover:text-brand-amber/80 transition-colors">
                Admin
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <Link href="/login"
              className="text-brand-text-muted hover:text-brand-text border border-brand-border
                         px-3 py-1 transition-colors hover:border-brand-border-dark">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}