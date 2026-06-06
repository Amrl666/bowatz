'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MarkTerjualButton({ id, terjual }: { id: string; terjual: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/barang/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ terjual: !terjual }),
      })
      if (res.ok) router.refresh()
      else alert('Gagal mengupdate status')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleToggle} disabled={loading}
      title={terjual ? 'Batalkan status terjual' : 'Tandai sebagai terjual'}
      className={`text-[11px] px-2.5 py-1.5 md:px-2 md:py-0.5 border font-medium transition-colors disabled:opacity-50 min-h-[36px] ${
        terjual
          ? 'border-brand-border text-brand-text-muted hover:border-brand-amber hover:text-brand-amber'
          : 'border-brand-border text-brand-text-muted hover:border-red-400 hover:text-red-500'
      }`}>
      {loading ? '...' : terjual ? '↩ Batal' : '✓ Terjual'}
    </button>
  )
}