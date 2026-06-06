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
    <div className="space-y-2">
      {/* Foto utama */}
      <div className="relative bg-brand-bg border border-brand-border" style={{ aspectRatio: '4/5' }}>
        <Image src={gambar[aktif].url} alt={`Foto ${aktif + 1}`} fill className="object-cover" />
        {gambar.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white
                         border border-brand-border p-1 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white
                         border border-brand-border p-1 transition-colors">
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-2 right-2 bg-white/80 text-brand-text-muted
                            text-[10px] px-1.5 py-0.5">
              {aktif + 1}/{gambar.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {gambar.length > 1 && (
        <div className="flex gap-1 overflow-x-auto">
          {gambar.map((g, i) => (
            <button key={g.id} onClick={() => setAktif(i)}
              className={`shrink-0 w-12 h-12 md:w-14 md:h-14 relative border transition-colors ${
                i === aktif ? 'border-brand-text' : 'border-brand-border hover:border-brand-border-dark'
              }`}>
              <Image src={g.url} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}