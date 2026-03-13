import { Book, SchoolTask } from '@/stores/useAppStore'
import { MagicTreeRow } from './MagicTreeRow'

type MagicTreeProps = {
  books: Book[]
  schoolTasks: SchoolTask[]
  activeFruits: string[]
  onSelectBook: (book: Book) => void
  onCompleteTask: (id: string) => void
}

export function MagicTree({
  books,
  schoolTasks,
  activeFruits,
  onSelectBook,
  onCompleteTask,
}: MagicTreeProps) {
  const maxRows = Math.max(books.length, schoolTasks.length)
  const treeRows = Array.from({ length: maxRows === 0 ? 1 : maxRows })

  return (
    <div className="flex-1 w-full max-w-5xl mt-12 relative flex flex-col items-center pb-40 px-2">
      {/* Tree Canopy Graphic */}
      <div className="w-full flex justify-center relative mb-[-40px] md:mb-[-60px] z-10">
        <div className="w-64 h-48 md:w-96 md:h-64 bg-green-700 rounded-[100%] absolute -top-16 md:-top-24 mix-blend-multiply opacity-40 blur-xl"></div>
        <div className="w-72 h-56 md:w-[450px] md:h-72 bg-gradient-to-br from-green-400 to-green-600 rounded-[100%] absolute -top-24 md:-top-32 shadow-[inset_0_-20px_40px_rgba(0,0,0,0.3)] border-b-8 border-green-800"></div>
        <div className="w-20 md:w-32 h-16 bg-gradient-to-r from-[#4A2F1D] via-[#70482B] to-[#4A2F1D] relative z-20 rounded-t-full border-t-4 border-[#3d2616]/50"></div>
      </div>

      {/* Tree Rows */}
      {treeRows.map((_, i) => (
        <MagicTreeRow
          key={i}
          index={i}
          book={books[i]}
          task={schoolTasks[i]}
          activeFruits={activeFruits}
          onSelectBook={onSelectBook}
          onCompleteTask={onCompleteTask}
        />
      ))}

      {/* Tree Roots Base */}
      <div className="w-full flex justify-center mt-[-10px] z-20">
        <div className="w-32 md:w-48 h-16 md:h-24 bg-gradient-to-t from-[#4A2F1D] to-[#70482B] rounded-b-[4rem] border-b-8 border-black/20"></div>
      </div>
    </div>
  )
}
