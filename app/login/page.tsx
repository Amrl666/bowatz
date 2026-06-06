'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function LoginPage() {
  const router   = useRouter()
  const supabase = createSupabaseBrowserClient()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError('Email atau password salah.'); setLoading(false); return }
    router.push('/admin')
    router.refresh()
  }

  const inp = "w-full bg-white border border-brand-border px-3 py-3 md:py-2.5 text-[13px] text-brand-text placeholder:text-brand-text-faint focus:outline-none focus:border-brand-border-dark"

  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-bg px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8 flex flex-col items-center">
          <Image 
            src="/BOWATZ.jpeg" 
            alt="Logo bowatz" 
            width={140}
            height={42} 
            className="object-contain mb-2"
          />
          <p className="text-[11px] text-brand-text-faint mt-1 tracking-widest uppercase">
            Admin Login
          </p>
        </div>

        <form onSubmit={handleLogin}
          className="bg-brand-surface border border-brand-border p-5 md:p-6 space-y-4">
          {error && (
            <div className="border border-red-200 bg-red-50 text-red-600 text-[12px] px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-1">
              Email
            </label>
            <input type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@bowatz.com" className={inp} />
          </div>

          <div>
            <label className="block text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-1">
              Password
            </label>
            <input type="password" required value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" className={inp} />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-brand-text text-white py-3.5 md:py-2.5 text-[11px] font-semibold tracking-widest uppercase
                       hover:bg-brand-text/80 transition-colors disabled:opacity-50 min-h-[44px]">
            {loading ? 'MASUK...' : 'MASUK'}
          </button>
        </form>

        <p className="text-center text-[11px] text-brand-text-faint mt-4">
          Lupa password? Reset lewat Supabase Dashboard.
        </p>
      </div>
    </main>
  )
}