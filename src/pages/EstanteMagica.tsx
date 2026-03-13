import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PawPrint, Plus, Star, Check, BookOpen, ScrollText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import useAppStore, { Book, SchoolTask } from '@/stores/useAppStore'
import { cn } from '@/lib/utils'

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
  const [sliderValue, setSliderValue] = useState<number>(0)
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [activeFruits, setActiveFruits] = useState<string[]>([])

  // Add Item Forms State
  const [newBookTitle, setNewBookTitle] = useState('')
  const [newBookPages, setNewBookPages] = useState('100')
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDate, setNewTaskDate] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState<'Urgente' | 'Calmo' | 'Explorar'>('Calmo')

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

  const handleUpdateBookProgress = () => {
    if (!selectedBook) return
    updateBookProgress(selectedBook.id, sliderValue)
    if (sliderValue >= selectedBook.totalPages) {
      handleMarkBookRead(selectedBook.id)
    } else {
      setSelectedBook(null)
    }
  }

  const handleCompleteTask = (id: string) => {
    completeSchoolTask(id)
    triggerFruitAnim(`task-${id}`)
    addGlobalReward(20, 5)
  }

  const handleAddBook = () => {
    if (!newBookTitle.trim()) return
    addBook({
      title: newBookTitle,
      totalPages: parseInt(newBookPages) || 100,
      currentPage: 0,
      isRead: false,
      summary: 'Nova aventura aguardando para ser explorada!',
      cover: `https://img.usecurling.com/p/200/300?q=${encodeURIComponent('manga book cover ' + newBookTitle.substring(0, 10))}&color=purple`,
      status: 'pending',
    })
    setAddModalOpen(false)
    setNewBookTitle('')
  }

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return
    addSchoolTask({
      title: newTaskTitle,
      dueDate: newTaskDate || 'Em breve',
      priority: newTaskPriority,
      status: 'pending',
    })
    setAddModalOpen(false)
    setNewTaskTitle('')
  }

  const priorityColor = (p: string) => {
    if (p === 'Urgente') return 'bg-red-100 text-red-700 border-red-200'
    if (p === 'Calmo') return 'bg-green-100 text-green-700 border-green-200'
    return 'bg-amber-100 text-amber-700 border-amber-200'
  }

  const maxRows = Math.max(books.length, schoolTasks.length)
  const treeRows = Array.from({ length: maxRows === 0 ? 1 : maxRows })

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-orange-400 via-yellow-400 to-amber-200 relative overflow-hidden flex flex-col items-center">
      {/* Navigation */}
      <Link
        to="/"
        className="absolute top-4 left-4 z-50 bg-white/70 backdrop-blur-md p-3 rounded-full hover:bg-white/90 hover:scale-110 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.1)] border-2 border-orange-200 group"
      >
        <PawPrint className="w-8 h-8 text-orange-900 group-hover:text-orange-600 transition-colors" />
      </Link>

      <div className="mt-6 md:mt-10 text-center relative z-20 px-4">
        <h1 className="text-4xl md:text-5xl font-display font-black text-orange-950 drop-shadow-md tracking-wider uppercase bg-white/40 backdrop-blur-sm px-8 py-2 rounded-full border-4 border-white/50 inline-block">
          Estante Mágica
        </h1>
      </div>

      {/* Tree Container */}
      <div className="flex-1 w-full max-w-5xl mt-12 relative flex flex-col items-center pb-40 px-2">
        {/* Tree Canopy Graphic */}
        <div className="w-full flex justify-center relative mb-[-40px] md:mb-[-60px] z-10">
          <div className="w-64 h-48 md:w-96 md:h-64 bg-green-700 rounded-[100%] absolute -top-16 md:-top-24 mix-blend-multiply opacity-40 blur-xl"></div>
          <div className="w-72 h-56 md:w-[450px] md:h-72 bg-gradient-to-br from-green-400 to-green-600 rounded-[100%] absolute -top-24 md:-top-32 shadow-[inset_0_-20px_40px_rgba(0,0,0,0.3)] border-b-8 border-green-800"></div>
          {/* Top Trunk base */}
          <div className="w-20 md:w-32 h-16 bg-gradient-to-r from-[#4A2F1D] via-[#70482B] to-[#4A2F1D] relative z-20 rounded-t-full border-t-4 border-[#3d2616]/50"></div>
        </div>

        {/* Tree Rows */}
        {treeRows.map((_, i) => {
          const book = books[i]
          const task = schoolTasks[i]
          const isPendingBook = book?.status === 'pending'
          const isPendingTask = task?.status === 'pending'

          return (
            <div
              key={i}
              className="grid grid-cols-[1fr_80px_1fr] md:grid-cols-[1fr_128px_1fr] w-full min-h-[180px] md:min-h-[220px]"
            >
              {/* Left Side: Books */}
              <div className="relative flex justify-end items-end pr-2 md:pr-10 pb-6 w-full">
                {book && (
                  <div className="relative w-full flex justify-end items-end">
                    {/* Branch */}
                    <div className="absolute right-[-40px] md:right-[-64px] bottom-0 w-[120%] md:w-[90%] h-5 md:h-7 bg-gradient-to-b from-[#70482B] to-[#4A2F1D] rounded-l-full shadow-[0_8px_15px_rgba(0,0,0,0.3)] z-0 border-b-4 border-[#3d2616]">
                      {/* Leaf detail */}
                      {i % 2 !== 0 && (
                        <div className="absolute -top-4 left-8 w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-tr-full rounded-bl-full rotate-12 shadow-inner border border-green-600/50"></div>
                      )}
                    </div>

                    {/* Book Card */}
                    <div
                      className={cn(
                        'relative z-10 w-20 md:w-28 mb-[-12px] group cursor-pointer transition-transform hover:-translate-y-2',
                        isPendingBook && 'opacity-80 grayscale-[30%] hover:translate-y-0',
                      )}
                      onClick={() => !isPendingBook && setSelectedBook(book)}
                    >
                      {isPendingBook && (
                        <Badge className="absolute -top-3 -left-3 z-30 bg-orange-500 text-[10px] scale-90">
                          Pendente
                        </Badge>
                      )}

                      {/* Golden Fruit Animation Anchor */}
                      {activeFruits.includes(`book-${book.id}`) && (
                        <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 text-5xl md:text-6xl z-50 animate-fruit-pop drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]">
                          🥭
                        </div>
                      )}

                      <div className="aspect-[2/3] rounded-lg md:rounded-xl overflow-hidden border-[3px] md:border-4 border-white shadow-xl bg-[#8B4513] relative">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
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
                {i % 2 === 0 && (
                  <div className="absolute top-1/4 left-[10%] w-6 h-12 md:w-8 md:h-16 border-[3px] border-black/20 rounded-full opacity-40"></div>
                )}
              </div>

              {/* Right Side: Tasks */}
              <div className="relative flex justify-start items-start pl-2 md:pl-10 pt-4 w-full">
                {task && (
                  <div className="relative w-full flex justify-start items-start">
                    {/* Branch */}
                    <div className="absolute left-[-40px] md:left-[-64px] top-0 w-[120%] md:w-[90%] h-5 md:h-7 bg-gradient-to-b from-[#70482B] to-[#4A2F1D] rounded-r-full shadow-[0_8px_15px_rgba(0,0,0,0.3)] z-0 border-b-4 border-[#3d2616]">
                      {i % 2 === 0 && (
                        <div className="absolute -top-3 right-6 w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-tl-full rounded-br-full -rotate-12 shadow-inner border border-green-600/50"></div>
                      )}
                    </div>

                    {/* Task Scroll */}
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

                      {/* Golden Fruit Animation Anchor */}
                      {activeFruits.includes(`task-${task.id}`) && (
                        <div className="absolute top-[-30px] right-[-20px] text-5xl md:text-6xl z-50 animate-fruit-pop drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]">
                          🥭
                        </div>
                      )}

                      {/* Top rod */}
                      <div className="w-full h-4 bg-[#8B4513] rounded-full shadow-md z-20 relative">
                        <div className="absolute -left-1.5 -top-1 w-6 h-6 bg-[#D2691E] rounded-full border-2 border-[#5C3A21] shadow-sm"></div>
                        <div className="absolute -right-1.5 -top-1 w-6 h-6 bg-[#D2691E] rounded-full border-2 border-[#5C3A21] shadow-sm"></div>
                      </div>

                      {/* Paper body */}
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
                              onClick={() => handleCompleteTask(task.id)}
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
        })}

        {/* Tree Roots Base */}
        <div className="w-full flex justify-center mt-[-10px] z-20">
          <div className="w-32 md:w-48 h-16 md:h-24 bg-gradient-to-t from-[#4A2F1D] to-[#70482B] rounded-b-[4rem] border-b-8 border-black/20"></div>
        </div>
      </div>

      {/* FAB - Quick Add Action */}
      <Button
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-16 h-16 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.3)] bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 border-4 border-white hover:scale-110 transition-all z-50 p-0 flex items-center justify-center group"
        onClick={() => setAddModalOpen(true)}
      >
        <Plus className="w-8 h-8 text-white group-hover:rotate-90 transition-transform" />
      </Button>

      {/* Book Interaction Modal */}
      <Dialog open={!!selectedBook} onOpenChange={(o) => !o && setSelectedBook(null)}>
        {selectedBook && (
          <DialogContent className="sm:max-w-md bg-[#FFF6E5] border-4 border-[#DEB887] rounded-3xl overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-black text-[#5C3A21] flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-orange-600" /> Detalhes do Livro
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col md:flex-row gap-6 py-4">
              <div className="w-32 h-48 mx-auto md:mx-0 shrink-0 rounded-xl overflow-hidden border-4 border-white shadow-xl bg-muted relative">
                <img
                  src={selectedBook.cover}
                  alt={selectedBook.title}
                  className="w-full h-full object-cover"
                />
                {selectedBook.isRead && (
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
                    {selectedBook.title}
                  </h3>
                  <p className="text-sm text-[#8B4513] font-medium leading-relaxed">
                    {selectedBook.summary}
                  </p>
                </div>

                {!selectedBook.isRead ? (
                  <div className="mt-6 bg-white/60 p-4 rounded-2xl border border-[#DEB887]">
                    <div className="flex justify-between items-end mb-3">
                      <Label className="font-bold text-orange-900 text-sm">Meu Progresso</Label>
                      <span className="text-xs font-black bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                        Página {sliderValue || selectedBook.currentPage} de{' '}
                        {selectedBook.totalPages}
                      </span>
                    </div>
                    <Slider
                      value={[sliderValue || selectedBook.currentPage]}
                      max={selectedBook.totalPages}
                      step={1}
                      onValueChange={(val) => setSliderValue(val[0])}
                      className="cursor-grab active:cursor-grabbing mb-4"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 text-xs font-bold border-orange-300 text-orange-700 hover:bg-orange-50"
                        onClick={handleUpdateBookProgress}
                      >
                        Salvar
                      </Button>
                      <Button
                        className="flex-1 text-xs font-bold bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleMarkBookRead(selectedBook.id)}
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
          </DialogContent>
        )}
      </Dialog>

      {/* Add Item Modal */}
      <Dialog
        open={isAddModalOpen}
        onOpenChange={(o) => {
          setAddModalOpen(o)
          if (!o) {
            setNewBookTitle('')
            setNewTaskTitle('')
          }
        }}
      >
        <DialogContent className="sm:max-w-md bg-white border-4 border-orange-200 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-black text-orange-900 text-center">
              Adicionar à Árvore 🌳
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="book" className="w-full mt-2">
            <TabsList className="grid w-full grid-cols-2 bg-orange-100 rounded-full p-1 h-auto mb-6">
              <TabsTrigger
                value="book"
                className="rounded-full font-bold py-2 data-[state=active]:bg-white data-[state=active]:text-orange-700 data-[state=active]:shadow-sm"
              >
                <BookOpen className="w-4 h-4 mr-2" /> Novo Livro
              </TabsTrigger>
              <TabsTrigger
                value="task"
                className="rounded-full font-bold py-2 data-[state=active]:bg-white data-[state=active]:text-orange-700 data-[state=active]:shadow-sm"
              >
                <ScrollText className="w-4 h-4 mr-2" /> Nova Tarefa
              </TabsTrigger>
            </TabsList>

            <TabsContent value="book" className="space-y-4">
              <div className="space-y-2">
                <Label className="font-bold text-orange-900">Qual o nome do livro?</Label>
                <Input
                  placeholder="Ex: O Pequeno Príncipe"
                  value={newBookTitle}
                  onChange={(e) => setNewBookTitle(e.target.value)}
                  className="bg-orange-50/50 border-orange-200 focus-visible:ring-orange-500 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-orange-900">Quantas páginas tem?</Label>
                <Input
                  type="number"
                  min="1"
                  value={newBookPages}
                  onChange={(e) => setNewBookPages(e.target.value)}
                  className="bg-orange-50/50 border-orange-200 focus-visible:ring-orange-500 rounded-xl"
                />
              </div>
              <Button
                className="w-full rounded-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md mt-4"
                onClick={handleAddBook}
              >
                Sugerir Livro 📚
              </Button>
              <p className="text-xs text-center text-orange-600 font-medium opacity-80">
                O livro ficará aguardando a aprovação no Conselho.
              </p>
            </TabsContent>

            <TabsContent value="task" className="space-y-4">
              <div className="space-y-2">
                <Label className="font-bold text-orange-900">O que precisa ser feito?</Label>
                <Input
                  placeholder="Ex: Trabalho de Ciências"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="bg-orange-50/50 border-orange-200 focus-visible:ring-orange-500 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-orange-900">Para quando é?</Label>
                <Input
                  placeholder="Ex: Próxima segunda"
                  value={newTaskDate}
                  onChange={(e) => setNewTaskDate(e.target.value)}
                  className="bg-orange-50/50 border-orange-200 focus-visible:ring-orange-500 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-orange-900">Nível de Atenção</Label>
                <div className="flex gap-2 w-full">
                  {(['Calmo', 'Explorar', 'Urgente'] as const).map((p) => (
                    <Button
                      key={p}
                      variant="outline"
                      className={cn(
                        'flex-1 text-xs rounded-xl font-bold border-2 h-10',
                        newTaskPriority === p
                          ? priorityColor(p) + ' shadow-inner scale-[0.98]'
                          : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700',
                      )}
                      onClick={() => setNewTaskPriority(p)}
                    >
                      {p}
                    </Button>
                  ))}
                </div>
              </div>
              <Button
                className="w-full rounded-full h-12 text-lg font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-md mt-4"
                onClick={handleAddTask}
              >
                Adicionar Tarefa 📝
              </Button>
              <p className="text-xs text-center text-orange-600 font-medium opacity-80">
                A tarefa ficará aguardando a aprovação no Conselho.
              </p>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
