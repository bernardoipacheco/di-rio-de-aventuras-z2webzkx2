import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import useAppStore from '@/stores/useAppStore'

export default function NovoAmigo() {
  const location = useLocation()
  const navigate = useNavigate()
  const { addPlushie } = useAppStore()

  const [name, setName] = useState('')
  const [powers, setPowers] = useState('')

  const imageUrl =
    location.state?.imageUrl ||
    'https://img.usecurling.com/p/200/200?q=manga%20plush%20toy&color=orange'

  const handleSave = () => {
    if (!name.trim()) return
    const newId = addPlushie({
      name,
      powers,
      imageUrl,
      emotion: 80, // Default happy emotion for a new friend
    })
    navigate(`/pelucias/${newId}`)
  }

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
        <h1 className="w-full text-center text-3xl md:text-4xl font-display font-black text-orange-900 drop-shadow-sm px-14 uppercase tracking-wider">
          Novo Amigo
        </h1>
      </div>

      <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-white shadow-[0_10px_40px_rgba(251,146,60,0.3)] overflow-hidden mb-8 bg-orange-100 relative animate-float">
        <img src={imageUrl} alt="Novo Amigo" className="w-full h-full object-cover" />
      </div>

      <div className="w-full bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl mb-10 border-2 border-orange-200 space-y-6">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-lg font-bold text-orange-900">
            Nome do Amigo
          </Label>
          <Input
            id="name"
            placeholder="Ex: Leãozinho Valente"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-lg py-6 rounded-2xl border-orange-200 focus-visible:ring-orange-400 bg-white/80 font-medium"
          />
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="powers"
            className="text-lg font-bold text-orange-900 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-orange-500" />
            Características (Poderes Especiais)
          </Label>
          <Textarea
            id="powers"
            placeholder="Ex: Pode voar super rápido e dar abraços mágicos que curam dodóis!"
            value={powers}
            onChange={(e) => setPowers(e.target.value)}
            className="text-base min-h-[120px] rounded-2xl border-orange-200 focus-visible:ring-orange-400 bg-white/80 font-medium"
          />
        </div>
      </div>

      <Button
        onClick={handleSave}
        disabled={!name.trim()}
        className="w-full max-w-xs h-16 rounded-full text-xl font-display font-bold bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 shadow-lg hover:scale-105 transition-all duration-300 border-4 border-white/50"
      >
        <Save className="w-6 h-6 mr-2" />
        Salvar Amigo
      </Button>
    </div>
  )
}
