import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AudioPlayer from './components/AudioPlayer'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import JuzPage from './pages/JuzPage'
import JuzDetailPage from './pages/JuzDetailPage'
import BookmarkPage from './pages/BookmarkPage'

export default function App() {
  const [activeAudio, setActiveAudio] = useState(null);
  const [bookmarks, setBookmarks] = useState({ surahs: [], ayats: [] });

  useEffect(() => {
    const saved = localStorage.getItem('adz_bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  const toggleBookmark = (item, type) => {
    let newB = { ...bookmarks };
    if (type === 'surah') {
      const isExist = bookmarks.surahs.find(s => s.nomor === item.nomor);
      newB.surahs = isExist ? bookmarks.surahs.filter(s => s.nomor !== item.nomor) : [...bookmarks.surahs, item];
    } else {
      const isExist = bookmarks.ayats.find(a => a.id === item.id);
      newB.ayats = isExist ? bookmarks.ayats.filter(a => a.id !== item.id) : [...bookmarks.ayats, item];
    }
    setBookmarks(newB);
    localStorage.setItem('adz_bookmarks', JSON.stringify(newB));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pb-32">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/surat/:nomor" element={<DetailPage onPlay={setActiveAudio} toggleB={toggleBookmark} bookmarks={bookmarks} />} />
          <Route path="/juz" element={<JuzPage />} />
          <Route path="/juz/:nomor" element={<JuzDetailPage onPlay={setActiveAudio} toggleB={toggleBookmark} bookmarks={bookmarks} />} />
          <Route path="/bookmarks" element={<BookmarkPage bookmarks={bookmarks} toggleB={toggleBookmark} />} />
        </Routes>
      </main>
      <AudioPlayer active={activeAudio} onClose={() => setActiveAudio(null)} />
      <Footer />
    </div>
  )
}