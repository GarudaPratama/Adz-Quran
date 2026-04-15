import { Link } from 'react-router-dom'

export default function JuzList() {
  const juzs = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-[1px] flex-1 bg-gold/10"></div>
        <h3 className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Pilih Berdasarkan Juz</h3>
        <div className="h-[1px] flex-1 bg-gold/10"></div>
      </div>
      
      {/* Scrollable Container untuk Juz agar tidak memakan tempat */}
      <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar">
        {juzs.map((j) => (
          <Link 
            to={`/juz/${j}`} 
            key={j}
            className="flex-shrink-0 w-16 h-16 flex flex-col items-center justify-center bg-white border border-gold/10 rounded-2xl hover:border-gold hover:shadow-lg hover:shadow-gold/5 transition-all group"
          >
            <span className="text-[8px] text-slate-400 font-bold uppercase group-hover:text-gold">Juz</span>
            <span className="text-xl font-bold text-charcoal group-hover:text-gold">{j}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}