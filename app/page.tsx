import { supabase, type Barang } from '@/lib/supabase'
import BarangCard from '@/components/BarangCard'
import SidebarFilter from '@/components/SidebarFilter'
import Pagination from '@/components/Pagination'

const PER_PAGE = 20

export default async function HomePage({
  searchParams,
}: {
  searchParams: { kategori?: string; q?: string; page?: string; status?: string }
}) {
  const kategoriAktif = searchParams.kategori || 'Semua'
  const pencarian     = searchParams.q || ''
  const statusFilter  = searchParams.status || ''
  const page          = parseInt(searchParams.page || '1')
  const from          = (page - 1) * PER_PAGE
  const to            = from + PER_PAGE - 1

  // Query utama — produk di grid
  let query = supabase
    .from('barang')
    .select('*, gambar:barang_gambar(id, url, urutan)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (kategoriAktif !== 'Semua') query = query.eq('kategori', kategoriAktif)
  if (pencarian) query = query.ilike('nama', `%${pencarian}%`)
  if (statusFilter === 'tersedia') query = query.eq('terjual', false)
  if (statusFilter === 'terjual')  query = query.eq('terjual', true)

  const { data: barangList, count } = await query

  // Query hitung per-kategori untuk sidebar
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

  // URL base untuk pagination (pertahankan filter)
  const baseParams = new URLSearchParams()
  if (kategoriAktif !== 'Semua') baseParams.set('kategori', kategoriAktif)
  if (pencarian) baseParams.set('q', pencarian)
  const baseUrl = `/?${baseParams.toString()}`

  return (
    <main className="max-w-350 mx-auto px-6 py-6">
      {/* Search bar atas */}
      <form action="/" method="GET" className="mb-6">
        <input
          type="text"
          name="q"
          defaultValue={pencarian}
          placeholder="Cari barang..."
          className="w-full max-w-sm px-3 py-2 text-[13px] bg-brand-surface border border-brand-border
                     text-brand-text placeholder:text-brand-text-faint
                     focus:outline-none focus:border-brand-border-dark"
        />
        {kategoriAktif !== 'Semua' && (
          <input type="hidden" name="kategori" value={kategoriAktif} />
        )}
      </form>

      {/* Layout: sidebar kiri + grid kanan */}
      <div className="flex gap-10">
        {/* Sidebar Filter */}
        <SidebarFilter
          kategoriList={kategoriCount}
          totalSemua={rawCount?.length || 0}
          aktif={kategoriAktif}
        />

        {/* Area Grid */}
        <div className="flex-1 min-w-0">
          {/* Keterangan hasil */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] text-brand-text-muted uppercase tracking-widest">
              {count || 0} PRODUK
              {kategoriAktif !== 'Semua' && ` · ${kategoriAktif.toUpperCase()}`}
            </p>
          </div>

          {/* Grid 4 kolom — gap-px supaya border 1px antar card */}
          {barangList && barangList.length > 0 ? (
            <div className="border border-brand-border">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-brand-border">
                {barangList.map((barang) => (
                  <div key={barang.id} className="bg-brand-bg">
                    <BarangCard barang={barang as Barang} /> 
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="border border-brand-border py-20 text-center text-brand-text-faint text-[13px]">
              Belum ada produk
            </div>
          )}

          {/* Pagination */}
          <Pagination page={page} totalPage={totalPage} baseUrl={baseUrl} />
        </div>
      </div>
    </main>
  )
}