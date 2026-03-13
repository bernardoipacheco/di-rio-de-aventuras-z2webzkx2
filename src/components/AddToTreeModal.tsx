import { useState, useRef } from 'react'
import { BookOpen, ScrollText, Camera } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Book, SchoolTask } from '@/stores/useAppStore'

type Props = {
  isOpen: boolean
  onClose: () => void
  onAddBook: (book: Omit<Book, 'id'>) => void
  onAddTask: (task: Omit<SchoolTask, 'id'>) => void
}

export function AddToTreeModal({ isOpen, onClose, onAddBook, onAddTask }: Props) {
  const [newBookTitle, setNewBookTitle] = useState('')
  const [newBookPages, setNewBookPages] = useState('100')
  const [coverImage, setCoverImage] = useState<string | null>(null)

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDate, setNewTaskDate] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState<'Urgente' | 'Calmo' | 'Explorar'>('Calmo')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetForm = () => {
    setNewBookTitle('')
    setNewBookPages('100')
    setCoverImage(null)
    setNewTaskTitle('')
    setNewTaskDate('')
    setNewTaskPriority('Calmo')
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) resetForm()
    onClose()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setCoverImage(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const submitBook = () => {
    if (!newBookTitle.trim()) return
    onAddBook({
      title: newBookTitle,
      totalPages: parseInt(newBookPages) || 100,
      currentPage: 0,
      isRead: false,
      summary: 'Nova aventura aguardando para ser explorada!',
      cover:
        coverImage ||
        `https://img.usecurling.com/p/200/300?q=${encodeURIComponent('manga book cover ' + newBookTitle.substring(0, 10))}&color=purple`,
      status: 'approved', // Bypasses parental approval instantly!
    })
    handleOpenChange(false)
  }

  const submitTask = () => {
    if (!newTaskTitle.trim()) return
    onAddTask({
      title: newTaskTitle,
      dueDate: newTaskDate || 'Em breve',
      priority: newTaskPriority,
      status: 'pending',
    })
    handleOpenChange(false)
  }

  const priorityColor = (p: string) => {
    if (p === 'Urgente') return 'bg-red-100 text-red-700 border-red-200'
    if (p === 'Calmo') return 'bg-green-100 text-green-700 border-green-200'
    return 'bg-amber-100 text-amber-700 border-amber-200'
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-bold text-orange-900">Quantas páginas?</Label>
                <Input
                  type="number"
                  min="1"
                  value={newBookPages}
                  onChange={(e) => setNewBookPages(e.target.value)}
                  className="bg-orange-50/50 border-orange-200 focus-visible:ring-orange-500 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-orange-900">Capa do Livro</Label>
                <div
                  className="w-full h-10 border-2 border-dashed border-orange-300 rounded-xl flex items-center justify-center bg-orange-50/50 cursor-pointer overflow-hidden relative group hover:bg-orange-100 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {coverImage ? (
                    <img src={coverImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center gap-2 text-orange-500 font-bold text-xs">
                      <Camera className="w-4 h-4" /> Foto
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <Button
              className="w-full rounded-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md mt-4"
              onClick={submitBook}
            >
              Adicionar à Estante 📚
            </Button>
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
              onClick={submitTask}
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
  )
}
