import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Camera } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import useAppStore from '@/stores/useAppStore'
import { getEmotionForValue } from '@/lib/emotions'

export default function RefugioPelucias() {
  const { plushies } = useAppStore()
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

  return (
    <div className="container py-8 max-w-4xl animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-secondary mb-4">
          Refúgio das Pelúcias 🧸
        </h1>
        <p className="text-muted-foreground text-lg font-medium">
          Escolha um amigo macio para cuidar ou crie um novo!
        </p>
      </div>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Card
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-4 border-dashed border-orange-300 hover:border-orange-500 rounded-3xl h-full bg-orange-50/50 backdrop-blur-sm animate-float flex flex-col items-center justify-center p-6 min-h-[220px]"
        >
          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-4 border-2 border-orange-200 shadow-inner group-hover:bg-orange-200 transition-colors">
            <Camera className="w-10 h-10 text-orange-500" />
          </div>
          <h3 className="font-display font-black text-xl text-orange-600 uppercase tracking-wide text-center">
            Novo Amigo
          </h3>
        </Card>

        {plushies.map((plushie) => (
          <Link to={`/pelucias/${plushie.id}`} key={plushie.id} className="block group">
            <Card className="cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-4 border-secondary/20 rounded-3xl h-full bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-secondary bg-muted shadow-inner group-hover:border-primary transition-colors">
                  <img
                    src={plushie.imageUrl}
                    alt={plushie.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-orange-950">{plushie.name}</h3>
                  <div className="text-4xl mt-3 animate-bounce" style={{ animationDuration: '3s' }}>
                    {getEmotionForValue(plushie.emotion).emoji}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
