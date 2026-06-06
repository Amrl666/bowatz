import Link from 'next/link'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import HapusButton from '@/components/HapusButton'
import MarkTerjualButton from '@/components/MarkTerjualButton'
import { ArrowLeft, Plus } from 'lucide-react'

export default async function AdminPage() {
  const auth = await createSupabaseServerClient()
  const { data: { user } } = await auth.auth.getUser()
  if (!user) redirect('/login')

  const { data: barangList } = await supabase
    .from('barang')
    .select('*, gambar:barang_gambar(url)')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <Link href="/"
        className="inline-flex items-center gap-1.5 text-[11px] md:text-[12px] font-semibold text-brand-text-muted 
                   border-2 border-brand-border px-3 py-1.5 mb-6
                   hover:border-brand-text hover:text-brand-text transition-all duration-200 group">
        <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
        Kembali
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-brand-text">
            Admin
          </h1>
          <p className="text-[12px] text-brand-text-muted mt-0.5">
            {barangList?.length || 0} barang di katalog
          </p>
        </div>
        <Link href="/admin/tambah"
          className="inline-flex items-center gap-2 bg-brand-text text-white px-5 py-2.5 text-[11px] font-bold tracking-widest uppercase
                     hover:bg-brand-text/80 transition-all duration-200 active:scale-[0.97]">
          <Plus size={14} />
          Tambah
        </Link>
      </div>

      <div className="border-2 border-brand-border overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-brand-border bg-[#F3F1EE]">
              {['Foto', 'Nama', 'Harga', 'Kondisi', 'Status', 'Aksi'].map(h => (
                <th key={h}
                  className="px-3 md:px-4 py-3.5 text-left text-[10px] font-bold tracking-widest uppercase text-brand-text-muted whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {barangList?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center">
                  <p className="text-[13px] text-brand-text-muted font-medium">Belum ada barang</p>
                  <p className="text-[11px] text-brand-text-faint mt-1">Klik &ldquo;Tambah&rdquo; untuk mulai</p>
                </td>
              </tr>
            ) : (
              barangList?.map((b, idx) => (
                <tr key={b.id}
                  className="bg-brand-surface hover:bg-brand-amber-light/15 transition-colors duration-150">
                  <td className="px-3 md:px-4 py-2.5 md:py-3">
                    {b.gambar?.[0] ? (
                      <div className="w-10 h-10 border-2 border-brand-border overflow-hidden bg-brand-bg">
                        <img src={b.gambar[0].url} alt="" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 border-2 border-brand-border bg-brand-bg flex items-center justify-center">
                        <span className="text-[16px] text-brand-text-faint">-</span>
                      </div>
                    )}
                  </td>
                  <td className="px-3 md:px-4 py-2.5 md:py-3">
                    <p className="text-[13px] font-medium text-brand-text max-w-[180px] md:max-w-xs truncate">
                      {b.nama}
                    </p>
                  </td>
                  <td className="px-3 md:px-4 py-2.5 md:py-3">
                    <p className="text-[13px] font-bold text-brand-text whitespace-nowrap">
                      Rp{b.harga.toLocaleString('id-ID')}
                    </p>
                  </td>
                  <td className="px-3 md:px-4 py-2.5 md:py-3">
                    <p className="text-[12px] text-brand-text-muted whitespace-nowrap">{b.kondisi}</p>
                  </td>
                  <td className="px-3 md:px-4 py-2.5 md:py-3">
                    <span className={`inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1.5 border-2 ${
                      b.terjual
                        ? 'border-brand-text-faint/40 text-brand-text-faint bg-brand-bg'
                        : 'border-brand-amber text-brand-amber bg-brand-amber-light'
                    }`}>
                      {b.terjual ? 'Terjual' : 'Tersedia'}
                    </span>
                  </td>
                  <td className="px-3 md:px-4 py-2.5 md:py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/edit/${b.id}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold tracking-widest uppercase
                                   border-2 border-brand-border px-2.5 py-1.5
                                   text-brand-text-muted hover:border-brand-amber hover:text-brand-amber 
                                   transition-all duration-200">
                        Edit
                      </Link>
                      <Link href={`/barang/${b.id}`} target="_blank"
                        className="inline-flex items-center gap-1 text-[11px] font-bold tracking-widest uppercase
                                   border-2 border-brand-border px-2.5 py-1.5
                                   text-brand-text-faint hover:border-brand-text hover:text-brand-text
                                   transition-all duration-200">
                        Lihat
                      </Link>
                      <MarkTerjualButton id={b.id} terjual={b.terjual} />
                      <HapusButton id={b.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}
