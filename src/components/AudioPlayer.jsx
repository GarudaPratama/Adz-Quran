export default function AudioPlayer({ active, onClose }) {
  if (!active) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gold/20 p-4 z-[100] shadow-2xl">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="truncate"><p className="text-[10px] text-gold font-bold uppercase">Playing</p><p className="text-sm font-bold">{active.title}</p></div>
        <audio src={active.url} controls autoPlay className="h-10 flex-1" />
        <button onClick={onClose} className="text-lg">✕</button>
      </div>
    </div>
  )
}