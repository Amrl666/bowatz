'use client'

import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()

  const handleHapus = async () => {
    if (!confirm('Are you sure you want to delete this item?')) return
    const res = await fetch(`/api/barang/${id}`, { method: 'DELETE' })
    if (res.ok) router.refresh()
    else alert('Failed to delete')
  }

  return (
    <button onClick={handleHapus}
      className="inline-flex items-center gap-1 text-[11px] font-bold tracking-widest uppercase
                 border-2 border-gray-200 px-2.5 py-1.5
                 text-gray-400 hover:border-red-400 hover:text-red-500 hover:bg-red-50/50
                 transition-all duration-200 min-h-[36px]">
      <Trash2 size={12} />
      Delete
    </button>
  )
}
