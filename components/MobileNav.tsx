'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import LogoutButton from './LogoutButton'

export default function MobileNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)}
        className="p-2 text-brand-text-muted hover:text-brand-text transition-colors -mr-2"
        aria-label={open ? 'Tutup menu' : 'Buka menu'}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="fixed inset-0 top-14 z-50 animate-fade-in">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute top-0 left-0 right-0 bg-brand-surface border-b border-brand-border shadow-xl animate-scale-in">
            <div className="flex flex-col px-6 py-6 gap-2">
              <Link href="/" onClick={() => setOpen(false)}
                className="text-[14px] text-brand-text font-medium py-3 border-b border-brand-border/50
                           hover:text-brand-amber transition-colors">
                Katalog
              </Link>
              {isLoggedIn ? (
                <>
                  <Link href="/admin" onClick={() => setOpen(false)}
                    className="text-[14px] text-brand-amber font-semibold tracking-wide py-3
                               border-b border-brand-border/50 hover:text-brand-amber/80 transition-colors">
                    Admin
                  </Link>
                  <div className="pt-2">
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)}
                  className="text-[14px] text-brand-text-muted font-medium py-3
                             hover:text-brand-text transition-colors">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
