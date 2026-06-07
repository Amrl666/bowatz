'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react'

type KategoriCount = { kategori: string; jumlah: number }

type Props = {
  kategoriList: KategoriCount[]
  totalSemua: number
  aktif: string
}

const KATEGORI_ORDER = ['All', 'T-Shirts', 'Shirts', 'Pants', 'Jackets', 'Hoodies & Sweaters', 'Dresses & Skirts', 'Shoes', 'Accessories', 'Other']

function FilterContent({ kategoriList, totalSemua, aktif, searchParams, router, mobile }: {
  kategoriList: KategoriCount[]
  totalSemua: number
  aktif: string
  searchParams: URLSearchParams
  router: ReturnType<typeof useRouter>
  mobile?: boolean
}) {
  const handleKategori = (kat: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (kat === 'All') params.delete('kategori')
    else params.set('kategori', kat)
    params.delete('page')
    router.push(`/?${params.toString()}`)
  }

  const handleStatus = (s: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (s === 'All') params.delete('status')
    else params.set('status', s.toLowerCase())
    params.delete('page')
    router.push(`/?${params.toString()}`)
  }

  const getCount = (kat: string) => {
    if (kat === 'All') return totalSemua
    return kategoriList.find(k => k.kategori === kat)?.jumlah || 0
  }

  return (
    <div className={mobile ? 'space-y-6' : 'space-y-6'}>
      <div className="flex items-center space-x-2 mb-6">
        <SlidersHorizontal className="h-5 w-5 text-gray-900" />
        <span className="font-bold uppercase text-sm text-gray-900">Filter</span>
      </div>

      {/* Category Filter */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button className="flex items-center justify-between w-full mb-4 font-bold text-sm uppercase text-gray-900">
          Category
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
        <div className="space-y-1">
          {KATEGORI_ORDER.map((kat) => {
            const isAktif = aktif === kat
            return (
              <button key={kat}
                onClick={() => handleKategori(kat)}
                className={`w-full flex items-center justify-between py-2 px-3 text-left transition-all duration-200 ${
                  isAktif
                    ? 'bg-gray-100 text-gray-900 font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="text-sm">{kat}</span>
                <span className={`text-xs tabular-nums ${
                  isAktif ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {getCount(kat)}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Status Filter */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button className="flex items-center justify-between w-full mb-4 font-bold text-sm uppercase text-gray-900">
          Status
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
        <div className="grid grid-cols-3 gap-2">
          {['All', 'Available', 'Sold'].map((s) => {
            const statusParam = searchParams.get('status') || ''
            const isAktif = s === 'All' ? !statusParam : statusParam === s.toLowerCase()
            return (
              <button key={s}
                onClick={() => handleStatus(s)}
                className={`border py-2 text-xs font-medium hover:border-gray-900 transition-colors rounded-sm ${
                  isAktif
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900'
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
      {/* Mobile Trigger */}
      <button onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center justify-center gap-2 text-xs font-semibold uppercase
                   border-2 border-gray-300 px-4 py-2.5 transition-all duration-200
                   hover:border-gray-900 text-gray-600 hover:text-gray-900 w-full">
        <SlidersHorizontal size={14} />
        Filter
      </button>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fade-in">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-80 bg-white border-l border-gray-200 shadow-2xl animate-slide-in">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="h-5 w-5 text-gray-900" />
                <span className="font-bold uppercase text-sm text-gray-900">Filter</span>
              </div>
              <button onClick={() => setMobileOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all rounded-sm">
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
                mobile
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block">
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
