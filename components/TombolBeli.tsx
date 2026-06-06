'use client'

import { MessageCircle } from 'lucide-react'

export default function TombolBeli({ namaBarang }: { namaBarang: string }) {
  const nomorWA = process.env.NEXT_PUBLIC_WA_NUMBER 

  const handleBeli = () => {
    const pesan = encodeURIComponent(
      `Halo bowatzzz, saya mau beli *${namaBarang}*. Apakah masih tersedia?`
    )
    window.open(`https://wa.me/${nomorWA}?text=${pesan}`, '_blank')
  }

  return (
    <button onClick={handleBeli}
      className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851]
                 text-white py-3.5 text-[12px] font-semibold tracking-widest uppercase transition-colors">
      <MessageCircle size={18} />
      Beli via WhatsApp
    </button>
  )
}