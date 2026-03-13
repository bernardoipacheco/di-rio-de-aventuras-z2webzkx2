import { createContext, useContext, useState, ReactNode } from 'react'

export type Task = {
  id: string
  title: string
  category: 'Higiene' | 'Organização' | 'Sabedoria' | 'Ajuda'
  status: 'todo' | 'pending' | 'completed'
  xpReward: number
  crystalsReward: number
  buttonLabel: string
}

export type Plushie = {
  id: string
  name: string
  emotion: number
  imageUrl: string
  powers?: string
  powerTags?: string[]
  audioUrl?: string
  friendshipLevel?: number
  friendshipXp?: number
}

export type CustomReward = {
  id: string
  name: string
  icon: string
}

export type Book = {
  id: string
  title: string
  cover: string
  summary: string
  totalPages: number
  currentPage: number
  isRead: boolean
  status: 'approved' | 'pending'
}

export type SchoolTask = {
  id: string
  title: string
  dueDate: string
  priority: 'Urgente' | 'Calmo' | 'Explorar'
  status: 'todo' | 'pending' | 'completed'
}

type AppState = {
  xp: number
  crystals: number
  levelText: string
  tasks: Task[]
  plushies: Plushie[]
  customRewards: CustomReward[]
  books: Book[]
  schoolTasks: SchoolTask[]
  emotionHistory: { date: string; value: number; xp: number }[]
  showRafikiSeal: boolean
  isMusicPlaying: boolean
  hasRarePowerUnlocked: boolean
  isParentAuthenticated: boolean
  lastReward: { xp: number; crystals: number } | null
  toggleMusic: () => void
  submitTask: (id: string) => void
  approveTask: (id: string) => void
  rejectTask: (id: string) => void
  updatePlushieEmotion: (id: string, emotion: number) => void
  addPlushie: (plushie: Omit<Plushie, 'id' | 'friendshipLevel' | 'friendshipXp'>) => string
  addPlushieXp: (id: string, amount: number) => void
  dismissRafikiSeal: () => void
  unlockRarePower: () => void
  setParentAuthenticated: (val: boolean) => void
  updateCustomReward: (id: string, name: string) => void
  addBook: (book: Omit<Book, 'id'>) => void
  updateBookProgress: (id: string, page: number) => void
  markBookRead: (id: string) => void
  approveBook: (id: string) => void
  rejectBook: (id: string) => void
  addSchoolTask: (task: Omit<SchoolTask, 'id'>) => void
  completeSchoolTask: (id: string) => void
  approveSchoolTask: (id: string) => void
  rejectSchoolTask: (id: string) => void
  addGlobalReward: (xp: number, crystals: number) => void
}

const getLevelText = (xp: number) => {
  if (xp < 100) return 'Filhote'
  if (xp < 300) return 'Explorador'
  return 'Rei'
}

const initialTasks: Task[] = [
  {
    id: 't1',
    title: 'Banho no Oásis',
    category: 'Higiene',
    status: 'todo',
    xpReward: 20,
    crystalsReward: 5,
    buttonLabel: 'Pronto! 💦',
  },
  {
    id: 't2',
    title: 'Arrumação da Toca',
    category: 'Organização',
    status: 'todo',
    xpReward: 15,
    crystalsReward: 5,
    buttonLabel: 'Tudo em Ordem! 🧹',
  },
  {
    id: 't3',
    title: 'Estratégia do Grande Leão',
    category: 'Sabedoria',
    status: 'pending',
    xpReward: 30,
    crystalsReward: 10,
    buttonLabel: 'Xeque-Mate! ♟️',
  },
  {
    id: 't4',
    title: 'Ajudante Real',
    category: 'Ajuda',
    status: 'pending',
    xpReward: 35,
    crystalsReward: 10,
    buttonLabel: 'Ajudei! 🤝',
  },
]

const initialPlushies: Plushie[] = [
  {
    id: 'p1',
    name: 'Simba de Pelúcia',
    emotion: 80,
    imageUrl: 'https://img.usecurling.com/p/200/200?q=lion%20plush&color=orange',
    powers: 'Coragem de Leão, Explorador da Savana',
    powerTags: ['coragem', 'explorador'],
    friendshipLevel: 1,
    friendshipXp: 30,
  },
]

const initialRewards: CustomReward[] = [
  { id: 'r1', name: 'Sessão de Cinema', icon: '🍿' },
  { id: 'r2', name: 'Passeio no Parque', icon: '🌳' },
  { id: 'r3', name: 'História Extra', icon: '📚' },
  { id: 'r4', name: 'Sobremesa Especial', icon: '🍦' },
]

const initialBooks: Book[] = [
  {
    id: 'b1',
    title: 'A Jornada do Leão',
    cover: 'https://img.usecurling.com/p/200/300?q=lion%20illustration&color=yellow',
    summary: 'Acompanhe as aventuras do sábio Rafiki pelas terras do reino.',
    totalPages: 120,
    currentPage: 45,
    isRead: false,
    status: 'approved',
  },
  {
    id: 'b2',
    title: 'O Grande Rugido',
    cover: 'https://img.usecurling.com/p/200/300?q=mountain&color=orange',
    summary: 'A lenda do leão que encontrou sua voz nas montanhas.',
    totalPages: 50,
    currentPage: 50,
    isRead: true,
    status: 'approved',
  },
]

