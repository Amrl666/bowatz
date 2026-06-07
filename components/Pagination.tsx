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

  const btnBase = "inline-flex items-center justify-center min-w-[36px] h-[36px] border-2 text-xs font-medium transition-all duration-200"

  return (
    <div className="flex items-center gap-1.5">
      {page > 1
        ? <Link href={pageUrl(page - 1)}
            className={`${btnBase} border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900 bg-white`}>
            ←
          </Link>
        : <span className={`${btnBase} border-gray-100 text-gray-300 cursor-not-allowed`}>←</span>
      }

      {pages[0] > 1 && (
        <>
          <Link href={pageUrl(1)}
            className={`${btnBase} border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900 bg-white`}>
            1
          </Link>
          {pages[0] > 2 && (
            <span className="w-[36px] text-center text-gray-400 text-xs select-none">&hellip;</span>
          )}
        </>
      )}

      {pages.map(p => (
        <Link key={p} href={pageUrl(p)}
          className={`${btnBase} ${
            p === page
              ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
              : 'border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900 bg-white'
          }`}>
          {p}
        </Link>
      ))}

      {pages[pages.length - 1] < totalPage && (
        <>
          {pages[pages.length - 1] < totalPage - 1 && (
            <span className="w-[36px] text-center text-gray-400 text-xs select-none">&hellip;</span>
          )}
          <Link href={pageUrl(totalPage)}
            className={`${btnBase} border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900 bg-white`}>
            {totalPage}
          </Link>
        </>
      )}

      {page < totalPage
        ? <Link href={pageUrl(page + 1)}
            className={`${btnBase} border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900 bg-white`}>
            →
          </Link>
        : <span className={`${btnBase} border-gray-100 text-gray-300 cursor-not-allowed`}>→</span>
      }
    </div>
  )
}
