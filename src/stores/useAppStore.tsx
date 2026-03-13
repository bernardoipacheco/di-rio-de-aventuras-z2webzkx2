import { createContext, useContext, useState, ReactNode } from 'react'

export type Task = {
  id: string
  title: string
  category: 'Higiene' | 'Organização' | 'Sabedoria' | 'Ajuda'
  status: 'todo' | 'pending' | 'completed'
  xpReward: number
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

type AppState = {
  xp: number
  levelText: string
  tasks: Task[]
  plushies: Plushie[]
  showRafikiSeal: boolean
  isMusicPlaying: boolean
  hasRarePowerUnlocked: boolean
  toggleMusic: () => void
  submitTask: (id: string) => void
  approveTask: (id: string) => void
  updatePlushieEmotion: (id: string, emotion: number) => void
  addPlushie: (plushie: Omit<Plushie, 'id' | 'friendshipLevel' | 'friendshipXp'>) => string
  addPlushieXp: (id: string, amount: number) => void
  dismissRafikiSeal: () => void
  unlockRarePower: () => void
}

const getLevelText = (xp: number) => {
  if (xp < 100) return 'Filhote Curioso'
  if (xp < 300) return 'Caçadora Valente'
  if (xp < 600) return 'Líder da Tropa'
  return 'Rainha da Pedra do Rei'
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Banho no Oásis do Hakuna Matata',
    category: 'Higiene',
    status: 'todo',
    xpReward: 20,
  },
  {
    id: '2',
    title: 'Sorriso de Hiena (Escovar os dentes)',
    category: 'Higiene',
    status: 'todo',
    xpReward: 15,
  },
  { id: '3', title: 'Arrumação da Toca', category: 'Organização', status: 'todo', xpReward: 30 },
  {
    id: '4',
    title: 'Relatório do Mordomo (Guardar brinquedos)',
    category: 'Organização',
    status: 'todo',
    xpReward: 25,
  },
  {
    id: '5',
    title: 'Línguas da Savana (Tarefa de Inglês)',
    category: 'Sabedoria',
    status: 'todo',
    xpReward: 40,
  },
  {
    id: '6',
    title: 'Ajudante Real (Ajudar na mesa)',
    category: 'Ajuda',
    status: 'pending',
    xpReward: 35,
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
  {
    id: 'p2',
    name: 'Gato de Botas',
    emotion: 50,
    imageUrl: 'https://img.usecurling.com/p/200/200?q=cat%20plush&color=orange',
    powers: 'Guardião de Segredos, Amigo de Todas as Horas',
    powerTags: ['segredos', 'amigo'],
    friendshipLevel: 2,
    friendshipXp: 15,
  },
  {
    id: 'p3',
    name: 'Coelho Mágico',
    emotion: 95,
    imageUrl: 'https://img.usecurling.com/p/200/200?q=rabbit%20plush&color=white',
    powers: 'Guardião do Sono, Mestre dos Abraços',
    powerTags: ['sono', 'abraco'],
    friendshipLevel: 1,
    friendshipXp: 80,
  },
]

export const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [xp, setXp] = useState(45)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [plushies, setPlushies] = useState<Plushie[]>(initialPlushies)
  const [showRafikiSeal, setShowRafikiSeal] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [hasRarePowerUnlocked, setHasRarePowerUnlocked] = useState(false)

  const submitTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'pending' } : t)))
  }

  const approveTask = (id: string) => {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === id)
      if (task && task.status === 'pending') {
        setXp((currentXp) => currentXp + task.xpReward)
        setShowRafikiSeal(true)
        return prev.map((t) => (t.id === id ? { ...t, status: 'completed' } : t))
      }
      return prev
    })
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
        let xp = (p.friendshipXp || 0) + amount
        let level = p.friendshipLevel || 1
        while (xp >= 100) {
          level += 1
          xp -= 100
        }
        return { ...p, friendshipXp: xp, friendshipLevel: level }
      }),
    )
  }

  return (
    <AppContext.Provider
      value={{
        xp,
        levelText: getLevelText(xp),
        tasks,
        plushies,
        showRafikiSeal,
        isMusicPlaying,
        hasRarePowerUnlocked,
        toggleMusic: () => setIsMusicPlaying(!isMusicPlaying),
        submitTask,
        approveTask,
        updatePlushieEmotion,
        addPlushie,
        addPlushieXp,
        dismissRafikiSeal: () => setShowRafikiSeal(false),
        unlockRarePower: () => setHasRarePowerUnlocked(true),
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
