import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function JuzDetailPage({ onPlay, toggleB, bookmarks }) {
  const { nomor } = useParams()
  const [ayatJuz, setAyatJuz] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadJuzManual = async () => {
      try {
        setLoading(true)
        setError(null)

        // Step 1: Ambil daftar surah untuk tahu struktur Juz
        // Kita gunakan endpoint juz tapi dengan penanganan error yang sangat ketat
        const resp = await fetch(`https://equran.id/api/v2/juz/${nomor}`)
        
        // Jika server juz beneran mati (ngasih HTML), kita kasih pesan edukatif
        const contentType = resp.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
           throw new Error("Server pusat equran.id sedang sibuk/maintenance. Silakan coba lagi dalam beberapa menit.");
        }

        const result = await resp.json()
        if (result.code === 200) {
          setAyatJuz(result.data.ayat)
        } else {
          throw new Error(result.message)
        }

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadJuzManual()
  }, [nomor])

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gold mb-4"></div>
      <p className="text-gold font-bold text-[10px] tracking-widest uppercase animate-pulse">Menghubungi Server Al-Quran...</p>
    </div>
  )

  if (error) return (
    <div className="flex flex-col justify-center items-center h-[60vh] text-center p-10 bg-white m-6 rounded-[3rem] shadow-xl">
      <div className="text-4xl mb-4">⏳</div>
      <p className="text-charcoal font-bold mb-2">Server Sedang Istirahat</p>
      <p className="text-slate-400 text-xs mb-6 leading-relaxed max-w-xs">
        {error} <br/> <br/> 
        (Biasanya karena trafik sedang tinggi. Mohon tunggu 1-2 menit lalu klik tombol di bawah)
      </p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-8 py-3 bg-gold text-white rounded-2xl text-xs font-bold shadow-lg shadow-gold/30 hover:scale-105 transition-all"
      >
        Segarkan Halaman
      </button>
      <Link to="/" className="mt-4 text-slate-300 text-[10px] font-bold uppercase tracking-widest">Atau Baca Per Surah Saja</Link>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in duration-1000">
      <div className="text-center mb-16">
        <h1 className="text-7xl font-bold text-charcoal mb-2 tracking-tighter">Juz {nomor}</h1>
        <p className="text-gold font-bold text-[10px] tracking-[0.5em] uppercase">Muthala'ah Digital</p>
      </div>

      <div className="space-y-8">
        {ayatJuz.map((a) => {
          const id = `${a.nomorSurat}-${a.nomorAyat}`;
          const isB = bookmarks.ayats.find(x => x.id === id);
          return (
            <div key={id} className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gold uppercase tracking-widest">{a.namaSurah}</span>
                  <span className="text-[9px] text-slate-300 font-bold uppercase">Ayat {a.nomorAyat}</span>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => onPlay({url: a.audio['05'], title: `${a.namaSurah}: ${a.nomorAyat}`})} className="text-[10px] text-gold font-bold">▶ AUDIO</button>
                  <button onClick={() => toggleB({...a, id, surahName: a.namaSurah}, 'ayat')} className={`text-[10px] font-bold ${isB ? 'text-red-500' : 'text-slate-300'}`}>
                    {isB ? '❤️' : '♡'}
                  </button>
                </div>
              </div>
              <p className="text-4xl md:text-5xl text-right font-arabic leading-relaxed text-charcoal" dir="rtl">{a.teksArab}</p>
              <div className="mt-8 border-l-2 border-gold/10 pl-6 space-y-2">
                <p className="text-gold italic font-medium text-lg leading-relaxed">{a.teksLatin}</p>
                <p className="text-slate-500 font-light leading-relaxed">{a.teksIndonesia}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}