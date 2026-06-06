'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BarangGambar } from '@/lib/supabase'

export default function ImageCarousel({ gambar }: { gambar: BarangGambar[] }) {
  const [aktif, setAktif] = useState(0)

  if (!gambar || gambar.length === 0) {
    return (
      <div className="aspect-square bg-brand-bg border border-brand-border
                      flex items-center justify-center text-brand-text-faint text-[13px]">
        Tidak ada foto
      </div>
    )
  }

  const prev = () => setAktif(i => (i === 0 ? gambar.length - 1 : i - 1))
  const next = () => setAktif(i => (i === gambar.length - 1 ? 0 : i + 1))

  return (
    <div className="space-y-3">
      <div className="relative bg-brand-bg border border-brand-border overflow-hidden" style={{ aspectRatio: '4/5' }}>
        <Image
          src={gambar[aktif].url}
          alt={`Foto ${aktif + 1}`}
          fill
          className="object-cover"
          priority
        />
        {gambar.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white
                         border border-brand-border p-2 transition-all duration-200
                         hover:shadow-md hover:scale-105 active:scale-95">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white
                         border border-brand-border p-2 transition-all duration-200
                         hover:shadow-md hover:scale-105 active:scale-95">
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 right-3 bg-black/50 text-white/90
                            text-[10px] px-2 py-1 font-medium tracking-wider backdrop-blur-sm">
              {aktif + 1} / {gambar.length}
            </div>
          </>
        )}
      </div>

      {gambar.length > 1 && (
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {gambar.map((g, i) => (
            <button key={g.id} onClick={() => setAktif(i)}
              className={`shrink-0 w-[56px] h-[56px] md:w-[64px] md:h-[64px] relative border-2 transition-all duration-200 ${
                i === aktif
                  ? 'border-brand-text opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-100 hover:border-brand-border-dark'
              }`}>
              <Image src={g.url} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
