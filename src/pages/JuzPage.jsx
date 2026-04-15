// src/pages/JuzPage.jsx
import { Link } from 'react-router-dom'
import ElegantDivider from '../components/ElegantDivider'

export default function JuzPage() {
  // Membuat array 1 - 30
  const juzs = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto animate-in fade-in duration-700">
      <header className="text-center mb-16">
        <h2 className="text-6xl md:text-7xl font-bold text-charcoal mb-2 tracking-tight">Al-Qur'an</h2>
        <p className="text-gold font-medium tracking-[0.4em] uppercase text-xs">Pembagian Per Juz</p>
        <ElegantDivider />
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {juzs.map((j) => (
          <Link to={`/juz/${j}`} key={j}>
            <div className="group bg-white border border-gold/10 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-gold/10 hover:border-gold transition-all duration-500 text-center relative overflow-hidden">
              {/* Ornamen Nomor Juz Transparan */}
              <div className="absolute -bottom-4 -right-4 text-7xl font-bold text-gold/5 group-hover:text-gold/10 transition-colors">
                {j}
              </div>
              
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mb-2">Bagian</p>
              <h3 className="text-3xl font-bold text-charcoal group-hover:text-gold transition-colors">Juz {j}</h3>
              
              <div className="mt-4 h-[1px] w-8 bg-gold/20 mx-auto group-hover:w-16 transition-all duration-500"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}