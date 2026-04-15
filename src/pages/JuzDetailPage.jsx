import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ElegantDivider from '../components/ElegantDivider'

export default function JuzDetailPage({ onPlay, toggleB, bookmarks }) {
  const { nomor } = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJuz = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const resp = await fetch(`https://equran.id/api/v2/juz/${nomor}`)
        
        // Cek apakah response oke dan tipenya JSON
        const contentType = resp.headers.get("content-type")
        if (!resp.ok || !contentType || !contentType.includes("application/json")) {
          throw new Error("API sedang limit/sibuk.")
        }

        const result = await resp.json()
        if (result.code === 200) {
          setData(result.data)
        } else {
          throw new Error(result.message)
        }
      } catch (err) {
        setError("Maaf, server pusat sedang berat untuk memuat data Juz. Silakan baca per Surah di halaman utama.")
      } finally {
        setLoading(false)
      }
    }
    fetchJuz()
  }, [nomor])

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-[60vh]">
      <div className="w-10 h-10 border-4 border-gold/20 border-t-gold rounded-full animate-spin"></div>
      <p className="mt-4 text-gold font-bold text-[10px] tracking-widest animate-pulse uppercase">Memanggil Data Juz {nomor}...</p>
    </div>
  )
  
  if (error) return (
    <div className="flex flex-col justify-center items-center h-[70vh] text-center px-10">
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gold/10 max-w-md">
        <span className="text-4xl block mb-4">⏳</span>
        <h3 className="text-xl font-bold text-charcoal mb-2">Server Sedang Sibuk</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">{error}</p>
        <div className="flex flex-col gap-3">
            <button onClick={() => window.location.reload()} className="bg-gold text-white px-8 py-3 rounded-2xl text-xs font-bold hover:scale-105 transition-all">Coba Segarkan</button>
            <Link to="/" className="text-gold text-[10px] font-bold uppercase tracking-widest">Kembali ke Beranda</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 animate-in fade-in duration-1000">
      <header className="text-center mb-16">
        <Link to="/juz" className="text-[10px] font-bold text-slate-300 uppercase tracking-widest hover:text-gold transition-colors">← Kembali ke Daftar Juz</Link>
        <h1 className="text-7xl font-bold text-charcoal mt-6 tracking-tighter">Juz {data?.juz}</h1>
        <p className="text-gold font-bold tracking-[0.4em] uppercase text-[10px] mt-2">Mushaf Digital</p>
        <ElegantDivider />
      </header>

      <div className="space-y-12">
        {data?.ayat?.map((a) => {
          const id = `${a.nomorSurat}-${a.nomorAyat}`;
          const isB = bookmarks?.ayats?.find(x => x.id === id);
          
          return (
            <div key={id} className="bg-white p-8 md:p-14 rounded-[3rem] border border-slate-50 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="flex justify-between items-center mb-10 border-b border-slate-50 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-ivory border border-gold/20 text-gold flex items-center justify-center font-black text-[10px] shadow-inner">
                    {a.nomorAyat}
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{a.namaSurah}</p>
                    <p className="text-[9px] text-gold font-bold">QS. {a.nomorSurat}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => onPlay({url: a.audio['05'], title: `${a.namaSurah}: ${a.nomorAyat}`})} className="w-10 h-10 flex items-center justify-center rounded-full bg-ivory text-gold hover:bg-gold hover:text-white transition-all">▶</button>
                  <button onClick={() => toggleB({...a, id, surahName: a.namaSurah}, 'ayat')} className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all ${isB ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white border-slate-100 text-slate-300'}`}>
                    {isB ? '❤️' : '♡'}
                  </button>
                </div>
              </div>
              <p className="text-4xl md:text-5xl text-right font-arabic leading-[4.5rem] md:leading-[6rem] text-charcoal mb-10" dir="rtl">{a.teksArab}</p>
              <div className="mt-8 border-l-2 border-gold/10 pl-8 space-y-3">
                <p className="text-gold font-semibold italic text-lg leading-relaxed">{a.teksLatin}</p>
                <p className="text-slate-500 font-light text-lg leading-relaxed">{a.teksIndonesia}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}