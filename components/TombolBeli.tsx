'use client'

import { MessageCircle } from 'lucide-react'

export default function TombolBeli({ namaBarang }: { namaBarang: string }) {
  const nomorWA = process.env.NEXT_PUBLIC_WA_NUMBER 

  const handleBeli = () => {
    const pesan = encodeURIComponent(
      `Halo bowatz, saya mau beli *${namaBarang}*. Apakah masih tersedia?`
    )
    window.open(`https://wa.me/${nomorWA}?text=${pesan}`, '_blank')
  }

  return (
    <button onClick={handleBeli}
      className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1DA851]
                 text-white py-4 md:py-3.5 text-[13px] font-bold tracking-widest uppercase 
                 transition-all duration-200 min-h-[48px] shadow-lg shadow-[#25D366]/20
                 hover:shadow-xl hover:shadow-[#25D366]/30 active:scale-[0.98]">
      <MessageCircle size={20} />
      Beli via WhatsApp
    </button>
  )
}
