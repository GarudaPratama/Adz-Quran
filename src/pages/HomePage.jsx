import { useState, useEffect } from 'react'
import SurahCard from '../components/SurahCard'
import JuzList from '../components/JuzList'

export default function HomePage() {
  const [surahs, setSurahs] = useState([])
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('ALL')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch('https://equran.id/api/v2/surat')
      .then(res => res.json())
      .then(json => {
        setSurahs(json.data || [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  // FILTER SESUAI DATA "Mekah" & "Madinah"
  const filteredSurahs = surahs.filter(s => {
    // 1. Search Logic
    const namaLatin = s.namaLatin ? s.namaLatin.toLowerCase().replace(/[^a-z]/g, '') : ''
    const kataKunci = search.toLowerCase().replace(/[^a-z]/g, '')
    const matchesSearch = namaLatin.startsWith(kataKunci)
    
    // 2. Category Logic (Mekah / Madinah)
    if (filterType === 'ALL') return matchesSearch

    // Kita samakan persis dengan data API kamu
    // Jika tombol MAKKIYAH ditekan, cari yang tulisannya "Mekah"
    // Jika tombol MADANIYAH ditekan, cari yang tulisannya "Madinah"
    const tempat = s.tempatTurun; // Ini yang isinya "Mekah" atau "Madinah"
    const target = filterType === 'MAKKIYAH' ? 'Mekah' : 'Madinah';
    
    return matchesSearch && tempat === target;
  })

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <header className="text-center mb-16">
        <h2 className="text-6xl font-bold text-charcoal mb-2 tracking-tight">Adz-Quran</h2>
        <p className="text-gold font-medium tracking-[0.4em] uppercase text-[10px] mb-10">Digital Holy Manuscript</p>
        
        <div className="max-w-2xl mx-auto space-y-8">
          <input 
            type="text" 
            placeholder="Cari surah..." 
            className="w-full bg-white border border-gold/20 shadow-xl p-6 rounded-2xl text-center text-xl focus:border-gold outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex justify-center gap-3">
            {[
              { id: 'ALL', label: 'Semua' },
              { id: 'MAKKIYAH', label: 'Mekah' }, // Label diganti Mekah biar jelas
              { id: 'MADANIYAH', label: 'Madinah' } // Label diganti Madinah biar jelas
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                  filterType === tab.id 
                  ? 'bg-gold text-white border-gold shadow-lg shadow-gold/20' 
                  : 'bg-white text-slate-400 border-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {!search && <JuzList />} 
        </div>
      </header>

      {loading ? (
        <div className="text-center py-20 text-gold font-bold animate-pulse">MEMUAT SURAH...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSurahs.length > 0 ? (
            filteredSurahs.map(s => <SurahCard key={s.nomor} surah={s} />)
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
              <p className="text-slate-400 italic">Surah tidak ditemukan di {filterType === 'MAKKIYAH' ? 'Mekah' : 'Madinah'}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}