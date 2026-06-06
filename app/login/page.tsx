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

  const inp = "w-full bg-white border-2 border-brand-border px-3 py-3 md:py-2.5 text-[13px] text-brand-text placeholder:text-brand-text-faint focus:outline-none focus:border-brand-text transition-all duration-200"

  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-bg px-4">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-8 flex flex-col items-center">
          <Image 
            src="/bowatz.png" 
            alt="Logo bowatz" 
            width={140}
            height={42} 
            className="object-contain mb-3"
          />
          <p className="text-[10px] text-brand-text-faint tracking-widest uppercase font-bold">
            Admin Access
          </p>
        </div>

        <form onSubmit={handleLogin}
          className="bg-brand-surface border-2 border-brand-border p-6 md:p-8 space-y-5">
          {error && (
            <div className="border-2 border-red-200 bg-red-50 text-red-600 text-[12px] px-4 py-3 font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-brand-text mb-1.5">
              Email
            </label>
            <input type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@bowatz.com" className={inp} />
          </div>

          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-brand-text mb-1.5">
              Password
            </label>
            <input type="password" required value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" className={inp} />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-brand-text text-white py-3.5 md:py-3 text-[11px] font-bold tracking-widest uppercase
                       hover:bg-brand-text/80 transition-all duration-200 disabled:opacity-50 min-h-[48px]
                       active:scale-[0.98]">
            {loading ? 'MEMPROSES...' : 'MASUK'}
          </button>
        </form>

        <p className="text-center text-[10px] text-brand-text-faint mt-5 font-medium tracking-wider">
          Hubungi admin untuk reset password
        </p>
      </div>
    </main>
  )
}
