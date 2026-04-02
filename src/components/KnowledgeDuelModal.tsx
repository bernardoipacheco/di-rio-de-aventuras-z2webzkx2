import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Swords, CheckCircle2, XCircle, Trophy, BookOpen, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Book } from '@/stores/useAppStore'
import useAppStore from '@/stores/useAppStore'
import { MOCK_QUIZZES } from '@/lib/quiz-data'

export function KnowledgeDuelModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { books, addGlobalReward } = useAppStore()
  const [view, setView] = useState<'selection' | 'quiz' | 'summary'>('selection')
  const [book, setBook] = useState<Book | null>(null)
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setView('selection')
      setBook(null)
      setScore(0)
      setQIdx(0)
      setSelected(null)
    }
  }, [isOpen])

  const quiz = book ? MOCK_QUIZZES[book.id] || MOCK_QUIZZES.default : MOCK_QUIZZES.default
  const currentQ = quiz[qIdx]
  const isRevealed = selected !== null
  const readBooks = books.filter((b) => b.isRead)

  const handleSelect = (idx: number) => {
    if (isRevealed) return
    setSelected(idx)
    const correct = idx === currentQ.correctIndex
    const newScore = correct ? score + 1 : score
    if (correct) setScore(newScore)

    setTimeout(() => {
      if (qIdx < quiz.length - 1) {
        setQIdx((i) => i + 1)
        setSelected(null)
      } else {
        setView('summary')
        if (newScore > 0) addGlobalReward(0, newScore * 10)
      }
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md md:max-w-xl bg-white p-0 overflow-hidden rounded-3xl border-4 border-orange-300">
        <DialogHeader className="sr-only">
          <DialogTitle>Duelo de Conhecimento</DialogTitle>
          <DialogDescription>Responda perguntas sobre os livros que você leu.</DialogDescription>
        </DialogHeader>

        {view === 'selection' && (
          <div className="p-6 md:p-8 flex flex-col items-center min-h-[400px] bg-gradient-to-b from-orange-50 to-amber-100">
            <div className="bg-orange-200 p-4 rounded-full mb-4 shadow-inner">
              <Swords className="w-10 h-10 text-orange-600" />
            </div>
            <h2 className="text-2xl font-display font-black text-orange-950 text-center uppercase tracking-wide">
              Duelo de Conhecimento
            </h2>

            {readBooks.length === 0 ? (
              <div className="mt-8 flex flex-col items-center bg-white/70 backdrop-blur p-6 rounded-3xl border-2 border-orange-200 text-center w-full">
                <AlertCircle className="w-10 h-10 text-orange-400 mb-2" />
                <p className="text-orange-700 font-medium">
                  Leia pelo menos um livro para participar!
                </p>
                <Button
                  onClick={onClose}
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 shadow-md"
                >
                  Voltar
                </Button>
              </div>
            ) : (
              <ScrollArea className="w-full mt-6 max-h-[50vh]">
                <div className="grid gap-3 px-1 pb-2">
                  {readBooks.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setBook(b)
                        setView('quiz')
                      }}
                      className="flex items-center gap-4 p-3 bg-white hover:bg-orange-50 rounded-2xl border-2 border-orange-200 hover:border-orange-400 hover:shadow-sm transition-all text-left"
                    >
                      <img
                        src={b.cover}
                        alt={b.title}
                        className="w-14 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold text-orange-950 leading-tight mb-1">{b.title}</h4>
                        <p className="text-orange-600 text-xs flex items-center gap-1 font-medium bg-orange-100 w-fit px-2 py-0.5 rounded-full">
                          <BookOpen className="w-3 h-3" /> Desafio Pronto
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        )}

        {view === 'quiz' && (
          <div className="p-6 md:p-8 flex flex-col min-h-[450px] bg-gradient-to-b from-amber-50 to-orange-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-orange-800 font-bold bg-white/80 px-3 py-1 rounded-full text-xs border border-orange-200 shadow-sm">
                Pergunta {qIdx + 1}/{quiz.length}
              </span>
              <span className="text-orange-800 font-bold bg-amber-200 px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-sm">
                <Trophy className="w-3 h-3 text-amber-600" /> Acertos: {score}
              </span>
            </div>
            <Progress
              value={((qIdx + 1) / quiz.length) * 100}
              className="h-2.5 mb-6 bg-orange-200 [&>div]:bg-orange-500"
            />

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100 mb-6 flex-1 flex items-center justify-center">
              <h3 className="text-xl md:text-2xl font-bold text-orange-950 text-center leading-snug">
                {currentQ.question}
              </h3>
            </div>

            <div className="grid gap-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selected === idx
                const isCorrect = idx === currentQ.correctIndex
                let btnClass =
                  'bg-white border-orange-200 hover:border-orange-400 text-orange-900 shadow-sm'

                if (isRevealed) {
                  if (isCorrect)
                    btnClass =
                      'bg-green-100 border-green-500 text-green-900 z-10 scale-[1.02] shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                  else if (isSelected) btnClass = 'bg-red-50 border-red-400 text-red-900 opacity-90'
                  else btnClass = 'bg-white border-orange-100 text-orange-400 opacity-60'
                }

                return (
                  <button
                    key={idx}
                    disabled={isRevealed}
                    onClick={() => handleSelect(idx)}
                    className={cn(
                      'relative p-4 rounded-xl border-2 text-md font-bold transition-all flex items-center justify-between text-left',
                      btnClass,
                    )}
                  >
                    <span>{opt}</span>
                    {isRevealed && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 animate-in zoom-in" />
                    )}
                    {isRevealed && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 animate-in zoom-in" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {view === 'summary' && (
          <div className="p-8 md:p-12 flex flex-col items-center justify-center min-h-[450px] bg-gradient-to-b from-amber-100 to-orange-200 text-center relative overflow-hidden">
            <Trophy
              className={cn(
                'w-24 h-24 mb-4 relative z-10 drop-shadow-md',
                score === quiz.length ? 'text-yellow-500' : 'text-orange-500',
              )}
            />
            <h2 className="text-3xl md:text-4xl font-display font-black text-orange-950 mb-2 uppercase tracking-wide relative z-10">
              {score === quiz.length
                ? 'Perfeito!'
                : score > 0
                  ? 'Bom Trabalho!'
                  : 'Tente Novamente!'}
            </h2>
            <p className="text-orange-800 mb-8 font-medium relative z-10">
              Acertou{' '}
              <span className="font-black text-orange-950 bg-white/50 px-2 py-0.5 rounded-md">
                {score}
              </span>{' '}
              de {quiz.length} perguntas.
            </p>

            <div className="bg-white/80 backdrop-blur-md border-2 border-orange-200 rounded-3xl p-5 mb-8 w-full max-w-xs flex flex-col items-center relative z-10 shadow-lg">
              <span className="text-orange-600 font-bold mb-2 uppercase tracking-widest text-xs">
                Recompensas
              </span>
              <div className="flex items-center gap-2 text-4xl font-black text-amber-600 bg-amber-50 px-6 py-3 rounded-xl border border-amber-100">
                <span>+{score * 10}</span>
                <span className="text-3xl animate-bounce" style={{ animationDuration: '2s' }}>
                  💎
                </span>
              </div>
            </div>

            <Button
              onClick={onClose}
              className="w-full max-w-xs h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all relative z-10"
            >
              Voltar para a Estante
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
