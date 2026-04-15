import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gold/10 p-5 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-widest uppercase text-charcoal">Adz<span className="text-gold">-</span>Quran</Link>
        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
          <Link to="/" className="hover:text-gold">Surah</Link>
          <Link to="/juz" className="hover:text-gold">Juz</Link>
          <Link to="/bookmarks" className="text-gold">❤ Bookmarks</Link>
        </div>
      </div>
    </nav>
  )
}