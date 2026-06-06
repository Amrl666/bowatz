import { Camera, MessageCircle, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-brand-border bg-brand-surface">
      <div className="max-w-350 mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="flex flex-col items-center gap-6">
          <ul className="flex items-center gap-6">
            <li>
              <a href="https://instagram.com/bowatz" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] text-brand-text-muted hover:text-brand-amber transition-colors duration-200">
                <Camera size={14} />
                @bowatz
              </a>
            </li>
            <li>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] text-brand-text-muted hover:text-brand-amber transition-colors duration-200">
                <MessageCircle size={14} />
                WhatsApp
              </a>
            </li>
            <li>
              <span className="inline-flex items-center gap-2 text-[13px] text-brand-text-faint">
                <MapPin size={14} />
                Indonesia
              </span>
            </li>
          </ul>
          <p className="text-[11px] text-brand-text-faint tracking-wide">
            &copy; {new Date().getFullYear()} bowatz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
