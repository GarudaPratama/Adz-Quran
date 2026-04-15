import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        {/* Tombol Back muncul jika bukan di HomePage */}
        {location.pathname !== '/' && (
          <Link 
            to="/" 
            className="group flex items-center gap-2 bg-white border border-gold/10 px-4 py-2 rounded-2xl shadow-sm hover:border-gold transition-all"
          >
            <span className="text-gold group-hover:-translate-x-1 transition-transform">←</span>
            <span className="text-[10px] font-black text-charcoal uppercase tracking-widest">Beranda</span>
          </Link>
        )}
        
        <Link to="/" className="text-xl font-bold text-charcoal tracking-tighter">
          ADZ<span className="text-gold">QURAN</span>
        </Link>
      </div>

      <div className="flex gap-6">
        <Link to="/bookmarks" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-gold transition-all">Bookmarks</Link>
      </div>
    </nav>
  )
}