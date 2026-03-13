import { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAppStore from '@/stores/useAppStore'
import { cn } from '@/lib/utils'
import { ShineEffect } from '@/components/ShineEffect'
import { POWER_TAGS } from '@/lib/powers'
import { OriginStoryRecorder } from '@/components/OriginStoryRecorder'

export default function NovoAmigo() {
  const location = useLocation()
  const navigate = useNavigate()
  const { addPlushie } = useAppStore()

  const [name, setName] = useState('')
  const [selectedPowers, setSelectedPowers] = useState<string[]>([])
  const [showShine, setShowShine] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const [image, setImage] = useState<string>(
    location.state?.imageUrl ||
      'https://img.usecurling.com/p/200/200?q=manga%20plush%20toy&color=orange',
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const togglePower = (id: string) => {
    setSelectedPowers((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id)
      if (prev.length >= 2) return prev
      return [...prev, id]
    })
  }

  const handleSave = () => {
    if (!name.trim()) return

    setShowShine(true)

    const powersString =
      selectedPowers.map((id) => POWER_TAGS.find((p) => p.id === id)?.label).join(', ') ||
      'Nenhum poder descoberto ainda!'

    setTimeout(() => {
      const newId = addPlushie({
        name,
        powers: powersString,
        powerTags: selectedPowers,
        imageUrl: image,
        emotion: 80,
        audioUrl: audioUrl || undefined,
      })
      navigate(`/pelucias/${newId}`)
    }, 2500)
  }

  return (
    <div className="container py-6 max-w-3xl animate-fade-in flex flex-col items-center pb-20 relative">
      {showShine && <ShineEffect />}

      <div className="w-full flex items-center justify-center mb-6 relative">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate(-1)}
          className="absolute left-0 rounded-full border-orange-300 text-orange-600 hover:bg-orange-100 bg-white/80 backdrop-blur-sm z-10 w-12 h-12 shadow-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
      </div>

      <h1 className="w-full text-center text-3xl md:text-5xl font-display font-black text-primary drop-shadow-md uppercase tracking-wider mb-8">
        Apresentando um
        <br className="md:hidden" /> Novo Habitante!
      </h1>

      <div className="w-full bg-white/90 backdrop-blur-md p-6 md:p-10 rounded-[2.5rem] shadow-2xl border-8 border-primary/20 relative overflow-hidden">
        <div className="absolute top-4 right-4 text-4xl opacity-20 rotate-12 pointer-events-none select-none">
          📜
        </div>
        <div className="absolute bottom-4 left-4 text-4xl opacity-20 -rotate-12 pointer-events-none select-none">
          👑
        </div>
        <div className="absolute inset-0 border-2 border-dashed border-primary/40 rounded-[2rem] m-2 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <div
            className="relative w-40 h-40 md:w-56 md:h-56 mx-auto mb-10 cursor-pointer group animate-float"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="absolute inset-0 rounded-full bg-yellow-400 blur-lg animate-pulse-glow opacity-80" />
            <div className="absolute inset-0 rounded-full border-[6px] border-yellow-300 bg-orange-50 shadow-[0_0_30px_rgba(255,215,0,0.6)] overflow-hidden z-10">
              <img
                src={image}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt="Plushie"
              />
            </div>
            <div className="absolute bottom-2 right-2 z-20 bg-white p-3 rounded-full shadow-xl border-4 border-yellow-400 group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6 text-yellow-600" />
            </div>
          </div>

          <div className="w-full space-y-8">
            <div className="space-y-3 text-center">
              <Label htmlFor="name" className="text-xl font-display font-bold text-orange-900">
                Nome do Amigo
              </Label>
              <Input
                id="name"
                placeholder="Ex: Leãozinho Valente"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-xl py-7 rounded-2xl border-orange-300 focus-visible:ring-orange-500 bg-orange-50/50 font-bold text-center placeholder:text-orange-300 shadow-inner"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-xl font-display font-bold text-orange-900 flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-orange-500" />
                Tags de Poder
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {POWER_TAGS.map((p) => {
                  const isSelected = selectedPowers.includes(p.id)
                  return (
                    <button
                      key={p.id}
                      onClick={() => togglePower(p.id)}
                      className={cn(
                        'flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300 gap-1.5 h-full',
                        isSelected
                          ? 'border-yellow-400 bg-yellow-50 shadow-[0_0_15px_rgba(255,215,0,0.6)] scale-105'
                          : 'border-orange-100 bg-white hover:bg-orange-50 hover:border-orange-200 opacity-90',
                      )}
                    >
                      <span
                        className={cn('text-2xl', isSelected && 'animate-bounce drop-shadow-md')}
                      >
                        {p.emoji}
                      </span>
                      <span
                        className={cn(
                          'text-xs font-bold leading-tight text-center',
                          isSelected ? 'text-orange-900' : 'text-orange-900/60',
                        )}
                      >
                        {p.label}
                      </span>
                    </button>
                  )
                })}
              </div>
              <p className="text-sm text-center text-orange-600 font-medium">
                Escolha até 2 poderes especiais ({selectedPowers.length}/2)
              </p>
            </div>

            <OriginStoryRecorder onAudioReady={setAudioUrl} />
          </div>
        </div>
      </div>

      <div className="mt-10 w-full max-w-sm">
        <Button
          onClick={handleSave}
          disabled={!name.trim() || showShine}
          className="w-full h-20 rounded-[2rem] text-2xl font-display font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 shadow-[0_10px_30px_rgba(251,146,60,0.4)] hover:scale-105 transition-all duration-300 border-4 border-white text-white disabled:opacity-50 disabled:hover:scale-100"
        >
          Apresentar ao Reino! 🦁
        </Button>
      </div>
    </div>
  )
}
