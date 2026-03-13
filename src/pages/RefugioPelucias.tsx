import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import useAppStore from '@/stores/useAppStore'
import { getEmotionForValue } from '@/lib/emotions'

export default function RefugioPelucias() {
  const { plushies } = useAppStore()

  return (
    <div className="container py-8 max-w-4xl animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-secondary mb-4">
          Refúgio das Pelúcias 🧸
        </h1>
        <p className="text-muted-foreground text-lg font-medium">
          Escolha um amigo macio para cuidar!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {plushies.map((plushie) => (
          <Link to={`/pelucias/${plushie.id}`} key={plushie.id} className="block group">
            <Card className="cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-4 border-secondary/20 rounded-3xl h-full bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-secondary bg-muted shadow-inner group-hover:border-primary transition-colors">
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
