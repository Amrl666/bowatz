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
    <main className="max-w-300 mx-auto px-6 py-10">
      
      {/* Breadcrumbs ala Grailed */}
      <div className="mb-6 text-[11px] font-semibold tracking-widest uppercase text-brand-text-muted">
        Home / {barang.kategori || 'Lainnya'} / {barang.nama.substring(0, 20)}...
      </div>

      <div className="flex flex-col md:flex-row gap-10 lg:gap-16 relative">
        
        {/* KIRI: Area Foto Barang */}
        {/* Di Grailed desktop, foto dibuat besar mendominasi layar kiri */}
        <div className="w-full md:w-[55%] lg:w-[60%]">
          <ImageCarousel gambar={gambarSorted} />
        </div>

        {/* KANAN: Informasi Barang (Dibuat STICKY ala Grailed) */}
        <div className="w-full md:w-[45%] lg:w-[40%]">
          <div className="md:sticky top-24 space-y-6">
            
            {/* 1. HEADER INFORMASI */}
            <div>
              {/* "Designer" / Kategori (Bold) */}
              <h1 className="text-lg md:text-xl font-bold uppercase tracking-tight text-brand-text mb-1">
                {barang.kategori || 'Koleksi Bowatzzz'}
              </h1>
              {/* Nama Item (Normal) */}
              <h2 className="text-[15px] font-normal text-brand-text leading-snug">
                {barang.nama}
              </h2>
            </div>

            {/* 2. SPESIFIKASI GRID (Kondisi, Kategori, Stok) dengan border pembatas */}
            <div className="grid grid-cols-3 gap-4 border-y border-brand-border py-4">
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-1">Kondisi</p>
                <p className="text-[13px] text-brand-text font-medium">{barang.kondisi}</p>
              </div>
              <div className="border-l border-brand-border pl-4">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-1">Kategori</p>
                <p className="text-[13px] text-brand-text font-medium">{barang.kategori || '-'}</p>
              </div>
              <div className="border-l border-brand-border pl-4">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-1">Stok</p>
                <p className="text-[13px] text-brand-text font-medium">{barang.stok}</p>
              </div>
            </div>

            {/* 3. HARGA & TOMBOL BELI */}
            <div className="pt-2 space-y-4">
              <p className="text-3xl font-bold text-brand-text tracking-tight">
                {formatRupiah(barang.harga)}
              </p>

              {barang.terjual ? (
                <div className="w-full border border-brand-text bg-brand-text text-white
                                text-center py-4 text-[12px] font-bold tracking-[0.2em] uppercase">
                  BARANG TERJUAL
                </div>
              ) : (
                <TombolBeli namaBarang={barang.nama} />
              )}
            </div>

            {/* 4. DESKRIPSI BARANG */}
            {barang.deskripsi && (
              <div className="pt-6 border-t border-brand-border mt-8">
                <p className="text-[11px] font-bold tracking-widest uppercase text-brand-text mb-3">
                  Deskripsi
                </p>
                <div className="text-[14px] text-brand-text-muted whitespace-pre-line leading-relaxed">
                  {barang.deskripsi}
                </div>
              </div>
            )}

            {/* 5. METADATA (Tanggal diunggah) */}
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