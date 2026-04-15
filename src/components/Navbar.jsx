import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white/70 backdrop-blur-xl border-b border-gold/5 p-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold text-charcoal tracking-[0.3em] uppercase group">
          Adz<span className="text-gold group-hover:animate-pulse">-</span>Quran
        </Link>
        <div className="flex items-center gap-6 text-gold font-bold tracking-[0.2em] uppercase text-[10px]">
          <span className="hidden md:block">The Noble Manuscript</span>
          <div className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse"></div>
        </div>
      </div>
    </nav>
  )
}