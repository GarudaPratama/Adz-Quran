import { Link } from 'react-router-dom'

export default function SurahCard({ surah }) {
  return (
    <Link to={`/surat/${surah.nomor}`} className="group bg-white p-6 rounded-3xl border border-slate-100 hover:border-gold/30 shadow-sm hover:shadow-xl transition-all">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-ivory border border-gold/20 text-gold font-bold rotate-45 group-hover:bg-gold group-hover:text-white transition-all">
            <span className="-rotate-45">{surah.nomor}</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">{surah.namaLatin}</h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">{surah.tempatTurun} • {surah.jumlahAyat} AYAT</p>
          </div>
        </div>
        <div className="text-2xl font-arabic text-gold">{surah.nama}</div>
      </div>
    </Link>
  )
}