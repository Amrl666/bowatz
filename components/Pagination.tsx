import Link from 'next/link'

type Props = { page: number; totalPage: number; baseUrl: string }

export default function Pagination({ page, totalPage, baseUrl }: Props) {
  if (totalPage <= 1) return null

  const pageUrl = (p: number) => {
    const sep = baseUrl.includes('?') ? '&' : '?'
    return `${baseUrl}${sep}page=${p}`
  }

  // Tombol kotak: border, tanpa radius, ukuran kecil — ala Grailed
  const btn = "inline-flex items-center px-3 py-1.5 border border-brand-border text-[12px] transition-colors"
  const btnActive  = `${btn} bg-brand-text text-white border-brand-text`
  const btnNormal  = `${btn} text-brand-text-muted hover:border-brand-border-dark hover:text-brand-text`
  const btnDisabled = `${btn} text-brand-text-faint cursor-not-allowed`

  // Tampilkan maks 5 nomor di sekitar halaman aktif
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1)
    .filter(p => Math.abs(p - page) <= 2)

  return (
    <div className="flex items-center gap-1 mt-10">
      {page > 1
        ? <Link href={pageUrl(page - 1)} className={btnNormal}>← Prev</Link>
        : <span className={btnDisabled}>← Prev</span>
      }

      {pages[0] > 1 && (
        <>
          <Link href={pageUrl(1)} className={btnNormal}>1</Link>
          {pages[0] > 2 && <span className="px-1 text-brand-text-faint text-[12px]">…</span>}
        </>
      )}

      {pages.map(p => (
        <Link key={p} href={pageUrl(p)}
          className={p === page ? btnActive : btnNormal}>
          {p}
        </Link>
      ))}

      {pages[pages.length - 1] < totalPage && (
        <>
          {pages[pages.length - 1] < totalPage - 1 && (
            <span className="px-1 text-brand-text-faint text-[12px]">…</span>
          )}
          <Link href={pageUrl(totalPage)} className={btnNormal}>{totalPage}</Link>
        </>
      )}

      {page < totalPage
        ? <Link href={pageUrl(page + 1)} className={btnNormal}>Next →</Link>
        : <span className={btnDisabled}>Next →</span>
      }
    </div>
  )
}