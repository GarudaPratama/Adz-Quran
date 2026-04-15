import { useState, useEffect } from 'react'
import SurahCard from '../components/SurahCard'
import JuzList from '../components/JuzList'

export default function HomePage() {
  const [surahs, setSurahs] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://equran.id/api/v2/surat').then(res => res.json()).then(data => setSurahs(data.data))
  }, [])

  const filtered = surahs.filter(s => s.namaLatin.toLowerCase().replace(/[^a-z]/g, '').startsWith(search.toLowerCase()))

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="text-center my-12">
        <h2 className="text-5xl font-bold mb-2">Adz-Quran</h2>
        <input 
          type="text" placeholder="Ketik huruf depan surah..." 
          className="w-full max-w-xl p-4 rounded-2xl border border-gold/20 text-center outline-none focus:border-gold mb-8"
          onChange={e => setSearch(e.target.value)}
        />
        {!search && <JuzList />}
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(s => <SurahCard key={s.nomor} surah={s} />)}
      </div>
    </div>
  )
}