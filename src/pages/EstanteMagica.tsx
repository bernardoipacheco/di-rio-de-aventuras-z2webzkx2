import { BookOpen, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const books = [
  {
    id: 1,
    title: 'A Jornada do Leão',
    author: 'Sábio Rafiki',
    cover: 'https://img.usecurling.com/p/200/300?q=lion%20illustration&color=yellow',
    read: true,
  },
  {
    id: 2,
    title: 'Estrelas da Savana',
    author: 'Zazu',
    cover: 'https://img.usecurling.com/p/200/300?q=starry%20night&color=blue',
    read: false,
  },
  {
    id: 3,
    title: 'O Grande Rugido',
    author: 'Mufasa',
    cover: 'https://img.usecurling.com/p/200/300?q=mountain&color=orange',
    read: false,
  },
]

export default function EstanteMagica() {
  return (
    <div className="container py-8 max-w-5xl animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-accent mb-4">Estante Mágica 📚</h1>
        <p className="text-muted-foreground text-lg font-medium">
          Os livros que a Cecília está desbravando!
        </p>
      </div>

      <div className="bg-[#8B4513]/10 p-8 rounded-3xl border-4 border-[#8B4513]/20 relative box-shadow-magical">
        {/* Bookshelf wooden racks effect */}
        <div className="absolute top-1/2 left-0 right-0 h-4 bg-[#8B4513]/20 -translate-y-1/2" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
          {books.map((book) => (
            <Card
              key={book.id}
              className="group overflow-hidden border-0 bg-transparent shadow-none hover:scale-105 transition-transform duration-300"
            >
              <CardContent className="p-0 flex flex-col items-center">
                <div className="relative w-48 h-64 rounded-xl overflow-hidden shadow-2xl mb-4 border-4 border-white">
                  <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                  {book.read && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-1.5 rounded-full shadow-lg animate-float">
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                  )}
                </div>
                <h3 className="font-display font-bold text-xl text-center line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">{book.author}</p>
                <Button
                  variant={book.read ? 'secondary' : 'default'}
                  className="w-3/4 rounded-full font-bold"
                >
                  {book.read ? (
                    <>
                      Lido <Star className="w-4 h-4 ml-2 fill-current" />
                    </>
                  ) : (
                    <>
                      Ler Agora <BookOpen className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
