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
  const handleKategori = (kat: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (kat === 'Semua') params.delete('kategori')
    else params.set('kategori', kat)
    params.delete('page')
    router.push(`/?${params.toString()}`)
  }

  const handleStatus = (s: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (s === 'Semua') params.delete('status')
    else params.set('status', s.toLowerCase())
    params.delete('page')
    router.push(`/?${params.toString()}`)
  }

  const getCount = (kat: string) => {
    if (kat === 'Semua') return totalSemua
    return kategoriList.find(k => k.kategori === kat)?.jumlah || 0
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-3">
          Kategori
        </p>
        <div className="space-y-0.5">
          {KATEGORI_ORDER.map((kat) => {
            const isAktif = aktif === kat
            const count   = getCount(kat)
            return (
              <button key={kat}
                onClick={() => handleKategori(kat)}
                className={`w-full flex items-center justify-between py-2 px-3 text-left transition-all duration-200 ${
                  isAktif
                    ? 'bg-brand-amber-light text-brand-amber font-semibold border-l-2 border-brand-amber'
                    : 'text-brand-text-muted hover:text-brand-text hover:bg-black/[0.02] border-l-2 border-transparent'
                }`}
              >
                <span className="text-[12px]">{kat}</span>
                <span className={`text-[11px] tabular-nums ${
                  isAktif ? 'text-brand-amber' : 'text-brand-text-faint'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="border-t border-brand-border pt-6">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-3">
          Status
        </p>
        <div className="flex flex-wrap gap-2">
          {['Semua', 'Tersedia', 'Terjual'].map((s) => {
            const statusParam = searchParams.get('status') || ''
            const isAktif = s === 'Semua' ? !statusParam : statusParam === s.toLowerCase()
            return (
              <button key={s}
                onClick={() => handleStatus(s)}
                className={`text-[11px] font-semibold tracking-widest uppercase px-3 py-1.5 border transition-all duration-200 ${
                  isAktif
                    ? 'bg-brand-text text-white border-brand-text'
                    : 'border-brand-border text-brand-text-muted hover:border-brand-text hover:text-brand-text bg-brand-surface'
                }`}
              >
                {s}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function SidebarFilter({ kategoriList, totalSemua, aktif }: Props) {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <button onClick={() => setMobileOpen(true)}
        className="md:hidden flex items-center gap-2 text-[12px] font-medium tracking-wide
                   border-2 border-brand-border px-4 py-2.5 transition-all duration-200
                   hover:border-brand-text text-brand-text-muted hover:text-brand-text w-full justify-center">
        <Filter size={14} />
        Filter
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-fade-in">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-80 bg-brand-surface border-l border-brand-border shadow-2xl animate-slide-in">
            <div className="flex items-center justify-between p-6 border-b border-brand-border">
              <p className="text-[11px] font-bold tracking-widest uppercase text-brand-text">
                Filter
              </p>
              <button onClick={() => setMobileOpen(false)}
                className="p-1.5 text-brand-text-muted hover:text-brand-text hover:bg-black/5 transition-all rounded-none">
                <X size={16} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-64px)]">
              <FilterContent
                kategoriList={kategoriList}
                totalSemua={totalSemua}
                aktif={aktif}
                searchParams={searchParams}
                router={router}
              />
            </div>
          </div>
        </div>
      )}

      <aside className="hidden md:block">
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
