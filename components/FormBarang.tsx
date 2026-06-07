'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { uploadGambar } from '@/lib/upload'
import toast from 'react-hot-toast'
import { X, Upload, Save, Plus } from 'lucide-react'

const KATEGORI = ['T-Shirts', 'Shirts', 'Pants', 'Jackets', 'Hoodies & Sweaters', 'Dresses & Skirts', 'Shoes', 'Accessories', 'Other']

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
  const [hapusGambarLama, setHapusGambarLama] = useState<string[]>([])
  const [form, setForm] = useState({
    nama:      initialData?.nama      || '',
    harga:     initialData?.harga?.toString() || '',
    deskripsi: initialData?.deskripsi || '',
    kondisi:   initialData?.kondisi   || 'New',
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
    const urlDihapus = preview[index]
    setPreview(prev => prev.filter((_, i) => i !== index))
    const offset = initialData?.gambar?.length || 0
    if (index < offset) {
      setHapusGambarLama(prev => [...prev, urlDihapus])
    } else {
      const fi = index - offset
      setFileBaru(prev => prev.filter((_, i) => i !== fi))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const urlBaru       = await Promise.all(fileBaru.map(f => uploadGambar(f)))
      const gambarLamaUrl = (initialData?.gambar?.map(g => g.url) || []).filter(url => !hapusGambarLama.includes(url))
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
        toast.error(`Failed: ${errorData.error}`)
        throw new Error(errorData.error)
      }
      
      toast.success(mode === 'tambah' ? 'Item added successfully!' : 'Changes saved!')
      
      router.push('/admin')
      router.refresh()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const inp = "w-full bg-white border-2 border-gray-200 px-4 py-3 text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-all duration-200"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-2.5">
          Item Photos
        </label>
        <div className="flex gap-3 flex-wrap">
          {preview.map((src, i) => (
            <div key={i} className="relative w-[92px] h-[92px] border-2 border-gray-200 overflow-hidden group">
              <img src={src} alt="" className="w-full h-full object-cover" />
              <button type="button" onClick={() => hapusPreview(i)}
                className="absolute top-1.5 right-1.5 bg-gray-900/70 hover:bg-red-500 text-white w-5 h-5 flex items-center justify-center
                           opacity-0 group-hover:opacity-100 transition-all duration-200">
                <X size={12} />
              </button>
              {i === 0 && (
                <span className="absolute bottom-0 left-0 right-0 bg-gray-900 text-white
                                 text-[8px] text-center py-1 tracking-widest uppercase font-bold">
                  Main
                </span>
              )}
            </div>
          ))}
          <label className="w-[92px] h-[92px] border-2 border-dashed border-gray-300 flex flex-col items-center
                            justify-center cursor-pointer hover:border-gray-900 text-gray-400
                            hover:text-gray-900 transition-all duration-200 gap-1.5 bg-gray-50/30">
            <Upload size={18} />
            <span className="text-[8px] font-bold tracking-widest uppercase">Upload</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-1.5">
          Item Name <span className="text-red-400">*</span>
        </label>
        <input type="text" required value={form.nama} onChange={e => setForm({...form, nama: e.target.value})}
          className={inp} placeholder="e.g. Black Plain Tee Size L" />
      </div>

      <div>
        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-1.5">
          Price <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-gray-400">Rp</span>
          <input type="number" required min={0} value={form.harga} onChange={e => setForm({...form, harga: e.target.value})}
            className={`${inp} pl-10`} placeholder="150000" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-1.5">Condition</label>
          <select value={form.kondisi} onChange={e => setForm({...form, kondisi: e.target.value})} className={inp}>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-1.5">Category</label>
          <select value={form.kategori} onChange={e => setForm({...form, kategori: e.target.value})} className={inp}>
            <option value="">Select category</option>
            {KATEGORI.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-1.5">Stock</label>
          <input type="number" min={0} value={form.stok} onChange={e => setForm({...form, stok: e.target.value})} className={inp} />
        </div>
        <div className="sm:flex sm:items-end">
          <div className="w-full">
            <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-1.5 opacity-0 select-none sm:block hidden">
              Spacer
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-1.5">Description</label>
        <textarea rows={4} value={form.deskripsi} onChange={e => setForm({...form, deskripsi: e.target.value})}
          className={`${inp} resize-none`} placeholder="Size, material, condition details..." />
      </div>

      <div className="border-t-2 border-gray-200 pt-6">
        <button type="submit" disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 text-white py-3.5 md:py-3 text-[12px] font-bold tracking-widest uppercase
                     hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 min-h-[48px]
                     active:scale-[0.98]">
          {loading ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
          ) : mode === 'tambah' ? (
            <><Plus size={16} /> Add Item</>
          ) : (
            <><Save size={16} /> Save Changes</>
          )}
        </button>
      </div>
    </form>
  )
}
