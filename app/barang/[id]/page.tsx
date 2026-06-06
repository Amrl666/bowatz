import Link from 'next/link'
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
  const { id } = await params
  
  const { data: barang, error } = await supabase
    .from('barang')
    .select('*, gambar:barang_gambar(id, url, urutan)')
    .eq('id', id).single()

  if (error || !barang) notFound()

  const gambarSorted = (barang.gambar || []).sort((a: { urutan: number }, b: { urutan: number }) => a.urutan - b.urutan)

  return (
    <main className="max-w-300 mx-auto px-4 md:px-6 py-6 md:py-10">
      <Link href="/" 
        className="inline-flex items-center gap-1.5 text-[11px] md:text-[12px] font-semibold text-brand-text-muted 
                   border-2 border-brand-border px-3 py-1.5 mb-4 md:mb-5
                   hover:border-brand-text hover:text-brand-text transition-all duration-200 group">
        <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
        Kembali
      </Link>
      <div className="mb-5 md:mb-6 text-[10px] md:text-[11px] font-semibold tracking-widest uppercase text-brand-text-faint">
        <span className="hover:text-brand-amber transition-colors cursor-default">Koleksi</span>
        <span className="mx-2">/</span>
        <span className="hover:text-brand-amber transition-colors cursor-default">{barang.kategori || 'Lainnya'}</span>
        <span className="mx-2">/</span>
        <span className="text-brand-text-muted">{barang.nama.substring(0, 24)}...</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-16 relative">
        
        <div className="w-full md:w-[55%] lg:w-[60%]">
          <ImageCarousel gambar={gambarSorted} />
        </div>

        <div className="w-full md:w-[45%] lg:w-[40%]">
          <div className="md:sticky top-24 space-y-6">
            
            <div>
              <h1 className="text-lg md:text-xl font-bold uppercase tracking-tight text-brand-text mb-1">
                {barang.kategori || 'Koleksi Bowatz'}
              </h1>
              <h2 className="text-[15px] font-normal text-brand-text leading-snug">
                {barang.nama}
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-4 border-y border-brand-border py-4">
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-1">Kondisi</p>
                <p className="text-[13px] text-brand-text font-semibold">{barang.kondisi}</p>
              </div>
              <div className="border-l border-brand-border pl-4">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-1">Kategori</p>
                <p className="text-[13px] text-brand-text font-semibold">{barang.kategori || '-'}</p>
              </div>
              <div className="border-l border-brand-border pl-4">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-1">Stok</p>
                <p className="text-[13px] text-brand-text font-semibold">{barang.stok}</p>
              </div>
            </div>

            <div className="pt-2 space-y-4">
              <p className="text-3xl md:text-4xl font-bold text-brand-text tracking-tight">
                {formatRupiah(barang.harga)}
              </p>

              {barang.terjual ? (
                <div className="w-full border-2 border-brand-text bg-brand-text text-white
                                text-center py-4 text-[12px] font-bold tracking-[0.2em] uppercase">
                  BARANG TERJUAL
                </div>
              ) : (
                <TombolBeli namaBarang={barang.nama} />
              )}
            </div>

            {barang.deskripsi && (
              <div className="pt-6 border-t border-brand-border mt-6">
                <p className="text-[11px] font-bold tracking-widest uppercase text-brand-text mb-3">
                  Deskripsi
                </p>
                <div className="text-[14px] text-brand-text-muted whitespace-pre-line leading-relaxed break-words">
                  {barang.deskripsi}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-brand-border mt-6 flex items-center justify-between text-[11px] text-brand-text-faint uppercase tracking-widest font-semibold">
              <span>Waktu Unggah</span>
              <span>
                {new Date(barang.created_at).toLocaleDateString('id-ID', { 
                  year: 'numeric', month: 'short', day: 'numeric' 
                })}
              </span>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
