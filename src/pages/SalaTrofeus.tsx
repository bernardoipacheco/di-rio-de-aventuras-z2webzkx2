import { Trophy, Medal, Star } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'

const categories = [
  {
    id: 'tabuleiro',
    label: '♟️ Mestre do Tabuleiro',
    badges: [
      { name: 'Peão de Ferro', achieved: true, color: 'text-gray-400' },
      { name: 'Cavaleiro Errante', achieved: true, color: 'text-amber-600' },
      { name: 'Torre de Vigia', achieved: false, color: 'text-slate-400' },
      { name: 'Rainha do Tabuleiro', achieved: false, color: 'text-primary' },
    ],
  },
  {
    id: 'mundos',
    label: '🌍 Exploradora de Mundos',
    badges: [
      { name: 'Selo de Primeiras Palavras', achieved: true, color: 'text-green-500' },
      { name: 'Tag de Conversação', achieved: false, color: 'text-blue-500' },
      { name: 'Passaporte de Prata', achieved: false, color: 'text-slate-400' },
    ],
  },
  {
    id: 'historias',
    label: '📚 Guardiã das Histórias',
    badges: [
      { name: 'Estrela Literária', achieved: true, color: 'text-primary' },
      { name: 'Pergaminho de Sabedoria', achieved: true, color: 'text-amber-800' },
    ],
  },
]

export default function SalaTrofeus() {
  return (
    <div className="container py-8 max-w-4xl animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-primary mb-4 flex items-center justify-center gap-3">
          <Trophy className="w-10 h-10 text-primary" /> Sala de Troféus
        </h1>
        <p className="text-muted-foreground text-lg font-medium">
          As maiores conquistas da Pedra do Rei!
        </p>
      </div>

      <Tabs defaultValue="tabuleiro" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto bg-primary/10 p-2 rounded-2xl h-auto flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <TabsTrigger
              key={c.id}
              value={c.id}
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-primary font-bold py-3 px-6"
            >
              {c.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="animate-slide-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {category.badges.map((badge, idx) => (
                <Card
                  key={idx}
                  className={`border-4 rounded-3xl text-center flex flex-col items-center justify-center p-6 ${badge.achieved ? 'border-primary/30 bg-primary/5' : 'border-dashed border-muted bg-muted/50 opacity-60'}`}
                >
                  {badge.achieved ? (
                    <div className="relative mb-4 animate-float">
                      <div className="absolute inset-0 bg-yellow-200 blur-xl rounded-full opacity-50" />
                      <Medal className={`w-16 h-16 relative z-10 ${badge.color}`} />
                    </div>
                  ) : (
                    <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                      <Star className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <h3 className="font-display font-bold text-sm">{badge.name}</h3>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
