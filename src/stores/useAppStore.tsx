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

type AppState = {
  xp: number
  crystals: number
  levelText: string
  tasks: Task[]
  plushies: Plushie[]
  customRewards: CustomReward[]
  emotionHistory: { date: string; value: number }[]
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

const initialEmotionHistory = [
  { date: 'Seg', value: 65 },
  { date: 'Ter', value: 80 },
  { date: 'Qua', value: 50 },
  { date: 'Qui', value: 90 },
  { date: 'Sex', value: 85 },
  { date: 'Sáb', value: 95 },
  { date: 'Dom', value: 75 },
]

export const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [xp, setXp] = useState(45)
  const [crystals, setCrystals] = useState(10)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [plushies, setPlushies] = useState<Plushie[]>(initialPlushies)
  const [customRewards, setCustomRewards] = useState<CustomReward[]>(initialRewards)
  const [showRafikiSeal, setShowRafikiSeal] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [hasRarePowerUnlocked, setHasRarePowerUnlocked] = useState(false)
  const [isParentAuthenticated, setIsParentAuthenticated] = useState(false)
  const [lastReward, setLastReward] = useState<{ xp: number; crystals: number } | null>(null)

  // Avoid using standard useState directly for history to simulate persistence
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

  return (
    <AppContext.Provider
      value={{
        xp,
        crystals,
        levelText: getLevelText(xp),
        tasks,
        plushies,
        customRewards,
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
