import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const kategori = searchParams.get('kategori')
  const page     = parseInt(searchParams.get('page')  || '1')
  const limit    = parseInt(searchParams.get('limit') || '20')
  const from     = (page - 1) * limit
  const to       = from + limit - 1

  let query = supabase
    .from('barang')
    .select('*, gambar:barang_gambar(id, url, urutan)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (kategori) query = query.eq('kategori', kategori)

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data, total: count, page, limit })
}

export async function POST(req: NextRequest) {
  const supabaseAuth = await createSupabaseServerClient()
  
  const body = await req.json()
  const { nama, harga, deskripsi, kondisi, kategori, stok, gambar_urls } = body

  if (!nama || !harga)
    return NextResponse.json({ error: 'Nama dan harga wajib diisi' }, { status: 400 })

  const { data: barang, error } = await supabaseAuth
    .from('barang')
    .insert({ nama, harga, deskripsi, kondisi, kategori, stok })
    .select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (gambar_urls?.length > 0) {
    const rows = gambar_urls.map((url: string, i: number) => ({
      barang_id: barang.id, url, urutan: i,
    }))

    await supabaseAuth.from('barang_gambar').insert(rows)
  }

  return NextResponse.json(barang, { status: 201 })
}