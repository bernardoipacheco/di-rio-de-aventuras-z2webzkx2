import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, Mic, Play, Sparkles, Shield, Map, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAppStore from '@/stores/useAppStore'
import { cn } from '@/lib/utils'

const powersList = [
  {
    id: 'sono',
    label: 'Protetor do Sono',
    icon: Shield,
    color: 'text-indigo-500',
    bg: 'bg-indigo-100',
    border: 'border-indigo-300',
  },
  {
    id: 'aventura',
    label: 'Companheiro de Aventuras',
    icon: Map,
    color: 'text-orange-500',
    bg: 'bg-orange-100',
    border: 'border-orange-300',
  },
  {
    id: 'abraco',
    label: 'Mestre dos Abraços',
    icon: Heart,
    color: 'text-pink-500',
    bg: 'bg-pink-100',
    border: 'border-pink-300',
  },
]

function ShineEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-yellow-300/30 backdrop-blur-sm animate-fade-in" />
      {Array.from({ length: 40 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 40 + 10 // vh
        const tx = Math.cos(angle) * distance
        const ty = Math.sin(angle) * distance
        const size = Math.random() * 2 + 1 // rem

        return (
          <Sparkles
            key={i}
            className="absolute text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] animate-sparkle-fly"
            style={
              {
                '--tx': `${tx}vh`,
                '--ty': `${ty}vh`,
                width: `${size}rem`,
                height: `${size}rem`,
                animationDuration: `${Math.random() * 1 + 1}s`,
                animationDelay: `${Math.random() * 0.1}s`,
              } as React.CSSProperties
            }
          />
        )
      })}
      <div className="absolute text-8xl animate-bounce drop-shadow-2xl">🌟</div>
    </div>
  )
}

export default function NovoAmigo() {
  const location = useLocation()
  const navigate = useNavigate()
  const { addPlushie } = useAppStore()

  const [name, setName] = useState('')
  const [selectedPowers, setSelectedPowers] = useState<string[]>([])
  const [showShine, setShowShine] = useState(false)

  const [image, setImage] = useState<string>(
    location.state?.imageUrl ||
      'https://img.usecurling.com/p/200/200?q=manga%20plush%20toy&color=orange',
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const mockTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop()
        mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop())
      }
      if (mockTimeoutRef.current) {
        clearTimeout(mockTimeoutRef.current)
      }
    }
  }, [])

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
    setSelectedPowers((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const startRecording = async () => {
    if (isRecording) return
    if (mockTimeoutRef.current) clearTimeout(mockTimeoutRef.current)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (err) {
      console.error('Error accessing microphone', err)
      setIsRecording(true)
      mockTimeoutRef.current = setTimeout(() => {
        if (isRecording) {
          stopRecording()
          setAudioUrl('mock-audio-url')
        }
      }, 3000)
    }
  }

  const stopRecording = () => {
    if (!isRecording) return

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop())
    } else {
      if (mockTimeoutRef.current) clearTimeout(mockTimeoutRef.current)
      setAudioUrl('mock-audio-url')
    }
    setIsRecording(false)
  }

  const playAudio = () => {
    if (audioUrl && audioUrl !== 'mock-audio-url') {
      const audio = new Audio(audioUrl)
      audio.play()
    }
  }

  const handleSave = () => {
    if (!name.trim()) return

    setShowShine(true)

    const powersString =
      selectedPowers.map((id) => powersList.find((p) => p.id === id)?.label).join(', ') ||
      'Nenhum poder descoberto ainda!'

    setTimeout(() => {
      const newId = addPlushie({
        name,
        powers: powersString,
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
                Poderes Especiais
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {powersList.map((p) => {
                  const isSelected = selectedPowers.includes(p.id)
                  return (
                    <button
                      key={p.id}
                      onClick={() => togglePower(p.id)}
                      className={cn(
                        'flex flex-col items-center p-4 rounded-3xl border-4 transition-all duration-300',
                        isSelected
                          ? `${p.bg} ${p.border} scale-105 shadow-lg`
                          : 'bg-white border-orange-100 hover:bg-orange-50 hover:border-orange-200',
                      )}
                    >
                      <p.icon
                        className={cn('w-10 h-10 mb-3', isSelected ? p.color : 'text-orange-300')}
                      />
                      <span
                        className={cn(
                          'text-sm font-bold text-center leading-tight',
                          isSelected ? p.color : 'text-orange-900/60',
                        )}
                      >
                        {p.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 bg-orange-50/80 p-8 rounded-3xl border-4 border-orange-100 mt-6">
              <Label className="text-xl font-display font-bold text-orange-900 mb-2 text-center">
                História de Origem
              </Label>

              <div className="flex items-center justify-center gap-6 w-full">
                <Button
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                  onMouseLeave={stopRecording}
                  onTouchStart={startRecording}
                  onTouchEnd={stopRecording}
                  onTouchCancel={stopRecording}
                  className={cn(
                    'w-24 h-24 rounded-full shadow-xl transition-all duration-300 border-4 select-none touch-none',
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 border-red-300 animate-pulse-glow scale-110'
                      : 'bg-gradient-to-br from-orange-400 to-red-500 border-white hover:scale-105',
                  )}
                >
                  <Mic
                    className={cn(
                      'w-10 h-10 text-white transition-transform duration-300',
                      isRecording && 'scale-110',
                    )}
                  />
                </Button>

                {audioUrl && !isRecording && (
                  <Button
                    onClick={playAudio}
                    className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 border-4 border-white shadow-lg hover:scale-105 transition-transform animate-fade-in"
                  >
                    <Play className="w-8 h-8 text-white ml-1" />
                  </Button>
                )}
              </div>
              <p className="text-base font-bold text-orange-700 text-center">
                {isRecording
                  ? 'Gravando a História de Origem...'
                  : 'Segure para Gravar a História de Origem'}
              </p>
            </div>
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
