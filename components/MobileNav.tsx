'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import LogoutButton from './LogoutButton'

export default function MobileNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)}
        className="p-1 text-brand-text-muted hover:text-brand-text transition-colors">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="absolute top-12 left-0 right-0 bg-brand-surface border-b border-brand-border shadow-lg">
          <div className="flex flex-col px-6 py-4 gap-3">
            <Link href="/" onClick={() => setOpen(false)}
              className="text-[13px] text-brand-text-muted hover:text-brand-text transition-colors">
              Katalog
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/admin" onClick={() => setOpen(false)}
                  className="text-[13px] text-brand-amber font-semibold tracking-wide hover:text-brand-amber/80 transition-colors">
                  Admin
                </Link>
                <LogoutButton />
              </>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)}
                className="text-[13px] text-brand-text-muted hover:text-brand-text border border-brand-border
                           px-3 py-1.5 self-start transition-colors hover:border-brand-border-dark">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
