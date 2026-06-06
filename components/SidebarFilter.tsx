'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Filter, X } from 'lucide-react'

type KategoriCount = { kategori: string; jumlah: number }

type Props = {
  kategoriList: KategoriCount[]
  totalSemua: number
  aktif: string
}

const KATEGORI_ORDER = ['Semua', 'Pakaian', 'Sepatu', 'Aksesoris', 'Elektronik', 'Lainnya']

function FilterContent({ kategoriList, totalSemua, aktif, searchParams, router }: {
  kategoriList: KategoriCount[]
  totalSemua: number
  aktif: string
  searchParams: URLSearchParams
  router: ReturnType<typeof useRouter>
}) {
  const handleClick = (kat: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (kat === 'Semua') params.delete('kategori')
    else params.set('kategori', kat)
    params.delete('page')
    router.push(`/?${params.toString()}`)
  }

  const getCount = (kat: string) => {
    if (kat === 'Semua') return totalSemua
    return kategoriList.find(k => k.kategori === kat)?.jumlah || 0
  }

  return (
    <>
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
                  isAktif ? 'text-brand-amber' : 'text-brand-text-muted hover:text-brand-text'
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
              {isAktif && <div className="h-px bg-brand-amber/40 mb-0.5" />}
            </li>
          )
        })}
      </ul>

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
    </>
  )
}

export default function SidebarFilter({ kategoriList, totalSemua, aktif }: Props) {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile filter toggle */}
      <button onClick={() => setMobileOpen(true)}
        className="md:hidden flex items-center gap-2 text-[11px] text-brand-text-muted hover:text-brand-text
                   border border-brand-border px-3 py-2 transition-colors">
        <Filter size={14} />
        Filter
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-72 bg-brand-surface border-l border-brand-border p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted">
                Filter
              </p>
              <button onClick={() => setMobileOpen(false)}
                className="p-1 text-brand-text-muted hover:text-brand-text transition-colors">
                <X size={16} />
              </button>
            </div>
            <FilterContent
              kategoriList={kategoriList}
              totalSemua={totalSemua}
              aktif={aktif}
              searchParams={searchParams}
              router={router}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-44 shrink-0">
        <FilterContent
          kategoriList={kategoriList}
          totalSemua={totalSemua}
          aktif={aktif}
          searchParams={searchParams}
          router={router}
        />
      </aside>
    </>
  )
}