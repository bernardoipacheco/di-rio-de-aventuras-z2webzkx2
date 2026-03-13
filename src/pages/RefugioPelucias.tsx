import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Camera } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import useAppStore from '@/stores/useAppStore'
import { getEmotionForValue } from '@/lib/emotions'
import { cn } from '@/lib/utils'
import { POWER_TAGS } from '@/lib/powers'

const QUICK_EMOTIONS = [
  { value: 10, emoji: '😴' },
  { value: 30, emoji: '😊' },
  { value: 60, emoji: '😎' },
  { value: 80, emoji: '🤩' },
  { value: 100, emoji: '😡' },
]

export default function RefugioPelucias() {
  const { plushies, updatePlushieEmotion, hasRarePowerUnlocked } = useAppStore()
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
    <div className="container py-8 max-w-4xl animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-display font-bold text-secondary mb-4">
          Refúgio das Pelúcias 🧸
        </h1>
        <p className="text-muted-foreground text-lg font-medium">
          Escolha um amigo macio para cuidar ou crie um novo!
        </p>
      </div>

      <div className="w-full overflow-x-auto pb-4 mb-6 no-scrollbar flex items-center gap-3 px-1 snap-x">
        <button
          onClick={() => setActiveFilter(null)}
          className={cn(
            'whitespace-nowrap px-5 py-2.5 rounded-full font-bold text-sm transition-all border-2 snap-center shrink-0 shadow-sm',
            activeFilter === null
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-white text-muted-foreground border-muted hover:border-primary/50',
          )}
        >
          Ver Todos
        </button>
        {visiblePowers.map((p) => {
          const isActive = activeFilter === p.id
          const isRare = p.isRare
          return (
            <button
              key={p.id}
              onClick={() => setActiveFilter(p.id)}
              className={cn(
                'whitespace-nowrap px-4 py-2.5 rounded-full font-bold text-sm transition-all border-2 snap-center shrink-0 shadow-sm flex items-center gap-2',
                isActive
                  ? 'bg-yellow-100 text-orange-900 border-yellow-400 scale-105'
                  : 'bg-white text-muted-foreground border-muted hover:border-yellow-200',
                isRare && !isActive && 'border-yellow-300 shadow-[0_0_8px_rgba(255,215,0,0.3)]',
                isRare && isActive && 'shadow-[0_0_15px_rgba(255,215,0,0.6)] animate-pulse-glow',
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-4 border-dashed border-orange-300 hover:border-orange-500 rounded-3xl h-full bg-orange-50/50 backdrop-blur-sm animate-float flex flex-col items-center justify-center p-6 min-h-[260px]"
        >
          <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mb-4 border-2 border-orange-200 shadow-inner group-hover:bg-orange-200 transition-colors">
            <Camera className="w-12 h-12 text-orange-500" />
          </div>
          <h3 className="font-display font-black text-2xl text-orange-600 uppercase tracking-wide text-center">
            Novo Amigo
          </h3>
        </Card>

        {filteredPlushies.map((plushie) => {
          const currentEmotion = getEmotionForValue(plushie.emotion)

          return (
            <Link to={`/pelucias/${plushie.id}`} key={plushie.id} className="block group">
              <Card className="cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-4 border-secondary/20 rounded-3xl h-full bg-white/60 backdrop-blur-sm">
                <CardContent className="p-5 flex flex-col items-center text-center gap-3 h-full justify-between">
                  <div className="flex flex-col items-center gap-2 w-full">
                    <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-secondary bg-muted shadow-inner group-hover:border-primary transition-colors">
                      <img
                        src={plushie.imageUrl}
                        alt={plushie.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-display font-bold text-lg text-orange-950 line-clamp-1 w-full px-2">
                      {plushie.name}
                    </h3>

                    {plushie.powerTags && plushie.powerTags.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1.5 mt-1 w-full">
                        {plushie.powerTags.map((tagId) => {
                          const tag = POWER_TAGS.find((t) => t.id === tagId)
                          if (!tag) return null
                          return (
                            <div
                              key={tagId}
                              className={cn(
                                'flex items-center gap-1 bg-gradient-to-r border text-[11px] px-2 py-0.5 rounded-full shadow-sm',
                                tag.isRare
                                  ? 'from-yellow-200 to-yellow-100 border-yellow-500 text-yellow-900 animate-pulse'
                                  : 'from-yellow-100 to-yellow-50 border-yellow-400 text-orange-900',
                              )}
                            >
                              <span className="text-[14px] leading-none drop-shadow-sm">
                                {tag.emoji}
                              </span>
                              <span className="font-bold truncate max-w-[80px]">{tag.label}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  <div className="w-full flex flex-col items-center gap-2 mt-auto">
                    <div
                      className="text-4xl animate-bounce drop-shadow-sm"
                      style={{ animationDuration: '3s' }}
                    >
                      {currentEmotion.emoji}
                    </div>

                    <div
                      className="flex justify-between items-center bg-orange-100/50 p-1.5 rounded-full w-full max-w-[220px]"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                    >
                      {QUICK_EMOTIONS.map((em) => {
                        const isSelected = Math.abs(plushie.emotion - em.value) <= 15
                        return (
                          <button
                            key={em.value}
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              updatePlushieEmotion(plushie.id, em.value)
                            }}
                            className={cn(
                              'text-xl transition-all duration-300 hover:scale-125 hover:-translate-y-1 touch-manipulation',
                              isSelected
                                ? 'scale-125 drop-shadow-md opacity-100'
                                : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0',
                            )}
                          >
                            {em.emoji}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
