import { supabase, type Barang } from '@/lib/supabase'
import BarangCard from '@/components/BarangCard'
import SidebarFilter from '@/components/SidebarFilter'
import Pagination from '@/components/Pagination'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const PER_PAGE = 20

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; q?: string; page?: string; status?: string }>
}) {
  const sp = await searchParams;

  const kategoriAktif = sp.kategori || 'All'
  const pencarian     = sp.q || ''
  const statusFilter  = sp.status || ''
  const page          = parseInt(sp.page || '1')
  const from          = (page - 1) * PER_PAGE
  const to            = from + PER_PAGE - 1

  let query = supabase
    .from('barang')
    .select('*, gambar:barang_gambar(id, url, urutan)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (kategoriAktif !== 'All') query = query.eq('kategori', kategoriAktif)
  if (pencarian) query = query.ilike('nama', `%${pencarian}%`)
  if (statusFilter === 'available') query = query.eq('terjual', false)
  if (statusFilter === 'sold')  query = query.eq('terjual', true)

  const { data: barangList, count } = await query

  const { data: rawCount } = await supabase
    .from('barang')
    .select('kategori')
  
  const kategoriCount = (rawCount || []).reduce((acc: { kategori: string; jumlah: number }[], b: { kategori: string }) => {
    const found = acc.find(x => x.kategori === b.kategori)
    if (found) found.jumlah++
    else if (b.kategori) acc.push({ kategori: b.kategori, jumlah: 1 })
    return acc
  }, [])

  const totalPage = Math.ceil((count || 0) / PER_PAGE)

  const baseParams = new URLSearchParams()
  if (kategoriAktif !== 'All') baseParams.set('kategori', kategoriAktif)
  if (pencarian) baseParams.set('q', pencarian)
  const baseUrl = `/?${baseParams.toString()}`

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6">
        <span className="hover:underline">Home</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-900 font-medium">Catalog</span>
      </div>

      {/* Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2">
          <Image src="/bowatzzteks.png" alt="bowatz" width={100} height={22} className="object-contain translate-y-1" />
          </div>
      </div>

      {/* Top Controls */}
      <div className="flex items-center justify-between border-y border-gray-200 py-4 mb-8">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-semibold uppercase">{count || 0} Items</span>
        </div>
      </div>

      <div className="flex gap-10">
        {/* Sidebar Filter */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <SidebarFilter
              kategoriList={kategoriCount}
              totalSemua={rawCount?.length || 0}
              aktif={kategoriAktif}
            />
          </div>
        </div>

        {/* Mobile Filter + Product Grid */}
        <div className="flex-1 min-w-0">
          <div className="lg:hidden mb-4">
            <SidebarFilter
              kategoriList={kategoriCount}
              totalSemua={rawCount?.length || 0}
              aktif={kategoriAktif}
            />
          </div>

          {barangList && barangList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
              {barangList.map((barang) => (
                <BarangCard key={barang.id} barang={barang as Barang} />
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-200 py-24 text-center">
              <p className="text-sm text-gray-500 font-medium mb-1">
                No items found
              </p>
              <p className="text-xs text-gray-400">
                Try changing filters or search keywords
              </p>
            </div>
          )}

          {totalPage > 1 && (
            <div className="mt-16 flex justify-center">
              <Pagination page={page} totalPage={totalPage} baseUrl={baseUrl} />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
