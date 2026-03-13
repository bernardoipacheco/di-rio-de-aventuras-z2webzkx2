import { Play, Pause, Headphones } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useState } from 'react'

const stories = [
  {
    id: 1,
    title: 'O Leãozinho que Tinha Medo do Escuro',
    duration: '5:30',
    cover: 'https://img.usecurling.com/p/150/150?q=night%20sky&color=purple',
  },
  {
    id: 2,
    title: 'A Canção das Árvores Baobá',
    duration: '8:15',
    cover: 'https://img.usecurling.com/p/150/150?q=baobab%20tree&color=blue',
  },
  {
    id: 3,
    title: 'Zazu e as Nuvens de Algodão',
    duration: '6:45',
    cover: 'https://img.usecurling.com/p/150/150?q=clouds&color=cyan',
  },
]

export default function ContosNinar() {
  const [playingId, setPlayingId] = useState<number | null>(null)

  return (
    <div className="container py-8 max-w-3xl animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-indigo-500 mb-4 flex items-center justify-center gap-3">
          <Headphones className="w-8 h-8" /> Contos de Ninar
        </h1>
        <p className="text-muted-foreground text-lg font-medium">
          Histórias relaxantes para sonhar alto!
        </p>
      </div>

      <div className="space-y-4">
        {stories.map((story) => (
          <Card
            key={story.id}
            className="overflow-hidden border-2 border-indigo-100 rounded-3xl hover:border-indigo-300 transition-colors"
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                <img src={story.cover} alt={story.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-lg text-foreground truncate">
                  {story.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">{story.duration}</p>
                {playingId === story.id && (
                  <Progress value={35} className="h-2 bg-indigo-100 [&>div]:bg-indigo-500" />
                )}
              </div>

              <Button
                size="icon"
                variant={playingId === story.id ? 'secondary' : 'default'}
                className={`w-14 h-14 rounded-full shrink-0 ${playingId === story.id ? 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}`}
                onClick={() => setPlayingId(playingId === story.id ? null : story.id)}
              >
                {playingId === story.id ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
