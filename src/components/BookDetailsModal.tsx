import { useState, useEffect } from 'react'
import { BookOpen, Star, Check } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Book } from '@/stores/useAppStore'

type Props = {
  book: Book | null
  onClose: () => void
  onUpdateProgress: (id: string, progress: number) => void
  onMarkRead: (id: string) => void
}

export function BookDetailsModal({ book, onClose, onUpdateProgress, onMarkRead }: Props) {
  const [sliderValue, setSliderValue] = useState(0)

  useEffect(() => {
    if (book) setSliderValue(book.currentPage)
  }, [book])

  return (
    <Dialog open={!!book} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md bg-[#FFF6E5] border-4 border-[#DEB887] rounded-3xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-black text-[#5C3A21] flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-orange-600" /> Detalhes do Livro
          </DialogTitle>
        </DialogHeader>

        {book && (
          <div className="flex flex-col md:flex-row gap-6 py-4">
            <div className="w-32 h-48 mx-auto md:mx-0 shrink-0 rounded-xl overflow-hidden border-4 border-white shadow-xl bg-muted relative">
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
              {book.isRead && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="bg-primary text-white p-2 rounded-full shadow-lg">
                    <Star className="w-8 h-8 fill-current" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#5C3A21] leading-tight mb-2">
                  {book.title}
                </h3>
                <p className="text-sm text-[#8B4513] font-medium leading-relaxed">{book.summary}</p>
              </div>

              {!book.isRead ? (
                <div className="mt-6 bg-white/60 p-4 rounded-2xl border border-[#DEB887]">
                  <div className="flex justify-between items-end mb-3">
                    <Label className="font-bold text-orange-900 text-sm">Meu Progresso</Label>
                    <span className="text-xs font-black bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                      Página {sliderValue} de {book.totalPages}
                    </span>
                  </div>
                  <Slider
                    value={[sliderValue]}
                    max={book.totalPages}
                    step={1}
                    onValueChange={(val) => setSliderValue(val[0])}
                    className="cursor-grab active:cursor-grabbing mb-4"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 text-xs font-bold border-orange-300 text-orange-700 hover:bg-orange-50"
                      onClick={() => onUpdateProgress(book.id, sliderValue)}
                    >
                      Salvar
                    </Button>
                    <Button
                      className="flex-1 text-xs font-bold bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => onMarkRead(book.id)}
                    >
                      Marcar Lido <Check className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 bg-green-100 text-green-800 p-4 rounded-2xl text-center border-2 border-green-200">
                  <p className="font-bold text-lg flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 fill-current" /> Livro Concluído!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
