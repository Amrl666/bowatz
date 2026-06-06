'use client'

import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function HapusButton({ id }: { id: string }) {
  const router = useRouter()

  const handleHapus = async () => {
    if (!confirm('Yakin mau hapus barang ini?')) return
    const res = await fetch(`/api/barang/${id}`, { method: 'DELETE' })
    if (res.ok) router.refresh()
    else alert('Gagal menghapus')
  }

  return (
    <button onClick={handleHapus}
      className="inline-flex items-center gap-1 text-[11px] font-bold tracking-widest uppercase
                 border-2 border-brand-border px-2.5 py-1.5
                 text-brand-text-faint hover:border-red-400 hover:text-red-500 hover:bg-red-50/50
                 transition-all duration-200 min-h-[36px]">
      <Trash2 size={12} />
      Hapus
    </button>
  )
}
