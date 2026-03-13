import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mic, Sparkles } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import useAppStore from '@/stores/useAppStore'
import { getEmotionForValue } from '@/lib/emotions'

export default function PeluciaPerfil() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { plushies, updatePlushieEmotion } = useAppStore()
  const [isRecording, setIsRecording] = useState(false)

  const plushie = useMemo(() => plushies.find((p) => p.id === id), [plushies, id])

  if (!plushie) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 pt-20">
        <h2 className="text-2xl font-bold text-orange-900">Pelúcia não encontrada!</h2>
        <Button onClick={() => navigate('/pelucias')}>Voltar</Button>
      </div>
    )
  }

  const handleEmotionChange = (val: number[]) => {
    updatePlushieEmotion(plushie.id, val[0])
  }

  const currentEmotion = getEmotionForValue(plushie.emotion)

  return (
    <div className="container py-6 max-w-2xl animate-fade-in flex flex-col items-center pb-20">
      <div className="w-full flex items-center justify-center mb-8 relative">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/pelucias')}
          className="absolute left-0 rounded-full border-orange-300 text-orange-600 hover:bg-orange-100 bg-white/80 backdrop-blur-sm z-10 w-12 h-12 shadow-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="w-full text-center text-3xl md:text-4xl font-display font-black text-orange-900 drop-shadow-sm px-14">
          {plushie.name}
        </h1>
      </div>

      <div className="w-56 h-56 md:w-72 md:h-72 rounded-full border-8 border-white shadow-[0_10px_40px_rgba(251,146,60,0.3)] overflow-hidden mb-8 bg-orange-100 relative animate-float">
        <img
          src={plushie.imageUrl}
          alt={plushie.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {plushie.powers && (
        <div className="w-full bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-lg mb-8 border-2 border-orange-200">
          <h3 className="text-lg font-display font-bold text-orange-800 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" /> Características
          </h3>
          <p className="text-orange-950 font-medium text-center text-lg">{plushie.powers}</p>
        </div>
      )}

      <div className="w-full bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl mb-10 border-2 border-orange-200">
        <h3 className="text-xl md:text-2xl font-display font-bold text-center mb-6 text-orange-800">
          Harmonímetro
        </h3>
        <p className="text-center text-orange-700 font-bold mb-4">Como estou me sentindo hoje?</p>
        <div className="flex flex-col items-center gap-6">
          <div className="text-7xl animate-bounce" style={{ animationDuration: '2s' }}>
            {currentEmotion.emoji}
          </div>
          <div className="bg-orange-100 px-6 py-2 rounded-full border-2 border-orange-200">
            <p className="font-bold text-xl text-orange-900">{currentEmotion.label}</p>
          </div>
          <Slider
            value={[plushie.emotion]}
            max={100}
            step={1}
            onValueChange={handleEmotionChange}
            className="w-full mt-4 cursor-grab active:cursor-grabbing"
          />
        </div>
      </div>

      <div className="flex gap-4 w-full px-4 justify-center">
        <div className="flex flex-col items-center gap-4">
          <Button
            className={`w-28 h-28 md:w-32 md:h-32 rounded-full shadow-xl transition-all duration-300 border-4 ${
              isRecording
                ? 'bg-red-500 border-red-300 hover:bg-red-600 scale-110 animate-pulse box-shadow-magical'
                : 'bg-gradient-to-br from-orange-400 to-red-500 border-orange-200 hover:scale-105'
            }`}
            onMouseDown={() => setIsRecording(true)}
            onMouseUp={() => setIsRecording(false)}
            onMouseLeave={() => setIsRecording(false)}
            onTouchStart={() => setIsRecording(true)}
            onTouchEnd={() => setIsRecording(false)}
          >
            <Mic className="w-12 h-12 md:w-14 md:h-14 text-white" />
          </Button>
          <p className="text-base md:text-lg font-bold text-center text-orange-900 max-w-[200px]">
            {isRecording ? 'Gravando a história...' : 'Segure para falar!'}
          </p>
        </div>
      </div>
    </div>
  )
}
