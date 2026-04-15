import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function TafsirPage() {
  const { nomor } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://equran.id/api/v2/tafsir/${nomor}`)
      .then(res => res.json())
      .then(json => {
        setData(json.data)
        setLoading(false)
      })
  }, [nomor])

  if (loading) return <div className="p-20 text-center text-gold animate-pulse font-bold tracking-widest">MEMUAT TAFSIR...</div>

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 animate-in fade-in duration-700">
      <header className="text-center mb-16">
        <Link to={`/surat/${nomor}`} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-gold transition-all">
          ← Kembali ke Surah
        </Link>
        <h1 className="text-5xl font-bold text-charcoal mt-6">Tafsir {data.namaLatin}</h1>
        <p className="text-gold font-medium mt-2 tracking-[0.3em] uppercase text-[10px]">{data.nama}</p>
      </header>

      <div className="space-y-10">
        {data.tafsir.map((t) => (
          <div key={t.ayat} className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-50 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-ivory border border-gold/20 flex items-center justify-center text-gold font-bold text-xs">
                {t.ayat}
              </div>
              <h4 className="font-bold text-charcoal">Ayat {t.ayat}</h4>
            </div>
            
            {/* Teks Tafsir */}
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line font-light">
                {t.teks}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}