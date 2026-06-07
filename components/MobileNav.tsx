'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MobileNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <button onClick={() => setOpen(!open)}
        className="md:hidden p-1.5 text-gray-900 hover:text-gray-600 transition-colors -mr-1"
        aria-label={open ? 'Close menu' : 'Open menu'}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          {open ? (
            <path d="M5 5l10 10M15 5L5 15" />
          ) : (
            <path d="M3 5h14M3 10h14M3 15h14" />
          )}
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 top-[57px] z-50 animate-fade-in">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-xl animate-scale-in">
            <div className="flex flex-col px-6 py-6 gap-2">
              <Link href="/" onClick={() => setOpen(false)}
                className="text-sm text-gray-900 font-medium py-3 border-b border-gray-100 hover:text-gray-600 transition-colors">
                Catalog
              </Link>
              {isLoggedIn ? (
                <>
                  <Link href="/admin" onClick={() => setOpen(false)}
                    className="text-sm text-gray-900 font-semibold py-3 border-b border-gray-100 hover:text-gray-600 transition-colors">
                    Admin
                  </Link>
                  <form action="/auth/logout" method="POST" className="pt-2">
                    <button type="submit"
                      className="text-sm text-gray-500 font-medium py-2 hover:text-gray-900 transition-colors">
                      Logout
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)}
                  className="text-sm text-gray-500 font-medium py-3 hover:text-gray-900 transition-colors">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
