import { supabase, type Barang } from '@/lib/supabase'
import BarangCard from '@/components/BarangCard'
import SidebarFilter from '@/components/SidebarFilter'
import Pagination from '@/components/Pagination'

const PER_PAGE = 20

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; q?: string; page?: string; status?: string }>
}) {
  const sp = await searchParams;

  const kategoriAktif = sp.kategori || 'Semua'
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

  if (kategoriAktif !== 'Semua') query = query.eq('kategori', kategoriAktif)
  if (pencarian) query = query.ilike('nama', `%${pencarian}%`)
  if (statusFilter === 'tersedia') query = query.eq('terjual', false)
  if (statusFilter === 'terjual')  query = query.eq('terjual', true)

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
  if (kategoriAktif !== 'Semua') baseParams.set('kategori', kategoriAktif)
  if (pencarian) baseParams.set('q', pencarian)
  const baseUrl = `/?${baseParams.toString()}`

  return (

    <main className="max-w-350 mx-auto px-4 md:px-6 py-6 md:py-10">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="w-full md:w-56 shrink-0 md:sticky top-20 h-fit space-y-4 md:space-y-8">
          <form action="/" method="GET">
            <div className="relative">
              <input
                type="text"
                name="q"
                defaultValue={pencarian}
                placeholder="Cari barang..."
                className="w-full pl-3 pr-8 py-2.5 text-[13px] bg-brand-surface border border-brand-border
                           text-brand-text placeholder:text-brand-text-faint
                           focus:outline-none focus:border-brand-text transition-all duration-200"
              />
              {pencarian && (
                <button type="button" 
                  onClick={() => window.location.href = '/'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-text-faint hover:text-brand-text transition-colors text-[16px] leading-none">
                  &times;
                </button>
              )}
            </div>
            {kategoriAktif !== 'Semua' && (
              <input type="hidden" name="kategori" value={kategoriAktif} />
            )}
          </form>

          <SidebarFilter
            kategoriList={kategoriCount}
            totalSemua={rawCount?.length || 0}
            aktif={kategoriAktif}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[11px] text-brand-text-muted uppercase tracking-widest font-semibold">
              {count || 0} Hasil
            </p>
            {pencarian && (
              <p className="text-[11px] text-brand-text-faint">
                Pencarian: &ldquo;{pencarian}&rdquo;
              </p>
            )}
          </div>

          {barangList && barangList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {barangList.map((barang) => (
                <div key={barang.id} className="bg-brand-surface border border-brand-border
                                                hover:shadow-lg hover:shadow-black/5 transition-shadow duration-300">
                  <BarangCard barang={barang as Barang} />
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-brand-border py-24 text-center">
              <p className="text-[14px] text-brand-text-muted font-medium mb-1">
                Tidak ada barang ditemukan
              </p>
              <p className="text-[12px] text-brand-text-faint">
                Coba ubah filter atau kata kunci pencarian
              </p>
            </div>
          )}

          {totalPage > 1 && (
            <div className="mt-10 border-t border-brand-border pt-6">
              <Pagination page={page} totalPage={totalPage} baseUrl={baseUrl} />
            </div>
          )}

        </div>
      </div>
    </main>
  )
}
