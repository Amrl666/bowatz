import { supabase } from './supabase'

export async function uploadGambar(file: File): Promise<string> {
  const ext      = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const filePath = `produk/${fileName}`

  const { error } = await supabase.storage
    .from('gambar-barang')
    .upload(filePath, file, { cacheControl: '3600', upsert: false })

  if (error) throw new Error(`Gagal upload: ${error.message}`)

  const { data } = supabase.storage.from('gambar-barang').getPublicUrl(filePath)
  return data.publicUrl
}

export async function hapusGambar(url: string): Promise<void> {
  const path = url.split('/gambar-barang/')[1]
  if (!path) return
  await supabase.storage.from('gambar-barang').remove([path])
}