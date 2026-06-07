'use client'

import { MessageCircle } from 'lucide-react'

export default function BuyButton({ namaBarang }: { namaBarang: string }) {
  const nomorWA = process.env.NEXT_PUBLIC_WA_NUMBER 

  const handleBeli = () => {
    const pesan = encodeURIComponent(
      `Hi bowatz, I want to buy *${namaBarang}*. Is it still available?`
    )
    window.open(`https://wa.me/${nomorWA}?text=${pesan}`, '_blank')
  }

  return (
    <button onClick={handleBeli}
      className="w-full flex items-center justify-center gap-3 bg-black hover:bg-gray-800
                 text-white py-4 md:py-3.5 text-[13px] font-bold tracking-widest uppercase 
                 transition-all duration-200 min-h-[48px] active:scale-[0.98]">
      <MessageCircle size={20} />
      Buy via WhatsApp
    </button>
  )
}
