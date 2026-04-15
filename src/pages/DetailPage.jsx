import { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import ElegantDivider from '../components/ElegantDivider'

export default function DetailPage() {
  const { nomor } = useParams()
  const [data, setData] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch(`https://equran.id/api/v2/surat/${nomor}`)
      .then(res => res.json())
      .then(json => setData(json.data))
  }, [nomor, pathname])

  if (!data) return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <div className="w-12 h-12 border-[3px] border-gold/10 border-t-gold rounded-full animate-spin"></div>
      <p className="mt-6 text-gold tracking-[0.3em] uppercase text-[10px] font-bold">Membuka Mushaf...</p>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 animate-in slide-in-from-bottom-4 duration-700">
      <Link to="/" className="flex items-center gap-3 text-slate-400 hover:text-gold transition-all mb-12 group w-fit">
        <span className="group-hover:-translate-x-2 transition-transform text-xl">←</span>
        <span className="tracking-[0.2em] text-[10px] uppercase font-bold">Kembali ke Indeks</span>
      </Link>

      {/* Header Surah */}
      <div className="bg-white border border-gold/10 rounded-[3rem] p-10 md:p-20 text-center shadow-2xl shadow-gold/5 mb-20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 p-10 text-[12rem] text-gold/5 font-arabic pointer-events-none select-none">
          {data.nama}
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-charcoal mb-6 tracking-tighter">{data.namaLatin}</h1>
        <p className="text-2xl text-gold italic font-medium">{data.arti}</p>
        <ElegantDivider />
        <div className="space-y-4">
           <p className="text-6xl font-arabic text-charcoal leading-relaxed">{data.nama}</p>
           <p className="text-xs text-slate-400 uppercase tracking-[0.5em] font-bold">
             {data.tempatTurun} • {data.jumlahAyat} Ayat
           </p>
        </div>
      </div>

      {/* Daftar Ayat */}
      <div className="space-y-16">
        {data.ayat.map((item) => (
          <div key={item.nomorAyat} className="bg-white border border-slate-50 p-10 md:p-16 rounded-[3rem] shadow-sm hover:shadow-xl hover:shadow-gold/5 transition-all duration-500">
            <div className="flex flex-col gap-12">
              <div className="flex justify-between items-center border-b border-gold/5 pb-8">
                <div className="px-6 py-2 rounded-full bg-ivory border border-gold/10 text-gold text-[10px] font-black tracking-widest uppercase">
                  Ayat {item.nomorAyat}
                </div>
              </div>
              
              <p className="text-5xl md:text-6xl font-arabic leading-[5rem] md:leading-[6rem] text-right text-charcoal" dir="rtl">
                {item.teksArab}
              </p>
              
              <div className="space-y-6 mt-6 border-l-2 border-gold/10 pl-8">
                <p className="text-gold font-semibold italic leading-relaxed text-xl tracking-wide">
                  {item.teksLatin}
                </p>
                <p className="text-slate-500 leading-[2rem] text-lg font-light">
                  {item.teksIndonesia}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigasi Surah Sebelumnya/Selanjutnya */}
      <div className="mt-20 flex justify-between items-center px-4">
        {data.suratSebelumnya ? (
          <Link to={`/surat/${data.suratSebelumnya.nomor}`} className="text-gold hover:font-bold transition-all uppercase tracking-widest text-[10px] flex flex-col items-start gap-1">
            <span className="text-slate-300">Sebelumnya</span>
            ← {data.suratSebelumnya.namaLatin}
          </Link>
        ) : <div />}
        
        {data.suratSelanjutnya ? (
          <Link to={`/surat/${data.suratSelanjutnya.nomor}`} className="text-gold hover:font-bold transition-all uppercase tracking-widest text-[10px] flex flex-col items-end gap-1">
            <span className="text-slate-300">Selanjutnya</span>
            {data.suratSelanjutnya.namaLatin} →
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}