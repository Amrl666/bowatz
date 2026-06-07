import { Camera, MessageCircle, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          <ul className="flex items-center gap-6">
            <li>
              <a href="https://www.instagram.com/bowatzzz/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                <Camera size={14} />
                @bowatzzz
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                <MessageCircle size={14} />
                WhatsApp
              </a>
            </li>
            <li>
              <span className="inline-flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={14} />
                Pringsewu, Lampung
              </span>
            </li>
          </ul>
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} bowatz
          </p>
        </div>
      </div>
    </footer>
  )
}
