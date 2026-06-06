import Image from 'next/image'
import Link from 'next/link'
import { Barang } from '@/lib/supabase'

function formatRupiah(angka: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
  }).format(angka)
}

export default function BarangCard({ barang }: { barang: Barang }) {
  const fotoUtama  = barang.gambar?.[0]?.url || '/placeholder.jpg'
  const jumlahFoto = barang.gambar?.length || 0

  return (
    <Link href={`/barang/${barang.id}`} className="group block bg-brand-surface">
      <div className="relative overflow-hidden bg-brand-bg" style={{ aspectRatio: '4/5' }}>
        <Image
          src={fotoUtama}
          alt={barang.nama}
          fill
          className="object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 50vw, 25vw"
        />

        {barang.terjual && (
          <div className="absolute inset-0 bg-brand-text/60 flex items-center justify-center
                          backdrop-blur-[1px]">
            <span className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase
                             border border-white/60 px-3 py-1">
              TERJUAL
            </span>
          </div>
        )}

        {jumlahFoto > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white/90
                          text-[10px] px-1.5 py-0.5 font-medium backdrop-blur-sm">
            1/{jumlahFoto}
          </div>
        )}
      </div>

      <div className="px-2 pt-2 pb-3 space-y-1">
        <p className="text-[12px] text-brand-text leading-snug line-clamp-2
                      group-hover:text-brand-amber transition-colors duration-300">
          {barang.nama}
        </p>
        <p className="text-[13px] font-bold text-brand-text tracking-tight">
          {formatRupiah(barang.harga)}
        </p>
        <p className="text-[10px] text-brand-text-faint uppercase tracking-widest font-medium">
          {barang.kondisi}
          {barang.kategori && <span className="text-brand-text-faint/50 mx-1">|</span>}
          {barang.kategori}
        </p>
      </div>
    </Link>
  )
}