const initialSchoolTasks: SchoolTask[] = [
  {
    id: 'st1',
    title: 'Matemática: Contar Frutas da Baobá',
    dueDate: 'Amanhã',
    priority: 'Urgente',
    status: 'todo',
  },
  {
    id: 'st2',
    title: 'Geografia: Desenhar o Mapa da Savana',
    dueDate: 'Sexta-feira',
    priority: 'Explorar',
    status: 'todo',
  },
]

const initialEmotionHistory = [
  { date: 'Seg', value: 65, xp: 20 },
  { date: 'Ter', value: 80, xp: 45 },
  { date: 'Qua', value: 50, xp: 10 },
  { date: 'Qui', value: 90, xp: 60 },
  { date: 'Sex', value: 85, xp: 55 },
  { date: 'Sáb', value: 95, xp: 80 },
  { date: 'Dom', value: 75, xp: 35 },
]

export const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [xp, setXp] = useState(45)
  const [crystals, setCrystals] = useState(10)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [plushies, setPlushies] = useState<Plushie[]>(initialPlushies)
  const [customRewards, setCustomRewards] = useState<CustomReward[]>(initialRewards)
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [schoolTasks, setSchoolTasks] = useState<SchoolTask[]>(initialSchoolTasks)
  const [showRafikiSeal, setShowRafikiSeal] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [hasRarePowerUnlocked, setHasRarePowerUnlocked] = useState(false)
  const [isParentAuthenticated, setIsParentAuthenticated] = useState(false)
  const [lastReward, setLastReward] = useState<{ xp: number; crystals: number } | null>(null)

  const emotionHistory = initialEmotionHistory

  const submitTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'pending' } : t)))
  }

  const approveTask = (id: string) => {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === id)
      if (task && task.status === 'pending') {
        setXp((currentXp) => currentXp + task.xpReward)
        setCrystals((currentCrystals) => currentCrystals + task.crystalsReward)
        setLastReward({ xp: task.xpReward, crystals: task.crystalsReward })
        setShowRafikiSeal(true)
        return prev.map((t) => (t.id === id ? { ...t, status: 'completed' } : t))
      }
      return prev
    })
  }

  const rejectTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'todo' } : t)))
  }

  const updatePlushieEmotion = (id: string, emotion: number) => {
    setPlushies((prev) => prev.map((p) => (p.id === id ? { ...p, emotion } : p)))
  }

  const addPlushie = (plushieData: Omit<Plushie, 'id' | 'friendshipLevel' | 'friendshipXp'>) => {
    const newId = `p${Date.now()}`
    setPlushies((prev) => [
      { ...plushieData, id: newId, friendshipLevel: 1, friendshipXp: 0 },
      ...prev,
    ])
    return newId
  }

  const addPlushieXp = (id: string, amount: number) => {
    setPlushies((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p
        let currentXp = (p.friendshipXp || 0) + amount
        let level = p.friendshipLevel || 1
        while (currentXp >= 100) {
          level += 1
          currentXp -= 100
        }
        return { ...p, friendshipXp: currentXp, friendshipLevel: level }
      }),
    )
  }

  const updateCustomReward = (id: string, name: string) => {
    setCustomRewards((prev) => prev.map((r) => (r.id === id ? { ...r, name } : r)))
  }

  const addGlobalReward = (xpReward: number, crystalsReward: number) => {
    setXp((prev) => prev + xpReward)
    setCrystals((prev) => prev + crystalsReward)
  }

  const addBook = (bookData: Omit<Book, 'id'>) => {
    setBooks((prev) => [...prev, { ...bookData, id: `b${Date.now()}` }])
  }

  const updateBookProgress = (id: string, page: number) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b
        const isRead = page >= b.totalPages
        return { ...b, currentPage: page, isRead }
      }),
    )
  }

  const markBookRead = (id: string) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isRead: true, currentPage: b.totalPages } : b)),
    )
  }

  const approveBook = (id: string) => {
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'approved' } : b)))
  }

  const rejectBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id))
  }

  const addSchoolTask = (taskData: Omit<SchoolTask, 'id'>) => {
    setSchoolTasks((prev) => [...prev, { ...taskData, id: `st${Date.now()}` }])
  }

  const completeSchoolTask = (id: string) => {
    setSchoolTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'completed' } : t)))
  }

  const approveSchoolTask = (id: string) => {
    setSchoolTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'todo' } : t)))
  }

  const rejectSchoolTask = (id: string) => {
    setSchoolTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <AppContext.Provider
      value={{
        xp,
        crystals,
        levelText: getLevelText(xp),
        tasks,
        plushies,
        customRewards,
        books,
        schoolTasks,
        emotionHistory,
        showRafikiSeal,
        isMusicPlaying,
        hasRarePowerUnlocked,
        isParentAuthenticated,
        lastReward,
        toggleMusic: () => setIsMusicPlaying(!isMusicPlaying),
        submitTask,
        approveTask,
        rejectTask,
        updatePlushieEmotion,
        addPlushie,
        addPlushieXp,
        dismissRafikiSeal: () => setShowRafikiSeal(false),
        unlockRarePower: () => setHasRarePowerUnlocked(true),
        setParentAuthenticated: setIsParentAuthenticated,
        updateCustomReward,
        addBook,
        updateBookProgress,
        markBookRead,
        approveBook,
        rejectBook,
        addSchoolTask,
        completeSchoolTask,
        approveSchoolTask,
        rejectSchoolTask,
        addGlobalReward,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppStore = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppStore must be used within an AppProvider')
  return context
}

export default useAppStore
