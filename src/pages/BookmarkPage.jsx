import SurahCard from '../components/SurahCard'

export default function BookmarkPage({ bookmarks, toggleB }) {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-10 text-center">Bookmarks</h2>
      <h3 className="text-gold uppercase text-xs font-bold mb-4 tracking-widest">Surah Favorit</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {bookmarks.surahs.map(s => <SurahCard key={s.nomor} surah={s} />)}
      </div>
      <h3 className="text-gold uppercase text-xs font-bold mb-4 tracking-widest">Ayat Pilihan</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookmarks.ayats.map(a => (
          <div key={a.id} className="bg-white p-6 rounded-2xl border border-gold/10">
            <p className="text-right text-2xl font-arabic mb-4" dir="rtl">{a.teksArab}</p>
            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-[10px] text-gold font-bold uppercase">{a.surahName} : {a.nomorAyat}</span>
              <button onClick={() => toggleB(a, 'ayat')} className="text-red-400 text-xs">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}