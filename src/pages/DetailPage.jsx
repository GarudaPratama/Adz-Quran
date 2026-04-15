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

  if (!data) return <div className="p-20 text-center text-gold">Memuat...</div>

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12">
      {/* Header Surah */}
      <div className="bg-white border border-gold/10 rounded-[3rem] p-10 md:p-20 text-center shadow-2xl mb-16">
        <h1 className="text-6xl md:text-7xl font-bold text-charcoal mb-4">{data.namaLatin}</h1>
        <button 
          onClick={() => toggleBookmark(data, 'surah')}
          className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border ${bookmarks.surahs.find(s => s.nomor === data.nomor) ? 'bg-gold text-white' : 'text-gold border-gold/20'}`}
        >
          {bookmarks.surahs.find(s => s.nomor === data.nomor) ? '❤️ Bookmarked' : '♡ Bookmark Surah'}
        </button>
        <ElegantDivider />
        <p className="text-5xl font-arabic">{data.nama}</p>
      </div>

      {/* List Ayat */}
      <div className="space-y-10">
        {data.ayat.map((ayat) => {
          const ayatId = `${data.nomor}-${ayat.nomorAyat}`;
          const isBookmarked = bookmarks.ayats.find(a => a.id === ayatId);

          return (
            <div key={ayat.nomorAyat} className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-50 shadow-sm">
              <div className="flex justify-between mb-8 items-center">
                <span className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center text-xs font-bold text-gold border border-gold/10">
                  {ayat.nomorAyat}
                </span>
                <div className="flex gap-4">
                  <button 
                    onClick={() => onPlayAudio({ url: ayat.audio['05'], title: `${data.namaLatin}: ${ayat.nomorAyat}` })}
                    className="text-[10px] font-bold text-gold hover:underline"
                  >▶ PUTAR AUDIO</button>
                  <button 
                    onClick={() => toggleBookmark({ ...ayat, id: ayatId, surahName: data.namaLatin }, 'ayat')}
                    className={`text-[10px] font-bold ${isBookmarked ? 'text-red-500' : 'text-slate-400'}`}
                  >
                    {isBookmarked ? '❤️ TERSIMPAN' : '♡ BOOKMARK'}
                  </button>
                </div>
              </div>
              <p className="text-4xl md:text-5xl font-arabic text-right leading-[4.5rem]" dir="rtl">{ayat.teksArab}</p>
              <div className="mt-8 border-l-2 border-gold/10 pl-6 space-y-2">
                <p className="text-gold italic font-medium">{ayat.teksLatin}</p>
                <p className="text-slate-500 font-light">{ayat.teksIndonesia}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}