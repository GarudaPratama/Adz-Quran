import { Link } from 'react-router-dom'

export default function SurahCard({ surah }) {
  return (
    <Link to={`/surat/${surah.nomor}`}>
      <div className="group bg-white border border-slate-100 p-7 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-gold/10 hover:border-gold/30 transition-all duration-500 relative overflow-hidden">
        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-ivory border border-gold/20 text-gold font-bold rotate-45 group-hover:bg-gold group-hover:text-white transition-all duration-500">
              <span className="-rotate-45">{surah.nomor}</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-charcoal group-hover:text-gold transition-colors">{surah.namaLatin}</h3>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mt-1">
                {surah.tempatTurun} • {surah.jumlahAyat} AYAT
              </p>
            </div>
          </div>
          <div className="text-4xl font-arabic text-gold/40 group-hover:text-gold group-hover:scale-110 transition-all duration-500">
            {surah.nama}
          </div>
        </div>
      </div>
    </Link>
  )
}