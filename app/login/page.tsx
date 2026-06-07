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
    if (error) { setError('Invalid email or password.'); setLoading(false); return }
    router.push('/admin')
    router.refresh()
  }

  const inp = "w-full bg-white border-2 border-gray-200 px-3 py-3 md:py-2.5 text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-all duration-200"

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-8 flex flex-col items-center">
          <Image 
            src="/bowatz.png" 
            alt="bowatz logo" 
            width={140}
            height={42} 
            className="object-contain mb-3"
          />
          <p className="text-[10px] text-gray-400 tracking-widest uppercase font-bold">
            Admin Access
          </p>
        </div>

        <form onSubmit={handleLogin}
          className="bg-white border-2 border-gray-200 p-6 md:p-8 space-y-5">
          {error && (
            <div className="border-2 border-red-200 bg-red-50 text-red-600 text-xs px-4 py-3 font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-1.5">
              Email
            </label>
            <input type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@bowatz.com" className={inp} />
          </div>

          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-1.5">
              Password
            </label>
            <input type="password" required value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" className={inp} />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-gray-900 text-white py-3.5 md:py-3 text-[11px] font-bold tracking-widest uppercase
                       hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 min-h-[48px]
                       active:scale-[0.98]">
            {loading ? 'PROCESSING...' : 'LOGIN'}
          </button>
        </form>

        <p className="text-center text-[10px] text-gray-400 mt-5 font-medium tracking-wider">
          Contact admin to reset password
        </p>
      </div>
    </main>
  )
}
