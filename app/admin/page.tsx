import Link from 'next/link'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import DeleteButton from '@/components/DeleteButton'
import MarkSoldButton from '@/components/MarkSoldButton'
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 
                   border-2 border-gray-200 px-3 py-1.5 mb-6
                   hover:border-gray-900 hover:text-gray-900 transition-all duration-200 group">
        <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
        Back
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
            Admin
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {barangList?.length || 0} items in catalog
          </p>
        </div>
        <Link href="/admin/tambah"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 text-[11px] font-bold tracking-widest uppercase
                     hover:bg-gray-800 transition-all duration-200 active:scale-[0.97]">
          <Plus size={14} />
          Add
        </Link>
      </div>

      <div className="border-2 border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              {['Photo', 'Name', 'Price', 'Condition', 'Status', 'Actions'].map(h => (
                <th key={h}
                  className="px-3 md:px-4 py-3.5 text-left text-[10px] font-bold tracking-widest uppercase text-gray-500 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {barangList?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center">
                  <p className="text-[13px] text-gray-500 font-medium">No items yet</p>
                  <p className="text-[11px] text-gray-400 mt-1">Click &ldquo;Add&rdquo; to get started</p>
                </td>
              </tr>
            ) : (
              barangList?.map((b) => (
                <tr key={b.id}
                  className="bg-white hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-3 md:px-4 py-2.5 md:py-3">
                    {b.gambar?.[0] ? (
                      <div className="w-10 h-10 border-2 border-gray-200 overflow-hidden bg-gray-100">
                        <img src={b.gambar[0].url} alt="" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                        <span className="text-base text-gray-400">-</span>
                      </div>
                    )}
                  </td>
                  <td className="px-3 md:px-4 py-2.5 md:py-3">
                    <p className="text-[13px] font-medium text-gray-900 max-w-[180px] md:max-w-xs truncate">
                      {b.nama}
                    </p>
                  </td>
                  <td className="px-3 md:px-4 py-2.5 md:py-3">
                    <p className="text-[13px] font-bold text-gray-900 whitespace-nowrap">
                      Rp{b.harga.toLocaleString('en-ID')}
                    </p>
                  </td>
                  <td className="px-3 md:px-4 py-2.5 md:py-3">
                    <p className="text-xs text-gray-500 whitespace-nowrap">{b.kondisi}</p>
                  </td>
                  <td className="px-3 md:px-4 py-2.5 md:py-3">
                    <span className={`inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1.5 border-2 ${
                      b.terjual
                        ? 'border-gray-300 text-gray-400 bg-gray-50'
                        : 'border-gray-900 text-gray-900 bg-white'
                    }`}>
                      {b.terjual ? 'Sold' : 'Available'}
                    </span>
                  </td>
                  <td className="px-3 md:px-4 py-2.5 md:py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/edit/${b.id}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold tracking-widest uppercase
                                   border-2 border-gray-200 px-2.5 py-1.5
                                   text-gray-500 hover:border-gray-900 hover:text-gray-900 
                                   transition-all duration-200">
                        Edit
                      </Link>
                      <Link href={`/barang/${b.id}`} target="_blank"
                        className="inline-flex items-center gap-1 text-[11px] font-bold tracking-widest uppercase
                                   border-2 border-gray-200 px-2.5 py-1.5
                                   text-gray-400 hover:border-gray-900 hover:text-gray-900
                                   transition-all duration-200">
                        View
                      </Link>
                      <MarkSoldButton id={b.id} terjual={b.terjual} />
                      <DeleteButton id={b.id} />
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
