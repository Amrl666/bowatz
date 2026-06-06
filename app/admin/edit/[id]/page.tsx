import { notFound, redirect } from 'next/navigation'
import { supabase, type Barang } from '@/lib/supabase'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import FormBarang from '@/components/FormBarang'

export default async function EditPage({ params }: { params: { id: string } }) {
  const auth = await createSupabaseServerClient()
  const { data: { user } } = await auth.auth.getUser()
  if (!user) redirect('/login')

  const { data: barang } = await supabase
    .from('barang')
    .select('*, gambar:barang_gambar(id, url, urutan)')
    .eq('id', params.id).single()

  if (!barang) notFound()

  return (
    <main className="max-w-2xl mx-auto px-6 py-8">
      <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-6">
        Admin · Edit Barang
      </p>
      <FormBarang mode="edit" initialData={barang as Barang} />
    </main>
  )
}