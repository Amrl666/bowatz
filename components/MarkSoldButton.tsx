'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, RotateCcw } from 'lucide-react'

export default function MarkSoldButton({ id, terjual }: { id: string; terjual: boolean }) {
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
      else alert('Failed to update status')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleToggle} disabled={loading}
      title={terjual ? 'Undo sold status' : 'Mark as sold'}
      className={`inline-flex items-center gap-1 text-[11px] font-bold tracking-widest uppercase
                  border-2 px-2.5 py-1.5 transition-all duration-200 disabled:opacity-50 min-h-[36px] ${
        terjual
          ? 'border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50'
          : 'border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-500 hover:bg-red-50/50'
      }`}>
      {loading ? (
        <span className="inline-block w-3 h-3 border-2 border-gray-400 border-t-transparent animate-spin rounded-full" />
      ) : terjual ? (
        <><RotateCcw size={12} /> Undo</>
      ) : (
        <><Check size={12} /> Sold</>
      )}
    </button>
  )
}
