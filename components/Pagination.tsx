import Link from 'next/link'

type Props = { page: number; totalPage: number; baseUrl: string }

export default function Pagination({ page, totalPage, baseUrl }: Props) {
  if (totalPage <= 1) return null

  const pageUrl = (p: number) => {
    const sep = baseUrl.includes('?') ? '&' : '?'
    return `${baseUrl}${sep}page=${p}`
  }

  const pages = Array.from({ length: totalPage }, (_, i) => i + 1)
    .filter(p => Math.abs(p - page) <= 2)

  const btnBase = "inline-flex items-center justify-center min-w-[36px] h-[36px] border text-[12px] font-medium transition-all duration-200"

  return (
    <div className="flex items-center gap-1.5">
      {page > 1
        ? <Link href={pageUrl(page - 1)}
            className={`${btnBase} border-brand-border text-brand-text-muted hover:border-brand-text hover:text-brand-text bg-brand-surface`}>
            ←
          </Link>
        : <span className={`${btnBase} border-brand-border/50 text-brand-text-faint/50 cursor-not-allowed`}>←</span>
      }

      {pages[0] > 1 && (
        <>
          <Link href={pageUrl(1)}
            className={`${btnBase} border-brand-border text-brand-text-muted hover:border-brand-text hover:text-brand-text bg-brand-surface`}>
            1
          </Link>
          {pages[0] > 2 && (
            <span className="w-[36px] text-center text-brand-text-faint text-[12px] select-none">&hellip;</span>
          )}
        </>
      )}

      {pages.map(p => (
        <Link key={p} href={pageUrl(p)}
          className={`${btnBase} ${
            p === page
              ? 'bg-brand-text text-white border-brand-text shadow-sm'
              : 'border-brand-border text-brand-text-muted hover:border-brand-text hover:text-brand-text bg-brand-surface'
          }`}>
          {p}
        </Link>
      ))}

      {pages[pages.length - 1] < totalPage && (
        <>
          {pages[pages.length - 1] < totalPage - 1 && (
            <span className="w-[36px] text-center text-brand-text-faint text-[12px] select-none">&hellip;</span>
          )}
          <Link href={pageUrl(totalPage)}
            className={`${btnBase} border-brand-border text-brand-text-muted hover:border-brand-text hover:text-brand-text bg-brand-surface`}>
            {totalPage}
          </Link>
        </>
      )}

      {page < totalPage
        ? <Link href={pageUrl(page + 1)}
            className={`${btnBase} border-brand-border text-brand-text-muted hover:border-brand-text hover:text-brand-text bg-brand-surface`}>
            →
          </Link>
        : <span className={`${btnBase} border-brand-border/50 text-brand-text-faint/50 cursor-not-allowed`}>→</span>
      }
    </div>
  )
}
