import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type Barang = {
  id: string
  nama: string
  harga: number
  deskripsi: string | null
  size: string
  kategori: string | null
  stok: number
  terjual: boolean
  created_at: string
  gambar?: BarangGambar[]
}

export type BarangGambar = {
  id: string
  barang_id: string
  url: string
  urutan: number
}