import { Star, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Book, SchoolTask } from '@/stores/useAppStore'

type MagicTreeRowProps = {
  book?: Book
  task?: SchoolTask
  index: number
  activeFruits: string[]
  onSelectBook: (book: Book) => void
  onCompleteTask: (id: string) => void
}

const priorityColor = (p: string) => {
  if (p === 'Urgente') return 'bg-red-100 text-red-700 border-red-200'
  if (p === 'Calmo') return 'bg-green-100 text-green-700 border-green-200'
  return 'bg-amber-100 text-amber-700 border-amber-200'
}

export function MagicTreeRow({
  book,
  task,
  index,
  activeFruits,
  onSelectBook,
  onCompleteTask,
}: MagicTreeRowProps) {
  const isPendingBook = book?.status === 'pending'
  const isPendingTask = task?.status === 'pending'

  return (
    <div className="grid grid-cols-[1fr_80px_1fr] md:grid-cols-[1fr_128px_1fr] w-full min-h-[180px] md:min-h-[220px]">
      {/* Left Side: Books */}
      <div className="relative flex justify-end items-end pr-2 md:pr-10 pb-6 w-full">
        {book && (
          <div className="relative w-full flex justify-end items-end">
            <div className="absolute right-[-40px] md:right-[-64px] bottom-0 w-[120%] md:w-[90%] h-5 md:h-7 bg-gradient-to-b from-[#70482B] to-[#4A2F1D] rounded-l-full shadow-[0_8px_15px_rgba(0,0,0,0.3)] z-0 border-b-4 border-[#3d2616]">
              {index % 2 !== 0 && (
                <div className="absolute -top-4 left-8 w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-tr-full rounded-bl-full rotate-12 shadow-inner border border-green-600/50"></div>
              )}
            </div>
            <div
              className={cn(
                'relative z-10 w-20 md:w-28 mb-[-12px] group cursor-pointer transition-transform hover:-translate-y-2',
                isPendingBook && 'opacity-80 grayscale-[30%] hover:translate-y-0',
              )}
              onClick={() => !isPendingBook && onSelectBook(book)}
            >
              {isPendingBook && (
                <Badge className="absolute -top-3 -left-3 z-30 bg-orange-500 text-[10px] scale-90">
                  Pendente
                </Badge>
              )}
              {activeFruits.includes(`book-${book.id}`) && (
                <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 text-5xl md:text-6xl z-50 animate-fruit-pop drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]">
                  🥭
                </div>
              )}
              <div className="aspect-[2/3] rounded-lg md:rounded-xl overflow-hidden border-[3px] md:border-4 border-white shadow-xl bg-[#8B4513] relative">
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                {!book.isRead && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/40">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(book.currentPage / book.totalPages) * 100}%` }}
                    />
                  </div>
                )}
              </div>
              {book.isRead && (
                <div
                  className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-primary text-white p-1 md:p-1.5 rounded-full shadow-lg z-20 animate-bounce"
                  style={{ animationDuration: '3s' }}
                >
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Center: Trunk */}
      <div className="relative h-full bg-gradient-to-r from-[#4A2F1D] via-[#70482B] to-[#4A2F1D] z-10 shadow-[0_0_25px_rgba(0,0,0,0.3)]">
        <div className="absolute w-[2px] h-full bg-black/20 left-[20%]"></div>
        <div className="absolute w-[4px] h-full bg-black/10 right-[30%]"></div>
        <div className="absolute w-[1px] h-full bg-[#8B4513]/30 left-[50%]"></div>
        {index % 2 === 0 && (
          <div className="absolute top-1/4 left-[10%] w-6 h-12 md:w-8 md:h-16 border-[3px] border-black/20 rounded-full opacity-40"></div>
        )}
      </div>

      {/* Right Side: Tasks */}
      <div className="relative flex justify-start items-start pl-2 md:pl-10 pt-4 w-full">
        {task && (
          <div className="relative w-full flex justify-start items-start">
            <div className="absolute left-[-40px] md:left-[-64px] top-0 w-[120%] md:w-[90%] h-5 md:h-7 bg-gradient-to-b from-[#70482B] to-[#4A2F1D] rounded-r-full shadow-[0_8px_15px_rgba(0,0,0,0.3)] z-0 border-b-4 border-[#3d2616]">
              {index % 2 === 0 && (
                <div className="absolute -top-3 right-6 w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-tl-full rounded-br-full -rotate-12 shadow-inner border border-green-600/50"></div>
              )}
            </div>
            <div
              className={cn(
                'relative z-10 mt-2 md:mt-4 w-28 md:w-40 flex flex-col items-center group',
                isPendingTask && 'opacity-80 grayscale-[30%]',
              )}
            >
              {isPendingTask && (
                <Badge className="absolute -top-6 right-0 z-30 bg-orange-500 text-[10px] scale-90">
                  Pendente
                </Badge>
              )}
              {activeFruits.includes(`task-${task.id}`) && (
                <div className="absolute top-[-30px] right-[-20px] text-5xl md:text-6xl z-50 animate-fruit-pop drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]">
                  🥭
                </div>
              )}
              <div className="w-full h-4 bg-[#8B4513] rounded-full shadow-md z-20 relative">
                <div className="absolute -left-1.5 -top-1 w-6 h-6 bg-[#D2691E] rounded-full border-2 border-[#5C3A21] shadow-sm"></div>
                <div className="absolute -right-1.5 -top-1 w-6 h-6 bg-[#D2691E] rounded-full border-2 border-[#5C3A21] shadow-sm"></div>
              </div>
              <div className="w-[90%] bg-[#FFF6E5] min-h-[90px] md:min-h-[110px] -mt-2 pt-5 pb-3 px-2 shadow-[0_10px_20px_rgba(0,0,0,0.2)] border-b-[6px] border-[#DEB887] relative flex flex-col items-center z-10 transition-transform group-hover:scale-[1.02]">
                <span
                  className={`text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${priorityColor(task.priority)}`}
                >
                  {task.priority}
                </span>
                <h4 className="font-display font-bold text-[#5C3A21] leading-tight mt-1.5 text-xs md:text-sm text-center line-clamp-2">
                  {task.title}
                </h4>
                <p className="text-[10px] md:text-xs text-[#8B4513] mt-1 font-medium opacity-80">
                  Para: {task.dueDate}
                </p>
                <div className="mt-auto pt-2 w-full flex justify-center">
                  {task.status === 'todo' && !isPendingTask && (
                    <Button
                      size="sm"
                      className="w-full h-6 text-[10px] md:text-xs rounded-full bg-green-500 hover:bg-green-600 font-bold shadow-sm"
                      onClick={() => onCompleteTask(task.id)}
                    >
                      Feito!
                    </Button>
                  )}
                  {task.status === 'completed' && (
                    <Check className="text-green-600 w-5 h-5 md:w-6 md:h-6 drop-shadow-sm" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
