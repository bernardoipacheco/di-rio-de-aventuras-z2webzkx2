import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PawPrint, Plus, Swords } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useAppStore, { Book } from '@/stores/useAppStore'
import { MagicTree } from '@/components/MagicTree'
import { AddToTreeModal } from '@/components/AddToTreeModal'
import { BookDetailsModal } from '@/components/BookDetailsModal'
import { KnowledgeDuelModal } from '@/components/KnowledgeDuelModal'

export default function EstanteMagica() {
  const {
    books,
    schoolTasks,
    markBookRead,
    updateBookProgress,
    completeSchoolTask,
    addGlobalReward,
    addBook,
    addSchoolTask,
  } = useAppStore()

  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isDuelModalOpen, setDuelModalOpen] = useState(false)
  const [activeFruits, setActiveFruits] = useState<string[]>([])

  const triggerFruitAnim = (id: string) => {
    setActiveFruits((prev) => [...prev, id])
    setTimeout(() => {
      setActiveFruits((prev) => prev.filter((x) => x !== id))
    }, 2500)
  }

  const handleMarkBookRead = (id: string) => {
    markBookRead(id)
    triggerFruitAnim(`book-${id}`)
    addGlobalReward(30, 10)
    setSelectedBook(null)
  }

  const handleUpdateBookProgress = (id: string, progress: number) => {
    updateBookProgress(id, progress)
    const book = books.find((b) => b.id === id)
    if (book && progress >= book.totalPages) {
      handleMarkBookRead(id)
    } else {
      setSelectedBook(null)
    }
  }

  const handleCompleteTask = (id: string) => {
    completeSchoolTask(id)
    triggerFruitAnim(`task-${id}`)
    addGlobalReward(20, 5)
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-orange-400 via-yellow-400 to-amber-200 relative overflow-hidden flex flex-col items-center">
      {/* Navigation */}
      <Link
        to="/"
        className="absolute top-4 left-4 z-50 bg-white/70 backdrop-blur-md p-3 rounded-full hover:bg-white/90 hover:scale-110 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.1)] border-2 border-orange-200 group"
      >
        <PawPrint className="w-8 h-8 text-orange-900 group-hover:text-orange-600 transition-colors" />
      </Link>

      <Button
        onClick={() => setDuelModalOpen(true)}
        className="absolute top-4 right-4 z-50 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full px-4 md:px-6 h-[52px] shadow-[0_4px_15px_rgba(0,0,0,0.2)] border-2 border-orange-200 hover:scale-105 transition-all flex items-center gap-2 font-bold text-base md:text-lg group"
      >
        <Swords className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />
        <span className="hidden md:inline">Duelo de Conhecimento</span>
        <span className="md:hidden">Duelo</span>
      </Button>

      <div className="mt-6 md:mt-10 text-center relative z-20 px-4">
        <h1 className="text-4xl md:text-5xl font-display font-black text-orange-950 drop-shadow-md tracking-wider uppercase bg-white/40 backdrop-blur-sm px-8 py-2 rounded-full border-4 border-white/50 inline-block">
          Estante Mágica
        </h1>
      </div>

      <MagicTree
        books={books}
        schoolTasks={schoolTasks}
        activeFruits={activeFruits}
        onSelectBook={setSelectedBook}
        onCompleteTask={handleCompleteTask}
      />

      <Button
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-16 h-16 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.3)] bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 border-4 border-white hover:scale-110 transition-all z-50 p-0 flex items-center justify-center group"
        onClick={() => setAddModalOpen(true)}
      >
        <Plus className="w-8 h-8 text-white group-hover:rotate-90 transition-transform" />
      </Button>

      <BookDetailsModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onUpdateProgress={handleUpdateBookProgress}
        onMarkRead={handleMarkBookRead}
      />

      <AddToTreeModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddBook={addBook}
        onAddTask={addSchoolTask}
      />

      <KnowledgeDuelModal isOpen={isDuelModalOpen} onClose={() => setDuelModalOpen(false)} />
    </div>
  )
}
