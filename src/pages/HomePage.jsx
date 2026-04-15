import { useState, useEffect } from 'react'
import SurahCard from '../components/SurahCard'

export default function HomePage() {
  const [surahs, setSurahs] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://equran.id/api/v2/surat').then(res => res.json()).then(data => setSurahs(data.data))
  }, [])

  const filteredSurahs = surahs.filter(s => {
    const normalize = (t) => t.toLowerCase().replace(/[^a-z]/g, '')
    return normalize(s.namaLatin).startsWith(normalize(search))
  })

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto animate-in fade-in duration-700">
      <header className="text-center mb-16">
        <h2 className="text-6xl md:text-7xl font-bold text-charcoal mb-2 tracking-tight">Adz-Quran</h2>
        <p className="text-gold font-medium tracking-[0.4em] uppercase text-xs">Digital Holy Manuscript</p>
        <div className="mt-12 max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="Ketik huruf depan surah..." 
            className="w-full bg-white border border-gold/20 shadow-xl p-6 rounded-2xl text-center text-xl focus:border-gold outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSurahs.map(s => <SurahCard key={s.nomor} surah={s} />)}
      </div>
    </div>
  )
}