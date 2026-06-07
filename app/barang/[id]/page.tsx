import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ImageCarousel from '@/components/ImageCarousel'
import BuyButton from '@/components/BuyButton'

function formatPrice(n: number) {
  return new Intl.NumberFormat('en-ID', {
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 
                   border-2 border-gray-200 px-3 py-1.5 mb-6
                   hover:border-gray-900 hover:text-gray-900 transition-all duration-200 group">
        <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
        Back
      </Link>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-16 relative">
        
        <div className="w-full md:w-[55%] lg:w-[60%]">
          <ImageCarousel gambar={gambarSorted} />
        </div>

        <div className="w-full md:w-[45%] lg:w-[40%]">
          <div className="md:sticky top-24 space-y-6">
            
            <div>
              <h1 className="text-[15px] font-normal text-gray-500 leading-snug mb-1">
                {barang.kategori || 'Collection'}
              </h1>
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-gray-900">
                {barang.nama}
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-4 border-y border-gray-200 py-4">
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-500 mb-1">Size</p>
                <p className="text-[13px] text-gray-900 font-semibold">{barang.size}</p>
              </div>
              <div className="border-l border-gray-200 pl-4">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-500 mb-1">Category</p>
                <p className="text-[13px] text-gray-900 font-semibold">{barang.kategori || '-'}</p>
              </div>
              <div className="border-l border-gray-200 pl-4">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-500 mb-1">Stock</p>
                <p className="text-[13px] text-gray-900 font-semibold">{barang.stok}</p>
              </div>
            </div>

            <div className="pt-2 space-y-4">
              <p className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                {formatPrice(barang.harga)}
              </p>

              {barang.terjual ? (
                <div className="w-full border-2 border-gray-900 bg-gray-900 text-white
                                text-center py-4 text-[12px] font-bold tracking-[0.2em] uppercase">
                  SOLD
                </div>
              ) : (
                <BuyButton namaBarang={barang.nama} />
              )}
            </div>

            {barang.deskripsi && (
              <div className="pt-6 border-t border-gray-200 mt-6">
                <p className="text-[11px] font-bold tracking-widest uppercase text-gray-900 mb-3">
                  Description
                </p>
                <div className="text-[14px] text-gray-500 whitespace-pre-line leading-relaxed break-words">
                  {barang.deskripsi}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200 mt-6 flex items-center justify-between text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
              <span>Listed</span>
              <span>
                {new Date(barang.created_at).toLocaleDateString('en-US', { 
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
