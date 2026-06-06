'use client'

import { useRouter, useSearchParams } from 'next/navigation'

type KategoriCount = { kategori: string; jumlah: number }

type Props = {
  kategoriList: KategoriCount[]
  totalSemua: number
  aktif: string
}

const KATEGORI_ORDER = ['Semua', 'Pakaian', 'Sepatu', 'Aksesoris', 'Elektronik', 'Lainnya']

export default function SidebarFilter({ kategoriList, totalSemua, aktif }: Props) {
  const router       = useRouter()
  const searchParams = useSearchParams()

  const handleClick = (kat: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (kat === 'Semua') params.delete('kategori')
    else params.set('kategori', kat)
    params.delete('page')  // reset ke halaman 1 saat ganti filter
    router.push(`/?${params.toString()}`)
  }

  const getCount = (kat: string) => {
    if (kat === 'Semua') return totalSemua
    return kategoriList.find(k => k.kategori === kat)?.jumlah || 0
  }

  return (
    <aside className="w-44 shrink-0">
      {/* Label section */}
      <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-3">
        Kategori
      </p>

      <ul className="space-y-0">
        {KATEGORI_ORDER.map((kat) => {
          const isAktif = aktif === kat
          const count   = getCount(kat)

          return (
            <li key={kat}>
              <button
                onClick={() => handleClick(kat)}
                className={`w-full flex items-center justify-between py-1.5 text-left transition-colors group ${
                  isAktif
                    ? 'text-brand-amber'
                    : 'text-brand-text-muted hover:text-brand-text'
                }`}
              >
                <span className={`text-[12px] ${isAktif ? 'font-semibold' : 'font-normal'}`}>
                  {kat}
                </span>
                <span className={`text-[11px] tabular-nums ${
                  isAktif ? 'text-brand-amber' : 'text-brand-text-faint'
                }`}>
                  {count}
                </span>
              </button>

              {/* Garis aktif di kiri — sinyal visual tanpa warna mencolok */}
              {isAktif && (
                <div className="h-px bg-brand-amber/40 mb-0.5" />
              )}
            </li>
          )
        })}
      </ul>

      {/* Divider */}
      <div className="border-t border-brand-border mt-6 pt-5">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-3">
          Status
        </p>
        <ul className="space-y-1">
          {['Semua', 'Tersedia', 'Terjual'].map((s) => (
            <li key={s}>
              <button
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString())
                  if (s === 'Semua') params.delete('status')
                  else params.set('status', s.toLowerCase())
                  params.delete('page')
                  router.push(`/?${params.toString()}`)
                }}
                className="text-[12px] text-brand-text-muted hover:text-brand-text transition-colors"
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}