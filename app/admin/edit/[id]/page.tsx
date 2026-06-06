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
    <main className="max-w-2xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <Link href="/admin"
        className="inline-flex items-center gap-1.5 text-[11px] md:text-[12px] font-semibold text-brand-text-muted 
                   border-2 border-brand-border px-3 py-1.5 mb-6
                   hover:border-brand-text hover:text-brand-text transition-all duration-200 group">
        <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
        Kembali
      </Link>

      <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-brand-text">
          Edit Barang
        </h1>
        <p className="text-[12px] text-brand-text-muted mt-0.5">
          Ubah detail barang &ldquo;{barang.nama.substring(0, 40)}&rdquo;
        </p>
      </div>

      <div className="border-2 border-brand-border p-5 md:p-8 bg-brand-surface">
        <FormBarang mode="edit" initialData={barang as Barang} />
      </div>
    </main>
  )
}
