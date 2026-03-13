import { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, Sparkles, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import useAppStore from '@/stores/useAppStore'
import { cn } from '@/lib/utils'
import { ShineEffect } from '@/components/ShineEffect'
import { POWER_TAGS } from '@/lib/powers'
import { OriginStoryRecorder } from '@/components/OriginStoryRecorder'

export default function NovoAmigo() {
  const location = useLocation()
  const navigate = useNavigate()
  const { addPlushie, plushies, hasRarePowerUnlocked, unlockRarePower } = useAppStore()

  const [name, setName] = useState('')
  const [selectedPowers, setSelectedPowers] = useState<string[]>([])
  const [showShine, setShowShine] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [showMilestoneDialog, setShowMilestoneDialog] = useState(false)
  const [pendingPlushieId, setPendingPlushieId] = useState<string | null>(null)

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
      // Milestone: Unlock rare power at 5 plushies
      const isMilestone = plushies.length + 1 >= 5 && !hasRarePowerUnlocked

      const newId = addPlushie({
        name,
        powers: powersString,
        powerTags: selectedPowers,
        imageUrl: image,
        emotion: 80,
        audioUrl: audioUrl || undefined,
      })

      if (isMilestone) {
        setShowShine(false)
        unlockRarePower()
        setPendingPlushieId(newId)
        setShowMilestoneDialog(true)
      } else {
        navigate(`/pelucias/${newId}`)
      }
    }, 2500)
  }

  const visiblePowers = POWER_TAGS.filter((p) => !p.isRare || hasRarePowerUnlocked)

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
                {visiblePowers.map((p) => {
                  const isSelected = selectedPowers.includes(p.id)
                  const isRare = p.isRare
                  return (
                    <button
                      key={p.id}
                      onClick={() => togglePower(p.id)}
                      className={cn(
                        'flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300 gap-1.5 h-full relative overflow-hidden',
                        isSelected
                          ? 'border-yellow-400 bg-yellow-50 shadow-[0_0_15px_rgba(255,215,0,0.6)] scale-105'
                          : 'border-orange-100 bg-white hover:bg-orange-50 hover:border-orange-200 opacity-90',
                        isRare &&
                          !isSelected &&
                          'border-yellow-300 shadow-[0_0_10px_rgba(255,215,0,0.3)] bg-gradient-to-br from-white to-yellow-50',
                        isRare &&
                          isSelected &&
                          'border-yellow-500 shadow-[0_0_20px_rgba(255,215,0,0.8)] ring-2 ring-yellow-400 ring-offset-1 bg-gradient-to-br from-yellow-50 to-yellow-200',
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

      <Dialog
        open={showMilestoneDialog}
        onOpenChange={(open) => {
          if (!open && pendingPlushieId) {
            navigate(`/pelucias/${pendingPlushieId}`)
          }
        }}
      >
        <DialogContent className="sm:max-w-md text-center bg-gradient-to-b from-yellow-50 to-white border-4 border-yellow-400 rounded-[2rem] overflow-hidden z-[110]">
          {showMilestoneDialog && <ShineEffect />}
          <DialogHeader className="relative z-10 pt-4">
            <div className="mx-auto w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-6 border-4 border-yellow-300 shadow-inner animate-bounce">
              <Crown className="w-12 h-12 text-yellow-600" />
            </div>
            <DialogTitle className="text-3xl font-display font-black text-yellow-600 mb-4 drop-shadow-sm leading-tight">
              Parabéns! <br />
              Seu Reino está crescendo! 🏰
            </DialogTitle>
            <DialogDescription className="text-lg font-bold text-orange-800 flex flex-col items-center gap-5 mt-2">
              <span>Você desbloqueou um Poder Raro!</span>
              <span className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-400 rounded-full text-yellow-800 animate-pulse-glow shadow-md w-full max-w-[280px]">
                <span className="text-2xl">🌟</span> Guardião Real do Reino
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-8 flex justify-center w-full sm:justify-center relative z-10 pb-2">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-6 h-auto text-xl font-display font-bold rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg hover:scale-105 transition-transform border-2 border-white"
              onClick={() => navigate(`/pelucias/${pendingPlushieId}`)}
            >
              Incrível! Continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
