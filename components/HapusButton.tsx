'use client'

import { useRouter } from 'next/navigation'

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
      className="text-brand-text-faint hover:text-red-500 transition-colors text-[12px]">
      Hapus
    </button>
  )
}