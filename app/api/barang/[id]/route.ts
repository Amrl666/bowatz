import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data, error } = await supabase
    .from('barang')
    .select('*, gambar:barang_gambar(id, url, urutan)')
    .eq('id', id).single()

  if (error) return NextResponse.json({ error: 'Barang tidak ditemukan' }, { status: 404 })
  if (data.gambar) data.gambar.sort((a: { urutan: number }, b: { urutan: number }) => a.urutan - b.urutan)
  return NextResponse.json(data)
}


export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params 
  const supabaseAuth = await createSupabaseServerClient()
  
  const body = await req.json()
  
  const { gambar_urls, ...dataBarang } = body
  
  const { data, error } = await supabaseAuth
    .from('barang')
    .update(dataBarang)
    .eq('id', id)
    .select()
    .single()
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (gambar_urls && gambar_urls.length > 0) {

    await supabaseAuth.from('barang_gambar').delete().eq('barang_id', id)
    
    const rows = gambar_urls.map((url: string, i: number) => ({
      barang_id: id, url, urutan: i,
    }))
    await supabaseAuth.from('barang_gambar').insert(rows)
  }

  return NextResponse.json(data)
}


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params 
  const supabaseAuth = await createSupabaseServerClient()
  const { terjual } = await req.json()
  
  const { data, error } = await supabaseAuth
    .from('barang').update({ terjual }).eq('id', id).select().single()
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params 
  const supabaseAuth = await createSupabaseServerClient()
  
  const { error } = await supabaseAuth.from('barang').delete().eq('id', id)
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}