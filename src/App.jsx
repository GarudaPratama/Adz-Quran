import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'

export default function App() {
  return (
    <div className="min-h-screen bg-ivory selection:bg-gold/20">
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/surat/:nomor" element={<DetailPage />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}