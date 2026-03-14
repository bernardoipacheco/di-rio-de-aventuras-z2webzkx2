import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Camera, PawPrint } from 'lucide-react'
import { Card } from '@/components/ui/card'
import useAppStore from '@/stores/useAppStore'
import { cn } from '@/lib/utils'
import { POWER_TAGS } from '@/lib/powers'
import { PlushieCard } from '@/components/PlushieCard'

export default function RefugioPelucias() {
  const { plushies, hasRarePowerUnlocked, updatePlushieAudio, removePlushieAudio } = useAppStore()
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        navigate('/pelucias/novo', { state: { imageUrl: reader.result } })
      }
      reader.readAsDataURL(file)
    }
  }

  const visiblePowers = POWER_TAGS.filter((p) => !p.isRare || hasRarePowerUnlocked)

  const filteredPlushies = activeFilter
    ? plushies.filter((p) => p.powerTags?.includes(activeFilter))
    : plushies

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-orange-400 via-yellow-400 to-amber-200 relative overflow-x-hidden flex flex-col items-center pb-20">
      {/* Navigation */}
      <Link
        to="/"
        className="absolute top-4 left-4 z-50 bg-white/70 backdrop-blur-md p-3 rounded-full hover:bg-white/90 hover:scale-110 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.1)] border-2 border-orange-200 group"
      >
        <PawPrint className="w-8 h-8 text-orange-900 group-hover:text-orange-600 transition-colors" />
      </Link>

      <div className="mt-8 md:mt-12 text-center relative z-20 px-4 mb-8">
        <h1 className="text-3xl md:text-5xl font-display font-black text-orange-950 drop-shadow-md tracking-wider uppercase bg-white/40 backdrop-blur-sm px-6 py-2 rounded-full border-4 border-white/50 inline-block">
          Refúgio das Pelúcias
        </h1>
        <div className="mt-4">
          <p className="text-orange-900 text-lg font-bold bg-white/50 backdrop-blur-sm px-6 py-1.5 rounded-full inline-block shadow-sm">
            Grave vozes especiais para os seus amigos! 🎙️
          </p>
        </div>
      </div>

      <div className="w-full max-w-4xl overflow-x-auto pb-4 mb-6 no-scrollbar flex items-center justify-start md:justify-center gap-3 px-4 snap-x relative z-20">
        <button
          onClick={() => setActiveFilter(null)}
          className={cn(
            'whitespace-nowrap px-5 py-2.5 rounded-full font-bold text-sm transition-all border-2 snap-center shrink-0 shadow-sm',
            activeFilter === null
              ? 'bg-orange-500 text-white border-orange-600 scale-105'
              : 'bg-white/80 text-orange-900 border-orange-200 hover:bg-orange-50',
          )}
        >
          Todos
        </button>
        {visiblePowers.map((p) => {
          const isActive = activeFilter === p.id
          return (
            <button
              key={p.id}
              onClick={() => setActiveFilter(p.id)}
              className={cn(
                'whitespace-nowrap px-4 py-2.5 rounded-full font-bold text-sm transition-all border-2 snap-center shrink-0 shadow-sm flex items-center gap-2',
                isActive
                  ? 'bg-yellow-400 text-orange-900 border-yellow-500 scale-105'
                  : 'bg-white/80 text-orange-900 border-orange-200 hover:bg-orange-50',
              )}
            >
              <span className="text-lg">{p.emoji}</span>
              <span>{p.label}</span>
            </button>
          )
        })}
      </div>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 relative z-20">
        <Card
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-4 border-dashed border-orange-400 hover:border-orange-500 rounded-3xl h-full bg-white/40 backdrop-blur-sm animate-float flex flex-col items-center justify-center p-6 min-h-[260px]"
        >
          <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mb-4 border-2 border-orange-200 shadow-inner group-hover:bg-orange-200 transition-colors">
            <Camera className="w-12 h-12 text-orange-500" />
          </div>
          <h3 className="font-display font-black text-2xl text-orange-700 uppercase tracking-wide text-center">
            Novo Amigo
          </h3>
        </Card>

        {filteredPlushies.map((plushie) => (
          <PlushieCard
            key={plushie.id}
            plushie={plushie}
            onSaveAudio={updatePlushieAudio}
            onRemoveAudio={removePlushieAudio}
          />
        ))}
      </div>
    </div>
  )
}
