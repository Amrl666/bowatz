import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { supabase, type Barang } from '@/lib/supabase'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import FormBarang from '@/components/FormBarang'
import { ArrowLeft } from 'lucide-react'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params 

  const auth = await createSupabaseServerClient()
  const { data: { user } } = await auth.auth.getUser()
  if (!user) redirect('/login')

  const { data: barang } = await supabase
    .from('barang')
    .select('*, gambar:barang_gambar(id, url, urutan)')
    .eq('id', id).single() 

  if (!barang) notFound()

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/admin"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 
                   border-2 border-gray-200 px-3 py-1.5 mb-6
                   hover:border-gray-900 hover:text-gray-900 transition-all duration-200 group">
        <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
        Back
      </Link>

      <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
          Edit Item
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Edit details for &ldquo;{barang.nama.substring(0, 40)}&rdquo;
        </p>
      </div>

      <div className="border-2 border-gray-200 p-5 md:p-8 bg-white">
        <FormBarang mode="edit" initialData={barang as Barang} />
      </div>
    </main>
  )
}
