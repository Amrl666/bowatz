import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ImageCarousel from '@/components/ImageCarousel'
import TombolBeli from '@/components/TombolBeli'

function formatRupiah(n: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
  }).format(n)
}

export default async function DetailBarangPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: barang, error } = await supabase
    .from('barang')
    .select('*, gambar:barang_gambar(id, url, urutan)')
    .eq('id', id).single()

  if (error || !barang) notFound()

  const gambarSorted = (barang.gambar || []).sort((a: { urutan: number }, b: { urutan: number }) => a.urutan - b.urutan)

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Foto */}
        <ImageCarousel gambar={gambarSorted} />

        {/* Info */}
        <div className="space-y-5">
          {/* Kategori & kondisi — uppercase kecil */}
          <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted">
            {barang.kategori || 'Lainnya'}
            {' · '}
            {barang.kondisi}
          </p>

          <h1 className="text-xl font-normal text-brand-text leading-snug">{barang.nama}</h1>
          <p className="text-2xl font-semibold text-brand-text">{formatRupiah(barang.harga)}</p>

          {barang.deskripsi && (
            <div className="border-t border-brand-border pt-5">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-2">
                Deskripsi
              </p>
              <p className="text-[13px] text-brand-text-muted whitespace-pre-line leading-relaxed">
                {barang.deskripsi}
              </p>
            </div>
          )}

          <div className="border-t border-brand-border pt-5">
            {barang.terjual ? (
              // Overlay terjual: border putih tipis di atas gelap
              <div className="border border-brand-text bg-brand-text/5 text-brand-text
                              text-center py-4 text-[11px] font-semibold tracking-[0.2em] uppercase">
                Barang Sudah Terjual
              </div>
            ) : (
              <TombolBeli namaBarang={barang.nama} />
            )}
          </div>

          <p className="text-[11px] text-brand-text-faint">
            Stok: {barang.stok} · Ditambah {new Date(barang.created_at).toLocaleDateString('id-ID')}
          </p>
        </div>
      </div>
    </main>
  )
}