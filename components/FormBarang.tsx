'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { uploadGambar } from '@/lib/upload'
import toast from 'react-hot-toast'
import { X } from 'lucide-react'

const KATEGORI = ['Pakaian', 'Sepatu', 'Aksesoris', 'Elektronik', 'Lainnya']

type Props = {
  initialData?: {
    id?: string; nama?: string; harga?: number; deskripsi?: string | null
    kondisi?: string; kategori?: string | null; stok?: number
    gambar?: { id: string; url: string; urutan: number }[]
  }
  mode: 'tambah' | 'edit'
}

export default function FormBarang({ initialData, mode }: Props) {
  const router  = useRouter()
  const [loading, setLoading]   = useState(false)
  const [preview, setPreview]   = useState<string[]>(initialData?.gambar?.map(g => g.url) || [])
  const [fileBaru, setFileBaru] = useState<File[]>([])
  const [form, setForm] = useState({
    nama:      initialData?.nama      || '',
    harga:     initialData?.harga?.toString() || '',
    deskripsi: initialData?.deskripsi || '',
    kondisi:   initialData?.kondisi   || 'Baru',
    kategori:  initialData?.kategori  || '',
    stok:      initialData?.stok?.toString() || '1',
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files    = Array.from(e.target.files || [])
    const previews = files.map(f => URL.createObjectURL(f))
    setFileBaru(prev => [...prev, ...files])
    setPreview(prev => [...prev, ...previews])
  }

  const hapusPreview = (index: number) => {
    setPreview(prev => prev.filter((_, i) => i !== index))
    const offset = initialData?.gambar?.length || 0
    const fi = index - offset
    if (fi >= 0) setFileBaru(prev => prev.filter((_, i) => i !== fi))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const urlBaru       = await Promise.all(fileBaru.map(f => uploadGambar(f)))
      const gambarLamaUrl = initialData?.gambar?.map(g => g.url) || []
      const body = {
        ...form,
        harga: parseInt(form.harga),
        stok:  parseInt(form.stok),
        gambar_urls: [...gambarLamaUrl, ...urlBaru],
      }
      const url    = mode === 'edit' && initialData?.id ? `/api/barang/${initialData.id}` : '/api/barang'
      const method = mode === 'edit' ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      
      if (!res.ok) {
        const errorData = await res.json()
        toast.error(`Gagal: ${errorData.error}`)
        throw new Error(errorData.error)
      }
      
      toast.success(mode === 'tambah' ? 'Barang berhasil ditambahkan!' : 'Perubahan disimpan!') // ← Toast sukses
      
      router.push('/admin')
      router.refresh()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Input style — desain flat mengikuti brand
  const inp = "w-full bg-white border border-brand-border px-3 py-2 text-[13px] text-brand-text placeholder:text-brand-text-faint focus:outline-none focus:border-brand-border-dark"

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      {/* Upload Foto */}
      <div>
        <label className="block text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-2">
          Foto Barang
        </label>
        <div className="flex gap-2 flex-wrap">
          {preview.map((src, i) => (
            <div key={i} className="relative w-20 h-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover border border-brand-border" />
              <button type="button" onClick={() => hapusPreview(i)}
                className="absolute -top-1.5 -right-1.5 bg-brand-text text-white w-4 h-4 flex items-center justify-center">
                <X size={10} />
              </button>
              {i === 0 && (
                <span className="absolute bottom-0 left-0 right-0 bg-brand-text/70 text-white
                                 text-[9px] text-center py-0.5 tracking-widest uppercase">
                  Utama
                </span>
              )}
            </div>
          ))}
          <label className="w-20 h-20 border border-dashed border-brand-border-dark flex items-center
                            justify-center cursor-pointer hover:border-brand-amber text-brand-text-faint
                            hover:text-brand-amber text-2xl transition-colors">
            +
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-1">Nama Barang *</label>
        <input type="text" required value={form.nama} onChange={e => setForm({...form, nama: e.target.value})}
          className={inp} placeholder="Kaos Polos Hitam Size L" />
      </div>

      <div>
        <label className="block text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-1">Harga (Rp) *</label>
        <input type="number" required min={0} value={form.harga} onChange={e => setForm({...form, harga: e.target.value})}
          className={inp} placeholder="150000" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-1">Kondisi</label>
          <select value={form.kondisi} onChange={e => setForm({...form, kondisi: e.target.value})} className={inp}>
            <option value="Baru">Baru</option>
            <option value="Bekas">Bekas</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-1">Kategori</label>
          <select value={form.kategori} onChange={e => setForm({...form, kategori: e.target.value})} className={inp}>
            <option value="">Pilih kategori</option>
            {KATEGORI.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-1">Stok</label>
        <input type="number" min={0} value={form.stok} onChange={e => setForm({...form, stok: e.target.value})} className={inp} />
      </div>

      <div>
        <label className="block text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-1">Deskripsi</label>
        <textarea rows={4} value={form.deskripsi} onChange={e => setForm({...form, deskripsi: e.target.value})}
          className={`${inp} resize-none`} placeholder="Ukuran, bahan, kondisi detail..." />
      </div>

      <button type="submit" disabled={loading}
        className="w-full bg-brand-text text-white py-3.5 md:py-3 text-[12px] font-semibold tracking-widest uppercase
                   hover:bg-brand-text/80 transition-colors disabled:opacity-50 min-h-[44px]">
        {loading ? 'MENYIMPAN...' : mode === 'tambah' ? 'TAMBAH BARANG' : 'SIMPAN PERUBAHAN'}
      </button>
    </form>
  )
}