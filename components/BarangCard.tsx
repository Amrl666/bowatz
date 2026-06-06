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
      {/* Foto — rasio 4:5 seperti Grailed */}
      <div className="relative overflow-hidden bg-brand-bg" style={{ aspectRatio: '4/5' }}>
        <Image
          src={fotoUtama}
          alt={barang.nama}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, 25vw"
        />

        {/* Overlay TERJUAL: gelap + border putih tipis, bukan warna solid */}
        {barang.terjual && (
          <div className="absolute inset-0 bg-brand-text/60 flex items-center justify-center">
            <span className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase
                             border border-white/60 px-3 py-1">
              TERJUAL
            </span>
          </div>
        )}

        {/* Indikator jumlah foto — minimalis */}
        {jumlahFoto > 1 && (
          <div className="absolute bottom-2 right-2 bg-white/80 text-brand-text-muted
                          text-[10px] px-1.5 py-0.5 font-medium">
            1/{jumlahFoto}
          </div>
        )}
      </div>

      {/* Info — tipografi kecil ala Grailed */}
      <div className="px-1 pt-1.5 pb-2 space-y-0.5">
        <p className="text-[12px] text-brand-text leading-snug line-clamp-2 group-hover:text-brand-amber transition-colors">
          {barang.nama}
        </p>
        <p className="text-[12px] font-semibold text-brand-text">
          {formatRupiah(barang.harga)}
        </p>
        <p className="text-[10px] text-brand-text-faint uppercase tracking-widest">
          {barang.kondisi}
          {barang.kategori && ` · ${barang.kategori}`}
        </p>
      </div>
    </Link>
  )
}