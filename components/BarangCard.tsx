'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Barang } from '@/lib/supabase'
import { Heart } from 'lucide-react'

function formatPrice(angka: number) {
  return new Intl.NumberFormat('en-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
  }).format(angka)
}

function timeAgo(dateStr: string) {
  const now = Date.now()
  const diff = now - new Date(dateStr).getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 5) return `${weeks}w ago`
  return `${Math.floor(days / 30)}mo ago`
}

export default function BarangCard({ barang }: { barang: Barang }) {
  const [isHovered, setIsHovered] = useState(false)
  const fotoUtama = barang.gambar?.[0]?.url || '/placeholder.jpg'

  return (
    <div
      className="group cursor-pointer flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/barang/${barang.id}`}>
        <div className="relative aspect-[4/5] bg-gray-100 mb-3 overflow-hidden rounded-sm">
          <Image
            src={fotoUtama}
            alt={barang.nama}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out"
            sizes="(max-width: 640px) 50vw, 25vw"
          />

          {barang.terjual && (
            <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center backdrop-blur-[1px]">
              <span className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase border border-white/60 px-3 py-1">
                SOLD
              </span>
            </div>
          )}

          <div className={`absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Heart className="h-4 w-4 text-gray-900" />
          </div>
        </div>
      </Link>

      <Link href={`/barang/${barang.id}`} className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <span className="font-bold text-sm truncate pr-2 text-gray-900">{barang.kategori || 'Collection'}</span>
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">{barang.kondisi}</span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-2 leading-tight">
          {barang.nama}
        </p>

        <div className="mt-auto">
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="font-bold text-base text-gray-900">{formatPrice(barang.harga)}</span>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>{timeAgo(barang.created_at)}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
