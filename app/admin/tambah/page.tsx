import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import FormBarang from '@/components/FormBarang'

export default async function TambahPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <main className="max-w-2xl mx-auto px-4 md:px-6 py-6 md:py-8">
      <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-6">
        Admin · Tambah Barang
      </p>
      <FormBarang mode="tambah" />
    </main>
  )
}