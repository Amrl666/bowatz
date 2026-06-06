'use client'

import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const router   = useRouter()
  const supabase = createSupabaseBrowserClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button onClick={handleLogout}
      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-text-faint 
                 hover:text-red-500 transition-colors py-1.5 px-2 hover:bg-red-50/50 -mx-2 min-h-[36px]">
      <LogOut size={14} />
      Logout
    </button>
  )
}
