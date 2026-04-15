import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ElegantDivider from '../components/ElegantDivider'

export default function DetailPage({ onPlayAudio, toggleBookmark, bookmarks }) {
  const { nomor } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch(`https://equran.id/api/v2/surat/${nomor}`)
      .then(res => res.json())
      .then(json => setData(json.data))
  }, [nomor])

  if (!data) return <div className="p-20 text-center text-gold font-bold animate-pulse">Memuat Surah...</div>

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 animate-in fade-in duration-700">
      {/* Header Surah */}
      <div className="bg-white border border-gold/10 rounded-[3rem] p-10 md:p-20 text-center shadow-2xl mb-16 relative overflow-hidden">
        {/* Dekorasi Background Minimalis */}
        <div className="absolute top-0 right-0 p-10 opacity-5 font-arabic text-8xl pointer-events-none">
          {data.nama}
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-charcoal mb-4 tracking-tighter">{data.namaLatin}</h1>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button 
            onClick={() => toggleBookmark(data, 'surah')}
            className={`text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full border transition-all ${
              bookmarks.surahs.find(s => s.nomor === data.nomor) 
              ? 'bg-gold text-white border-gold shadow-lg shadow-gold/20' 
              : 'text-gold border-gold/20 hover:border-gold'
            }`}
          >
            {bookmarks.surahs.find(s => s.nomor === data.nomor) ? '❤️ Bookmarked' : '♡ Bookmark Surah'}
          </button>

          {/* TOMBOL TAFSIR DISISIPKAN DISINI */}
          <Link 
            to={`/tafsir/${nomor}`}
            className="text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full bg-charcoal text-white hover:bg-gold transition-all shadow-lg shadow-charcoal/10"
          >
            📖 Lihat Tafsir
          </Link>
        </div>

        <ElegantDivider />
        <p className="text-5xl font-arabic text-charcoal mt-6">{data.nama}</p>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.5em] mt-4">
          {data.tempatTurun} • {data.jumlahAyat} Ayat
        </p>
      </div>

      {/* List Ayat */}
      <div className="space-y-10">
        {data.ayat.map((ayat) => {
          const ayatId = `${data.nomor}-${ayat.nomorAyat}`;
          const isBookmarked = bookmarks.ayats.find(a => a.id === ayatId);

          return (
            <div key={ayat.nomorAyat} className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between mb-12 items-center border-b border-slate-50 pb-6">
                <span className="w-10 h-10 rounded-xl bg-ivory flex items-center justify-center text-xs font-black text-gold border border-gold/10 shadow-inner">
                  {ayat.nomorAyat}
                </span>
                <div className="flex gap-6">
                  <button 
                    onClick={() => onPlayAudio({ url: ayat.audio['05'], title: `${data.namaLatin}: ${ayat.nomorAyat}` })}
                    className="text-[10px] font-black text-gold hover:tracking-widest transition-all uppercase tracking-widest"
                  >▶ Play Audio</button>
                  <button 
                    onClick={() => toggleBookmark({ ...ayat, id: ayatId, surahName: data.namaLatin }, 'ayat')}
                    className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isBookmarked ? 'text-red-500' : 'text-slate-300 hover:text-gold'}`}
                  >
                    {isBookmarked ? '❤️ Saved' : '♡ Save'}
                  </button>
                </div>
              </div>

              <p className="text-4xl md:text-5xl font-arabic text-right leading-[4.5rem] md:leading-[5.5rem] text-charcoal mb-10" dir="rtl">
                {ayat.teksArab}
              </p>

              <div className="mt-8 border-l-2 border-gold/10 pl-8 space-y-3">
                <p className="text-gold italic font-semibold text-lg leading-relaxed">{ayat.teksLatin}</p>
                <p className="text-slate-500 font-light text-lg leading-relaxed">{ayat.teksIndonesia}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}