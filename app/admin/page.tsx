import Link from 'next/link'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import HapusButton from '@/components/HapusButton'
import MarkTerjualButton from '@/components/MarkTerjualButton'

export default async function AdminPage() {
  const auth = await createSupabaseServerClient()
  const { data: { user } } = await auth.auth.getUser()
  if (!user) redirect('/login')

  const { data: barangList } = await supabase
    .from('barang')
    .select('*, gambar:barang_gambar(url)')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted">
          Admin — Kelola Barang ({barangList?.length || 0})
        </h1>
        <Link href="/admin/tambah"
          className="bg-brand-text text-white px-4 py-2 text-[11px] font-semibold tracking-widest uppercase
                     hover:bg-brand-text/80 transition-colors">
          + Tambah
        </Link>
      </div>

      <div className="border border-brand-border overflow-hidden">
        <table className="w-full text-[12px]">
          <thead className="border-b border-brand-border bg-brand-bg">
            <tr>
              {['Foto','Nama','Harga','Kondisi','Status','Aksi'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {barangList?.map((b) => (
              <tr key={b.id} className="bg-brand-surface hover:bg-brand-bg transition-colors">
                <td className="px-4 py-3">
                  {b.gambar?.[0] && (
                    <img src={b.gambar[0].url} alt="" className="w-10 h-10 object-cover border border-brand-border" />
                  )}
                </td>
                <td className="px-4 py-3 text-brand-text max-w-xs truncate">{b.nama}</td>
                <td className="px-4 py-3 text-brand-text font-semibold">
                  Rp{b.harga.toLocaleString('id-ID')}
                </td>
                <td className="px-4 py-3 text-brand-text-muted">{b.kondisi}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-semibold tracking-widest uppercase px-2 py-1 border ${
                    b.terjual
                      ? 'border-brand-text-faint text-brand-text-faint'
                      : 'border-brand-amber text-brand-amber'
                  }`}>
                    {b.terjual ? 'Terjual' : 'Tersedia'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3 items-center">
                    <Link href={`/admin/edit/${b.id}`} className="text-brand-text-muted hover:text-brand-amber transition-colors">Edit</Link>
                    <Link href={`/barang/${b.id}`} target="_blank" className="text-brand-text-faint hover:text-brand-text transition-colors">Lihat</Link>
                    <MarkTerjualButton id={b.id} terjual={b.terjual} />
                    <HapusButton id={b.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}