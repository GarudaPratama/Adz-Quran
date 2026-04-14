import { useState, useEffect } from 'react'
import { Routes, Route, Link, useParams } from 'react-router-dom'

// --- KOMPONEN DAFTAR SURAH ---
function SurahList() {
  const [surahs, setSurahs] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://equran.id/api/v2/surat')
      .then(res => res.json())
      .then(data => setSurahs(data.data))
  }, [])

  // Filter berdasarkan Nama atau Tempat Turun (Makkiyah/Madaniyah)
  const filteredSurahs = surahs.filter(s => 
    s.namaLatin.toLowerCase().includes(search.toLowerCase()) ||
    s.tempatTurun.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className="text-3xl font-bold text-primary">Daftar Surah</h2>
        <input 
          type="text"
          placeholder="Cari nama surah atau Makkiyah/Madaniyah..."
          className="w-full md:w-96 p-3 rounded-xl border-2 border-slate-200 focus:border-secondary outline-none transition-all"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSurahs.map(surah => (
          <Link to={`/surat/${surah.nomor}`} key={surah.nomor}>
            <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-secondary transition-all group">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-lg text-sm font-bold text-primary group-hover:bg-secondary group-hover:text-white transition-colors">
                    {surah.nomor}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-800">{surah.namaLatin}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-tighter">
                      {surah.tempatTurun} • {surah.jumlahAyat} Ayat
                    </p>
                  </div>
                </div>
                <div className="text-2xl font-arabic text-primary">{surah.nama}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// --- KOMPONEN DETAIL SURAH (ISI AYAT) ---
function SurahDetail() {
  const { nomor } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`https://equran.id/api/v2/surat/${nomor}`)
      .then(res => res.json())
      .then(json => setData(json.data))
  }, [nomor])

  if (!data) return <div className="text-center py-20 font-bold text-primary">Memuat ayat...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-secondary font-semibold hover:underline mb-6 inline-block">← Kembali ke Daftar</Link>
      <div className="text-center mb-12 bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-4xl font-bold text-primary mb-2">{data.namaLatin}</h1>
        <p className="text-slate-500">{data.arti} • {data.tempatTurun}</p>
        <hr className="my-6 border-slate-100" />
        <p className="text-3xl font-arabic leading-loose">{data.nama}</p>
      </div>

      <div className="space-y-6">
        {data.ayat.map(item => (
          <div key={item.nomorAyat} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-50">
            <div className="flex justify-between items-start gap-8">
              <span className="bg-slate-100 w-8 h-8 flex shrink-0 items-center justify-center rounded-full text-xs font-bold text-slate-500">
                {item.nomorAyat}
              </span>
              <p className="text-3xl font-arabic leading-[3rem] text-right w-full" dir="rtl">
                {item.teksArab}
              </p>
            </div>
            <p className="mt-6 text-sm text-secondary font-medium italic">{item.teksLatin}</p>
            <p className="mt-2 text-slate-700 leading-relaxed">{item.teksIndonesia}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// --- APP COMPONENT ---
export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-primary p-4 text-white sticky top-0 z-50">
        <div className="container mx-auto">
          <Link to="/" className="text-2xl font-bold">Adz-Quran</Link>
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element={<SurahList />} />
        <Route path="/surat/:nomor" element={<SurahDetail />} />
      </Routes>
    </div>
  )
}