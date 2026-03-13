import { useState } from 'react'
import { Music, Mic, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import useAppStore, { Plushie } from '@/stores/useAppStore'

const EMOJIS = [
  '😭',
  '😢',
  '😞',
  '😟',
  '😕',
  '😐',
  '🙂',
  '😊',
  '😀',
  '😁',
  '🥰',
  '😍',
  '🤩',
  '😎',
  '🦁',
  '👑',
]

export default function RefugioPelucias() {
  const { plushies, updatePlushieEmotion } = useAppStore()
  const [selectedPlushie, setSelectedPlushie] = useState<Plushie | null>(null)
  const [isRecording, setIsRecording] = useState(false)

  const handleEmotionChange = (val: number[]) => {
    if (selectedPlushie) {
      updatePlushieEmotion(selectedPlushie.id, val[0])
      setSelectedPlushie({ ...selectedPlushie, emotion: val[0] })
    }
  }

  const getEmojiForValue = (val: number) => {
    const index = Math.min(Math.floor((val / 100) * EMOJIS.length), EMOJIS.length - 1)
    return EMOJIS[index]
  }

  return (
    <div className="container py-8 max-w-4xl animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-secondary mb-4">
          Refúgio das Pelúcias 🧸
        </h1>
        <p className="text-muted-foreground text-lg font-medium">
          Cuidando dos seus amigos macios!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {plushies.map((plushie) => (
          <Card
            key={plushie.id}
            className="cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-4 border-secondary/20 rounded-3xl"
            onClick={() => setSelectedPlushie(plushie)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-secondary bg-muted shadow-inner">
                <img
                  src={plushie.imageUrl}
                  alt={plushie.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">{plushie.name}</h3>
                <div className="text-3xl mt-2 animate-bounce">
                  {getEmojiForValue(plushie.emotion)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedPlushie} onOpenChange={(open) => !open && setSelectedPlushie(null)}>
        {selectedPlushie && (
          <DialogContent className="sm:max-w-md rounded-3xl border-4 border-secondary/30">
            <DialogHeader className="items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-secondary mb-4">
                <img
                  src={selectedPlushie.imageUrl}
                  alt={selectedPlushie.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <DialogTitle className="text-2xl font-display text-secondary">
                {selectedPlushie.name}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center gap-8 py-4">
              {/* Harmonímetro */}
              <div className="w-full space-y-4 text-center bg-secondary/10 p-6 rounded-2xl">
                <h4 className="font-bold text-foreground">Harmonímetro</h4>
                <div className="text-6xl mb-4 animate-scale-in">
                  {getEmojiForValue(selectedPlushie.emotion)}
                </div>
                <Slider
                  value={[selectedPlushie.emotion]}
                  max={100}
                  step={1}
                  onValueChange={handleEmotionChange}
                  className="w-full cursor-grab active:cursor-grabbing"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4 w-full">
                <Button
                  variant="outline"
                  className="flex-1 h-14 rounded-2xl border-2 border-primary text-primary hover:bg-primary/10 font-bold"
                >
                  <Music className="w-5 h-5 mr-2" />
                  Música
                </Button>
                <Button
                  variant="default"
                  className={`flex-1 h-14 rounded-2xl font-bold transition-all ${isRecording ? 'bg-destructive hover:bg-destructive animate-pulse' : 'bg-secondary hover:bg-secondary/90'}`}
                  onMouseDown={() => setIsRecording(true)}
                  onMouseUp={() => setIsRecording(false)}
                  onMouseLeave={() => setIsRecording(false)}
                  onTouchStart={() => setIsRecording(true)}
                  onTouchEnd={() => setIsRecording(false)}
                >
                  <Mic className="w-5 h-5 mr-2" />
                  {isRecording ? 'Gravando...' : 'Falar'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Segure o botão de Falar para gravar uma mensagem para {selectedPlushie.name}!
              </p>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
